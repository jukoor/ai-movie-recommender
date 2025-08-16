import { Film, LogIn } from "lucide-react";
import { useEffect, useState } from "react";
import { Movie } from "../types/tmdb/Movie";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { MovieList } from "../components/MovieList";
import { useAuth } from "../context/AuthContext";
import { LoginDialog } from "../components/layout/LoginDialog";
import { FavoritesPageSkeleton } from "../components/skeleton/FavoritesPageSkeleton";

export const FavoritesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { user, loading, isLoggedIn } = useAuth();
  const db = getFirestore();

  useEffect(() => {
    if (!isLoggedIn || !user) return;

    const userId = user.uid;
    if (!userId) return;

    const docRef = doc(db, "users", userId, "movieLists", "favorites");
    const unsubscribe = onSnapshot(docRef, (docSnap: any) => {
      if (docSnap.exists()) {
        const movies = docSnap.data().movies || [];
        setMovies(movies);
      } else {
        setMovies([]);
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isLoggedIn, user, db]);

  // Show loading state while checking authentication
  if (loading) {
    return <FavoritesPageSkeleton />;
  }

  // Show login prompt if user is not authenticated
  if (!isLoggedIn) {
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

        <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <LogIn className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">
              Sign In Required
            </h2>
            <p className="text-slate-600 mb-6">
              Please sign in to your account to add movies to your favorites
              list and view your saved movies.
            </p>
            <button
              onClick={() => setShowLoginDialog(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 w-full"
            >
              Sign In
            </button>
          </div>
        </div>

        <LoginDialog
          open={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
        />
      </div>
    );
  }

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
