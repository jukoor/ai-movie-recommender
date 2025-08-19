import { useState, useEffect } from "react";
import { Button } from "flowbite-react";
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
    <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="container mx-auto px-6 py-12 flex-1 flex flex-col mt-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fadeIn">
            AI Movie
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Discovery
            </span>
          </h1>
          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto animate-fadeIn"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            Discover your next favorite film with our cutting-edge AI
            recommender. Just tell us what you like, and we'll find movies
            you'll love!
          </p>
        </div>

        {/* Centered Search Form */}
        <div className="flex justify-center items-center mb-8 animate-fadeIn">
          <form className="w-full max-w-2xl" onSubmit={handleFormSubmit}>
            <label
              htmlFor="ai-movie-recommendations"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Get AI Recommendations
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="search"
                id="ai-movie-recommendations"
                style={{ borderRadius: "50px" }}
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={userInputValue}
                onChange={(e) => {
                  setUserInputValue(e.target.value);
                  // Clear active tag when user manually types
                  if (e.target.value !== activeQuickSearchTag) {
                    setActiveQuickSearchTag(null);
                  }
                }}
                placeholder='Describe your mood or movie taste, e.g. "epic space adventure"...'
                disabled={loading}
              />
              <Button
                type="submit"
                disabled={loading}
                style={{
                  borderRadius: "25px",
                  position: "absolute",
                  top: "7px",
                  right: "7px",
                }}
                // className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    Fetching...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Movies
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="flex justify-center mb-6"
            style={{ marginTop: "-20px" }}
          >
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg shadow-sm max-w-md">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Quick Search Tags */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-2 max-w-2xl justify-center">
            {quickSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleQuickSearch(tag)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                  activeQuickSearchTag === tag
                    ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                    : "bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-600 border-gray-200 hover:border-blue-300"
                }`}
                disabled={loading}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

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

        {/* Movie Results */}
        {!loading && replyMovies.length > 0 && (
          <motion.div
            key={replyMovies.map((m) => m.id).join("-")}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.2,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {replyMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                custom={index}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 40,
                    scale: 0.9,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
              >
                <MovieCard
                  movie={movie}
                  genres={genres}
                  currentMovies={replyMovies}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
