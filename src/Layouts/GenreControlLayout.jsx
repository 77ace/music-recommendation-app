import { GenreDropdown } from "../UI/GenreDropdown.jsx";

export const GenreControlLayout = ({
  value,
  setValue,
  isGenreEmptyOnSearch,
}) => (
  <div
    className={`flex flex-row items-center justify-center space-x-4 rounded-lg ${!isGenreEmptyOnSearch ? "bg-neutral-600/[22%]" : "bg-red-800/40"} py-1.5 pl-3 pr-1.5 transition-all lg:w-3/5`}
  >
    <div className="pointer-events-none select-none text-nowrap font-bold text-slate-200 max-sm:text-sm">
      Genre
    </div>
    <div className="w-full transition-all">
      <GenreDropdown
        value={value}
        setValue={setValue}
        isGenreEmptyOnSearch={isGenreEmptyOnSearch}
      />
    </div>
  </div>
);
