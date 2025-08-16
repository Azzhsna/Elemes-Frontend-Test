import { useEffect, useState } from "react";
import Banner from "./Banner";

export default function TopRatedMovies({ onAddWatchlist, listOnly }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [fade, setFade] = useState(false);

  const API_URL =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=7d9969ab4156d9f0eb56a1e38298be66";

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
    if (listOnly) return;
    setFade(true);
    setTimeout(() => {
      setSelectedMovie(movie);
      setFade(false);
    }, 300);
  };

  if (!movies.length)
    return (
      <div className="loading" role="status">
        Loading Top Rated Movies...
      </div>
    );

  return (
    <main>
      {!listOnly && selectedMovie && (
        <Banner
          item={selectedMovie}
          fade={fade}
          onAddWatchlist={onAddWatchlist}
        />
      )}

      <section
        className={`movie-list ${listOnly ? "horizontal" : "vertical"}`}
        aria-label={
          listOnly
            ? "Top Rated Movies Horizontal List"
            : "Top Rated Movies Grid"
        }
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`movie-card ${
              selectedMovie?.id === movie.id ? "active" : ""
            }`}
            onClick={() => handleSelectMovie(movie)}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleSelectMovie(movie)}
            role="button"
            aria-pressed={selectedMovie?.id === movie.id}
            aria-label={`Select movie ${movie.title}`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-overlay">
              <h3>{movie.title}</h3>
              <p>
                {movie.overview.length > 120
                  ? movie.overview.slice(0, 120) + "..."
                  : movie.overview}
              </p>
              <div className="overlay-buttons">
                <button className="play-btn" aria-label={`Play ${movie.title}`}>
                  Play
                </button>
                <button
                  className="watchlist-btn"
                  onClick={() => onAddWatchlist && onAddWatchlist(movie)}
                  aria-label={`Add ${movie.title} to Watchlist`}
                >
                  Watchlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
