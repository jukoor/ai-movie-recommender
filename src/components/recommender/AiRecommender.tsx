import { useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { Movie } from "../../types/tmdb/Movie";
import { MovieCard } from "../movie/MovieCard";
import { useReadGenres } from "../../hooks/useReadGenres";
import { apiRequest } from "../../utils/api";
import { RefreshCw, Sparkle } from "lucide-react";

export const AiRecommender = () => {
  const [prompt, setPrompt] = useState(
    'Nenne mir 3 Filmtitel des Genres Komedie, und gib sie als JSON-Array im Format ["Titel1", "Titel2", "Titel3"] zurück. Keine weiteren Erklärungen.'
  );
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyMovies, setReplyMovies] = useState<Movie[]>([]);

  const { genres } = useReadGenres();

  const getAiMovieRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:4000/api/recommend", {
        prompt,
      });
      const reply = response.data.reply;
      // Parse reply as JSON array
      let movieTitles: string[] = [];
      try {
        movieTitles = JSON.parse(reply);
      } catch (e) {
        setError("Antwort konnte nicht gelesen werden.");
        setReplyMovies([]);
        return;
      }
      searchMoviesFromAiReply(movieTitles);
    } catch (err: any) {
      setError("Error");
      setReply("");
    } finally {
      setLoading(false);
    }
  };

  const searchMoviesFromAiReply = async (aiMoviesReply: string[]) => {
    console.log("AI Reply:", aiMoviesReply);
    const movieTitles = aiMoviesReply.map((title) => title.trim());
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
    setReplyMovies(firstFoundMovies as Movie[]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-fadeIn">
            Movie
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

        {/* Fetch Button */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={getAiMovieRecommendations}
            disabled={loading}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Fetching Movies...
                </>
              ) : (
                <>
                  <Sparkle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Discover Movies
                </>
              )}
            </div>
          </Button>
        </div>

        {/* Content Area */}
        {/* {loading && <LoadingSpinner />} */}

        {!loading && replyMovies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* {!loading && !hasSearched && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-gray-500 text-lg">Click the button above to discover amazing movies!</p>
          </div>
        )} */}
      </div>
    </div>
  );
};
