import Tabs from "../UI/Tabs.jsx";

export const PopularityControlLayout = ({ value, setValue }) => (
  <div className="flex flex-row items-center justify-center space-x-4 rounded-lg bg-neutral-600/20 py-2 pl-3 pr-2 transition-all lg:w-2/5">
    <div className="pointer-events-none select-none font-bold text-slate-200 max-sm:text-sm">
      Popularity
    </div>
    <div className="w-full transition-all">
      <Tabs
        value={value}
        setValue={setValue}
        options={["High", "Mid", "Low", "Any"]}
      />
    </div>
  </div>
);
