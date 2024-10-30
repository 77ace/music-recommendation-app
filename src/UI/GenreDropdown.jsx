import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useState } from "react";
import { useFetchSpotifyGenres } from "../Utils/useFetchSpotifyGenres.js";
import {
  commonGenres,
  electronicGenres,
  rockGenres,
  worldGenres,
  moodGenres,
  acousticGenres,
  filmAndShowGenres,
} from "../Utils/genreCategories.js";

export const GenreDropdown = ({ value, setValue, isGenreEmptyOnSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { genres, loading2, error2 } = useFetchSpotifyGenres();

  // Adjusted filter to capture all remaining genres not yet categorized
  const otherGenres = genres.filter(
    (genre) =>
      ![
        ...commonGenres,
        ...electronicGenres,
        ...rockGenres,
        ...worldGenres,
        ...moodGenres,
        ...acousticGenres,
        ...filmAndShowGenres,
      ].includes(genre),
  );

  // Map genres to options format (react-select dropdown format)
  const formatOptions = (genreList) =>
    genreList.map((genre) => ({
      value: genre,
      label: genre
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }));

  // Grouped options for react-select
  const groupedOptions = [
    {
      label: "Common Genres",
      options: formatOptions(
        commonGenres.filter((genre) => genres.includes(genre)),
      ),
    },
    {
      label: "Electronic & Dance",
      options: formatOptions(
        electronicGenres.filter((genre) => genres.includes(genre)),
      ),
    },
    {
      label: "Rock & Alternative",
      options: formatOptions(
        rockGenres.filter((genre) => genres.includes(genre)),
      ),
    },
    {
      label: "World & Cultural",
      options: formatOptions(
        worldGenres.filter((genre) => genres.includes(genre)),
      ),
    },
    {
      label: "Relaxation & Mood",
      options: formatOptions(
        moodGenres.filter((genre) => genres.includes(genre)),
      ),
    },
    {
      label: "Acoustic & Singer/Songwriter",
      options: formatOptions(
        acousticGenres.filter((genre) => genres.includes(genre)),
      ),
    },
    {
      label: "Film & Shows",
      options: formatOptions(
        filmAndShowGenres.filter((genre) => genres.includes(genre)),
      ),
    },
    { label: "Other Genres", options: formatOptions(otherGenres) },
  ];

  // Format the group labels and add a counter for number of options in each group
  const formatGroupLabel = (data) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        gap: 12,
      }}
    >
      <span>{data.label}</span>
      <span
        style={{
          backgroundColor: "rgba(29,185,84,0.5)",
          borderRadius: "2em",
          color: "#ffffff",
          display: "inline-block",
          fontSize: 12,
          fontWeight: "normal",
          lineHeight: "1",
          minWidth: 1,
          padding: "0.16666666666667em 0.5em",
          textAlign: "center",
        }}
      >
        {data.options.length}
      </span>
    </div>
  );

  // API allow 5 genres only, so close menu when more
  const handleMenuOpen = () => {
    if (value.length < 5) {
      setIsMenuOpen(true);
    }
  };

  // Save the values in the state
  const handleChange = (options) => {
    if (options.length <= 5) {
      setValue(options);
    }
  };

  const animatedComponents = makeAnimated();

  // Styling for the drop down component
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "rgba(66,66,66,0)",
      boxShadow: "none",
      "&:hover": {
        borderColor: "rgba(87,87,87,0.1)",
        backgroundColor: "rgba(213,213,213,0.04)",
      },
      borderRadius: "8px",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
      fontWeight: 500,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#161616",
      opacity: isMenuOpen ? 1 : 0,
      animation: isMenuOpen ? "fadeIn 0.2s ease-in" : "fadeOut 0.2s ease-out",
      borderRadius: "8px",
      zIndex: 80,
    }),
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": { width: "4px" },
      "::-webkit-scrollbar-track": { background: "transparent" },
      "::-webkit-scrollbar-thumb": {
        background: "rgba(156,156,156,0.49)",
        borderRadius: "2px",
      },
      "::-webkit-scrollbar-thumb:hover": { background: "#979797" },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      backgroundColor: state.isFocused
        ? "rgba(29,185,84,0.34)"
        : "rgba(255,255,255,0)",
      color: state.isFocused ? "#fff" : "#dadada",
      borderRadius: "8px",
      ":active": { backgroundColor: "rgba(29,185,84,0.73)", color: "#fff" },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "rgba(30,172,80,0.18)",
      borderRadius: "6px",
    }),
    multiValueLabel: (provided) => ({ ...provided, color: "#fff" }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#fff",
      ":hover": { backgroundColor: "#1eac50", color: "white" },
    }),
  };

  return (
    <Select
      placeholder={
        isGenreEmptyOnSearch ? "Select at Least One" : "Max 5 Options"
      }
      closeMenuOnSelect={value.length >= 4}
      components={animatedComponents}
      isMulti
      defaultValue={value}
      options={groupedOptions}
      value={value}
      styles={customStyles}
      onChange={handleChange}
      onMenuOpen={handleMenuOpen}
      onMenuClose={() => setIsMenuOpen(false)}
      formatGroupLabel={formatGroupLabel}
      blurInputOnSelect={false} // to not close on phone after every select
    />
  );
};
