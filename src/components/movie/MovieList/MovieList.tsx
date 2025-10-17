import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReadGenres } from "../../../hooks/useReadGenres";
import { useEqualRowHeights } from "../../../hooks/useEqualRowHeights";
import { Movie } from "../../../types/tmdb/Movie";
import { MovieCard } from "../MovieCard/MovieCard";

interface MovieListProps {
  movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const { genres } = useReadGenres();
  const gridRef = useEqualRowHeights([movies], true);

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4" style={{ paddingBottom: 80 }}>
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          style={{
            gridAutoRows: "minmax(auto, max-content)",
          }}
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
      </div>
    </div>
  );
};
