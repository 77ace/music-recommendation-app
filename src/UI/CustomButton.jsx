export const CustomButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-full w-full animate-shimmer select-none items-center justify-center rounded-md bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-bold text-slate-300 ring-slate-700 transition-all hover:ring-2 sm:text-lg lg:text-xl xl:text-2xl"
    >
      Find My Groove!
    </button>
  );
};
