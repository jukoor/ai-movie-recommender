import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Movie } from "../types/tmdb/Movie";
import { Genre } from "../types/tmdb/Genre";
import { PageTitle } from "../components/layout/Header/PageTitle";
import { MetaTags } from "../components/layout/Header/MetaTags";
import { useShowToast } from "../context/ToastContext";
import { db } from "../utils/firebase";
import { MovieImagePlaceholder } from "../components/ui/MovieImagePlaceholder";

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
  const { showToast } = useShowToast();

  // Get movie data from navigation state or props
  const movieFromState = location.state?.movie;
  const genresFromState = location.state?.genres;

  const movie = passedMovie || movieFromState;
  const genres = passedGenres || genresFromState || [];

  // Favorites state
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  // Check if movie is in favorites
  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user || !movie) return;
      const favDocRef = doc(db, `/users/${user.uid}/movieLists/favorites`);
      const favDocSnap = await getDoc(favDocRef);
      if (favDocSnap.exists()) {
        const movies = favDocSnap.data().movies || [];
        setIsFavorite(movies.some((m: Movie) => m.id === movie.id));
      }
    };
    fetchFavoriteStatus();
  }, [movie]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        showToast("You must be logged in to add favorites.", "error");
        return;
      }

      if (!movie) return;

      // Trigger animations
      setIsAnimating(true);
      setShowParticles(true);

      const favDocRef = doc(db, `/users/${user.uid}/movieLists/favorites`);
      const favDocSnap = await getDoc(favDocRef);

      if (favDocSnap.exists()) {
        const movies = favDocSnap.data().movies || [];
        if (isFavorite) {
          // Remove from favorites
          const updatedMovies = movies.filter((m: Movie) => m.id !== movie.id);
          await updateDoc(favDocRef, { movies: updatedMovies });
          setIsFavorite(false);
          showToast(`"${movie.title}" removed from favorites!`, "success");
        } else {
          // Add to favorites
          await updateDoc(favDocRef, { movies: arrayUnion(movie) });
          setIsFavorite(true);
          showToast(`"${movie.title}" added to favorites!`, "success");
        }
      } else {
        // Create favorites list with this movie
        await setDoc(favDocRef, { movies: [movie] });
        setIsFavorite(true);
        showToast(`"${movie.title}" added to favorites!`, "success");
      }

      // Reset animations after a delay
      setTimeout(() => {
        setIsAnimating(false);
        setShowParticles(false);
      }, 600);
    } catch (error) {
      showToast("Failed to update favorites: " + error, "error");
      setIsAnimating(false);
      setShowParticles(false);
    }
  };

  const handleBackClick = () => {
    // Use browser's back navigation
    navigate(-1);
  };

  if (!movie) {
    return null; // Don't show loading spinner, just return null
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
    <motion.main
      className="min-h-screen bg-dark-gradient"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1], // Custom easing for smoother animation
      }}
    >
      <PageTitle title={movie.title} />
      <MetaTags
        title={`${movie.title} - Movie Details | PopcornAI`}
        description={
          movie.overview ||
          `Discover more about ${movie.title} on PopcornAI. View ratings, cast, and personalized recommendations.`
        }
        ogTitle={movie.title}
        ogDescription={movie.overview}
        ogImage={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
            : undefined
        }
        canonical={`https://popcornai.app/movie/${movie.id}`}
        ogUrl={`https://popcornai.app/movie/${movie.id}`}
      />

      {/* Hero Section with Backdrop */}
      <motion.div
        className="relative h-96 md:h-[500px] overflow-hidden"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {movie.backdrop_path ? (
          <>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const placeholder =
                  e.currentTarget.nextElementSibling?.nextElementSibling;
                if (placeholder) {
                  (placeholder as HTMLElement).style.display = "flex";
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div style={{ display: "none" }} className="absolute inset-0">
              <MovieImagePlaceholder
                title={movie.title}
                type="backdrop"
                className="w-full h-full"
              />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black">
            <MovieImagePlaceholder
              title={movie.title}
              type="backdrop"
              className="w-full h-full"
            />
          </div>
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
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
                <span className="text-gray-300">
                  ({movie.vote_count ? movie.vote_count.toLocaleString() : "0"}{" "}
                  votes)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : "Unknown"}
                </span>
              </div>
              {movie.runtime && movie.runtime > 0 && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto px-6 md:px-8 py-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Poster and Actions */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-8">
              {movie.poster_path ? (
                <motion.img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-xl shadow-2xl mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget.nextElementSibling;
                    if (placeholder) {
                      (placeholder as HTMLElement).style.display = "block";
                    }
                  }}
                />
              ) : null}
              <div
                style={{ display: movie.poster_path ? "none" : "block" }}
                className="mb-6"
              >
                <MovieImagePlaceholder
                  title={movie.title}
                  type="poster"
                  className="w-full rounded-xl"
                />
              </div>

              {/* Action Buttons */}
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {/* Favorite Button */}
                <motion.button
                  onClick={handleFavorite}
                  className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                    isFavorite
                      ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25"
                      : "bg-gray-800 hover:bg-gray-700 text-rose-400 hover:text-rose-300 border border-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: isAnimating ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: isFavorite ? [1, 1.3, 1] : 1,
                        rotate: isAnimating
                          ? [0, isFavorite ? 360 : -360, 0]
                          : 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      <Star
                        className={`w-5 h-5 transition-colors duration-300`}
                        fill={isFavorite ? "currentColor" : "none"}
                      />
                    </motion.div>

                    {/* Particle Effects */}
                    <AnimatePresence>
                      {showParticles && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className={`absolute w-1.5 h-1.5 rounded-full ${
                                isFavorite ? "bg-yellow-400" : "bg-rose-400"
                              }`}
                              style={{
                                top: "50%",
                                left: "50%",
                              }}
                              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                              animate={{
                                scale: [0, 1, 0],
                                x: Math.cos((i * 60 * Math.PI) / 180) * 25,
                                y: Math.sin((i * 60 * Math.PI) / 180) * 25,
                                opacity: [0, 1, 0],
                              }}
                              transition={{
                                duration: 0.6,
                                delay: 0.1,
                                ease: "easeOut",
                              }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </motion.button>

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
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview || "No overview available for this movie."}
              </p>
            </motion.section>

            {/* Genres */}
            {movie.genre_ids && movie.genre_ids.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre_ids.map((genreId: number) => {
                    const genre = genres.find((g: Genre) => g.id === genreId);
                    return genre ? (
                      <span
                        key={genreId}
                        className="px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-full font-medium"
                      >
                        {genre.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </motion.section>
            )}

            {/* Movie Details Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="font-medium text-white">Release Date</p>
                      <p className="text-gray-400">
                        {movie.release_date
                          ? new Date(movie.release_date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "Unknown"}
                      </p>
                    </div>
                  </div>

                  {movie.runtime && movie.runtime > 0 && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="font-medium text-white">Runtime</p>
                        <p className="text-gray-400">
                          {formatRuntime(movie.runtime)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="font-medium text-white">
                        Original Language
                      </p>
                      <p className="text-gray-400 uppercase">
                        {movie.original_language || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {movie.budget && movie.budget > 0 && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="font-medium text-white">Budget</p>
                        <p className="text-gray-400">
                          {formatCurrency(movie.budget)}
                        </p>
                      </div>
                    </div>
                  )}

                  {movie.revenue && movie.revenue > 0 && (
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="font-medium text-white">Revenue</p>
                        <p className="text-gray-400">
                          {formatCurrency(movie.revenue)}
                        </p>
                      </div>
                    </div>
                  )}

                  {movie.popularity && (
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="font-medium text-white">
                          Popularity Score
                        </p>
                        <p className="text-gray-400">
                          {movie.popularity.toFixed(1)}
                        </p>
                      </div>
                    </div>
                  )}

                  {movie.original_title !== movie.title && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="font-medium text-white">Original Title</p>
                        <p className="text-gray-400">{movie.original_title}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>

            {/* Production Companies */}
            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Production Companies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movie.production_companies.map((company: any) => (
                      <div
                        key={company.id}
                        className="glass-card rounded-lg p-4"
                      >
                        {company.logo_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            className="h-12 object-contain mb-2 brightness-0 invert"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        )}
                        <p className="font-medium text-white">
                          {company.name || "Unknown Company"}
                        </p>
                        <p className="text-sm text-gray-400">
                          {company.origin_country || "Unknown"}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

            {/* Production Countries */}
            {movie.production_countries &&
              movie.production_countries.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Production Countries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.production_countries.map((country: any) => (
                      <span
                        key={country.iso_3166_1}
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-full text-sm"
                      >
                        {country.name}
                      </span>
                    ))}
                  </div>
                </motion.section>
              )}

            {/* Spoken Languages */}
            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  Spoken Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.spoken_languages.map((language: any) => (
                    <span
                      key={language.iso_639_1}
                      className="px-3 py-1 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-full text-sm"
                    >
                      {language.english_name}
                    </span>
                  ))}
                </div>
              </motion.section>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.main>
  );
};
