import { IoMdMusicalNote } from "react-icons/io";
const HeaderLayout = ({ scale = 1, slogan = true }) => {
  return (
    <div
      className="pointer-events-none mx-auto mb-2 flex h-fit w-fit select-none flex-col items-center justify-center rounded-full p-4 sm:mb-4 sm:bg-opacity-25"
      style={{
        transform: `scale(${scale})`,
        // margin: `${margin}rem`,
      }}
    >
      <h1
        className="relative z-20 flex flex-wrap items-center justify-center bg-gradient-to-r from-slate-200/95 to-slate-200/90 bg-clip-text text-center text-4xl font-bold text-transparent transition-all duration-300 sm:text-5xl lg:text-6xl"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        GROOVE
        <IoMdMusicalNote className="text-[#1eac50]" />
        MATCH
      </h1>
      {slogan && (
        <h2 className="bg-gradient-to-r from-slate-200 to-slate-200/85 bg-clip-text text-center font-bold text-transparent sm:mt-0.5 lg:text-lg">
          Find music that fits your groove
        </h2>
      )}
    </div>
  );
};

export default HeaderLayout;
