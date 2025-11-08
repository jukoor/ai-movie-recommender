import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { MovieCard } from "../movie/MovieCard/MovieCard";
import { useReadGenres } from "../../hooks/useReadGenres";
import { useAiMovieRecommendations } from "../../hooks/useAiMovieRecommendations";
import { useEqualRowHeights } from "../../hooks/useEqualRowHeights";
import { SkeletonCard } from "../skeleton/SkeletonCard";
import { Movie } from "../../types/tmdb/Movie";
import { homeTranslations } from "../../translations";

export const AiPicksSection: React.FC = () => {
  const { genres } = useReadGenres();
  const hasInitialized = useRef(false);
  const t = homeTranslations.aiPicks;

  // Use AI recommendations with configuration for this section
  const {
    movies: aiPickedMovies,
    loading,
    getRecommendations,
  } = useAiMovieRecommendations({
    moviesRequestCount: 8,
    movieDisplayCount: 6,
    minInputLength: 5,
    minWordCount: 1,
  });

  const gridRef = useEqualRowHeights([aiPickedMovies], true);

  // Automatically get AI recommendations for fresh popular movies when component mounts
  useEffect(() => {
    // Prevent double execution in StrictMode
    if (hasInitialized.current) {
      return;
    }
    hasInitialized.current = true;

    const prompts = [
      "trending popular new movies 2024 2025",
      "fresh blockbuster releases popular cinema",
      "acclaimed new movies trending popular",
      "recent popular hits cinema 2024",
      "trending new releases popular movies",
    ];

    // Select a random prompt to get varied results
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

    const fetchData = async () => {
      await getRecommendations(randomPrompt);
    };

    fetchData();
  }, []); // Only run once on mount

  return (
    <div className="relative px-4 max-w-7xl mx-auto">
      {/* Section Header with Enhanced Styling */}
      <div className="text-center mb-16">
        <div className="relative inline-block mb-6">
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl blur-lg"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {t.title}
            </h2>
          </div>
          {/* Animated underline */}
          <div className="mt-4 h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
        </div>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Enhanced Movies Grid */}
      {loading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            gridAutoRows: "1fr",
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-4 animate-pulse"
            >
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            gridAutoRows: "1fr",
          }}
        >
          {aiPickedMovies.map((movie: Movie, index) => (
            <div
              key={movie.id}
              className="group relative transform hover:scale-105 transition-all duration-500 ease-out"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

              {/* Movie Card Container */}
              <div className="relative glass-card-hover rounded-2xl overflow-hidden">
                <MovieCard
                  movie={movie}
                  genres={genres}
                  currentMovies={aiPickedMovies}
                />
              </div>

              {/* Floating number indicator */}
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg backdrop-blur-sm border border-white/20">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
