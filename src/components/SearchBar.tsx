import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    onSearchChange(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    onSearchChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 px-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-white rounded-xl shadow-lg p-4 border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search your favorite movies..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 min-w-[100px] flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </div>
  );
};
