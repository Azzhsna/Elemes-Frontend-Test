// NowPlayingMovies.jsx
import { useEffect, useState } from "react";
import Banner from "./Banner";

export default function NowPlayingMovies({ listOnly, onAddWatchlist }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [fade, setFade] = useState(false);

  const API_URL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=7d9969ab4156d9f0eb56a1e38298be66&language=en-US&page=1";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setMovies(data.results);
          setSelectedMovie(data.results[0]);
        }
      });
  }, []);

  const handleSelectMovie = (movie) => {
    setFade(true);
    setTimeout(() => {
      setSelectedMovie(movie);
      setFade(false);
    }, 300);
  };

  if (!movies.length || !selectedMovie)
    return <div className="loading">Loading Now Playing Movies...</div>;

  return (
    <div className="movie-page">
      {/* Banner tetap di atas */}
      <Banner
        item={selectedMovie}
        fade={fade}
        onAddWatchlist={onAddWatchlist}
      />
      <h1 className="section-title">Now Playing Movies</h1>

      {/* List poster */}
      <div className="nowplaying-movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`nowplaying-movie-card ${
              selectedMovie?.id === movie.id ? "active" : ""
            }`}
            onClick={() => handleSelectMovie(movie)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedMovie?.id === movie.id}
            aria-label={`Select now playing movie: ${movie.title}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleSelectMovie(movie);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            {/* Overlay muncul saat hover */}
            <div className="movie-overlay">
              <h3>{movie.title}</h3>
              <p aria-label={`Description: ${movie.overview}`}>
                {movie.overview?.substring(0, 80)}...
              </p>
              <div className="overlay-buttons">
                <button className="play-btn" aria-label={`Play ${movie.title}`}>
                  Play
                </button>
                <button
                  className="watchlist-btn"
                  onClick={() => onAddWatchlist(movie)}
                  aria-label={`Add ${movie.title} to watchlist`}
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
