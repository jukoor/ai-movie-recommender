import { ArrowRight, Link, Star } from "lucide-react";
import { MovieCard } from "../movie/MovieCard/MovieCard";
import { useReadTopRatedMovies } from "../../hooks/useReadTopRatedMovies";
import { useReadGenres } from "../../hooks/useReadGenres";

export const TopRatedMoviesSection: React.FC = () => {
  const { topRatedMovies, loading, error } = useReadTopRatedMovies();

  const { genres } = useReadGenres();

  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-8 mt-8">
        <Star className="w-6 h-6 text-emerald-600" />
        <h2 className="text-3xl font-bold text-slate-800">Featured Movies</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topRatedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} genres={genres} />
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
  );
};
