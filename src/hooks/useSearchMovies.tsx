import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { Movie } from "../types/tmdb/Movie";
import { MovieApiResult } from "../types/tmdb/MovieApiResult";

export const useSearchMovies = (query: string, page: number = 1) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setTotalPages(1);
      return;
    }
    setLoading(true);
    setError("");
    apiRequest<MovieApiResult>(
      "get",
      `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    )
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(() => {
        setError("Failed to fetch movies. Try again.");
        setMovies([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  return { movies, loading, error, totalPages };
};
