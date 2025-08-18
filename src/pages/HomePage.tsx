import React from "react";
import { AiRecommender } from "../components/recommender/AiRecommender";
import { FeaturesSection } from "../components/pages/01_home/sections/FeaturesSection";
import { PageTitle } from "../components/layout/Header/PageTitle";

export const HomePage: React.FC = () => {
  return (
    <div className="page page-home">
      <PageTitle title="Home" />

      {/* Hero Section: User input and AI Recommendations */}
      <AiRecommender />

      {/* Features Section: Highlighting key features of the recommender */}
      <FeaturesSection />
    </div>
  );
};
