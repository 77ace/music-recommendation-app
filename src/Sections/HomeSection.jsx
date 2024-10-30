import { useCallback, useEffect, useState } from "react";
import { useFetchSpotifyRecommendations } from "../Utils/useFetchSpotifyRecommendations.js";
import BackgroundGrid from "../UI/BackgroundGrid.jsx";
import HeaderLayout from "../Layouts/Main/HeaderLayout.jsx";
import { AllControlsLayout } from "../Layouts/Main/AllControlsLayout.jsx";
import { FaInfoCircle } from "react-icons/fa";
import useSessionStorageState from "../Utils/useSessionStorageState.js";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { TransitionDiv } from "../UI/TransitionDiv.jsx";

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

function HomeSection() {
  // State to trigger API fetches
  const [shouldFetch, setShouldFetch] = useState(false);

  // State to keep track of values for all the controls
  const [searchParams, setSearchParams] = useSessionStorageState(
    "SearchParams",
    DEFAULT_SEARCH_PARAMS,
  );

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

  console.log("api_params: ", API_Params);

  // Fetch tracks using the custom hook only when shouldFetch change to true
  const { tracks, loading, error } = useFetchSpotifyRecommendations(
    API_Params,
    shouldFetch,
  );

  // Effect to reset 'shouldFetch' after the API call is done
  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false); // Reset after fetching
    }
  }, [tracks]);

  console.log("tracks: ", tracks, loading, error);

  // Handle search button click
  const handleSearch = (e) => {
    if (searchParams.selectedGenres.length === 0) {
      setIsGenreEmptyOnSearch(true); // If Genre is empty set flag to true, which will trigger a chain of styling events (button and dropdown turn red, notifying user)
      setTimeout(() => {
        setIsGenreEmptyOnSearch(false); // after 1 second set it back to false in order to undo the formatting changes to default
      }, 1000);
    } else {
      setShouldFetch(true); // If genre not empty, set shouldFetch state to True to initiate the request
      return true; // Indicate successful preparation for the search
    }
  };

  // a one-size-fit-all function for changing the individual key(attribute)-value pairs 'searchParams' state
  const handleControlsChange = (attribute, value) => {
    setSearchParams((prevParams) => ({ ...prevParams, [attribute]: value }));
  };

  return (
    <div className="flex min-h-[100svh] flex-row items-center justify-center pb-4">
      <div className="App mx-auto max-w-screen-xl flex-grow px-4 pt-4 transition-all sm:px-8 md:px-16">
        <BackgroundGrid />
        <TransitionDiv />
        <HeaderLayout />
        {/*THis is just the first line giving info about hovering and reset button*/}
        <div className="flex justify-between">
          <h3 className="pointer-events-none mb-1 flex select-none items-center gap-1.5 text-sm text-neutral-400 max-sm:text-xs sm:ml-0.5">
            <FaInfoCircle /> Hover or tap on slider labels for details
          </h3>
          <h3
            onClick={() => setSearchParams(DEFAULT_SEARCH_PARAMS)}
            className="mb-1 flex cursor-pointer select-none items-center gap-1.5 text-sm text-neutral-400 max-sm:text-xs sm:ml-0.5"
          >
            <FaArrowRotateLeft />
            Reset
          </h3>
        </div>
        <AllControlsLayout
          searchParams={searchParams}
          handleControlsChange={handleControlsChange}
          isGenreEmptyOnSearch={isGenreEmptyOnSearch}
          handleSearch={handleSearch}
          loadingFetch={loading}
        />
      </div>
    </div>
  );
}

export default HomeSection;
