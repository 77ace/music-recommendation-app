import React, { useEffect, useState } from "react";
import { useFetchSpotifyRecommendations } from "./API_Config/Hooks/useFetchSpotifyRecommendations.js";
import { useFetchSpotifyGenres } from "./API_Config/Hooks/useFetchSpotifyGenres.js";
import BackgroundGrid from "./UI/BackgroundGrid.jsx";
import { SiBytedance } from "react-icons/si";
import { IoOptions } from "react-icons/io5";
import Header from "./Sections/Header.jsx";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { GenreDropdown } from "./UI/GenreDropdown.jsx";
import Tabs from "./UI/Tabs.jsx";
import { SliderWithLabels } from "./UI/SliderWithLabels.jsx";
import CustomCheckbox from "./UI/CustomCheckBox/CustomCheckbox.jsx";
import { CustomButton } from "./UI/CustomButton.jsx";
function App() {
  // State to trigger API fetches
  const [shouldFetch, setShouldFetch] = useState(false);

  const [includeExplicit, setIncludeExplicit] = useState(true);

  // State for selected genres
  const [selectedGenres, setSelectedGenres] = useState([]);

  // State for popularity tab; "Any" is default, which excludes it from search params
  const [popularity, setPopularity] = useState("Any");

  // State for musical attributes with default `0.5` (indicating "ignore" if unchanged)
  const [searchParams, setSearchParams] = useState({
    limit: "100",
    target_danceability: 0.5,
    target_energy: 0.5,
    target_valence: 0.5,
    target_instrumentalness: 0.5,
    target_liveness: 0.5,
    target_tempo: 55,
    target_acousticness: 0.5,
  });

  // Function to build the search parameters for the Spotify API
  const generateSearchParams = () => {
    // Convert genres array to a comma-separated string for the API
    const genreString = selectedGenres.map((genre) => genre.value).join(",");

    // Map popularity labels to numerical values for the API
    const popularityMap = { High: 1, Mid: 0.5, Low: 0 };

    // Construct the search parameters object dynamically
    let params = {
      seed_genres: genreString ? genreString : "hip-hop", // Include genres if any are selected

      // Include popularity if it's not set to "Any" (0.5 and other values are allowed)
      ...(popularity !== "Any"
        ? { target_popularity: popularityMap[popularity] }
        : {}),

      // Include attributes only if their value is different from the default (0.5),
      // and exclude tempo if it is set to 50
      ...Object.fromEntries(
        Object.entries(searchParams).filter(
          ([key, value]) =>
            value !== 0.5 && (key !== "target_tempo" || value !== 55),
        ),
      ),
    };

    // Return the search parameters with only relevant values
    return params;
  };
  const paramse = generateSearchParams();
  console.log("test", paramse);

  // Fetch tracks using the custom hook only when shouldFetch change to true

  const { tracks, loading, error } = useFetchSpotifyRecommendations(
    paramse,
    shouldFetch,
  );

  console.log("tracks: ", tracks, loading, error);

  // Effect to reset 'shouldFetch' after the API call is done
  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false); // Reset after fetching
    }
  }, [tracks]);

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault();
    setShouldFetch(true);
    console.log("clicked");
  };

  // Update a specific attribute (such as `danceability` or `energy`) in the `searchParams` state
  const handleSliderChange = (attribute, value) => {
    setSearchParams((prevParams) => ({ ...prevParams, [attribute]: value }));
  };

  console.log(tracks);

  return (
    <div className="flex min-h-[100svh] flex-row items-center justify-center pb-4">
      <div className="App mx-auto max-w-screen-xl flex-grow px-4 pt-4 transition-all sm:px-8 md:px-16">
        <BackgroundGrid />
        <section className="mb-2 sm:mb-4">
          <Header />
        </section>
        <div className="flex flex-col max-lg:space-y-2 lg:flex-row lg:space-x-2">
          <div className="flex flex-row items-center justify-center space-x-4 rounded-lg bg-neutral-600/20 py-1.5 pl-3 pr-1.5 transition-all lg:w-3/5">
            <div className="pointer-events-none text-nowrap font-bold text-slate-200 max-sm:text-sm">
              Genre
            </div>
            <div className="w-full transition-all">
              <GenreDropdown
                value={selectedGenres}
                setValue={setSelectedGenres}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center space-x-4 rounded-lg bg-neutral-600/20 py-2 pl-3 pr-2 transition-all lg:w-2/5">
            <div className="pointer-events-none font-bold text-slate-200 max-sm:text-sm">
              Popularity
            </div>
            <div className="w-full transition-all">
              <Tabs
                value={popularity}
                setValue={setPopularity}
                options={["High", "Mid", "Low", "Any"]}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="mt-2 flex w-full flex-col justify-around rounded-lg border-neutral-400/70 bg-neutral-600/20 px-4 py-2 sm:flex-row sm:items-center sm:gap-6 sm:py-5 lg:w-3/5 xl:w-fit">
            <h2 className="pointer-events-none z-[1] flex flex-col items-center justify-center rounded-md pl-4 text-center font-bold text-slate-200 max-sm:text-sm lg:-ml-2 lg:-mr-7 lg:pr-3 xl:pr-4">
              Mood
              <SiBytedance className="text-3xl max-sm:hidden" />
            </h2>
            <SliderWithLabels
              mainLabel="Danceable"
              altLabel="Chill"
              value={searchParams.target_danceability}
              setValue={(value) =>
                handleSliderChange("target_danceability", value)
              }
              className="sm:-mr-3" // Additional styling for this instance
            />
            <SliderWithLabels
              mainLabel="Energetic"
              altLabel="Mellow"
              value={searchParams.target_energy}
              setValue={(value) => handleSliderChange("target_energy", value)}
            />
            <SliderWithLabels
              mainLabel="Happy"
              altLabel="Sad"
              value={searchParams.target_valence}
              setValue={(value) => handleSliderChange("target_valence", value)}
            />
            <SliderWithLabels
              mainLabel="Acoustic"
              altLabel="Electronic"
              value={searchParams.target_acousticness}
              setValue={(value) =>
                handleSliderChange("target_acousticness", value)
              }
              className="lg:-mr-5 xl:-mr-3"
            />
            <CustomCheckbox
              value={includeExplicit}
              setValue={setIncludeExplicit}
              dataName={"Allow Explicit"}
              height={
                "sm:h-[50svh] sm:max-h-60 sm:min-h-48 max-sm:hidden lg:-mr-2 sm:block lg:hidden"
              }
            />
          </div>
          <div className="flex gap-2">
            <div className="flex w-full flex-grow flex-col justify-around rounded-lg border-neutral-400/70 bg-neutral-600/20 px-4 py-2 sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-5 lg:mt-2 lg:w-2/5 xl:w-fit">
              <h2 className="pointer-events-none z-[1] flex flex-col items-center justify-center rounded-md px-4 text-center font-bold text-slate-200 max-sm:text-sm sm:-ml-2 sm:-mr-4 lg:-ml-4">
                Options
                <IoOptions className="text-3xl max-sm:hidden" />
              </h2>{" "}
              <SliderWithLabels
                mainLabel={
                  searchParams.target_tempo === 55
                    ? "OFF"
                    : searchParams.target_tempo
                }
                altLabel=<div className="flex items-end justify-center gap-1">
                  BPM
                  <FaRegQuestionCircle className="cursor-pointer text-lg hover:scale-105" />
                </div>
                value={searchParams.target_tempo}
                setValue={(value) => handleSliderChange("target_tempo", value)}
                min={55}
                max={180}
                step={1}
              />
              <SliderWithLabels
                mainLabel="Instrumental"
                altLabel="Vocal"
                value={searchParams.target_instrumentalness}
                setValue={(value) =>
                  handleSliderChange("target_instrumentalness", value)
                }
              />
              <SliderWithLabels
                mainLabel="Live"
                altLabel="Studio"
                value={searchParams.target_liveness}
                setValue={(value) =>
                  handleSliderChange("target_liveness", value)
                }
                className="lg:mr-1"
              />
            </div>
            <div className="w-full rounded-lg bg-slate-800/30 p-2 transition-all duration-[50ms] active:scale-95 max-sm:hidden lg:hidden lg:h-2/3">
              <CustomButton onClick={handleSearch} />
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <div className="flex w-full items-center justify-center rounded-lg bg-neutral-600/20 p-2 sm:hidden lg:mt-2 lg:block lg:h-1/3">
              <CustomCheckbox
                value={includeExplicit}
                setValue={setIncludeExplicit}
                dataName={"Allow Explicit"}
                height={"h-12 lg:h-full"}
              />
            </div>
            <div className="h-24 w-full rounded-lg bg-slate-600/25 p-2 transition-all duration-[50ms] active:scale-95 sm:hidden lg:block lg:h-2/3">
              <CustomButton onClick={handleSearch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
