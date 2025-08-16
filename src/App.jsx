import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import TopRatedMovies from "./components/TopRatedMovies";
import UpcomingMovies from "./components/UpcomingMovies";
import PopularTVShows from "./components/PopularTVShows";
import Home from "./Home";

function App() {
  const [watchlist, setWatchlist] = useState([]);

  const handleAddWatchlist = (item) => {
    if (!watchlist.find((w) => w.id === item.id)) {
      setWatchlist([...watchlist, item]);
    }
  };

  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <Header watchlist={watchlist} />
        <Routes>
          <Route
            path="/"
            element={<Home onAddWatchlist={handleAddWatchlist} />}
          />
          <Route
            path="/top-rated"
            element={<TopRatedMovies onAddWatchlist={handleAddWatchlist} />}
          />
          <Route
            path="/upcoming"
            element={<UpcomingMovies onAddWatchlist={handleAddWatchlist} />}
          />
          <Route
            path="/tv-shows"
            element={<PopularTVShows onAddWatchlist={handleAddWatchlist} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
