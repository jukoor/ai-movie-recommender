import { useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { Movie } from "../../types/tmdb/Movie";
import { MovieCard } from "../movie/MovieCard";
import { useReadGenres } from "../../hooks/useReadGenres";
import { apiRequest } from "../../utils/api";
import { RefreshCw, Search, Sparkles, AlertCircle } from "lucide-react";

export const AiRecommender = () => {
  const moviesRequestCount = 8;
  const movieDisplayCount = 3;
  const minInputLength = 10;
  const maxInputLength = 100;

  const [userInputValue, setUserInputValue] = useState(``);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyMovies, setReplyMovies] = useState<Movie[]>([]);

  const { genres } = useReadGenres();

  function preprocessPrompt(userInput: string) {
    // Check for empty input first
    if (!userInput.trim()) {
      setError("Please enter at least 2 words.");
      return null;
    }

    // Swearwords to filter out
    const swearWords = ["fuck", "shit", "damn", "hell"];

    // Check and Remove emojis using regex
    const emojiRegex =
      /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
    let cleanedInput = userInput.replace(emojiRegex, "");

    // Check for swear words and filter them out
    const words = cleanedInput.toLowerCase().split(/\s+/);
    const filteredWords = words.filter((word) => {
      const cleanWord = word.replace(/[^a-zA-Z]/g, "");
      return !swearWords.includes(cleanWord);
    });

    // Reconstruct the cleaned input
    cleanedInput = filteredWords.join(" ").trim();

    // Basic validation
    if (cleanedInput.length < minInputLength) {
      setError(
        `Please provide a more detailed movie preference (at least ${minInputLength} characters).`
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
    const instruction = `You must recommend ${moviesRequestCount} real, existing movies that match the following keywords or sentence: "${cleanedInput}". Even for vague descriptions like "epic space adventure", recommend actual movies from that genre or theme. Always return actual movie titles that exist. Return them as a Javascript array in the format ["Title1", "Title2", "Title3"]. No further explanations. Without backslashes.`;

    return instruction;
  }

  const getAiMovieRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      // filter and clean user input
      const processedPrompt = preprocessPrompt(userInputValue);

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
      console.log(reply);
      // Parse reply as JSON array
      let movieTitles: string[] = [];
      try {
        movieTitles = JSON.parse(reply);
      } catch (e) {
        setError(
          "Whoops! The AI got a little too creative. Please try again with a different prompt."
        );
        setReplyMovies([]);
        return;
      }
      searchMoviesFromAiReply(movieTitles);
    } catch (err: any) {
      setError("Error. Could not fetch AI recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handles AI movie recommendations: sends prompt to backend, parses response, and triggers movie search.
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
            you'll love! Or get inspired by AI-generated suggestions.
          </p>
        </div>

        {/* Centered Search Form */}
        <div className="flex justify-center items-center mb-12 animate-fadeIn">
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
                onChange={(e) => setUserInputValue(e.target.value)}
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
            style={{ marginTop: "-30px" }}
          >
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg shadow-sm max-w-md">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Movie Results */}
        {!loading && replyMovies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {replyMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genres={genres}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
