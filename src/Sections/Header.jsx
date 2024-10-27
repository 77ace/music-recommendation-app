import { IoMdMusicalNote } from "react-icons/io";
import React from "react";

const Header = () => {
  return (
    <div className="pointer-events-none mx-auto flex h-fit w-fit flex-col items-center justify-center rounded-full bg-black bg-opacity-5 p-4 sm:bg-opacity-25">
      <h1 className="text-cente relative z-20 flex flex-wrap items-center justify-center bg-gradient-to-r from-slate-200/95 to-slate-200/90 bg-clip-text text-4xl font-bold text-transparent transition-all duration-300 sm:text-5xl lg:text-6xl">
        GROOVE
        <IoMdMusicalNote className="text-[#1eac50]" />
        MATCH
      </h1>
      <h2 className="bg-gradient-to-b from-slate-200 to-slate-200/85 bg-clip-text text-center font-bold text-transparent sm:mt-1 lg:text-lg">
        Find music that fits your groove
      </h2>
    </div>
  );
};

export default Header;