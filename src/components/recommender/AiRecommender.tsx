import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Movie } from "../../types/tmdb/Movie";
import { useReadGenres } from "../../hooks/useReadGenres";
import { apiRequest } from "../../utils/api";
import { RefreshCw, Search, Sparkles, AlertCircle } from "lucide-react";
import { MovieCard } from "../movie/MovieCard/MovieCard";

export const AiRecommender = () => {
  const location = useLocation();
  const moviesRequestCount = 8; // number of movies to request
  const movieDisplayCount = 3; // number of movies to display
  const minInputLength = 8; // minimum search input length
  const minWordCount = 2; // minimum number of words
  const maxInputLength = 100; // maximum search input length

  const [userInputValue, setUserInputValue] = useState(``);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyMovies, setReplyMovies] = useState<Movie[]>([]);
  const [activeQuickSearchTag, setActiveQuickSearchTag] = useState<
    string | null
  >(null);

  const { genres } = useReadGenres();

  // Restore movies from location state when coming back from detail page
  useEffect(() => {
    if (location.state?.movies) {
      setReplyMovies(location.state.movies);
    }
  }, [location.state]);

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
    getAiMovieRecommendations(tag);
  };

  function preprocessPrompt(userInput: string) {
    // Check for empty input first
    if (!userInput.trim()) {
      setError("Please enter at least 2 words or 8 characters.");
      return null;
    }

    // Swearwords to filter out
    const swearWords = ["fuck", "shit", "damn", "hell"];

    // Check and Remove emojis using regex
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
    let cleanedInput = userInput.replace(emojiRegex, "");

    // Check for swear words and show error if found
    const words = cleanedInput.toLowerCase().split(/\s+/);
    const hasSwearWords = words.some((word) => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, "");
      return swearWords.includes(cleanWord);
    });

    if (hasSwearWords) {
      setError(
        "Please keep your movie preferences family-friendly. No inappropriate language allowed."
      );
      return null;
    }

    // Basic validation - check for either minimum word count OR minimum character count
    const wordCount = cleanedInput
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    if (wordCount < minWordCount && cleanedInput.length < minInputLength) {
      setError(
        `Please provide either at least ${minWordCount} words or ${minInputLength} characters.`
      );
      return null;
    }

    if (cleanedInput.length > maxInputLength) {
      setError(
        `Please keep your movie preferences under ${maxInputLength} characters.`
      );
      return null;
    }

    // Append the formatting instruction
    const instruction = `You must recommend ${moviesRequestCount} real, existing movies that match the following keywords or sentence: "${cleanedInput}". Even for vague descriptions, recommend actual popular movies from that genre or theme. Always return actual movie titles that exist. Return them as a Javascript array in the format ["Title1", "Title2", "Title3"]. No further explanations. Without backslashes.`;

    return instruction;
  }

  const getAiMovieRecommendations = async (tag?: string) => {
    setLoading(true);
    setError(null);
    setReplyMovies([]); // Clear previous movies immediately when starting new search

    try {
      // filter and clean user input
      const processedPrompt = preprocessPrompt(tag ? tag : userInputValue);

      // If preprocessing failed, stop here
      if (!processedPrompt) {
        setLoading(false);
        return;
      }

      // extend the user input with specific instructions to get movie results only in the correct format
      const response = await axios.post("http://localhost:4000/api/recommend", {
        prompt: processedPrompt,
      });
      const reply = response.data.reply;
      // Parse reply as JSON array
      let movieTitles: string[] = [];
      try {
        movieTitles = JSON.parse(reply);
      } catch (e) {
        setError(
          "Whoops! The AI got a little too creative. Please try again with a different prompt."
        );
        setReplyMovies([]);
        setActiveQuickSearchTag(null);
        return;
      }
      searchMoviesFromAiReply(movieTitles);
    } catch (err: any) {
      setError("Error. Could not fetch AI recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handles AI movie recommendations: sends prompt to backend, parses response, and triggers tmdb movie search.
  const searchMoviesFromAiReply = async (aiMoviesReply: string[]) => {
    const additionalMoviesCount = 2; // fetch additional movies to ensure we have enough to display when one fails
    console.log("AI Movies Reply:", aiMoviesReply);

    // Select random movies from the reply
    const shuffled = aiMoviesReply.sort(() => 0.5 - Math.random());
    const moviesToDisplay = shuffled.slice(
      0,
      movieDisplayCount + additionalMoviesCount
    );

    console.log("Selected random titles:", moviesToDisplay);

    const movieTitles = moviesToDisplay.map((title) => title.trim());
    const firstFoundMovies = await Promise.all(
      movieTitles.map(async (title) => {
        const response = await apiRequest(
          "get",
          `${
            import.meta.env.VITE_TMDB_API_BASE_URL
          }/search/movie?query=${encodeURIComponent(title)}`
        );
        return response.results[0];
      })
    );
    // Filter out undefined results
    const filteredMovies = firstFoundMovies.filter(Boolean) as Movie[];
    console.log("First found movies:", filteredMovies);
    setReplyMovies(filteredMovies.slice(0, movieDisplayCount));
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
          <form
            className="w-full max-w-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              getAiMovieRecommendations();
            }}
          >
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
