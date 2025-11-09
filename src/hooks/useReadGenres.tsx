import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { GenreApiResult } from "../types/tmdb/GenreApiResult";
import { Genre } from "../types/tmdb/Genre";
import { useLanguage } from "./useLanguage";

export const useReadGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const { language } = useLanguage();

  useEffect(() => {
    // Map 'en' to 'en-US' and 'de' to 'de-DE' for TMDB API
    const tmdbLanguage = language === "de" ? "de-DE" : "en-US";

    const fetchGenres = async () => {
      setLoading(true);
      try {
        const data = await apiRequest<GenreApiResult>(
          "get",
          `/genre/movie/list?language=${tmdbLanguage}`
        );
        setGenres(data.genres);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [language]);

  return { genres, loading, error };
};
