import { useState } from "react";
import axios from "axios";
import { Button, TextInput, Card, Spinner, Alert } from "flowbite-react";
import { Movie } from "../../types/tmdb/Movie";
import { MovieCard } from "../movie/MovieCard";
import { useReadGenres } from "../../hooks/useReadGenres";
import { apiRequest } from "../../utils/api";

export const AiRecommender = () => {
  const [prompt, setPrompt] = useState(
    'Nenne mir 3 Filmtitel, und gib sie als JSON-Array im Format ["Titel1", "Titel2", "Titel3"] zurück. Keine weiteren Erklärungen.'
  );
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyMovies, setReplyMovies] = useState<Movie[]>([]);

  const { genres } = useReadGenres();

  const handleSubmit = async () => {
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
    <Card className="max-w-xl mx-auto mt-6">
      <h1 className="text-xl font-bold mb-2">KI-Filmvorschläge</h1>
      <TextInput
        type="text"
        placeholder="Sag etwas wie: Ich mag Interstellar"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mb-2"
      />
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? <Spinner size="sm" /> : "Vorschlagen lassen"}
      </Button>
      {error && (
        <Alert color="failure" className="mt-4">
          {error}
        </Alert>
      )}

      {replyMovies.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Vorgeschlagene Filme:</h2>
          {replyMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} genres={genres} />
          ))}
        </div>
      )}
    </Card>
  );
};
