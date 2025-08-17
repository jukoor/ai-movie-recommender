import React from "react";
import { Film } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useReadGenres } from "../../../hooks/useReadGenres";
import { Movie } from "../../../types/tmdb/Movie";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieListProps {
  movies: Movie[];
  context?: "search" | "favorites" | "general";
}

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  context = "general",
}) => {
  const { genres } = useReadGenres();

  // Define different messages based on context
  const getEmptyStateMessage = () => {
    switch (context) {
      case "search":
        return {
          title: "No search results found",
          description: "Try different keywords or check your spelling",
        };
      case "favorites":
        return {
          title: "No favorites yet",
          description:
            "Start adding movies to your favorites list by clicking the star icon on any movie",
        };
      default:
        return {
          title: "No movies available",
          description: "There are currently no movies to display",
        };
    }
  };

  const emptyMessage = getEmptyStateMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {movies.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.2 },
            }}
            exit={{
              opacity: 0,
              y: -20,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{
                scale: 1,
                transition: { duration: 0.4, delay: 0.3 },
              }}
            >
              <Film className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              {emptyMessage.title}
            </h3>
            <p className="text-slate-500">{emptyMessage.description}</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            layout
          >
            <AnimatePresence mode="popLayout">
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.4,
                      delay: index * 0.03, // Very subtle stagger
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: 0,
                      ease: "easeInOut",
                    },
                  }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  className="h-full"
                >
                  <MovieCard movie={movie} genres={genres} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};
