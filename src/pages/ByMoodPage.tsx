import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReadGenres } from "../hooks/useReadGenres";
import { useAiMovieRecommendations } from "../hooks/useAiMovieRecommendations";
import { MoodSelector } from "../components/mood/MoodSelector/MoodSelector";
import { MovieCard } from "../components/movie/MovieCard/MovieCard";
import { RefreshCw, AlertCircle, Sparkles } from "lucide-react";
import { PageTitle } from "../components/layout/Header/PageTitle";
import { Mood } from "../types/Mood";

export const ByMoodPage: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { genres } = useReadGenres();

  const { movies, loading, error, getRecommendations } =
    useAiMovieRecommendations({
      moviesRequestCount: 12,
      movieDisplayCount: 6,
      minInputLength: 8,
      minWordCount: 2,
      maxInputLength: 200,
    });

  const searchMoviesByMood = async (query: string) => {
    setShowResults(false);
    await getRecommendations(query);
    if (!error) {
      setShowResults(true);
    }
  };

  const handleMoodChange = (mood: Mood) => {
    setSelectedMood(mood);
    setSearchQuery(mood.searchQuery);
    // Don't automatically search - wait for button click
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setSearchQuery(mood.searchQuery);
    // Search for movies when button is clicked
    searchMoviesByMood(mood.searchQuery);
  };

  const handleRefresh = () => {
    if (searchQuery) {
      searchMoviesByMood(searchQuery);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <PageTitle title="By Mood" />

      {/* Dark background with gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none"></div>

      {/* Dynamic mood gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: selectedMood ? selectedMood.pageGradient : "transparent",
          opacity: selectedMood ? 1 : 0,
        }}
      ></div>

      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-500/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-500/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-pink-500/30 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-emerald-500/40 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-fadeIn">
              Movie Mood Search
            </h1>
          </div>
          <p
            className="text-xl text-gray-300 max-w-3xl mx-auto animate-fadeIn"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            Let PopcornAI find the perfect movies based on how you're feeling.
            <br />
            Slide to choose an emoji that matches your mood!
          </p>
        </div>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12"
        >
          <MoodSelector
            onMoodSelect={handleMoodSelect}
            onMoodChange={handleMoodChange}
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
              <div className="glass-card border border-red-500/20 rounded-xl p-6 flex items-start gap-3 bg-red-500/10">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-300 mb-1">
                    Oops! Something went wrong
                  </h3>
                  <p className="text-red-200">{error}</p>
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
                  <h3 className="text-xl font-semibold text-white">
                    Finding Your Perfect Movies...
                  </h3>
                  <p className="text-gray-300">
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
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">
                    Perfect Matches for Your Mood
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={handleRefresh}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden border border-purple-500/20"
                  >
                    {/* Animated background overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <motion.div
                      animate={loading ? { rotate: 360 } : { rotate: 0 }}
                      transition={{
                        duration: 1,
                        repeat: loading ? Infinity : 0,
                        ease: "linear",
                      }}
                      className="relative z-10"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.div>
                    <span className="relative z-10">
                      {loading ? "Finding..." : "Refresh"}
                    </span>
                  </motion.button>
                </div>
              </div>

              {/* Movie Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {movies
                  .sort((a, b) => b.popularity - a.popularity)
                  .map((movie, index) => (
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
