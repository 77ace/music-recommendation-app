import { MoodControlsLayout } from "../MoodControlsLayout.jsx";
import { OptionControlsLayout } from "../OptionControlsLayout.jsx";
import { CustomButton } from "../../UI/CustomButton.jsx";
import CustomCheckbox from "../../UI/CustomCheckBox/CustomCheckbox.jsx";
import { GenreControlLayout } from "../GenreControlLayout.jsx";
import { PopularityControlLayout } from "../PopularityControlLayout.jsx";

export const AllControlsLayout = ({
  searchParams,
  handleControlsChange,
  handleSearch,
  isGenreEmptyOnSearch,
  loadingFetch,
}) => {
  return (
    <>
      <div className="flex flex-col max-lg:space-y-2 lg:flex-row lg:space-x-2">
        <GenreControlLayout
          value={searchParams.selectedGenres}
          setValue={(value) => handleControlsChange("selectedGenres", value)}
          isGenreEmptyOnSearch={isGenreEmptyOnSearch}
        />
        <PopularityControlLayout
          value={searchParams.target_popularity}
          setValue={(value) => handleControlsChange("target_popularity", value)}
        />
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <MoodControlsLayout
          searchParams={searchParams}
          handleControlsChange={handleControlsChange}
        />
        <div className="flex gap-2">
          <OptionControlsLayout
            handleControlsChange={handleControlsChange}
            searchParams={searchParams}
          />
          {/*This is a hidden button that only appear when screen size is between > sm and < lg*/}
          <div
            className={`w-full rounded-lg bg-neutral-600/25 p-2 transition-all duration-[50ms] hover:bg-neutral-700/40 active:scale-95 max-sm:hidden lg:hidden lg:h-2/3`}
          >
            <CustomButton
              onClick={handleSearch}
              isGenreEmptyOnSearch={isGenreEmptyOnSearch}
              loadingFetch={loadingFetch}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          {/*This is the checkbox that appear when screen size is < sm or > lg*/}
          <div className="flex w-full items-center justify-center rounded-lg bg-neutral-600/[22%] p-2 sm:hidden lg:mt-2 lg:block lg:h-1/3">
            <CustomCheckbox
              value={searchParams.includeExplicit}
              setValue={(value) =>
                handleControlsChange("includeExplicit", value)
              }
              dataName={"Allow Explicit"}
              height={"h-12 lg:h-full"}
            />
          </div>
          {/*This is a hidden button that only appear when screen size is between < sm and > lg*/}
          <div
            className={`h-24 w-full rounded-lg bg-neutral-600/25 p-2 transition-all duration-[50ms] hover:bg-neutral-700/40 active:scale-95 sm:hidden lg:block lg:h-2/3`}
          >
            <CustomButton
              onClick={handleSearch}
              isGenreEmptyOnSearch={isGenreEmptyOnSearch}
              loadingFetch={loadingFetch}
            />
          </div>
        </div>
      </div>
    </>
  );
};
