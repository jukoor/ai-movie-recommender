import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Wand2, Loader2, Sparkles } from "lucide-react";

interface MoodSearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export const MoodSearchBar: React.FC<MoodSearchBarProps> = ({
  initialQuery = "",
  onSearch,
  loading = false,
  placeholder = "Tell AI how you're feeling or what you want to watch...",
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const quickPrompts = [
    "movies that make me laugh until I cry",
    "something to watch on a rainy day",
    "films that inspire and motivate me",
    "movies perfect for a date night",
    "action-packed weekend entertainment",
    "thought-provoking mind-benders",
  ];

  const handleQuickPrompt = (prompt: string) => {
    setQuery(prompt);
    onSearch(prompt);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div
          className={`
            relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300
            ${
              focused
                ? "border-emerald-400 shadow-xl ring-4 ring-emerald-100"
                : "border-gray-200 hover:border-gray-300"
            }
          `}
        >
          <div className="flex items-center p-6">
            <div className="relative flex-1">
              <label htmlFor="mood-search-input" className="sr-only">
                Describe your mood or what you want to watch
              </label>
              <div
                className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2"
                aria-hidden="true"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                ) : (
                  <Wand2 className="w-5 h-5 text-emerald-500" />
                )}
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>

              <input
                id="mood-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder}
                disabled={loading}
                aria-label="Tell AI how you're feeling or what you want to watch"
                aria-describedby="mood-search-instructions"
                className={`
                  w-full pl-16 pr-6 py-4 bg-transparent border-none outline-none text-lg
                  placeholder-gray-400 text-gray-700 transition-all duration-200
                  ${loading ? "cursor-wait" : ""}
                `}
              />
              <span id="mood-search-instructions" className="sr-only">
                Enter a description of your mood or movie preference, then press
                the search button to find matching movies
              </span>
            </div>

            <motion.button
              type="submit"
              disabled={!query.trim() || loading}
              aria-disabled={!query.trim() || loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                ml-4 px-6 py-3 rounded-xl font-semibold transition-all duration-200
                flex items-center gap-2 min-w-[120px] justify-center
                ${
                  query.trim() && !loading
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              {loading ? (
                <>
                  <Loader2
                    className="w-4 h-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" aria-hidden="true" />
                  <span>Search</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Loading announcement for screen readers */}
        {loading && (
          <div
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            Searching for movies based on your mood...
          </div>
        )}

        {/* Quick prompts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4"
        >
          <p
            className="text-sm text-gray-500 mb-3 text-center"
            id="quick-prompts-label"
          >
            Try these quick prompts:
          </p>
          <div
            className="flex flex-wrap gap-2 justify-center"
            role="group"
            aria-labelledby="quick-prompts-label"
          >
            {quickPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => handleQuickPrompt(prompt)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                aria-label={`Quick search for: ${prompt}`}
                className={`
                  px-3 py-2 text-sm rounded-full border transition-all duration-200
                  ${
                    loading
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-600 border-gray-300 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50"
                  }
                `}
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.form>
    </div>
  );
};
