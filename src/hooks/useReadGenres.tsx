import { useEffect, useState } from "react";
import { apiRequest } from "../utils/api";
import { GenreApiResult } from "../types/tmdb/GenreApiResult";
import { Genre } from "../types/tmdb/Genre";
import { useLanguage } from "../context/LanguageContext";

export const useReadGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const { language } = useLanguage();

  useEffect(() => {
    setLoading(true);
    // Map 'en' to 'en-US' and 'de' to 'de-DE' for TMDB API
    const tmdbLanguage = language === "de" ? "de-DE" : "en-US";
    apiRequest<GenreApiResult>(
      "get",
      `/genre/movie/list?language=${tmdbLanguage}`
    )
      .then((data) => setGenres(data.genres))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [language]);

  return { genres, loading, error };
};
