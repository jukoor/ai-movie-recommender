import { Film } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import { useEffect, useState } from "react";
import { Movie } from "../types/tmdb/Movie";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { MovieList } from "../components/MovieList";
import { getAuth } from "firebase/auth";

export const FavoritesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchFavorites = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const docRef = doc(db, "users", userId, "movieLists", "favorites");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const movies = docSnap.data().movies || [];
          setMovies(movies);
        }
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div>
      <title>Favorites</title>
      <div className="text-center mb-12 mt-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Film className="w-8 h-8 text-emerald-600" />
          <h1 className="text-4xl font-bold text-slate-800">Favorites</h1>
        </div>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Your personal list of favorite movies.
        </p>
      </div>

      {/* <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} /> */}

      <MovieList movies={movies} />
    </div>
  );
};
