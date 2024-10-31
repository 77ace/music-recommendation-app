import BackgroundGrid from "../UI/BackgroundGrid.jsx";
import { Link } from "react-router-dom";
import { TransitionDiv } from "../UI/TransitionDiv.jsx";
import { useEffect } from "react";
export const ResultsSection = ({ tracksData, error, setTracks, setError }) => {
  console.log(tracksData, error);

  // Clear tracksData and error on unmount
  useEffect(() => {
    return () => {
      setTracks([]); // Clear tracks data
      setError(null); // Clear error message
    };
  }, []);
  return (
    <div className="flex flex-col">
      <BackgroundGrid />
      <TransitionDiv />
      <h1 className="flex min-h-[100svh] w-full items-center justify-center text-7xl max-md:text-5xl max-sm:text-lg">
        {tracksData.length} tracks fetched
        {error && <span className="text-red-500">{error}</span>}
        <br />
        <Link to="/" className="ml-10 rounded-xl bg-neutral-600/20 p-12">
          back
        </Link>
      </h1>
    </div>
  );
};
