# GrooveMatch - React Music Recommendation Web App
👉 **[Live Website](https://groovematch.netlify.app)** 👈
## Project Structure Overview

This project organizes components into various directories to streamline functionality, styling, and data handling:

- **src/UI**: Contains the lowest-level components used across the app (e.g., dropdowns, sliders, buttons).
- **src/layouts**: Houses layout components that organize and structure UI components within sections.
- **src/API_config**: Manages the API logic for interacting with external services.
- **src/Utils**: Contains custom hooks, such as `useFetchSpotifyRecommendation`, `useFetchSpotifyGenres`, and `useSessionStorageState`, as well as a file exporting predefined genres.
- **src/sections**: Stores the main sections of the app, such as `HomeSection` and `ResultsSection`.

---

## Main Structure

- **AppRouter.jsx (src/)**: The main router file, managing navigation between `HomeSection` and `ResultsSection`.

### HomeSection.jsx (src/sections)
- **TransitionDiv.jsx (src/UI)**: Used for animated transitions from/to HomeSection.
- **BackgroundGrid.jsx (src/UI)**: Provides a background grid effect within the Home section.
- **HeaderLayout.jsx (src/Layouts/Main)**: Contains header elements for the Home section.
- **AllControlsLayout.jsx (src/Layouts/Main)**: Aggregates all control layouts for user interaction.

    - **GenreControlLayout.jsx (src/Layouts)**: Manages genre selection.
        - Uses `GenreDropdown.jsx` (src/UI).

    - **MoodControlsLayout.jsx (src/Layouts)**: Controls mood-based filters.
        - Includes `SliderWithLabels.jsx` (src/layouts), containing `CustomSlider.jsx` (src/UI).
        - Uses `CustomCheckbox.jsx` (src/UI) and `CustomTooltip.jsx` (src/UI) for mood options.

    - **OptionControlsLayout.jsx (src/Layouts)**: Provides additional filtering options.
        - Uses `SliderWithLabels.jsx` (src/layouts) and `CustomTooltip.jsx` (src/UI).

    - **PopularityControlLayout.jsx (src/Layouts)**: Manages popularity-based filtering.
        - Uses `Tabs.jsx` (src/UI) for popularity selection.

### ResultsSection.jsx (src/sections)
- Displays the search results based on selected filters.
- **TransitionDiv.jsx (src/UI)**: Used for animated transitions from/to ResultsSection.
- **BackgroundGrid.jsx (src/UI)**: Provides a background grid effect within the Results section.

---

## Components Structure Summary
```plaintext
AppRouter.jsx                            (src/)
│
├── HomeSection.jsx                      (src/sections)
│   ├── TransitionDiv.jsx                (src/UI)
│   ├── BackgroundGrid.jsx               (src/UI)
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
    ├── TransitionDiv.jsx                (src/UI)
    └── BackgroundGrid.jsx               (src/UI)
