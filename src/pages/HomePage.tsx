import React from "react";
import { AiRecommender } from "../components/recommender/AiRecommender";

export const HomePage: React.FC = () => {
  return (
    <div className="page page-home">
      <title>AI Movie Recommender</title>
      <div className="space-y-16">
        {/* Top Rated Movies */}
        {/* <TopRatedMoviesSection /> */}

        <AiRecommender />
      </div>
    </div>
  );
};
