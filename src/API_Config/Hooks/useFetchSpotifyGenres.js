import { useState, useEffect } from "react";
import { getAllGenres } from "../spotifyApiClient.js";

// Custom hook to fetch Spotify genres
export const useFetchSpotifyGenres = () => {
  const [genres, setGenres] = useState([]); // Holds the fetched genre data
  const [loading, setLoading] = useState(false); // Indicates loading state
  const [error, setError] = useState(null); // Holds error messages, if any

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);

      try {
        const availableGenres = await getAllGenres(); // Fetch genres from API
        setGenres(availableGenres); // Save genres to state
        localStorage.setItem("spotifyGenres", JSON.stringify(availableGenres)); // Cache genres in localStorage
      } catch (err) {
        setError("Failed to fetch genres. Please try again.");
      } finally {
        setLoading(false); // Always set loading to false after fetching
      }
    };

    // Check if genres are already cached; fetch if not
    if (!localStorage.getItem("spotifyGenres")) {
      fetchGenres(); // Fetch genres from the API
    } else {
      setGenres(JSON.parse(localStorage.getItem("spotifyGenres"))); // Load genres from localStorage
    }
  }, []);

  return { genres, loading, error }; // Return genre data, loading state, and error state
};
