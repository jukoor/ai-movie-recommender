import React from "react";
import { TopRatedMoviesSection } from "../components/movie/TopRatedMoviesSection";
// import { movies } from "../data/movies";

export const HomePage: React.FC = () => {
  // const featuredMovies = movies.slice(0, 3);

  return (
    <div className="page page-home">
      <title>AI Movie Recommender</title>
      <div className="space-y-16">
        {/* Top Rated Movies */}
        <TopRatedMoviesSection />
      </div>
    </div>
  );
};
