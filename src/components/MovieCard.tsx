import React from 'react';
import { Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      <div className="relative overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" />
          {movie.rating}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
            {movie.title}
          </h3>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {movie.year}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatDuration(movie.duration)}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genre.map((genre, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
            >
              {genre}
            </span>
          ))}
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {movie.description}
        </p>
        
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Directed by <span className="font-semibold text-slate-700">{movie.director}</span>
          </p>
        </div>
      </div>
    </div>
  );
};