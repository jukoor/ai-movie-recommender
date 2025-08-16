import React from "react";
import { Film } from "lucide-react";
import { Movie } from "../types/tmdb/Movie";
import { MovieCard } from "./movie/MovieCard";
import { useReadGenres } from "../hooks/useReadGenres";

interface MovieListProps {
  movies: Movie[];
  context?: "search" | "favorites" | "general";
}

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  context = "general",
}) => {
  const { genres } = useReadGenres();

  // Define different messages based on context
  const getEmptyStateMessage = () => {
    switch (context) {
      case "search":
        return {
          title: "No search results found",
          description: "Try different keywords or check your spelling",
        };
      case "favorites":
        return {
          title: "No favorites yet",
          description:
            "Start adding movies to your favorites list by clicking the star icon on any movie",
        };
      default:
        return {
          title: "No movies available",
          description: "There are currently no movies to display",
        };
    }
  };

  const emptyMessage = getEmptyStateMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {movies.length === 0 ? (
          <div className="text-center py-16">
            <Film className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              {emptyMessage.title}
            </h3>
            <p className="text-slate-500">{emptyMessage.description}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genres={genres} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
