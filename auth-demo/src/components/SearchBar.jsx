import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const PAGES = [
  { path: "/", name: "Home", keywords: ["home", "dashboard", "main"] },
  {
    path: "/wargames",
    name: "Wargames",
    keywords: ["war games", "wargame", "simulation", "security testing"],
  },
  {
    path: "/models",
    name: "Models",
    keywords: ["ai models", "machine learning", "ml", "neural networks"],
  },
  {
    path: "/redteaming",
    name: "RedTeaming",
    keywords: ["red team", "red teaming", "security", "penetration testing"],
  },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const searchQuery = query.toLowerCase();
      const filtered = PAGES.filter(
        (page) =>
          page.name.toLowerCase().includes(searchQuery) ||
          page.keywords.some((keyword) =>
            keyword.toLowerCase().includes(searchQuery),
          ),
      );
      setResults(filtered);
      setShowDropdown(true);
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  }, [query]);

  const handleSelect = (path) => {
    navigate(path);
    setQuery("");
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setQuery("");
      setShowDropdown(false);
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      <div className="search-wrapper">
        <svg
          className="search-icon"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM15 15l4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {showDropdown && (
        <div className="search-dropdown">
          {results.length > 0 ? (
            results.map((result) => (
              <button
                key={result.path}
                className="search-result"
                onClick={() => handleSelect(result.path)}
              >
                {result.name}
              </button>
            ))
          ) : (
            <div className="no-results">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
