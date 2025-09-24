import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useReadGenres } from "../../hooks/useReadGenres";
import { useAiMovieRecommendations } from "../../hooks/useAiMovieRecommendations";
import { RefreshCw, Search, Sparkles, AlertCircle } from "lucide-react";
import { MovieCard } from "../movie/MovieCard/MovieCard";

export const AiRecommender = () => {
  const location = useLocation();

  const [userInputValue, setUserInputValue] = useState(``);
  const [activeQuickSearchTag, setActiveQuickSearchTag] = useState<
    string | null
  >(null);

  const { genres } = useReadGenres();

  // Use the custom hook for AI movie recommendations
  const {
    movies: replyMovies,
    loading,
    error,
    getRecommendations,
    setMovies: setReplyMovies,
  } = useAiMovieRecommendations({
    moviesRequestCount: 8,
    movieDisplayCount: 3,
    minInputLength: 8,
    minWordCount: 2,
    maxInputLength: 100,
  });

  // Restore movies from location state when coming back from detail page
  useEffect(() => {
    if (location.state?.movies) {
      setReplyMovies(location.state.movies);
    }
  }, [location.state, setReplyMovies]);

  const quickSearchTags = [
    "epic space adventure",
    "romantic comedy",
    "superhero action",
    "horror thriller",
    "animated family",
    "war drama",
    "crime noir",
    "sci-fi dystopia",
  ];

  const handleQuickSearch = (tag: string) => {
    setUserInputValue(tag);
    setActiveQuickSearchTag(tag);
    // Small delay to ensure state is updated, then trigger search
    getRecommendations(tag);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getRecommendations(userInputValue);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Header */}
      <div className="container mx-auto px-6 py-20 flex-1 flex flex-col">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeIn">
              <span className="text-white">AI Movie</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse">
                Discovery
              </span>
            </h1>
            {/* Glowing effect behind text */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-2xl -z-10"></div>
          </div>
          <p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto animate-fadeIn leading-relaxed"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            Discover your next favorite film with our cutting-edge AI
            recommender. Just tell us what you like, and we'll find movies
            you'll love!
          </p>
        </div>

        {/* Modern Glassmorphism Search Form */}
        <div className="flex justify-center items-center mb-12 animate-fadeIn">
          <form className="w-full max-w-3xl" onSubmit={handleFormSubmit}>
            <label
              htmlFor="ai-movie-recommendations"
              className="mb-2 text-sm font-medium text-white sr-only"
            >
              Get AI Recommendations
            </label>

            <div className="relative glass-card rounded-2xl p-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-6 pointer-events-none z-10">
                <Search className="w-5 h-5 text-purple-400" />
              </div>
              <input
                type="search"
                id="ai-movie-recommendations"
                className="block w-full p-5 ps-14 pr-32 text-lg text-white bg-transparent border-none focus:ring-2 focus:ring-purple-500/50 rounded-xl placeholder-gray-400 backdrop-blur-sm"
                value={userInputValue}
                onChange={(e) => {
                  setUserInputValue(e.target.value);
                  // Clear active tag when user manually types
                  if (e.target.value !== activeQuickSearchTag) {
                    setActiveQuickSearchTag(null);
                  }
                }}
                placeholder="Describe your ideal movie..."
                autoComplete="off"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 backdrop-blur-sm"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Fetching...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Get Movies
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 glass-card bg-red-500/10 border-red-500/30 text-red-300 px-6 py-4 rounded-xl shadow-lg max-w-md backdrop-blur-md">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Modern Quick Search Tags */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-3 max-w-4xl justify-center">
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickSearch(tag)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 backdrop-blur-md border focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  activeQuickSearchTag === tag
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg transform scale-105"
                    : "glass-card text-gray-300 border-white/20 hover:bg-white/10 hover:text-white hover:border-purple-400/50 hover:scale-105"
                }`}
                disabled={loading}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-lg"></div>
                  </div>
                  <div className="space-y-3 text-center">
                    <h3 className="text-2xl font-bold text-white">
                      Finding Your Perfect Movies...
                    </h3>
                    <p className="text-gray-300 text-lg">
                      AI is analyzing your mood and preferences
                    </p>
                    <div className="flex justify-center space-x-1 mt-4">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ y: [-5, 5, -5] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Movie Results with Enhanced Styling */}
        {!loading && replyMovies.length > 0 && (
          <motion.div
            key={replyMovies.map((m) => m.id).join("-")}
            className="mt-16"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.15,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {/* Results Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                🎬 Your AI-Curated Movies
              </h2>
              <p className="text-gray-300 text-lg">
                Handpicked just for you based on your preferences
              </p>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {replyMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  custom={index}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 50,
                      scale: 0.9,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.7,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <MovieCard
                    movie={movie}
                    genres={genres}
                    currentMovies={replyMovies}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
