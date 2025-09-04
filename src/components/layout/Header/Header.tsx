import {
  X,
  Menu,
  Home,
  Star,
  Smile,
  LogIn,
  ChevronDown,
  LogOut,
  Info,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useShowToast } from "../../../context/ToastContext";
import { NavigationItem } from "../../../types/NavigationItem";
import { LoginDialog } from "../../auth/LoginDialog/LoginDialog";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { showToast } = useShowToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isLoggedIn, loading } = useAuth();

  const navigation: NavigationItem[] = [
    { name: "Home", href: "/", icon: Home },
    { name: "By Mood", href: "/by-mood", icon: Smile },
    {
      name: "Favorites",
      href: "/favorites",
      icon: Star,
    },
    { name: "About", href: "/about", icon: Info },
    // { name: "Profile", href: "/profile", icon: User },
  ];

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
    <header className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative p-2 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 rounded-xl group-hover:from-yellow-500 group-hover:via-orange-600 group-hover:to-red-700 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105 shadow-orange-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
              <div
                className="relative w-6 h-6 text-white text-xl"
                style={{ fontSize: "26px", left: "-1px", top: "-2px" }}
              >
                🍿
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
                PopcornAI
              </span>
              <span className="text-xs text-gray-400 group-hover:text-orange-400 transition-colors font-medium">
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
                    <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                ))}
                <div className="ml-4 px-4 py-2 rounded-lg">
                  <div className="w-16 h-8 bg-gray-700 rounded animate-pulse"></div>
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
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative group ` +
                        (isPending
                          ? "pending"
                          : isActive
                          ? "bg-gradient-to-r from-yellow-400/10 to-orange-500/10 text-orange-400 border border-orange-500/20"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50 hover:border-gray-700/50 border border-transparent")
                      }
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                      {/* Active indicator */}
                      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </NavLink>
                  );
                })}
                {isLoggedIn ? (
                  <div className="relative ml-4" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-gray-900 text-xs font-bold">
                        {user?.email ? getAvatarInitials(user.email) : "U"}
                      </div>
                      <span className="text-xs text-gray-300 max-w-32 truncate">
                        {user?.email}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-1 z-50 backdrop-blur-lg">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
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
                    className="ml-4 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 text-gray-900 font-bold hover:from-yellow-400 hover:via-orange-400 hover:to-red-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 shadow-orange-500/25"
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
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors border border-gray-700/50"
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
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col gap-1">
              {loading ? (
                // Skeleton for mobile navigation
                <>
                  {[...Array(2)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg"
                    >
                      <div className="w-5 h-5 bg-gray-700 rounded animate-pulse"></div>
                      <div className="w-20 h-4 bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  ))}
                  <div className="mt-2 px-4 py-3 rounded-lg">
                    <div className="w-20 h-8 bg-gray-700 rounded animate-pulse"></div>
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
                            ? "bg-gradient-to-r from-yellow-400/10 to-orange-500/10 text-orange-400 border-l-2 border-orange-500"
                            : "text-gray-300 hover:text-white hover:bg-gray-800/50")
                        }
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </NavLink>
                    );
                  })}
                  {isLoggedIn ? (
                    <div className="mt-2 border-t border-gray-800 pt-2">
                      <div className="flex items-center gap-3 px-4 py-2 text-xs text-gray-400">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-gray-900 text-xs font-bold">
                          {user?.email ? getAvatarInitials(user.email) : "U"}
                        </div>
                        <span className="flex-1 truncate">{user?.email}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full mt-1 px-4 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors flex items-center gap-2 justify-center shadow-lg"
                      >
                        <LogOut className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 text-gray-900 font-bold hover:from-yellow-400 hover:via-orange-400 hover:to-red-500 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center shadow-orange-500/25"
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
