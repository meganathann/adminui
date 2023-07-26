import React from "react";
import debounce from "lodash.debounce";
import "./styles.css";

const SearchBox = ({ searchQuery, onSearchChange }) => {
  const handleDebouncedSearch = debounce(onSearchChange, 500);

  const handleInputChange = (event) => {
    const query = event.target.value;
    handleDebouncedSearch(query);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;
