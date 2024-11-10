import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ResultsSection } from "./Sections/ResultsSection.jsx";
import HomeSection from "./Sections/HomeSection.jsx";
import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useSessionStorageState from "./Utils/useSessionStorageState.js";
import { useFetchSpotifyRecommendations } from "./Utils/useFetchSpotifyRecommendations.js";

const DEFAULT_SEARCH_PARAMS = {
  limit: "100",
  target_danceability: 0.5,
  target_energy: 0.5,
  target_valence: 0.5,
  target_instrumentalness: 0.5,
  target_liveness: 0.5,
  target_tempo: 55,
  target_acousticness: 0.5,
  includeExplicit: true,
  target_popularity: "Any",
  selectedGenres: [],
};

export const AppRouter = () => {
  // State to trigger API fetches
  const [shouldFetch, setShouldFetch] = useState(false);

  // State to keep track of values for all the controls
  const [searchParams, setSearchParams] = useSessionStorageState(
    "SearchParams",
    DEFAULT_SEARCH_PARAMS,
  );

  const handleReset = () => setSearchParams(DEFAULT_SEARCH_PARAMS);

  // Flag to check if genre is empty when sending request (it shouldn't be empty)
  const [isGenreEmptyOnSearch, setIsGenreEmptyOnSearch] = useState(false);

  // Function to build the search parameters for the Spotify API
  const generateSearchParams = useCallback(() => {
    // convert array of objects to string formatted for API request
    const genreString = searchParams.selectedGenres
      .map((genre) => genre.value)
      .join(",");

    const popularityMap = { High: 100, Mid: 50, Low: 0 };

    // Return the final object to be passe in the API request
    return {
      seed_genres: genreString,
      ...(searchParams.target_popularity !== "Any" // Ignore if popularity is any
        ? { target_popularity: popularityMap[searchParams.target_popularity] }
        : {}),
      ...Object.fromEntries(
        Object.entries(searchParams).filter(
          ([key, value]) =>
            value !== 0.5 &&
            (key !== "target_tempo" || value !== 55) && //ignore if tempo value is 55 (default used as 'OFF' value)
            key !== "target_popularity" && // Ignore popularity as added at the top (already added once above, needed special treatment)
            key !== "includeExplicit" && // Ignore Explicit filter, not directly used in API request (to be used on returned results later)
            key !== "selectedGenres", // Ignore Genres as added at the top (needed special treatment)
        ),
      ),
    };
  }, [searchParams]);

  const API_Params = generateSearchParams();

  // console.log("api_params: ", API_Params);

  // Fetch tracks using the custom hook only when shouldFetch change to true
  const { tracks, loading, error, setTracks, setError } =
    useFetchSpotifyRecommendations(API_Params, shouldFetch);
  // console.log("tracks: ", tracks, loading, error);
  // Effect to reset 'shouldFetch' after the API call is done
  useEffect(() => {
    if (shouldFetch) {
      //with loadin on/off, check if fetch is triggreed and turn it off
      setShouldFetch(false); // Reset after fetching
    }
    if (tracks.length > 0) {
      // when loading is over navigate if tracks fetched
      const timer = setTimeout(() => navigate("/results"), 1500); //Debounce navigation

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }

    if (error) {
      // when loading is over and error debounce longer before navigate
      const timer = setTimeout(() => navigate("/results"), 3000); //Debounce navigation

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [tracks, error]);

  const navigate = useNavigate();
  // Handle search button click
  const handleSearch = (e) => {
    if (searchParams.selectedGenres.length === 0) {
      setIsGenreEmptyOnSearch(true); // If Genre is empty set flag to true, which will trigger a chain of styling events (button and dropdown turn red, notifying user)
      setTimeout(() => {
        setIsGenreEmptyOnSearch(false); // after 2.5 second set it back to false in order to undo the formatting changes to default
      }, 1000);
    } else {
      setShouldFetch(true); // If genre not empty, set shouldFetch state to True to initiate the request

      return true;
    }
  };

  // a one-size-fit-all function for changing the individual key(attribute)-value pairs 'searchParams' state
  const handleControlsChange = (attribute, value) => {
    setSearchParams((prevParams) => ({ ...prevParams, [attribute]: value }));
  };
  const location = useLocation();

  return (
    <div className="mx-auto max-w-screen-xl">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/*"
            element={
              <HomeSection
                handleReset={handleReset}
                searchParams={searchParams}
                handleSearch={handleSearch}
                handleControlsChange={handleControlsChange}
                isGenreEmptyOnSearch={isGenreEmptyOnSearch}
                loading={loading}
              />
            }
          />
          <Route
            path="/results"
            element={
              <ResultsSection
                tracksData={tracks}
                error={error}
                setTracks={setTracks}
                setError={setError}
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};
