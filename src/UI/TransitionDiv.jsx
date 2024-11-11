import { motion, useIsPresent } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Div that transitions/swoops when navigating from/to results
export const TransitionDiv = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isPresent = useIsPresent();
  return (
    <motion.div
      initial={isSmallScreen ? { scaleY: 1 } : { scaleX: 1 }}
      animate={
        isSmallScreen
          ? { scaleY: 0, transition: { duration: 0.4, ease: "circOut" } }
          : { scaleX: 0, transition: { duration: 0.4, ease: "circOut" } }
      }
      exit={
        isSmallScreen
          ? { scaleY: 1, transition: { duration: 0.4, ease: "circIn" } }
          : { scaleX: 1, transition: { duration: 0.4, ease: "circIn" } }
      }
      style={
        isSmallScreen
          ? { originY: isPresent ? 0 : 1 }
          : { originX: isPresent ? 1 : 0 }
      }
      className={`fixed bottom-0 left-0 right-0 top-0 z-40 bg-green-900`}
    />
  );
};
