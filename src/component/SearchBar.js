import React from "react";

function SearchBar({ searchQuery, setSearchQuery, onSearch }) {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={onSearch}>
      <div>
        <input
          type="text"
          placeholder="Search tasks"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div>
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export default SearchBar;

