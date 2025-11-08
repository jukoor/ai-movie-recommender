import { useState } from "react";
import axios from "axios";
import { Movie } from "../types/tmdb/Movie";
import { apiRequest } from "../utils/api";
import { useLanguage } from "../context/LanguageContext";

interface UseAiMovieRecommendationsConfig {
  moviesRequestCount?: number;
  movieDisplayCount?: number;
  minInputLength?: number;
  minWordCount?: number;
  maxInputLength?: number;
}

interface UseAiMovieRecommendationsReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  getRecommendations: (input: string) => Promise<void>;
  clearResults: () => void;
  setMovies: (movies: Movie[]) => void;
}

export const useAiMovieRecommendations = (
  config: UseAiMovieRecommendationsConfig = {}
): UseAiMovieRecommendationsReturn => {
  const { t } = useLanguage();
  const errorsT = t.aiRecommender.errors;
  const {
    moviesRequestCount = 8,
    movieDisplayCount = 3,
    minInputLength = 8,
    minWordCount = 2,
    maxInputLength = 100,
  } = config;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const preprocessPrompt = (userInput: string): string | null => {
    // Check for empty input first
    if (!userInput.trim()) {
      setError(errorsT.emptyInput);
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
      setError(errorsT.inappropriateLanguage);
      return null;
    }

    // Basic validation - check for either minimum word count OR minimum character count
    const wordCount = cleanedInput
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    if (wordCount < minWordCount && cleanedInput.length < minInputLength) {
      setError(
        errorsT.tooShort
          .replace("{minWords}", minWordCount.toString())
          .replace("{minChars}", minInputLength.toString())
      );
      return null;
    }

    if (cleanedInput.length > maxInputLength) {
      setError(
        errorsT.tooLong.replace("{maxChars}", maxInputLength.toString())
      );
      return null;
    }

    // Append the formatting instruction
    const instruction = `You must recommend ${moviesRequestCount} real, existing movies that match the following keywords or sentence: "${cleanedInput}". Even for vague descriptions, recommend actual popular movies from that genre or theme. Return them as a Javascript array in the format ["Title1", "Title2", "Title3"]. No further explanations. Without backslashes.`;

    return instruction;
  };

  const searchMoviesFromAiReply = async (aiMoviesReply: string[]) => {
    const additionalMoviesCount = 2; // fetch additional movies to ensure we have enough to display when one fails

    // Select random movies from the reply
    const shuffled = aiMoviesReply.sort(() => 0.5 - Math.random());
    const moviesToDisplay = shuffled.slice(
      0,
      movieDisplayCount + additionalMoviesCount
    );

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
    setMovies(filteredMovies.slice(0, movieDisplayCount));
  };

  const getRecommendations = async (input: string) => {
    setLoading(true);
    setError(null);
    setMovies([]); // Clear previous movies immediately when starting new search

    try {
      // filter and clean user input
      const processedPrompt = preprocessPrompt(input);

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
        setError(errorsT.aiParseError);
        setMovies([]);
        return;
      }

      await searchMoviesFromAiReply(movieTitles);
    } catch (err: any) {
      setError(errorsT.fetchError);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setMovies([]);
    setError(null);
  };

  return {
    movies,
    loading,
    error,
    getRecommendations,
    clearResults,
    setMovies,
  };
};
