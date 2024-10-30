# GrooveMatch - React Music Recommendation Web App

## Project Structure Overview

This project organizes components into various directories to streamline functionality, styling, and data handling:

- **src/UI**: Contains the lowest-level components used across the app (e.g., dropdowns, sliders, buttons).
- **src/layouts**: Houses layout components that organize and structure UI components within sections.
- **src/API_config**: Manages the API logic for interacting with external services.
- **src/Utils**: Contains custom hooks, such as `useFetchSpotifyRecommendation`, `useFetchSpotifyGenres`, and `useSessionStorageState`, as well as a file exporting predefined genres.
- **src/sections**: Stores the main sections of the app, such as `HomeSection` and `ResultsSection`.

---

## Main Structure

- **AppRouter.jsx (src/ )**: The main router file, managing navigation between `HomeSection` and `ResultsSection`.

### HomeSection (src/sections)
- **HeaderLayout (src/Layouts/Main)**: Contains header elements for the Home section.
- **AllControlsLayout (src/Layouts/Main)**: Aggregates all control layouts for user interaction.

    - **GenreControlLayout (src/Layouts)**: Manages genre selection.
        - Uses `GenreDropdown` (src/UI).

    - **MoodControlsLayout (src/Layouts)**: Controls mood-based filters.
        - Includes `SliderWithLabels` (src/layouts), containing `CustomSlider` (src/UI).
        - Uses `CustomCheckbox` (src/UI) and `CustomTooltip` (src/UI) for mood options.

    - **OptionControlsLayout (src/Layouts)**: Provides additional filtering options.
        - Uses `SliderWithLabels` (src/layouts) and `CustomTooltip` (src/UI).

    - **PopularityControlLayout (src/Layouts)**: Manages popularity-based filtering.
        - Uses `Tabs` (src/UI) for popularity selection.

### ResultsSection (src/sections)
- Displays the search results based on selected filters.

---

## Components Structure Summary
```plaintext
AppRouter.jsx
│
├── HomeSection.jsx                      (src/sections)
│   ├── HeaderLayout.jsx                 (src/layouts/main)
│   └── AllControlsLayout.jsx            (src/layouts/main)
│       │
│       ├── GenreControlLayout.jsx       (src/layouts)
│       │   └── GenreDropdown.jsx        (src/UI)
│       │
│       ├── MoodControlsLayout.jsx       (src/layouts)
│       │   ├── SliderWithLabels.jsx     (src/layouts)
│       │   │   └── CustomSlider.jsx     (src/UI)
│       │   ├── CustomCheckbox.jsx       (src/UI)
│       │   └── CustomTooltip.jsx        (src/UI)
│       │
│       ├── OptionControlsLayout.jsx     (src/layouts)
│       │   ├── SliderWithLabels.jsx     (src/layouts)
│       │   └── CustomTooltip.jsx        (src/UI)
│       │
│       └── PopularityControlLayout.jsx  (src/layouts)
│           └── Tabs.jsx                 (src/UI)
│
└── ResultsSection.jsx                   (src/sections)
