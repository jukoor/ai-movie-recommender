import React from "react";
import { Film } from "lucide-react";
import { Movie } from "../types/tmdb/Movie";
import { MovieCard } from "./movie/MovieCard";
import { useReadGenres } from "../hooks/useReadGenres";

interface MovieListProps {
  movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const { genres } = useReadGenres();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Showing {movies.length} movies</p>
          </div>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-16">
            <Film className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No movies found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
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
