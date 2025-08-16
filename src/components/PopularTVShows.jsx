import { useEffect, useState } from "react";
import Banner from "./Banner";
import "./Banner.css";

export default function PopularTVShows({ onAddWatchlist, listOnly }) {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [fade, setFade] = useState(false);

  const API_URL =
    "https://api.themoviedb.org/3/tv/popular?api_key=7d9969ab4156d9f0eb56a1e38298be66";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setShows(data.results);
          setSelectedShow(data.results[0]);
        }
      });
  }, []);

  const handleSelectShow = (show) => {
    if (listOnly) return;
    setFade(true);
    setTimeout(() => {
      setSelectedShow(show);
      setFade(false);
    }, 300);
  };

  if (!shows.length)
    return <div className="loading">Loading Popular TV Shows...</div>;

  return (
    <div>
      {/* Banner hanya di section PopularTVShows  */}
      {!listOnly && selectedShow && (
        <Banner
          item={selectedShow}
          fade={fade}
          onAddWatchlist={onAddWatchlist}
        />
      )}

      <div
        className={listOnly ? "tv-list horizontal" : "tv-list vertical"}
        role="list"
        aria-label="Popular TV Shows List"
      >
        {shows.map((show) => (
          <div
            key={show.id}
            className="tv-card"
            role="button"
            tabIndex={0}
            aria-label={`TV Show: ${show.name}`}
            onClick={() => handleSelectShow(show)}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelectShow(show);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
            />
            <div className="tv-overlay" aria-hidden="true">
              <h3>{show.name}</h3>
              <p>
                {show.overview.length > 100
                  ? show.overview.slice(0, 100) + "..."
                  : show.overview}
              </p>
              <div className="overlay-buttons">
                <button className="play-btn">Play</button>
                <button
                  className="watchlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddWatchlist && onAddWatchlist(show);
                  }}
                >
                  Watchlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
