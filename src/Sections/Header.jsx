import { IoMdMusicalNote } from 'react-icons/io';

const Header = () => {
  return (
    <div className="bg-black flex justify-center select-none items-center mx-auto bg-opacity-25 p-4 rounded-full h-fit w-fit">
      <h1 className="relative z-20 bg-gradient-to-b from-slate-100 duration-300 hover:animate-pulse transition-all to-slate-200/65 bg-clip-text text-center font-bold text-transparent flex items-center text-4xl sm:text-5xl lg:text-6xl">
        Groove
        <IoMdMusicalNote className="text-[#1eac50]" />
        Match
      </h1>
    </div>
  );
};

export default Header;