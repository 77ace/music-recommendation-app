import React, { useState } from "react";
import { useFetchSpotifyRecommendations } from "./API_Config/Hooks/useFetchSpotifyRecommendations.js";
import { useFetchSpotifyGenres } from "./API_Config/Hooks/useFetchSpotifyGenres.js";

function App() {
  const { genres, loading2, error2 } = useFetchSpotifyGenres();
  const [shouldFetch, setShouldFetch] = useState(false);
  // State to handle search parameters (dummy data)
  const [searchParams, setSearchParams] = useState({
    seed_genres: "hip-hop",
    limit: "16",
    danceability: "1",
    energy: "1",
  });

  // Fetch tracks using the custom hook only when shouldFetch change to true
  const { tracks, loading, error } = useFetchSpotifyRecommendations(
    searchParams,
    true,
  );

  console.log(tracks);

  return <div className="App p-4">Hi</div>;
}

export default App;
