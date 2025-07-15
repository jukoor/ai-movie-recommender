import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { Movie } from "../types/movie";

export function useReadTopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    apiRequest<Movie[]>("get", "/top_rated?language=en-US&page=1")
      .then((data) => setTopRatedMovies(data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { topRatedMovies, loading, error };
}
