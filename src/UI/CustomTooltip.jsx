import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { styled } from "@mui/material/styles";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  "& .MuiTooltip-tooltip": {
    backgroundColor: "#323232", //  background color
    color: "#fff", //  text color

    paddingTop: "8px",

    borderRadius: "8px", // Rounded corners
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
  },
  "& .MuiTooltip-arrow": {
    color: "#323232", // Arrow color to match tooltip background
  },
});

export const CustomTooltip = ({
  title,
  children,
  textColor = "#fff",
  fontSize = "0.8rem",
}) => (
  <StyledTooltip
    arrow
    followCursor
    title={
      <span style={{ color: textColor, fontSize, userSelect: "none" }}>
        {title}
      </span>
    }
    leaveTouchDelay={3000}
    enterTouchDelay={0}
  >
    <span className="select-none">{children}</span>
  </StyledTooltip>
);
