import React from "react";
import { Github, ExternalLink, Sparkles, Heart } from "lucide-react";
import { PageTitle } from "../components/layout/Header/PageTitle";

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 via-pink-800 via-orange-700 via-yellow-600 to-emerald-600">
      <PageTitle title="About" />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              About AI Movie Recommender
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed drop-shadow">
              Modern AI movie recommendations in combination with movie DB API
            </p>
            <a
              href="https://github.com/jukoor/ai-movie-recommender"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full transition-all duration-300 border border-white/30"
            >
              <Github className="w-5 h-5" />
              View On GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* How It Works */}
          <div
            className="mb-16 animate-fadeIn"
            style={{ animationDelay: "300ms", animationFillMode: "both" }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-10 drop-shadow">
              How It Works
            </h2>

            <p>
              How the App Works The app helps users discover personalized movie
              recommendations through an intelligent AI-powered system. Users
              can browse movies, get tailored suggestions, and manage their
              preferences through a modern web interface. The application learns
              from user interactions to provide increasingly accurate
              recommendations over time. Technology Stack Frontend: Built with
              Vite for fast development and optimized builds Uses modern
              JavaScript/TypeScript for the user interface Responsive design for
              seamless experience across devices Backend & APIs: TMDB (The Movie
              Database) API provides comprehensive movie data, ratings, and
              metadata Firebase handles user authentication, data storage, and
              real-time syncing OpenRouter API with Mistral-7B model powers the
              AI recommendation engine AI Integration: The app leverages
              OpenRouter's Mistral-7B language model to analyze user preferences
              and generate intelligent movie recommendations AI processes user
              viewing history, ratings, and preferences to suggest relevant
              films Natural language processing helps understand user queries
              and provide contextual suggestions
            </p>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Just Ask
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Describe your mood or what kind of movie you want. No forms to
                  fill out, just natural conversation.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3">
                  AI Understanding
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Smart AI analyzes your request and searches through thousands
                  of movies to find what matches your vibe.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Perfect Matches
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Get personalized recommendations with explanations of why each
                  movie fits what you're looking for.
                </p>
              </div>
            </div>
          </div>

          {/* Tech */}
          <div
            className="mb-16 animate-fadeIn"
            style={{ animationDelay: "600ms", animationFillMode: "both" }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center">
              <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">
                Built with Care
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                This app combines React, TypeScript, and OpenAI to create
                something actually useful. No overengineering, just a tool that
                works well and feels nice to use.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                  React
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                  TypeScript
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                  OpenAI
                </span>
                <span className="bg-white/20 text-white px-3 py-1 rounded-full">
                  Firebase
                </span>
              </div>
            </div>
          </div>

          {/* Developer */}
          <div
            className="text-center animate-fadeIn"
            style={{ animationDelay: "900ms", animationFillMode: "both" }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Julian Orth
                </h2>
                <p className="text-white/80">
                  Developer who loves movies and clean code
                </p>
              </div>

              <p className="text-white/70 leading-relaxed mb-6">
                I built this because I was tired of spending more time choosing
                what to watch than actually watching. Sometimes you just want
                something that gets it.
              </p>

              <div className="flex items-center justify-center gap-2 text-white/60">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 fill-current" />
                <span>and lots of coffee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
