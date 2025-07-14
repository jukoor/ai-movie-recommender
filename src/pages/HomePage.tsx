import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Star, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { movies } from '../data/movies';
import { MovieCard } from '../components/MovieCard';

export const HomePage: React.FC = () => {
  const featuredMovies = movies.slice(0, 3);
  const topRatedMovies = movies.sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Next
              <span className="text-emerald-400 block">Favorite Film</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Explore our curated collection of cinematic masterpieces, from timeless classics 
              to modern blockbusters. Find your perfect movie night companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/movies"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
              >
                Browse Movies
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-white/10"
              >
                Advanced Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Star className="w-6 h-6 text-emerald-600" />
          <h2 className="text-3xl font-bold text-slate-800">Featured Movies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMovies.map((movie) => (
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

      {/* Stats Section */}
      <section className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <Film className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">{movies.length}+</h3>
              <p className="text-slate-600">Movies in Collection</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Star className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">8.8</h3>
              <p className="text-slate-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">15+</h3>
              <p className="text-slate-600">Genres Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Movies */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
          <h2 className="text-3xl font-bold text-slate-800">Top Rated Movies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <Clock className="w-12 h-12 mx-auto mb-6 text-emerald-200" />
          <h2 className="text-3xl font-bold mb-4">Ready for Movie Night?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of movie enthusiasts and start building your personal collection today.
          </p>
          <Link
            to="/movies"
            className="inline-flex items-center gap-2 bg-white text-emerald-600 hover:bg-slate-50 px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};