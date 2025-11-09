import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, X, ChevronDown } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

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
  const { t } = useLanguage();
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Trigger search immediately for real-time filtering
    onSearchChange(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    onSearchChange("");
  };

  const handleDropdownToggle = () => {
    if (!isGenreDropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
  };

  // Handle dropdown interactions
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGenreDropdownOpen) return;

      if (event.key === "Escape") {
        setIsGenreDropdownOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsGenreDropdownOpen(false);
      }
    };

    const handleScroll = (event: Event) => {
      // Only close dropdown if scrolling outside the dropdown element
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenreDropdownOpen(false);
      }
    };

    const updatePosition = () => {
      if (buttonRef.current && isGenreDropdownOpen) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    if (isGenreDropdownOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", updatePosition);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isGenreDropdownOpen]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 px-4">
      <div className="flex flex-col gap-3 items-stretch glass-card rounded-xl p-4 border border-gray-700/30">
        {/* Search Input and Genre Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <label htmlFor="movie-search" className="sr-only">
              Search movies by title
            </label>
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="movie-search"
              type="text"
              placeholder={t.common.searchPlaceholder}
              value={inputValue}
              onChange={handleInputChange}
              aria-label="Search movies by title"
              className="w-full pl-12 pr-12 py-3 border border-gray-600/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 text-white placeholder-gray-400 bg-gray-800/50 focus:bg-gray-800/70 backdrop-blur-sm"
            />
            {inputValue && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                aria-label="Clear search"
                title="Clear search"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Genre Filter Dropdown */}
          {availableGenres.length > 0 && (
            <div className="relative sm:w-48">
              <button
                ref={buttonRef}
                onClick={handleDropdownToggle}
                className="w-full px-4 py-2.5 border border-gray-600/30 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 text-left flex items-center justify-between backdrop-blur-sm"
                aria-expanded={isGenreDropdownOpen}
                aria-haspopup="listbox"
                aria-label={`${t.favorites.search.filterByGenre}, ${
                  t.common.loading
                }: ${selectedGenre || t.favorites.genreFilter.allGenres}`}
              >
                <span className="text-white truncate">
                  {selectedGenre || t.favorites.genreFilter.allGenres}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                    isGenreDropdownOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isGenreDropdownOpen &&
                createPortal(
                  <>
                    {/* Backdrop to close dropdown */}
                    <div className="fixed inset-0 z-40" aria-hidden="true" />

                    {/* Dropdown content */}
                    <div
                      ref={dropdownRef}
                      className="fixed glass-card border border-gray-600/30 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto backdrop-blur-md"
                      style={{
                        top: `${dropdownPosition.top}px`,
                        left: `${dropdownPosition.left}px`,
                        width: `${dropdownPosition.width}px`,
                      }}
                    >
                      <div
                        role="listbox"
                        aria-label={t.favorites.search.filterByGenre}
                        className="py-1"
                      >
                        <button
                          role="option"
                          aria-selected={!selectedGenre}
                          onClick={() => {
                            onGenreChange("");
                            setIsGenreDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left hover:bg-emerald-500/10 transition-colors duration-150 focus:outline-none focus:bg-emerald-500/10 focus:ring-2 focus:ring-emerald-500/50 ${
                            !selectedGenre
                              ? "bg-emerald-500/20 text-emerald-300 font-medium"
                              : "text-gray-300"
                          }`}
                        >
                          {t.favorites.genreFilter.allGenres}
                        </button>
                        {availableGenres.map((genre) => (
                          <button
                            key={genre}
                            role="option"
                            aria-selected={selectedGenre === genre}
                            onClick={() => {
                              onGenreChange(genre);
                              setIsGenreDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left hover:bg-emerald-500/10 transition-colors duration-150 focus:outline-none focus:bg-emerald-500/10 focus:ring-2 focus:ring-emerald-500/50 ${
                              selectedGenre === genre
                                ? "bg-emerald-500/20 text-emerald-300 font-medium"
                                : "text-gray-300"
                            }`}
                          >
                            {genre}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>,
                  document.body
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
