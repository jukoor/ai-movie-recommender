import React from "react";
import { AiRecommender } from "../components/recommender/AiRecommender";
import { FeaturesSection } from "../components/pages/01_home/sections/FeaturesSection";
import { AiPicksSection } from "../components/sections/AiPicksSection";
import { PageTitle } from "../components/layout/Header/PageTitle";
import { MetaTags } from "../components/layout/Header/MetaTags";
import { useLanguage } from "../hooks/useLanguage";

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const homeT = t.home;

  return (
    <main className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <PageTitle title={homeT.pageTitle} />
      <MetaTags
        title="PopcornAI - AI-Powered Movie Recommendations & Discovery"
        description="Discover your next favorite movie with PopcornAI's intelligent AI recommendations. Get personalized film suggestions based on your mood and preferences."
        canonical="https://popcornai.app/"
        ogUrl="https://popcornai.app/"
      />

      {/* Modern background with gradient overlay */}
      <div
        className="absolute inset-0 bg-hero-gradient pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Animated background particles - light mode enhanced */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-20 w-3 h-3 bg-purple-500/40 dark:bg-purple-500/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-blue-500/50 dark:bg-blue-500/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-40 w-2.5 h-2.5 bg-pink-500/40 dark:bg-pink-500/30 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-emerald-500/50 dark:bg-emerald-500/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-60 left-1/3 w-1.5 h-1.5 bg-purple-400/35 dark:bg-purple-400/25 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-pink-400/40 dark:bg-pink-400/30 rounded-full animate-pulse delay-900"></div>
      </div>

      {/* Hero Section: User input and AI Recommendations */}
      <section className="relative z-10" aria-label="AI Movie Recommender">
        <AiRecommender />
      </section>

      {/* AI Picks Section: Fresh popular movies */}
      <section className="relative z-10 py-16" aria-label="Fresh AI Picks">
        <AiPicksSection />
      </section>

      {/* Features Section: Highlighting key features of the recommender */}
      <section className="relative z-10 py-16" aria-label="Features">
        <FeaturesSection />
      </section>
    </main>
  );
};
