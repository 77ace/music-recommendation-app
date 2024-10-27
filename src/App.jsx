import React, { useState } from "react";
import { useFetchSpotifyRecommendations } from "./API_Config/Hooks/useFetchSpotifyRecommendations.js";
import { useFetchSpotifyGenres } from "./API_Config/Hooks/useFetchSpotifyGenres.js";
import BackgroundGrid from "./UI/BackgroundGrid.jsx";
import { SiBytedance } from "react-icons/si";
import { IoOptions } from "react-icons/io5";
import Header from "./Sections/Header.jsx";
import { GenreDropdown } from "./UI/GenreDropdown.jsx";
import Tabs from "./UI/Tabs.jsx";
import { SliderWithLabels } from "./UI/SliderWithLabels.jsx";
import CustomCheckbox from "./UI/CustomCheckBox/CustomCheckbox.jsx";
import { CustomButton } from "./UI/CustomButton.jsx";
function App() {
  const { genres, loading2, error2 } = useFetchSpotifyGenres();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [popularity, setPopularity] = useState("Any");
  const [danceability, setDanceability] = useState(0.35);
  const [includeExplicit, setIncludeExplicit] = useState(true);
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

  return (
    <div className="flex min-h-[100svh] flex-row items-center justify-center">
      <div className="App mx-auto max-w-screen-2xl flex-grow px-4 pt-4 transition-all sm:px-8 md:px-16">
        <BackgroundGrid />
        <section className="mb-2 sm:mb-4">
          <Header />
        </section>
        <div className="flex flex-col max-lg:space-y-2 lg:flex-row lg:space-x-2">
          <div className="flex flex-row items-center justify-center space-x-4 rounded-lg bg-neutral-600/20 py-1.5 pl-3 pr-1 transition-all lg:w-3/5">
            <div className="text-nowrap font-bold text-slate-200 max-sm:text-sm">
              Genre
            </div>
            <div className="w-full transition-all">
              <GenreDropdown />
            </div>
          </div>
          <div className="flex flex-row items-center justify-center space-x-4 rounded-lg bg-neutral-600/20 py-2 pl-3 pr-2 transition-all lg:w-2/5">
            <div className="text-nowrap font-bold text-slate-200 max-sm:text-sm">
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
          <div className="mt-2 flex w-full flex-col justify-around rounded-lg border-neutral-400/70 bg-neutral-600/20 px-4 py-2 sm:flex-row sm:items-center sm:gap-7 sm:px-5 sm:py-5 lg:w-3/5 xl:w-fit">
            <h2 className="z-[1] flex flex-col items-center justify-center rounded-md px-4 text-center font-bold text-slate-200 max-sm:text-sm sm:-mb-3 sm:-ml-2 sm:-mr-7">
              Mood
              <SiBytedance className="text-3xl max-sm:hidden" />
            </h2>
            <SliderWithLabels
              mainLabel="Danceable"
              altLabel="Chill"
              value={danceability}
              setValue={setDanceability}
              className="sm:-mr-3" // Additional styling for this instance
              orientation={"vertical"}
            />
            <SliderWithLabels
              mainLabel="Energetic"
              altLabel="Mellow"
              value={danceability}
              setValue={setDanceability}
              orientation={"vertical"}
            />
            <SliderWithLabels
              mainLabel="Happy"
              altLabel="Sad"
              value={danceability}
              setValue={setDanceability}
              orientation={"vertical"}
            />
            <SliderWithLabels
              mainLabel="Electronic"
              altLabel="Acoustic"
              value={danceability}
              setValue={setDanceability}
              orientation={"vertical"}
            />
          </div>

          <div className="flex w-full flex-col justify-around rounded-lg border-neutral-400/70 bg-neutral-600/20 px-4 py-2 sm:flex-row sm:items-center sm:gap-7 sm:px-5 sm:py-5 lg:mt-2 lg:w-2/5 xl:w-fit">
            <h2 className="z-[1] flex flex-col items-center justify-center rounded-md px-4 text-center font-bold text-slate-200 max-sm:text-sm sm:-mb-3 sm:-ml-2 sm:-mr-7">
              Options
              <IoOptions className="text-3xl max-sm:hidden" />
            </h2>{" "}
            <SliderWithLabels
              mainLabel="Electronic"
              altLabel="Acoustic"
              value={danceability}
              setValue={setDanceability}
              orientation={"vertical"}
            />
            <SliderWithLabels
              mainLabel="Electronic"
              altLabel="Acoustic"
              value={danceability}
              setValue={setDanceability}
              orientation={"vertical"}
            />
            <SliderWithLabels
              mainLabel="Electronic"
              altLabel="Acoustic"
              value={danceability}
              setValue={setDanceability}
              orientation={"vertical"}
            />
            <CustomCheckbox
              value={includeExplicit}
              setValue={setIncludeExplicit}
              dataName={"Include Explicit"}
              height={"h-60 lg:h-full max-sm:hidden"}
            />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <div className="flex w-full items-center justify-center rounded-lg bg-neutral-600/20 p-2 sm:hidden lg:mt-2 lg:block lg:h-1/3">
              <CustomCheckbox
                value={includeExplicit}
                setValue={setIncludeExplicit}
                dataName={"Include Explicit"}
                height={"h-12 lg:h-full"}
              />
            </div>
            <div className="h-24 w-full rounded-lg bg-slate-800/30 p-2 transition-all hover:scale-95 active:scale-90 lg:h-2/3">
              <CustomButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
