import React, { useState } from "react";

export default function SearchBar({ onSearch, onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search Pokémon"
        className="input input-bordered w-full max-w-xs"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />
      <button className="btn btn-primary" onClick={handleSearchClick}>
        Search
      </button>
      <select className="select select-bordered max-w-xs" onChange={handleFilterChange}>
        <option value="">All Generations</option>
        <option value="1">Generation 1</option>
        <option value="2">Generation 2</option>
        <option value="3">Generation 3</option>
        <option value="4">Generation 4</option>
        <option value="5">Generation 5</option>
        <option value="6">Generation 6</option>
        <option value="7">Generation 7</option>
        <option value="8">Generation 8</option>
        <option value="9">Generation 9</option>
      </select>
    </div>
  );
}
