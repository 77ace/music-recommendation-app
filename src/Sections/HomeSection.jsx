import { useCallback, useEffect, useState } from "react";
import { useFetchSpotifyRecommendations } from "../Utils/useFetchSpotifyRecommendations.js";
import BackgroundGrid from "../UI/BackgroundGrid.jsx";
import HeaderLayout from "../Layouts/Main/HeaderLayout.jsx";
import { AllControlsLayout } from "../Layouts/Main/AllControlsLayout.jsx";
import { FaInfoCircle } from "react-icons/fa";
import useSessionStorageState from "../Utils/useSessionStorageState.js";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { TransitionDiv } from "../UI/TransitionDiv.jsx";

function HomeSection({ handleReset, searchParams, handleControlsChange, isGenreEmptyOnSearch, handleSearch, loading }) {
  return (
    <div className="doto flex min-h-[100svh] flex-row items-center justify-center pb-4">
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
            onClick={handleReset}
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
