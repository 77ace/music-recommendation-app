import { useEffect, useState } from "react";

export const CustomButton = ({
  onClick,
  isGenreEmptyOnSearch,
  loadingFetch,
}) => {
  const [extendedLoading, setExtendedLoading] = useState(false);
  // Monitor loadingFetch for transitions from false to true
  useEffect(() => {
    if (loadingFetch) {
      setExtendedLoading(true);
      const timer = setTimeout(() => setExtendedLoading(false), 5000); // Delay enough until transition is over (transition is debounced 1.5s after fetch is done in AppRouter.jsx)
      return () => clearTimeout(timer); // Cleanup timer if component unmounts
    }
  }, [loadingFetch]);

  return (
    <button
      disabled={isGenreEmptyOnSearch || extendedLoading}
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
        {extendedLoading ? (
          <div className="-mb-1.5 -ml-3 flex items-center justify-center gap-2">
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
