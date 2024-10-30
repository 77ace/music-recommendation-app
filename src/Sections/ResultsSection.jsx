import BackgroundGrid from "../UI/BackgroundGrid.jsx";
import { Link } from "react-router-dom";
import { TransitionDiv } from "../UI/TransitionDiv.jsx";
export const ResultsSection = () => {
  return (
    <div className="flex flex-col">
      <BackgroundGrid />
      <TransitionDiv />
      <h1 className="flex min-h-[100svh] w-full items-center justify-center text-7xl max-md:text-5xl max-sm:text-lg">
        RESULTS HERE
        <br />
        <Link to="/" className="ml-10 rounded-xl bg-neutral-600/20 p-12">
          back
        </Link>
      </h1>
    </div>
  );
};
