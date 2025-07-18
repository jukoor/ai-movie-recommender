import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { Genre } from "../types/tmdb/Movie";
import { GenreApiResult } from "../types/tmdb/GenreApiResult";

export const useReadGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    apiRequest<GenreApiResult>("get", "/genre/movie/list?language=enest")
      .then((data) => setGenres(data.genres))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { genres, loading, error };
};
