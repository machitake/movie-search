import React, { useState } from 'react';
import './SearchBar.css';
const SearchBar = ({ query, onInputChange, onLanguageChange }) => {
  const [language, setLanguage] = useState('ja-JP');

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(event) => onInputChange(event.target.value)}
        placeholder="映画を検索"
      />
      <select
        value={language}
        onChange={handleLanguageChange}
        className="language-select"
      >
        <option value="ja-JP">日本語</option>
        <option value="en-US">英語</option>
      </select>
    </div>
  );
};

export default SearchBar;