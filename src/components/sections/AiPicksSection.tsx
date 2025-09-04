import React, { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { MovieCard } from "../movie/MovieCard/MovieCard";
import { useReadGenres } from "../../hooks/useReadGenres";
import { useAiMovieRecommendations } from "../../hooks/useAiMovieRecommendations";
import { SkeletonCard } from "../skeleton/SkeletonCard";
import { Movie } from "../../types/tmdb/Movie";

export const AiPicksSection: React.FC = () => {
  const { genres } = useReadGenres();
  const hasInitialized = useRef(false);

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
    <div className="my-16 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Fresh AI Picks
          </h2>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover new and popular movies handpicked by our AI algorithm
        </p>
      </div>

      {/* Movies Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {aiPickedMovies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <MovieCard
                movie={movie}
                genres={genres}
                currentMovies={aiPickedMovies}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
