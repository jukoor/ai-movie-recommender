import { Film, X, Menu, Home, Star, Search } from "lucide-react";
import { LoginDialog } from "./LoginDialog";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import type { NavigationItem } from "../../types/NavigationItem";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { Link, NavLink } from "react-router-dom";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState<number>(0);

  const { isLoggedIn } = useAuth();

  const navigation: NavigationItem[] = [
    { name: "Home", href: "/", icon: Home },
    {
      name: "Favorites",
      href: "/favorites",
      icon: Star,
      count: favoritesCount,
    },
    { name: "Search", href: "/search", icon: Search },
    // { name: "Profile", href: "/profile", icon: User },
  ];
  const db = getFirestore();

  useEffect(() => {
    if (!isLoggedIn) {
      setFavoritesCount(0);
      return;
    }
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const docRef = doc(db, "users", userId, "movieLists", "favorites");
      const unsubscribe =
        // Listen for real-time updates
        onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const movies = docSnap.data().movies || [];
            setFavoritesCount(Array.isArray(movies) ? movies.length : 0);
          } else {
            setFavoritesCount(0);
          }
        });
      // Cleanup listener on unmount or logout
      return () => unsubscribe();
    } else {
      setFavoritesCount(0);
    }
  }, [isLoggedIn, db]);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-emerald-600 rounded-lg group-hover:bg-emerald-700 transition-colors">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
              AI Movie Recommender
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive, isPending }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ` +
                    (isPending
                      ? "pending"
                      : isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-100")
                  }
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                  {item.name === "Favorites" && item.count !== undefined && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold">
                      {item.count}
                    </span>
                  )}
                </NavLink>
              );
            })}
            {isLoggedIn ? (
              <button
                onClick={async () => {
                  await signOut(getAuth());
                }}
                className="ml-4 px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="ml-4 px-4 py-2 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive, isPending }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ` +
                      (isPending
                        ? "pending"
                        : isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-100")
                    }
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                    {item.name === "Favorites" && item.count !== undefined && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold">
                        {item.count}
                      </span>
                    )}
                  </NavLink>
                );
              })}
              {isLoggedIn ? (
                <button
                  onClick={async () => {
                    await signOut(getAuth());
                  }}
                  className="mt-2 px-4 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="mt-2 px-4 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
        {/* Login Dialog */}
        <LoginDialog
          open={isLoginOpen}
          onClose={() => {
            setIsLoginOpen(false);
          }}
        />
      </div>
    </header>
  );
};
