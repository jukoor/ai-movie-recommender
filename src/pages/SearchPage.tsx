import React, { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { MovieList } from "../components/MovieList";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useShowToast } from "../context/ToastContext";

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { movies, loading, error, totalPages } = useSearchMovies(query, page);
  const { showToast } = useShowToast();

  const handleSearch = (searchTerm: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) {
      showToast("Please enter a search term", "error");
    }
    setPage(1); // Reset to first page on new search
    setQuery(searchTerm);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <title>Search Movies</title>
      <form className="flex flex-col gap-2 mb-6" autoComplete="off">
        <SearchBar searchTerm={query} onSearchChange={handleSearch} />
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <MovieList movies={movies} />

      {/* ToDo: paging */}
    </div>
  );
};

export default SearchPage;
