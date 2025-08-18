import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Movie } from "../types/tmdb/Movie";
import { useReadGenres } from "../hooks/useReadGenres";
import { MoodSelector } from "../components/mood/MoodSelector/MoodSelector";
import { MovieCard } from "../components/movie/MovieCard/MovieCard";
import {
  Heart,
  RefreshCw,
  AlertCircle,
  Sparkles,
  Film,
  ArrowRight,
  Stars,
} from "lucide-react";
import { PageTitle } from "../components/layout/Header/PageTitle";

interface Mood {
  id: string;
  emoji: string;
  label: string;
  description: string;
  searchQuery: string;
  color: string;
  bgColor: string;
}

export const ByMoodPage: React.FC = () => {
  const location = useLocation();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState(false);

  const { genres } = useReadGenres();

  const moviesRequestCount = 12;
  const movieDisplayCount = 6;
  const minInputLength = 8;
  const minWordCount = 2;
  const maxInputLength = 200;

  // Restore state from navigation
  useEffect(() => {
    if (location.state?.movies) {
      setMovies(location.state.movies);
      setShowResults(true);
    }
  }, [location.state]);

  const validateInput = (input: string): string | null => {
    if (input.length < minInputLength) {
      return `Please enter at least ${minInputLength} characters to get better recommendations.`;
    }

    if (input.length > maxInputLength) {
      return `Please keep your search under ${maxInputLength} characters.`;
    }

    const wordCount = input.trim().split(/\s+/).length;
    if (wordCount < minWordCount) {
      return `Please enter at least ${minWordCount} words to describe what you're looking for.`;
    }

    return null;
  };

  const searchMoviesByMood = async (query: string) => {
    const validationError = validateInput(query);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setShowResults(false);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/ai-recommend",
        {
          query: query,
          movieCount: moviesRequestCount,
        }
      );

      if (response.data?.movies && response.data.movies.length > 0) {
        const movieResults = response.data.movies.slice(0, movieDisplayCount);
        setMovies(movieResults);
        setShowResults(true);
      } else {
        setError("No movies found for your mood. Try a different description!");
        setMovies([]);
      }
    } catch (err) {
      console.error("Error fetching AI recommendations:", err);
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNREFUSED") {
          setError(
            "Unable to connect to the recommendation service. Please make sure the server is running."
          );
        } else if (err.response?.status === 500) {
          setError(
            "The recommendation service is experiencing issues. Please try again later."
          );
        } else {
          setError("Failed to get recommendations. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setSearchQuery(mood.searchQuery);
    setError(null);
    // Automatically search for movies when mood is selected
    searchMoviesByMood(mood.searchQuery);
  };

  const handleRefresh = () => {
    if (searchQuery) {
      searchMoviesByMood(searchQuery);
    }
  };

  const handleClearAndReset = () => {
    setSelectedMood(null);
    setSearchQuery("");
    setMovies([]);
    setError(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      <PageTitle title="By Mood" />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Movie Mood Search
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let AI find the perfect movies based on your current mood and
            feelings. Slide to choose an emoji that matches how you're feeling!
          </p>
        </motion.div>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <MoodSelector
            onMoodSelect={handleMoodSelect}
            selectedMood={selectedMood}
          />
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">
                    Oops! Something went wrong
                  </h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="flex flex-col items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-12 h-12 text-emerald-500" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Finding Your Perfect Movies...
                  </h3>
                  <p className="text-gray-500">
                    AI is analyzing your mood and preferences
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && movies.length > 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                  <Stars className="w-6 h-6 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Perfect Matches for Your Mood
                  </h2>
                  {selectedMood && (
                    <span className="text-2xl">{selectedMood.emoji}</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Refresh</span>
                  </button>

                  <button
                    onClick={handleClearAndReset}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>New Search</span>
                  </button>
                </div>
              </div>

              {/* Movie Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {movies.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <MovieCard
                      movie={movie}
                      genres={genres}
                      currentMovies={movies}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Search Again Prompt */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-center mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-200"
              >
                <Sparkles className="w-8 h-8 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Not quite what you were looking for?
                </h3>
                <p className="text-gray-600 mb-6">
                  Try describing your mood differently or choose a different
                  emoji above!
                </p>
                <button
                  onClick={handleClearAndReset}
                  className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 font-semibold"
                >
                  Search Again
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
