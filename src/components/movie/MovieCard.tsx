import React, { useEffect, useState } from "react";
import { Star, Calendar } from "lucide-react";
import { db } from "../../utils/firebase";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Movie } from "../../types/tmdb/Movie";
import { Genre } from "../../types/tmdb/Genre";
import { useShowToast } from "../../context/ToastContext";

interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, genres }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { showToast } = useShowToast();

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

  const handleFavorite = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in to add favorites.");
        return;
      }
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
    } catch (error) {
      alert("Failed to update favorites: " + error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" />
          {movie.vote_average.toFixed(1)}
        </div>
        <button
          onClick={handleFavorite}
          className={`absolute top-4 left-4 bg-white/80 hover:bg-rose-200 text-rose-600 rounded-full p-2 shadow transition-colors duration-200 flex items-center ${
            isFavorite ? "bg-rose-500 text-white" : ""
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star
            className={`w-5 h-5 ${
              isFavorite ? "text-rose-600" : "text-rose-600"
            }`}
            fill={isFavorite ? "#e11d48" : "none"} // #e11d48 is Tailwind's rose-600
          />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">
            {movie.title}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {movie.release_date.split("-")[0]}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {movie.genre_ids.map((genre, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium hover:bg-emerald-100 hover:text-emerald-800 transition-colors"
            >
              {genres.find((g) => g.id === genre)?.name || "Unknown"}
            </span>
          ))}
        </div>

        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </div>
  );
};
