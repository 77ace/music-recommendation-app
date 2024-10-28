import React from "react";

const Tabs = ({ value, setValue, options }) => {
  return (
    <main className="flex h-full w-full items-center justify-center rounded-lg">
      <div className="grid w-full grid-cols-4 items-center justify-center gap-1.5 rounded-lg max-sm:grid-cols-2">
        {options.map((option) => (
          <div key={option} className="h-full flex-grow">
            <input
              type="radio"
              name="option"
              id={option}
              value={option}
              className="peer hidden w-full"
              checked={value === option}
              onChange={() => setValue(option)}
            />
            <label
              htmlFor={option}
              className={`flex h-full w-full cursor-pointer select-none items-center justify-center rounded-md p-2 text-center text-sm font-[400] font-[500] transition-all duration-200 max-sm:p-1.5 ${
                value === option
                  ? "bg-[rgba(30,172,80,0.3)] text-slate-100"
                  : "bg-neutral-600/20 text-slate-200 duration-[20ms] hover:bg-neutral-600/30 active:scale-[97%]"
              }`}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Tabs;
