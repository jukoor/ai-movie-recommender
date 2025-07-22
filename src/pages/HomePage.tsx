import React from "react";
import { TopRatedMoviesSection } from "../components/movie/TopRatedMoviesSection";

export const HomePage: React.FC = () => {
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
