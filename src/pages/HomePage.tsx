import React from "react";
import { AiRecommender } from "../components/recommender/AiRecommender";
import { FeaturesSection } from "../components/pages/01_home/sections/FeaturesSection";
import { AiPicksSection } from "../components/sections/AiPicksSection";
import { PageTitle } from "../components/layout/Header/PageTitle";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <PageTitle title="Home" />

      {/* Modern background with gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none"></div>

      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-500/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-500/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-pink-500/30 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-emerald-500/40 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Hero Section: User input and AI Recommendations */}
      <div className="relative z-10">
        <AiRecommender />
      </div>

      {/* AI Picks Section: Fresh popular movies */}
      <div className="relative z-10 py-16">
        <AiPicksSection />
      </div>

      {/* Features Section: Highlighting key features of the recommender */}
      <div className="relative z-10 py-16">
        <FeaturesSection />
      </div>
    </div>
  );
};
