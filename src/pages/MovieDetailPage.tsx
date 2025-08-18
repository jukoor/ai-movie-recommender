import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Star,
  Calendar,
  Clock,
  Globe,
  ArrowLeft,
  DollarSign,
  Award,
  ExternalLink,
} from "lucide-react";
import { Movie } from "../types/tmdb/Movie";
import { Genre } from "../types/tmdb/Genre";
import { PageTitle } from "../components/layout/Header/PageTitle";

interface MovieDetailPageProps {
  movie?: Movie;
  genres?: Genre[];
}

export const MovieDetailPage: React.FC<MovieDetailPageProps> = ({
  movie: passedMovie,
  genres: passedGenres,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get movie data from navigation state or props
  const movieFromState = location.state?.movie;
  const genresFromState = location.state?.genres;
  const previousMovies = location.state?.previousMovies;

  const movie = passedMovie || movieFromState;
  const genres = passedGenres || genresFromState || [];

  const handleBackClick = () => {
    if (previousMovies) {
      // Navigate back to home with previous movies
      navigate("/", {
        state: {
          movies: previousMovies,
        },
      });
    } else {
      // Fallback to regular back navigation
      navigate(-1);
    }
  };

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading movie details...</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <PageTitle title={movie.title} />

      {/* Hero Section with Backdrop */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        {movie.backdrop_path && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </>
        )}

        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="absolute top-6 left-6 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200 backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Movie Title and Basic Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-xl md:text-2xl text-gray-200 italic mb-4">
                {movie.tagline}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              {movie.runtime > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Poster and Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-xl shadow-2xl mb-6"
                />
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Visit Official Site
                  </a>
                )}

                {movie.imdb_id && (
                  <a
                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Award className="w-5 h-5" />
                    View on IMDb
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Overview
              </h2>
              <p className="text-slate-700 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </section>

            {/* Genres */}
            {movie.genre_ids.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre_ids.map((genreId: number) => {
                    const genre = genres.find((g: Genre) => g.id === genreId);
                    return genre ? (
                      <span
                        key={genreId}
                        className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full font-medium"
                      >
                        {genre.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </section>
            )}

            {/* Movie Details Grid */}
            <section>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-slate-800">Release Date</p>
                      <p className="text-slate-600">
                        {new Date(movie.release_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {movie.runtime > 0 && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-slate-800">Runtime</p>
                        <p className="text-slate-600">
                          {formatRuntime(movie.runtime)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-slate-800">
                        Original Language
                      </p>
                      <p className="text-slate-600 uppercase">
                        {movie.original_language}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {movie.budget > 0 && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-slate-800">Budget</p>
                        <p className="text-slate-600">
                          {formatCurrency(movie.budget)}
                        </p>
                      </div>
                    </div>
                  )}

                  {movie.revenue > 0 && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-slate-800">Revenue</p>
                        <p className="text-slate-600">
                          {formatCurrency(movie.revenue)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-slate-800">
                        Popularity Score
                      </p>
                      <p className="text-slate-600">
                        {movie.popularity.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  {movie.original_title !== movie.title && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="font-medium text-slate-800">
                          Original Title
                        </p>
                        <p className="text-slate-600">{movie.original_title}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Production Companies */}
            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">
                    Production Companies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movie.production_companies.map((company: any) => (
                      <div
                        key={company.id}
                        className="bg-white rounded-lg p-4 shadow-sm border border-slate-200"
                      >
                        {company.logo_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            className="h-12 object-contain mb-2"
                          />
                        )}
                        <p className="font-medium text-slate-800">
                          {company.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {company.origin_country}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            {/* Production Countries */}
            {movie.production_countries &&
              movie.production_countries.length > 0 && (
                <section>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    Production Countries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_countries.map((country: any) => (
                      <span
                        key={country.iso_3166_1}
                        className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                      >
                        {country.name}
                      </span>
                    ))}
                  </div>
                </section>
              )}

            {/* Spoken Languages */}
            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
              <section>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Spoken Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.spoken_languages.map((language: any) => (
                    <span
                      key={language.iso_639_1}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                    >
                      {language.english_name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
