import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useState } from "react";

export const GenreDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (options) => {
    // Limit selection to a maximum of 3
    if (options.length <= 5) {
      setSelectedOptions(options);
    }
  };

  const colourOptions = [
    { value: "pop", label: "Placeholders", color: "#FF8B00" },
    { value: "rock", label: "Rock", color: "#FF5630" },
    { value: "jazz", label: "Jazz", color: "#FFC400" },
    { value: "hiphop", label: "Hip Hop", color: "#36B37E" },
    { value: "classical", label: "Classical", color: "#253858" },
    { value: "electronic", label: "Electronic", color: "#00B8D9" },
    { value: "country", label: "Country", color: "#5243AA" },
    { value: "blues", label: "Blues", color: "#00875A" },
    { value: "reggae", label: "Reggae", color: "#0052CC" },
    { value: "metal", label: "Metal", color: "#666666" },
  ];
  const animatedComponents = makeAnimated();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "rgba(0,0,0,0)", // Transparent background
      borderColor: "#424242", // Green border
      boxShadow: "none", // Remove default shadow
      "&:hover": {
        borderColor: "#575757",
        backgroundColor: "rgba(213,213,213,0.04)",
      }, // Green on hover
      borderRadius: "8px",
      borderTop: "none", // Remove top border
      borderLeft: "none", // Remove left border
      borderRight: "none", // Remove right border
      borderBottom: "none", // Visible bottom border
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px", // Adjust the font size here
      fontWeight: 500,
      // color: '#dadada', // Customize placeholder color
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#161616", // Dark (with transparency) background for dropdown item
      opacity: isMenuOpen ? 1 : 0,
      animation: isMenuOpen ? "fadeIn 0.2s ease-in" : "fadeOut 0.2s ease-out",
      borderRadius: "8px",
      zIndex: 30,
    }),
    menuList: (base) => ({
      ...base,

      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "::-webkit-scrollbar-thumb": {
        background: "rgba(156,156,156,0.49)",
        borderRadius: "2px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#979797",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      backgroundColor: state.isFocused
        ? "rgba(29,185,84,0.34)"
        : "rgba(255,255,255,0)", // Green on hover, tranparent otherwise
      color: state.isFocused ? "#fff" : "#dadada", // White text on hover, offwhite otherwise
      borderRadius: "8px",
      ":active": {
        backgroundColor: "rgba(29,185,84,0.73)", // Green when option is clicked
        color: "#fff",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "rgba(30,172,80,0.18)", // Green background for selected items

      paddingTop: "2px",
      paddingBottom: "2px",
      fontWeight: 400,

      borderRadius: "6px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff", // White text color for labels
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#fff",
      ":hover": {
        backgroundColor: "#1eac50", // Hover color for remove icon
        color: "white",
      },
    }),
  };

  return (
    <Select
      placeholder={"Select at most 5 options"}
      closeMenuOnSelect={selectedOptions.length >= 4}
      components={animatedComponents}
      // defaultValue={[colourOptions[4], colourOptionds[5]]}
      isMulti
      options={colourOptions.map((option) => ({
        ...option,
        isDisabled: selectedOptions.length >= 5, // Disable options when limit is reached
      }))}
      styles={customStyles} // Apply custom styles
      onChange={handleChange}
      onMenuOpen={() => setIsMenuOpen(true)}
      onMenuClose={() => setIsMenuOpen(false)}
      // blurInputOnSelect={false} // to not close on phone after every select
    />
  );
};
