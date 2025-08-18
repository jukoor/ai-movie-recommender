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
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {loading ? (
                  <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                ) : (
                  <Wand2 className="w-5 h-5 text-emerald-500" />
                )}
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder}
                disabled={loading}
                className={`
                  w-full pl-16 pr-6 py-4 bg-transparent border-none outline-none text-lg
                  placeholder-gray-400 text-gray-700 transition-all duration-200
                  ${loading ? "cursor-wait" : ""}
                `}
              />
            </div>

            <motion.button
              type="submit"
              disabled={!query.trim() || loading}
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
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Quick prompts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4"
        >
          <p className="text-sm text-gray-500 mb-3 text-center">
            Try these quick prompts:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => handleQuickPrompt(prompt)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
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
