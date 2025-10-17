import { Film, LogIn, StarOff, Trash2 } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { PageTitle } from "../components/layout/Header/PageTitle";

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
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
      <div className="min-h-screen relative overflow-hidden">
        {/* Dark background with gradient overlay */}
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none"></div>
        <div className="relative z-10">
          <PageTitle title="Favorites" />
          <div className="text-center mb-12 mt-16">
            <div className="flex items-center justify-center gap-3 mb-4 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 animate-fadeIn">
                Your Favorites
              </h1>
            </div>
            <p
              className="text-xl text-gray-300 max-w-2xl mx-auto animate-fadeIn"
              style={{ animationDelay: "200ms", animationFillMode: "both" }}
            >
              Your personal collection of handpicked movies.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
            <div className="glass-card rounded-lg p-8 max-w-md w-full animate-fadeInUp border border-gray-700/30">
              <LogIn className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-3">
                Sign In Required
              </h2>
              <p className="text-gray-300 mb-6">
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
        </div>
        <LoginDialog
          open={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark background with gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none"></div>
      <div className="relative z-10">
        <PageTitle title="Favorites" />

        <div className="text-center mb-12 mt-16">
          <div className="flex items-center justify-center gap-3 mb-4 animate-fadeIn">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 animate-fadeIn">
              Your Favorites
            </h1>
          </div>
          <p
            className="text-xl text-gray-300 max-w-2xl mx-auto animate-fadeIn"
            style={{ animationDelay: "200ms", animationFillMode: "both" }}
          >
            Your personal collection of handpicked movies.
          </p>
        </div>

        {movies.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center min-h-[400px] text-center px-4 animate-fadeInUp"
            style={{ animationDelay: "800ms", animationFillMode: "both" }}
          >
            <div className="glass-card rounded-lg p-8 max-w-md w-full border border-gray-700/30">
              <StarOff className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-3">
                No Favorites Yet
              </h2>
              <p className="text-gray-300 mb-6">
                Start building your personal movie collection by adding your
                favorite films. Discover amazing movies and save them here for
                later!
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 w-full"
              >
                Discover Movies
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              className="animate-fadeIn"
              style={{ animationDelay: "400ms", animationFillMode: "both" }}
            >
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                availableGenres={availableGenres}
              />
            </div>

            <div
              className="max-w-7xl mx-auto px-4 pt-8 mb-6 animate-fadeIn"
              style={{ animationDelay: "600ms", animationFillMode: "both" }}
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-300">
                  Showing {filteredMovies.length} of {movies.length} movies
                </p>
                <button
                  onClick={handleDeleteAllClick}
                  disabled={isRemoving}
                  className="border border-red-500/50 hover:border-red-400 disabled:border-red-700/30 disabled:cursor-not-allowed text-red-400 hover:text-red-300 disabled:text-red-600 font-normal py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2 text-sm hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                  {isRemoving ? "Removing..." : "Remove All"}
                </button>
              </div>
            </div>

            <div
              className="animate-fadeInUp"
              style={{ animationDelay: "800ms", animationFillMode: "both" }}
            >
              {filteredMovies.length === 0 && searchTerm ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
                  <div className="glass-card rounded-lg p-8 max-w-md w-full border border-gray-700/30">
                    <Film className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      No search results found
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Try different keywords or check your spelling
                    </p>
                  </div>
                </div>
              ) : (
                <MovieList movies={filteredMovies} />
              )}
            </div>
          </>
        )}

        <DeleteConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={handleRemoveAllFavorites}
          isLoading={isRemoving}
          count={movies.length}
        />
      </div>
    </div>
  );
};
