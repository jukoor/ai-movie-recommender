import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { Movie } from "../types/tmdb/Movie";
import { MovieApiResult } from "../types/tmdb/MovieApiResult";

export function useReadTopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    apiRequest<MovieApiResult>("get", "/top_rated?language=en-US&page=1")
      .then((data) => setTopRatedMovies(data.results))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { topRatedMovies, loading, error };
}
