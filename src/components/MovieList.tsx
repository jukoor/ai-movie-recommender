import React, { useState, useMemo } from 'react';
import { Film } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { SearchBar } from './SearchBar';
import { Movie } from '../types/movie';

interface MovieListProps {
  movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const availableGenres = useMemo(() => {
    const genreSet = new Set<string>();
    movies.forEach(movie => {
      movie.genre.forEach(genre => genreSet.add(genre));
    });
    return Array.from(genreSet).sort();
  }, [movies]);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGenre = selectedGenre === '' || movie.genre.includes(selectedGenre);
      
      return matchesSearch && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-slate-800">Movie Collection</h1>
          </div>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Discover and explore our curated collection of cinematic masterpieces
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          availableGenres={availableGenres}
        />

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">
              Showing {filteredMovies.length} of {movies.length} movies
            </p>
            {(searchTerm || selectedGenre) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGenre('');
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="text-center py-16">
            <Film className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No movies found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};