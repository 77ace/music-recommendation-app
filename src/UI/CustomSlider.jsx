import useMediaQuery from "@mui/material/useMediaQuery";
import Slider from "@mui/material/Slider";
import { createTheme } from "@mui/material/styles";
import { memo } from "react";

export const CustomSlider = memo(
  ({
    value,
    setValue,
    min,
    max,
    step,
    defaultValue,
    style,
    orientation,
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

    const sliderStyle = {
      color: "#37733a",

      "& .MuiSlider-track": {
        border: "none",
        width: isSmallScreen ? "9.5px" : isMidScreen ? "11px" : "11.5px",
        height: isSmallScreen ? "9.5px" : isMidScreen ? "11px" : "11.5px",
        transition: "all 0.3s cubic-bezier(.81,.04,.41,1.27)",
      },
      "& .MuiSlider-thumb": {
        height: isSmallScreen ? "19px" : "25px",
        width: isSmallScreen ? "19px" : "25px",
        backgroundColor: "#e2e8f0",
        border: isSmallScreen
          ? "3.2px solid currentColor"
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
      "& .MuiSlider-valueLabel": {
        lineHeight: 1.2,
        fontSize: isSmallScreen ? "15px" : "16px",
        background: "unset",
        padding: "0",
        width: isSmallScreen ? 42 : 45,
        height: isSmallScreen ? 42 : 45,
        borderRadius: "50% 50% 50% 0",
        backgroundColor: "#37733a",
        transformOrigin: "bottom left",
        transform:
          orientation === "vertical"
            ? "translate(150%, -100%) rotate(45deg) scale(0)"
            : "translate(50%, -20%) rotate(45deg) scale(0)",
        transition: "all 0.3s cubic-bezier(.81,.04,.41,1.27)",
        "&:before": {
          display: "none",
        },
        "&.MuiSlider-valueLabelOpen": {
          transform:
            (orientation === "vertical") & !isSmallScreen
              ? "translate(148%, -120%) rotate(-45deg) scale(1)"
              : "translate(51%, -58%) rotate(-20deg) scale(1)",
        },
        "& > *": {
          transform:
            (orientation === "vertical") & !isSmallScreen
              ? "rotate(45deg)"
              : "rotate(20deg)",
        },
      },
    };

    const handleChange = (event, newValue) => {
      // If newValue is a single value
      setValue(newValue);
    };

    return (
      <Slider
        defaultValue={defaultValue}
        onChange={handleChange}
        marks={midpointMark}
        // valueLabelFormat={formatLabel}
        value={value}
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
        sx={sliderStyle}
      />
    );
  },
);
