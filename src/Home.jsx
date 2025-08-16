import NowPlayingMovies from "./components/NowPlayingMovies";
import UpcomingMovies from "./components/UpcomingMovies";
import TopRatedMovies from "./components/TopRatedMovies";
import PopularTVShows from "./components/PopularTVShows";
import PopularPeople from "./components/PopularPeople";
import "./Home.css";

export default function Home({ onAddWatchlist }) {
  return (
    <main className="home">
      <NowPlayingMovies listOnly onAddWatchlist={onAddWatchlist} />

      <section className="home-section" aria-label="Upcoming Movies">
        <div className="category-label">Movie</div>
        <h2>Upcoming</h2>
        <UpcomingMovies />
      </section>

      <section className="home-section" aria-label="Top Rated Movies">
        <div className="category-label">Movie</div>
        <h2>Top Rated</h2>
        <TopRatedMovies listOnly onAddWatchlist={onAddWatchlist} />
      </section>

      <section className="home-section" aria-label="Popular TV Shows">
        <div className="category-label">TV Shows</div>
        <h2>Popular TV Shows</h2>
        <PopularTVShows listOnly onAddWatchlist={onAddWatchlist} />
      </section>

      <section className="home-section-people" aria-label="Popular People">
        <div className="category-label">People</div>
        <h2>Popular People</h2>
        <PopularPeople />
      </section>
    </main>
  );
}
