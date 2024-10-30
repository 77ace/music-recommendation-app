import { IoOptions } from "react-icons/io5";
import { SliderWithLabels } from "./SliderWithLabels.jsx";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { CustomTooltip } from "../UI/CustomTooltip.jsx";

export const OptionControlsLayout = ({
  searchParams,
  handleControlsChange,
}) => {
  return (
    <div className="flex w-full flex-grow flex-col justify-around rounded-lg border-neutral-400/70 bg-neutral-600/20 px-4 py-2 sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-5 lg:mt-2 lg:w-2/5 xl:w-fit">
      <h2 className="pointer-events-none z-[1] flex select-none flex-col items-center justify-center rounded-md px-4 text-center font-bold text-slate-200 max-sm:text-sm sm:-ml-2 sm:-mr-4 lg:-ml-4">
        Options
        <IoOptions className="text-3xl max-sm:hidden" />
      </h2>{" "}
      <SliderWithLabels
        mainLabel={
          <CustomTooltip
            title={
              "The estimated tempo of a track in beats per minute (BPM), reflecting the speed or pace of the music based on average beat duration."
            }
          >
            BPM
          </CustomTooltip>
        }
        altLabel={
          searchParams.target_tempo === 55 ? (
            <div className="pointer-events-none select-none max-sm:mr-3 sm:mt-2">
              OFF
            </div>
          ) : (
            <div className="pointer-events-none select-none font-bold text-neutral-200">
              {searchParams.target_tempo}
            </div>
          )
        }
        value={searchParams.target_tempo}
        setValue={(value) => handleControlsChange("target_tempo", value)}
        min={55}
        max={180}
        step={1}
      />
      <SliderWithLabels
        mainLabel={
          <CustomTooltip
            title={
              'Indicates if a track is instrumental or vocal. Higher values suggest more instrumental content, with sounds like "ooh" and "aah" counted as instrumental, while rap and spoken word are vocal.'
            }
          >
            Instrumental
          </CustomTooltip>
        }
        altLabel={
          <CustomTooltip
            title={
              'Indicates if a track is instrumental or vocal. Lower values suggest more vocal content, with rap and spoken word counted as vocal, while sounds like "ooh" and "aah" are  instrumental.'
            }
          >
            Vocal
          </CustomTooltip>
        }
        value={searchParams.target_instrumentalness}
        setValue={(value) =>
          handleControlsChange("target_instrumentalness", value)
        }
      />
      <SliderWithLabels
        mainLabel={
          <CustomTooltip
            title={
              'Indicates audience presence; values closer to "Live" lean toward a live performance, while lower values suggest a recorded environment'
            }
          >
            Live
          </CustomTooltip>
        }
        altLabel={
          <CustomTooltip
            title={
              'Indicates audience presence; values closer to "Studio" suggest a recorded environment, while higher values lean toward a live performance.'
            }
          >
            Studio
          </CustomTooltip>
        }
        value={searchParams.target_liveness}
        setValue={(value) => handleControlsChange("target_liveness", value)}
        className="lg:mr-1"
      />
    </div>
  );
};
