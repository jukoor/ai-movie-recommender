import React from "react";
import { useNavigate } from "react-router-dom";
import { Film, Home, Search, Sparkles } from "lucide-react";
import { PageTitle } from "../components/layout/Header/PageTitle";
import { MetaTags } from "../components/layout/Header/MetaTags";
import { useLanguage } from "../hooks/useLanguage";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <PageTitle title="404 - Page Not Found" />
      <MetaTags
        title="404 - Page Not Found"
        description="The page you are looking for doesn't exist."
        canonical="https://popcornai.app/404"
        ogUrl="https://popcornai.app/404"
      />

      {/* Dark background with gradient overlay */}
      <div
        className="absolute inset-0 bg-hero-gradient pointer-events-none"
        aria-hidden="true"
      ></div>

      {/* Animated film reels in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <Film
          className="absolute top-20 left-10 w-32 h-32 text-purple-500 animate-spin"
          style={{ animationDuration: "20s" }}
        />
        <Film
          className="absolute bottom-20 right-10 w-24 h-24 text-blue-500 animate-spin"
          style={{ animationDuration: "15s" }}
        />
        <Sparkles className="absolute top-1/3 right-1/4 w-16 h-16 text-purple-400 animate-pulse" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 leading-none">
            404
          </h1>
        </div>

        {/* Message */}
        <div
          className="mb-12 space-y-4 animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {t.notFound?.title || "Scene Not Found"}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            {t.notFound?.description ||
              "This page seems to have been cut from the final edit. Let's get you back on track."}
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>{t.notFound?.goHome || "Go Home"}</span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Search className="w-5 h-5" />
            <span>{t.notFound?.goBack || "Go Back"}</span>
          </button>
        </div>

        {/* Subtle hint */}
        <p
          className="mt-12 text-sm text-gray-500 dark:text-gray-400 animate-fadeIn"
          style={{ animationDelay: "0.6s" }}
        >
          {t.notFound?.hint ||
            "Lost? Use the navigation above to explore our movie collection."}
        </p>
      </div>
    </main>
  );
};
