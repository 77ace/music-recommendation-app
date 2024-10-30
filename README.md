# GrooveMatch - React Music Recommendation Web App

# Project Structure Overview

This project organizes components into various directories to streamline functionality, styling, and data handling:

- **UI**: Contains the lowest-level components used across the app (e.g., dropdowns, sliders, buttons).
- **layouts**: Houses layout components that organize and structure UI components within sections.
- **API_config**: Manages the API logic for interacting with external services.
- **Utils**: Contains custom hooks, such as `useFetchRecommendation`, `useFetchGenres`, and `useSessionStorageState`, as well as a file exporting predefined genres.

---

## Main Structure

- **AppRouter.jsx**: The main router file, managing navigation between `HomeSection` and `ResultsSection`.

### HomeSection (sections)
- **HeaderLayout**: Contains header elements for the Home section.
- **AllControlsLayout**: Aggregates all control layouts for user interaction.

    - **GenreControlLayout**: Manages genre selection.
        - Uses `GenreDropdown` (UI).

    - **MoodControlsLayout**: Controls mood-based filters.
        - Includes `SliderWithLabels` (layouts), containing `CustomSlider` (UI).
        - Uses `CustomCheckbox` (UI) and `CustomTooltip` (UI) for mood options.

    - **OptionControlsLayout**: Provides additional filtering options.
        - Uses `SliderWithLabels` (layouts) and `CustomTooltip` (UI).

    - **PopularityControlLayout**: Manages popularity-based filtering.
        - Uses `Tabs` (UI) for popularity selection.

### ResultsSection (sections)
- Displays the search results based on selected filters.

---



## Components Structure Summary
```plaintext
AppRouter.jsx
│
├── HomeSection (sections)
│   ├── HeaderLayout (layouts/main)
│   └── AllControlsLayout (layouts/main)
│       ├── GenreControlLayout (layouts/main)
│       │   └── GenreDropdown (UI)
│       │
│       ├── MoodControlsLayout (layouts/main)
│       │   ├── SliderWithLabels (layouts)
│       │   │   └── CustomSlider (UI)
│       │   ├── CustomCheckbox (UI)
│       │   └── CustomTooltip (UI)
│       │
│       ├── OptionControlsLayout (layouts/main)
│       │   ├── SliderWithLabels (layouts)
│       │   └── CustomTooltip (UI)
│       │
│       └── PopularityControlLayout (layouts/main)
│           └── Tabs (UI)
│
└── ResultsSection (sections)