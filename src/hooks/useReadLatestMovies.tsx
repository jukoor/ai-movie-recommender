import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { Movie } from "../types/tmdb/Movie";
import { MovieApiResult } from "../types/tmdb/MovieApiResult";

export const useReadLatestMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    apiRequest<MovieApiResult>("get", "/movie/latest")
      .then((data) => setMovies(data.results))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { movies, loading, error };
};
