import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { Movie } from "../types/movie";

export function useReadLatestMovies() {
  const [movieLatest, setMovieLatest] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    apiRequest<Movie>("get", "/latest")
      .then((data) => setMovieLatest(data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { movieLatest, loading, error };
}
