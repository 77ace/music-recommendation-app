import React, { useEffect, useRef, memo } from "react";
import "../index.css"; // Import CSS for animation

const BackgroundGrid = memo(
  ({
    dotColor = "rgba(255,255,255,0.1)", // Color of the grid dots
    dotRadius = 1, // Radius of each dot
    gridSize = 20, // Distance between dots
    vignetteOpacity = 0.8, // Opacity of the vignette effect
    vignetteIntensity = 0.5, // Intensity of the vignette effect
  }) => {
    const svgRef = useRef(null);

    // Effect to update the grid dynamically when the window is resized
    useEffect(() => {
      const resizeGrid = () => {
        const svgElement = svgRef.current;
        if (svgElement) {
          const { clientWidth, clientHeight } = document.body;
          svgElement.setAttribute("width", clientWidth);
          svgElement.setAttribute("height", clientHeight);
        }
      };

      resizeGrid(); // Call once on mount
      window.addEventListener("resize", resizeGrid);

      return () => {
        window.removeEventListener("resize", resizeGrid);
      };
    }, []);

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Dot Grid */}
        <svg
          ref={svgRef}
          className="background-animation"
          style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
        >
          {/* Create the grid of dots */}
          <defs>
            <pattern
              id="dotGrid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={gridSize / 2}
                cy={gridSize / 2}
                r={dotRadius}
                fill={dotColor}
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#dotGrid)"
            className="pulsating-grid"
          />
        </svg>

        {/* Smoother Vignette Effect */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `radial-gradient(circle at center, rgba(0, 0, 0, 0) ${vignetteIntensity * 100}%, rgba(0, 0, 0, ${vignetteOpacity}) 100%)`,
            pointerEvents: "none", // Ensure it does not block interaction with other elements
          }}
        ></div>
      </div>
    );
  },
);

export default BackgroundGrid;
