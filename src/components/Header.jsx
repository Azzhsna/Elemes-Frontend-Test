import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";

export default function Header({ watchlist = [] }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (!query) {
      setSearchResults([]);
      return;
    }
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=7d9969ab4156d9f0eb56a1e38298be66&query=${query}`
    );
    const data = await res.json();
    setSearchResults(data.results || []);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">🎬 MyMovies</div>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          tabIndex={0}
        >
          Home
        </NavLink>

        <NavLink
          to="/top-rated"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          tabIndex={0}
        >
          Top Rated Movies
        </NavLink>

        <NavLink
          to="/tv-shows"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          tabIndex={0}
        >
          Popular TV Shows
        </NavLink>

        <div
          className="watchlist-wrapper"
          onClick={() => setShowDropdown(!showDropdown)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setShowDropdown(!showDropdown);
            }
          }}
          tabIndex={0}
          aria-haspopup="true"
          aria-expanded={showDropdown}
          aria-label="Watchlist dropdown"
        >
          Watchlist
          {watchlist.length > 0 && (
            <span
              className="watchlist-count"
              aria-label={`${watchlist.length} items in watchlist`}
            >
              {watchlist.length}
            </span>
          )}
          {showDropdown && (
            <div className="watchlist-dropdown">
              {watchlist.length === 0 && <p>Watchlist kosong</p>}
              {watchlist.map((item) => (
                <div key={item.id} className="watchlist-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                  <span>{item.title || item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="header-icons">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search movies or TV shows"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            aria-label="Search movies or TV shows"
          />
          {showSearch && searchResults.length > 0 && (
            <div className="search-results" role="listbox">
              {searchResults.map((item) => (
                <NavLink
                  to={
                    item.media_type === "movie"
                      ? `/movie/${item.id}`
                      : `/tv/${item.id}`
                  }
                  key={item.id}
                  className="search-result-item"
                  role="option"
                  tabIndex={0}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                  <span>{item.title || item.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <FaUserCircle className="icon" tabIndex={0} aria-label="User profile" />
      </div>
    </header>
  );
}
