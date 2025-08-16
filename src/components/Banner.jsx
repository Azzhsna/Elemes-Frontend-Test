import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "./Banner.css";

export default function Banner({ item, fade = false, onAddWatchlist }) {
  if (!item) return null;

  return (
    <Box
      role="region"
      aria-label={`Banner for ${item.title || item.name}`}
      className={`banner ${fade ? "fade-out" : "fade-in"}`}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${
          item.backdrop_path || item.poster_path
        })`,
      }}
    >
      <Box className="banner-overlay" />

      <Box className="banner-content">
        <Typography variant="h3" component="h1" className="banner-title">
          {item.title || item.name}
        </Typography>

        {item.vote_average !== undefined && (
          <Typography
            variant="h6"
            aria-label={`Rating ${item.vote_average.toFixed(1)} stars`}
            className="banner-rating"
          >
            ⭐ {item.vote_average.toFixed(1)}
          </Typography>
        )}

        {item.overview && (
          <Typography
            variant="body1"
            aria-label={`Description: ${item.overview}`}
            className="banner-description"
          >
            {item.overview}
          </Typography>
        )}

        <Box className="banner-buttons">
          <Button
            variant="contained"
            className="bannerplay-btn"
            aria-label={`Play ${item.title || item.name}`}
          >
            ▶ Play
          </Button>
          <Button
            variant="contained"
            className="bannerwatchlist-btn"
            aria-label={`Add ${item.title || item.name} to Watchlist`}
            onClick={() => onAddWatchlist && onAddWatchlist(item)}
          >
            + Watchlist
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
