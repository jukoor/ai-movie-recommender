import React, { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
  availableGenres: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  availableGenres,
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Trigger search immediately for real-time filtering
    onSearchChange(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    onSearchChange("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 px-4">
      <div className="flex flex-col gap-3 items-stretch bg-white rounded-xl shadow-lg p-4 border border-slate-100">
        {/* Search Input and Genre Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search your favorite movies..."
              value={inputValue}
              onChange={handleInputChange}
              className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 focus:bg-white"
            />
            {inputValue && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors duration-200 focus:outline-none"
                aria-label="Clear search"
                title="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Genre Filter Dropdown */}
          {availableGenres.length > 0 && (
            <div className="relative sm:w-48">
              <button
                onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-left flex items-center justify-between"
              >
                <span className="text-slate-700 truncate">
                  {selectedGenre || "All genres"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isGenreDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isGenreDropdownOpen && (
                <>
                  {/* Backdrop to close dropdown */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsGenreDropdownOpen(false)}
                  />

                  {/* Dropdown content */}
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    <button
                      onClick={() => {
                        onGenreChange("");
                        setIsGenreDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors duration-150 ${
                        !selectedGenre
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-slate-700"
                      }`}
                    >
                      All genres
                    </button>
                    {availableGenres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => {
                          onGenreChange(genre);
                          setIsGenreDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors duration-150 ${
                          selectedGenre === genre
                            ? "bg-emerald-50 text-emerald-700 font-medium"
                            : "text-slate-700"
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
