import { Film, LogIn, Trash2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Movie } from "../types/tmdb/Movie";
import { doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { FavoritesPageSkeleton } from "../components/skeleton/FavoritesPageSkeleton";
import { useShowToast } from "../context/ToastContext";
import { DeleteConfirmDialog } from "../components/dialogs/DeleteConfirmDialog";
import { useReadGenres } from "../hooks/useReadGenres";
import { LoginDialog } from "../components/auth/LoginDialog/LoginDialog";
import { MovieList } from "../components/movie/MovieList/MovieList";
import { SearchBar } from "../components/search/SearchBar/SearchBar";

export const FavoritesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { user, loading, isLoggedIn } = useAuth();
  const { showToast } = useShowToast();
  const { genres } = useReadGenres();
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

  // Get unique genres from favorite movies
  const availableGenres = useMemo(() => {
    const genreNames = new Set<string>();

    movies.forEach((movie) => {
      movie.genre_ids.forEach((genreId) => {
        const genre = genres.find((g) => g.id === genreId);
        if (genre) {
          genreNames.add(genre.name);
        }
      });
    });

    return Array.from(genreNames).sort();
  }, [movies, genres]);

  // Filter movies based on search term and genre
  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      // Search filter
      const matchesSearch =
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.overview.toLowerCase().includes(searchTerm.toLowerCase());

      // Genre filter
      let matchesGenre = true;
      if (selectedGenre) {
        const movieGenreNames = movie.genre_ids
          .map((genreId) => {
            const genre = genres.find((g) => g.id === genreId);
            return genre?.name;
          })
          .filter(Boolean);

        matchesGenre = movieGenreNames.includes(selectedGenre);
      }

      return matchesSearch && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre, genres]);

  // Remove all favorites function
  const handleRemoveAllFavorites = async () => {
    if (!user || !isLoggedIn) return;

    try {
      setIsRemoving(true);
      setShowDeleteDialog(false); // Close dialog immediately
      const docRef = doc(db, "users", user.uid, "movieLists", "favorites");
      await updateDoc(docRef, { movies: [] });
      showToast("All favorites removed successfully!", "success");
    } catch (error) {
      console.error("Error removing all favorites:", error);
      showToast("Failed to remove favorites. Please try again.", "error");
    } finally {
      setIsRemoving(false);
    }
  };

  // Show delete confirmation dialog
  const handleDeleteAllClick = () => {
    setShowDeleteDialog(true);
  };

  // Show loading state while checking authentication
  if (loading) {
    return <FavoritesPageSkeleton />;
  }

  // Show login prompt if user is not authenticated
  if (!isLoggedIn) {
    return (
      <div>
        <title>Favorites // PopcornAI</title>

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
      <title>Favorites // PopcornAI</title>

      <div className="text-center mb-12 mt-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Film className="w-8 h-8 text-emerald-600" />
          <h1 className="text-4xl font-bold text-slate-800">Favorites</h1>
        </div>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Your personal list of favorite movies.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        availableGenres={availableGenres}
      />

      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex justify-between items-center">
          <p className="text-slate-600">
            Showing {filteredMovies.length} of {movies.length} movies
          </p>
          {movies.length > 0 && (
            <button
              onClick={handleDeleteAllClick}
              disabled={isRemoving}
              className="border border-red-300 hover:border-red-400 disabled:border-red-200 disabled:cursor-not-allowed text-red-600 hover:text-red-700 disabled:text-red-400 font-normal py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2 text-sm hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              {isRemoving ? "Removing..." : "Remove All"}
            </button>
          )}
        </div>
      </div>

      <MovieList
        movies={filteredMovies}
        context={searchTerm ? "search" : "favorites"}
      />

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleRemoveAllFavorites}
        isLoading={isRemoving}
        count={movies.length}
      />
    </div>
  );
};
