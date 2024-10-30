import { SiBytedance } from "react-icons/si";
import { SliderWithLabels } from "./SliderWithLabels.jsx";
import CustomCheckbox from "../UI/CustomCheckBox/CustomCheckbox.jsx";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { CustomTooltip } from "../UI/CustomTooltip.jsx";

export const MoodControlsLayout = ({ searchParams, handleControlsChange }) => {
  return (
    <div className="mt-2 flex w-full flex-col justify-around rounded-lg border-neutral-400/70 bg-neutral-600/20 px-4 py-2 sm:flex-row sm:items-center sm:gap-6 sm:py-5 lg:w-3/5 xl:w-fit">
      <h2 className="pointer-events-none z-[1] flex select-none flex-col items-center justify-center rounded-md pl-4 text-center font-bold text-slate-200 max-sm:text-sm lg:-ml-2 lg:-mr-7 lg:pr-3 xl:pr-4">
        Mood
        <SiBytedance className="text-3xl max-sm:hidden" />
      </h2>
      <SliderWithLabels
        mainLabel={
          <CustomTooltip
            title={
              'Indicates how danceable a track is, from "chill" to "dancible," based on tempo, rhythm, beat, and regularity.'
            }
          >
            Danceable
          </CustomTooltip>
        }
        altLabel={
          <CustomTooltip
            title={
              'Indicates how danceable a track is, from "chill" to "dancible," based on tempo, rhythm, beat, and regularity.'
            }
          >
            Chill
          </CustomTooltip>
        }
        value={searchParams.target_danceability}
        setValue={(value) => handleControlsChange("target_danceability", value)}
        className="sm:-mr-3" // Additional styling for this instance
      />
      <SliderWithLabels
        mainLabel={
          <CustomTooltip
            title={
              'Measures intensity from "Mellow" to "Energetic" based on loudness, tempo, timbre, and dynamic range. Energetic tracks feel fast and loud, while mellow ones are softer and slower.'
            }
          >
            Energetic
          </CustomTooltip>
        }
        altLabel={
          <CustomTooltip
            title={
              'Measures intensity from "Mellow" to "Energetic" based on loudness, tempo, timbre, and dynamic range. Mellow tracks feel soft and slow, while Energetic tracks are faster and louder.'
            }
          >
            Mellow
          </CustomTooltip>
        }
        value={searchParams.target_energy}
        setValue={(value) => handleControlsChange("target_energy", value)}
      />
      <SliderWithLabels
        mainLabel={
          <CustomTooltip
            title={
              'Indicates mood from "negative" to "positive." Higher values feel happy or cheerful, while lower values convey sadness, anger or intensity.'
            }
          >
            Happy
          </CustomTooltip>
        }
        altLabel={
          <CustomTooltip
            title={
              'Indicates mood from "negative" to "positive." Lower values feel angry, sad and intense, while higher values convey happiness or cheerfulness.'
            }
          >
            Sad
          </CustomTooltip>
        }
        value={searchParams.target_valence}
        setValue={(value) => handleControlsChange("target_valence", value)}
      />
      <SliderWithLabels
        mainLabel={
          <CustomTooltip
            title={
              'Indicates whether a track is more "acoustic" or "electronic," with higher values suggesting greater acoustic confidence.'
            }
          >
            Acoustic
          </CustomTooltip>
        }
        altLabel={
          <CustomTooltip
            title={
              'Indicates whether a track is more "acoustic" or "electronic," with lower values suggesting greater Electronic confidence.'
            }
          >
            Electronic
          </CustomTooltip>
        }
        value={searchParams.target_acousticness}
        setValue={(value) => handleControlsChange("target_acousticness", value)}
        className="lg:-mr-5 xl:-mr-3"
      />
      <CustomCheckbox
        value={searchParams.includeExplicit}
        setValue={(value) => handleControlsChange("includeExplicit", value)}
        dataName={"Allow Explicit"}
        height={"h-48 max-sm:hidden lg:-mr-2 sm:block lg:hidden"}
      />
    </div>
  );
};
