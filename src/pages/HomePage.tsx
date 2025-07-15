import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import { movies } from "../data/movies";
import { MovieCard } from "../components/MovieCard";
import { useReadLatestMovies } from "../hooks/useReadLatestMovies";

export const HomePage: React.FC = () => {
  const featuredMovies = movies.slice(0, 3);

  const { movieList, loading, error } = useReadLatestMovies();

  useEffect(() => {
    console.log(movieList);
  }, [movieList]);

  return (
    <div className="page page-home">
      <title>AI Movie Recommender</title>
      <div className="space-y-16">
        {/* Featured Movies */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 text-emerald-600" />
            <h2 className="text-3xl font-bold text-slate-800">
              Featured Movies
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/movies"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
            >
              View All Movies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
