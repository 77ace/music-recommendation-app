import useMediaQuery from "@mui/material/useMediaQuery";
import Slider from "@mui/material/Slider";
import { createTheme } from "@mui/material/styles";
import { memo } from "react";

export const CustomSlider = memo(
  ({
    value,
    setValue,
    // formatLabel,
    min,
    max,
    step,
    defaultValue,
    style,
    orientation,
    marks,
    gaps = 1,
  }) => {
    const theme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
        },
      },
    });
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMidScreen = useMediaQuery(theme.breakpoints.down("md"));

    // Define the midpoint mark
    const midpoint = (min + max) / 2;
    const midpointMark = [{ value: midpoint, label: "" }];

    const sliderStyleHorizontal = {
      color: "#37733a",

      "& .MuiSlider-track": {
        border: "none",
        width: isSmallScreen ? "9.5px" : isMidScreen ? "11px" : "11.5px",
        height: isSmallScreen ? "9.5px" : isMidScreen ? "11px" : "11.5px",
        transition: "all 0.3s cubic-bezier(.81,.04,.41,1.27)",
      },
      "& .MuiSlider-thumb": {
        height: isSmallScreen ? "22px" : "25px",
        width: isSmallScreen ? "22px" : "25px",
        backgroundColor: "#e2e8f0",
        border: isSmallScreen
          ? "4px solid currentColor"
          : isMidScreen
            ? "4.5px solid currentColor"
            : "5px solid currentColor",
        transition: "all 0.3s cubic-bezier(.81,.04,.41,1.27)",
        "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
          boxShadow: "inherit",
        },
        "&:before": {
          display: "none",
        },
      },
    };

    const handleChange = (event, newValue) => {
      if (Array.isArray(newValue) && newValue.length === 2) {
        // Ensure there's at least 1 unit gap between the slider values
        const gap = gaps; // Minimum gap
        const [newLower, newUpper] = newValue;

        if (newUpper - newLower < gap) {
          if (newLower !== value[0]) {
            // Lower slider moved, adjust upper slider
            setValue([newLower, newLower + gap]);
          } else {
            // Upper slider moved, adjust lower slider
            setValue([newUpper - gap, newUpper]);
          }
        } else {
          // If the gap is maintained, update the state as usual
          setValue(newValue);
        }
      } else if (typeof value === "object") {
        // If value is an object with two properties
        setValue({ ...value, val: newValue });
      } else {
        // If newValue is a single value
        setValue(newValue);
      }
    };

    const sliderValue =
      typeof value === "object" && value !== null && "val" in value
        ? value.val
        : value;
    return (
      <Slider
        defaultValue={defaultValue}
        onChange={handleChange}
        marks={midpointMark}
        // valueLabelFormat={formatLabel}
        value={sliderValue}
        min={min} // Set the minimum value in cm
        max={max} // Set the maximum value in cm
        step={step} // One inch increment in centimeters
        orientation={
          (orientation === "vertical") & !isSmallScreen
            ? "vertical"
            : "horizontal"
        }
        disableSwap
        style={style}
        sx={sliderStyleHorizontal}
      />
    );
  },
);
