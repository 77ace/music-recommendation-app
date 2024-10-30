import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export const CustomButton = ({
  onClick,
  isGenreEmptyOnSearch,
  loadingFetch,
}) => {
  const navigate = useNavigate();
  const wasLoading = useRef(false); // Track previous state of loadingFetch

  useEffect(() => {
    // Check if loadingFetch changed from true to false
    if (wasLoading.current && !loadingFetch) {
      navigate("/results");
    }
    // Update wasLoading to the current state of loadingFetch
    wasLoading.current = loadingFetch;
  }, [loadingFetch, navigate]);

  return (
    <button
      disabled={isGenreEmptyOnSearch || loadingFetch}
      onClick={onClick}
      className={`inline-flex h-full w-full animate-shimmer select-none items-center ${isGenreEmptyOnSearch ? "bg-[linear-gradient(110deg,#450a0a,45%,#ef4444,55%,#450a0a)] ring-red-900" : "bg-[linear-gradient(110deg,#052e16,45%,#166534,55%,#052e16)]"} flex-col justify-center rounded-lg bg-[length:200%_100%] px-6 font-bold text-slate-200 transition-all sm:text-lg lg:text-xl xl:text-2xl`}
    >
      <h2
        className={`${!isGenreEmptyOnSearch ? "h-0 rotate-12 overflow-hidden opacity-0" : "opacity-100"} transition-all`}
      >
        GENRE MISSING!
      </h2>
      <h2
        className={`${isGenreEmptyOnSearch ? "h-0 -rotate-12 overflow-hidden opacity-0" : "opacity-100"} transition-all`}
      >
        {loadingFetch ? (
          <div className="-mb-1 -ml-1 flex items-center justify-center gap-2">
            <span className="sr-only">Loading...</span>
            <div className="h-4 w-4 animate-bounce rounded-full bg-white [animation-delay:-0.6s] max-sm:h-3 max-sm:w-3"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-white"></div>
          </div>
        ) : (
          "Find My Groove!"
        )}
      </h2>
    </button>
  );
};
