import { useState, useEffect } from "react";
import { getRecommendations } from "../API_Config/spotifyApiClient.js";

// Custom hook to fetch Spotify recommendations
export const useFetchSpotifyRecommendations = (searchParams, shouldFetch) => {
  const [tracks, setTracks] = useState([]); // Holds the fetched track data
  const [loading, setLoading] = useState(false); // Indicates loading state
  const [error, setError] = useState(null); // Holds error messages, if any

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true);
      setError(null);

      try {
        const recommendations = await getRecommendations(searchParams); // Fetch data from API
        setTracks(recommendations);
      } catch (err) {
        setError("Failed to fetch tracks. Please try again.");
      } finally {
        setLoading(false); // Always set loading to false after fetching
      }
    };

    if (shouldFetch) {
      fetchTracks(); // Trigger fetch when shouldFetch is true
    }
  }, [shouldFetch]);

  return { tracks, loading, error }; // Return track data, loading state, and error state
};
