// Get the API client credentials stored securely in the .env variables

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

// Helper function to base64 encode client credentials (required for Spotify API token request)
const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

// Function to fetch a new access token from Spotify API
const fetchNewAccessToken = async () => {
  try {
    // Make a POST request to Spotify's token endpoint to get an access token
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST", // POST is required for token requests
      headers: {
        // Authorization header must contain encoded client credentials
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials", // Spotify needs this exact body to issue a token
    });

    // If the response is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to get access token");
    }

    // Convert the response to JSON
    const data = await response.json();

    // Calculate when the token will expire (Spotify provides this in seconds, so we convert to milliseconds)
    const expiresInMs = data.expires_in * 1000;
    const tokenExpiryTime = new Date().getTime() + expiresInMs;

    // Store the token and its expiry time in localStorage
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("tokenExpiryTime", tokenExpiryTime);

    // Return the new access token
    return data.access_token;
  } catch (error) {
    // If there was an error, log it for debugging
    console.error("Error fetching access token:", error);
    throw error;
  }
};

// Function to get the access token (from localStorage if valid, otherwise fetch a new one)
export const getAccessToken = async () => {
  const currentTime = new Date().getTime(); // Get the current time in milliseconds
  const storedToken = localStorage.getItem("accessToken"); // Get the token from localStorage
  const storedExpiryTime = localStorage.getItem("tokenExpiryTime"); // Get the expiry time from localStorage

  // If token exists and hasn't expired yet, return the token
  if (storedToken && storedExpiryTime && currentTime < storedExpiryTime) {
    console.log("Using token from localStorage");
    return storedToken;
  }

  // If no token or the token has expired, fetch a new token
  console.log("Token expired or not found, fetching a new one...");
  return await fetchNewAccessToken();
};

// Function to fetch music recommendations from Spotify API
export const getRecommendations = async (searchParams) => {
  try {
    const accessToken = await getAccessToken(); // Ensure we have a valid access token

    // Convert searchParams object to a URL-encoded string (needed for Spotify API)
    const queryParams = new URLSearchParams(searchParams);

    // Make a GET request to Spotify's recommendations endpoint
    const response = await fetch(
      `https://api.spotify.com/v1/recommendations?${queryParams}`,
      {
        method: "GET", // GET request to fetch data
        headers: {
          Authorization: `Bearer ${accessToken}`, // Bearer token required for authorization
          "Content-Type": "application/json",
        },
      },
    );

    // Handle "Too Many Requests" error if API rate limit is exceeded
    if (response.status === 429) {
      const retryAfter = response.headers.get("Retry-After"); // Get 'Retry-After' header
      console.error(`Too many requests. Retry after ${retryAfter} seconds.`);
      throw new Error(`Retry after ${retryAfter} seconds`);
    }

    // If response is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch recommendations");
    }

    // Convert the response to JSON
    const data = await response.json();

    // Extract track IDs from the recommendations
    const trackIds = data.tracks.map((track) => track.id);

    // Fetch track features (audio characteristics) using the track IDs
    const featuresResponse = await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(",")}`,
      {
        method: "GET", // GET request to fetch track features
        headers: {
          Authorization: `Bearer ${accessToken}`, // Same access token for authorization
          "Content-Type": "application/json",
        },
      },
    );

    // If response for track features is not OK, throw an error
    if (!featuresResponse.ok) {
      throw new Error("Failed to fetch track features");
    }

    // Combine the track information with their audio features
    const featuresData = await featuresResponse.json();
    const tracksWithFeatures = data.tracks.map((track, index) => ({
      ...track,
      features: featuresData.audio_features[index], // Add features to each track
    }));

    // Return the combined result
    return tracksWithFeatures;
  } catch (error) {
    // Log and rethrow the error for debugging
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};

// Function to fetch all available genres from Spotify API
export const getAllGenres = async () => {
  // Check if genres are already stored in localStorage
  const storedGenres = localStorage.getItem("spotifyGenres");
  if (storedGenres) {
    return JSON.parse(storedGenres); // Return cached genres
  }

  try {
    const accessToken = await getAccessToken(); // Ensure we have a valid access token

    // Make a GET request to Spotify's genre seeds endpoint
    const response = await fetch(
      `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
      {
        method: "GET", // GET request to fetch available genres
        headers: {
          Authorization: `Bearer ${accessToken}`, // Bearer token required for authorization
          "Content-Type": "application/json",
        },
      },
    );

    // If response is not OK, throw an error
    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }

    // Convert the response to JSON
    const data = await response.json();

    // Store the genres in localStorage for future use
    localStorage.setItem("spotifyGenres", JSON.stringify(data.genres));

    // Return the list of genres
    return data.genres;
  } catch (error) {
    // Log and rethrow the error for debugging
    console.error("Error fetching genres:", error);
    throw error;
  }
};
