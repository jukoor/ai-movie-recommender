import React, { useEffect, useState } from "react";
import { Star, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useShowToast } from "../../../context/ToastContext";
import { Genre } from "../../../types/tmdb/Genre";
import { Movie } from "../../../types/tmdb/Movie";
import { db } from "../../../utils/firebase";

interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
  currentMovies?: Movie[];
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  genres,
  currentMovies,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const { showToast } = useShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;
      const favDocRef = doc(db, `/users/${user.uid}/movieLists/favorites`);
      const favDocSnap = await getDoc(favDocRef);
      if (favDocSnap.exists()) {
        const movies = favDocSnap.data().movies || [];
        setIsFavorite(movies.some((m: Movie) => m.id === movie.id));
      }
    };
    fetchFavoriteStatus();
  }, [movie.id]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking the favorite button
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to add favorites.");
        return;
      }

      // Trigger animations
      setIsAnimating(true);
      setShowParticles(true);

      const favDocRef = doc(db, `/users/${user.uid}/movieLists/favorites`);
      const favDocSnap = await getDoc(favDocRef);

      if (favDocSnap.exists()) {
        const movies = favDocSnap.data().movies || [];
        if (isFavorite) {
          // Remove from favorites
          const updatedMovies = movies.filter((m: Movie) => m.id !== movie.id);
          await updateDoc(favDocRef, { movies: updatedMovies });
          setIsFavorite(false);
          showToast(`"${movie.title}" removed from favorites!`, "success");
        } else {
          // Add to favorites
          await updateDoc(favDocRef, { movies: arrayUnion(movie) });
          setIsFavorite(true);
          showToast(`"${movie.title}" added to favorites!`, "success");
        }
      } else {
        // Create favorites list with this movie
        await setDoc(favDocRef, { movies: [movie] });
        setIsFavorite(true);
      }

      // Reset animations after a delay
      setTimeout(() => {
        setIsAnimating(false);
        setShowParticles(false);
      }, 600);
    } catch (error) {
      alert("Failed to update favorites: " + error);
      setIsAnimating(false);
      setShowParticles(false);
    }
  };

  return (
    <motion.div
      className="glass-card glass-card-hover rounded-xl h-full overflow-hidden group border border-gray-700/30 flex flex-col"
      animate={{
        scale: isAnimating ? [1, 1.02, 1] : 1,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      <div className="relative overflow-hidden">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" />
          {movie.vote_average.toFixed(1)}
        </div>
        <motion.button
          onClick={handleFavorite}
          className={`absolute top-4 left-4 rounded-full p-2 shadow flex items-center transition-all duration-300 backdrop-blur-sm border ${
            isFavorite
              ? "bg-rose-500/90 text-white shadow-lg shadow-rose-500/25 border-rose-400/50"
              : "bg-gray-800/80 hover:bg-gray-700/90 text-rose-400 hover:text-rose-300 hover:shadow-lg border-gray-600/50 hover:border-rose-400/50"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          animate={{
            scale: isAnimating ? [1, 1.2, 1] : 1,
            rotate: isAnimating ? [0, isFavorite ? 360 : -360, 0] : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          <motion.div
            animate={{
              scale: isFavorite ? [1, 1.3, 1] : 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <Star
              className={`w-5 h-5 transition-colors duration-300 ${
                isFavorite ? "text-white" : "text-rose-400"
              }`}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </motion.div>

          {/* Particle Effects */}
          <AnimatePresence>
            {showParticles && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full ${
                      isFavorite ? "bg-yellow-400" : "bg-rose-400"
                    }`}
                    style={{
                      top: "50%",
                      left: "50%",
                    }}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos((i * 60 * Math.PI) / 180) * 20,
                      y: Math.sin((i * 60 * Math.PI) / 180) * 20,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3
            className="text-xl font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors cursor-pointer"
            onClick={() =>
              navigate(`/movie/${movie.id}`, {
                state: {
                  movie,
                  genres,
                  previousMovies: currentMovies,
                },
              })
            }
          >
            {movie.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {movie.release_date.split("-")[0]}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genre_ids.map((genre, index) => (
            <span
              key={index}
              style={{ fontSize: "10px" }}
              className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full font-medium hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors backdrop-blur-sm border border-gray-600/30"
            >
              {genres.find((g) => g.id === genre)?.name || "Unknown"}
            </span>
          ))}
        </div>

        <p
          className="text-gray-300 text-sm leading-relaxed mb-4 flex-1 overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            lineHeight: "1.5rem",
            maxHeight: "6rem", // 4 lines * 1.5rem line-height
          }}
        >
          {movie.overview}
        </p>
      </div>
    </motion.div>
  );
};
