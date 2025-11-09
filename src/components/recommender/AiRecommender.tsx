import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useReadGenres } from "../../hooks/useReadGenres";
import { useAiMovieRecommendations } from "../../hooks/useAiMovieRecommendations";
import { useEqualRowHeights } from "../../hooks/useEqualRowHeights";
import { RefreshCw, Search, Sparkles, AlertCircle, X } from "lucide-react";
import { MovieCard } from "../movie/MovieCard/MovieCard";
import { useLanguage } from "../../context/LanguageContext";

export const AiRecommender = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const aiRecommenderT = t.aiRecommender;
  const heroT = t.home.hero;

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

  const gridRef = useEqualRowHeights([replyMovies], true);

  // Restore movies from location state when coming back from detail page
  useEffect(() => {
    if (location.state?.movies) {
      setReplyMovies(location.state.movies);
    }
  }, [location.state, setReplyMovies]);

  const quickSearchTags = aiRecommenderT.quickSearch.tags;

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
          <div className="flex items-center justify-center gap-3 mb-4 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 animate-fadeIn">
              {heroT.title}
            </h1>
          </div>
          <p
            className="text-xl md:text-2xl text-gray-800 dark:text-gray-300 max-w-3xl mx-auto animate-fadeIn leading-relaxed"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            {heroT.subtitle}
          </p>
        </div>

        {/* Modern Glassmorphism Search Form */}
        <div className="flex justify-center items-center mb-12 animate-fadeIn">
          <form className="w-full max-w-3xl" onSubmit={handleFormSubmit}>
            <label
              htmlFor="ai-movie-recommendations"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-white sr-only"
            >
              {aiRecommenderT.form.label}
            </label>

            <div className="relative glass-card rounded-2xl p-2 bg-white/90 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700/50">
              <div className="absolute inset-y-0 start-0 flex items-center ps-7 pointer-events-none z-10">
                <Search
                  className="w-5 h-5 text-purple-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                id="ai-movie-recommendations"
                className="block w-full py-4 sm:py-5 pl-16 pr-40 sm:pr-52 text-base sm:text-lg text-gray-900 dark:text-white bg-transparent border-none focus:ring-2 focus:ring-purple-500/50 rounded-xl placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
                value={userInputValue}
                onChange={(e) => {
                  setUserInputValue(e.target.value);
                  // Clear active tag when user manually types
                  if (e.target.value !== activeQuickSearchTag) {
                    setActiveQuickSearchTag(null);
                  }
                }}
                placeholder={aiRecommenderT.form.placeholder}
                autoComplete="off"
                disabled={loading}
                aria-label={aiRecommenderT.form.placeholder}
                aria-describedby="ai-recommender-instructions"
              />
              <span id="ai-recommender-instructions" className="sr-only">
                {aiRecommenderT.form.instructions}
              </span>
              {userInputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setUserInputValue("");
                    setActiveQuickSearchTag(null);
                  }}
                  className="absolute right-24 sm:right-44 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg bg-gray-200 dark:bg-gray-700/50 hover:bg-gray-300 dark:hover:bg-gray-600/70 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  aria-label={aiRecommenderT.form.clearInput}
                  title={aiRecommenderT.form.clearInput}
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                aria-disabled={loading}
                aria-label={
                  loading
                    ? aiRecommenderT.form.submitting
                    : aiRecommenderT.form.submitButton
                }
                title={
                  loading
                    ? aiRecommenderT.form.submitting
                    : aiRecommenderT.form.submitButton
                }
                className="absolute right-2 top-2 bottom-2 px-3 sm:px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 backdrop-blur-sm"
              >
                {loading ? (
                  <>
                    <RefreshCw
                      className="w-5 h-5 sm:w-4 sm:h-4 animate-spin"
                      aria-hidden="true"
                    />
                    <span className="hidden sm:inline">
                      {aiRecommenderT.form.submitting}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles
                      className="w-5 h-5 sm:w-4 sm:h-4"
                      aria-hidden="true"
                    />
                    <span className="hidden sm:inline">
                      {aiRecommenderT.form.submitButton}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="flex justify-center mb-8"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-center gap-3 glass-card bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-300 px-6 py-4 rounded-xl shadow-lg max-w-md backdrop-blur-md">
              <AlertCircle
                className="w-5 h-5 flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Quick Search Tags */}
        <div className="flex justify-center mb-12">
          <div
            className="flex flex-wrap gap-3 max-w-3xl justify-center"
            role="group"
            aria-label={aiRecommenderT.quickSearch.ariaLabel}
          >
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickSearch(tag)}
                aria-label={`Quick search for ${tag} movies`}
                aria-pressed={activeQuickSearchTag === tag}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 backdrop-blur-md border focus:outline-none focus:ring-2 focus:ring-purple-500/50 ${
                  activeQuickSearchTag === tag
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-lg transform scale-105"
                    : "glass-card bg-white/80 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white hover:border-purple-400/50 hover:scale-105"
                }`}
                disabled={loading}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Loading announcement for screen readers */}
        {loading && (
          <div
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            Finding your perfect movies based on your preferences
          </div>
        )}

        {/* Modern Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <div className="glass-card rounded-2xl p-8 max-w-md mx-auto bg-white/80 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700/50">
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
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {aiRecommenderT.loading.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-lg">
                      {aiRecommenderT.loading.subtitle}
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
            role="region"
            aria-label="AI-curated movie recommendations"
            aria-live="polite"
          >
            {/* Results Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                🎬 {aiRecommenderT.results.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                {aiRecommenderT.results.subtitle}
              </p>
            </div>

            {/* Movies Grid */}
            <div
              ref={gridRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              style={{
                gridAutoRows: "1fr",
              }}
            >
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
