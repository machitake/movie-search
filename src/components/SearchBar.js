import React from 'react';

const SearchBar = ({ query, onInputChange }) => {
  return (
    <>
      <div className="search-bar">
        <input 
          type="text" 
          value={query} 
          onChange={onInputChange} 
          placeholder="映画を検索"
        />
      </div>
    </>
  );
};

export default SearchBar;