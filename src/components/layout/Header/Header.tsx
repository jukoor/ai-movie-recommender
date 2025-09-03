import {
  X,
  Menu,
  Home,
  Star,
  Smile,
  LogIn,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useShowToast } from "../../../context/ToastContext";
import { NavigationItem } from "../../../types/NavigationItem";
import { LoginDialog } from "../../auth/LoginDialog/LoginDialog";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState<number>(0);
  const { showToast } = useShowToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isLoggedIn, loading } = useAuth();

  const navigation: NavigationItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "By Mood", href: "/by-mood", icon: Smile },
    // { name: "Smart Picks", href: "/hidden-gems", icon: WandSparkles },
    {
      name: "Favorites",
      href: "/favorites",
      icon: Star,
      count: favoritesCount,
    },
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handler for logout with toast notifications
  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setIsDropdownOpen(false);
      showToast(
        "You've been logged out successfully. See you next time!",
        "success"
      );
    } catch (error: any) {
      showToast(
        error.message || "Failed to logout. Please try again.",
        "error"
      );
    }
  };

  // Generate avatar initials from email
  const getAvatarInitials = (email: string): string => {
    const parts = email.split("@")[0].split(".");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative p-2 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-xl group-hover:from-emerald-500 group-hover:via-green-600 group-hover:to-teal-700 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
              <span className="relative w-6 h-6 text-white text-xl">🍿</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors leading-tight">
                PopcornAI
              </span>
              <span className="text-xs text-slate-500 group-hover:text-emerald-500 transition-colors font-medium">
                Smart Movie Picks
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {loading ? (
              // Skeleton for desktop navigation
              <>
                {[...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  >
                    <div className="w-4 h-4 bg-slate-200 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
                  </div>
                ))}
                <div className="ml-4 px-4 py-2 rounded-lg">
                  <div className="w-16 h-8 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </>
            ) : (
              <>
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
                      {item.name === "Favorites" &&
                        item.count !== undefined &&
                        isLoggedIn && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold">
                            {item.count}
                          </span>
                        )}
                    </NavLink>
                  );
                })}
                {isLoggedIn ? (
                  <div className="relative ml-4" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-semibold">
                        {user?.email ? getAvatarInitials(user.email) : "U"}
                      </div>
                      <span className="text-sm text-slate-700 max-w-32 truncate">
                        {user?.email}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </button>
                )}
              </>
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
              {loading ? (
                // Skeleton for mobile navigation
                <>
                  {[...Array(2)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg"
                    >
                      <div className="w-5 h-5 bg-slate-200 rounded animate-pulse"></div>
                      <div className="w-20 h-4 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                  <div className="mt-2 px-4 py-3 rounded-lg">
                    <div className="w-20 h-8 bg-slate-200 rounded animate-pulse"></div>
                  </div>
                </>
              ) : (
                <>
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
                        {item.name === "Favorites" &&
                          item.count !== undefined && (
                            <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-bold">
                              {item.count}
                            </span>
                          )}
                      </NavLink>
                    );
                  })}
                  {isLoggedIn ? (
                    <div className="mt-2 border-t border-slate-200 pt-2">
                      <div className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-semibold">
                          {user?.email ? getAvatarInitials(user.email) : "U"}
                        </div>
                        <span className="flex-1 truncate">{user?.email}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full mt-1 px-4 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors flex items-center gap-2 justify-center"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
                    >
                      <LogIn className="w-5 h-5" />
                      Login
                    </button>
                  )}
                </>
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
