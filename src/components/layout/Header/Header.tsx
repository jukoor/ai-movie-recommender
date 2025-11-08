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
import { headerTranslations } from "../../../translations";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { showToast } = useShowToast();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = headerTranslations;

  const { user, isLoggedIn, loading } = useAuth();

  const navigation: NavigationItem[] = [
    { name: t.navigation.home, href: "/", icon: Home },
    { name: t.navigation.byMood, href: "/by-mood", icon: Smile },
    {
      name: t.navigation.favorites,
      href: "/favorites",
      icon: Star,
    },
    { name: t.navigation.about, href: "/about", icon: Info },
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
      showToast(t.toast.logoutSuccess, "success");
    } catch (error: any) {
      showToast(error.message || t.toast.logoutError, "error");
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
    <header
      className="glass-card border-b border-purple-500/20 sticky top-0 z-50 shadow-2xl shadow-purple-500/10"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            aria-label={t.ariaLabels.home}
          >
            <div className="relative p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105 shadow-purple-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
              <div
                className="relative w-6 h-6 text-white text-xl"
                style={{ fontSize: "26px", left: "-1px", top: "-2px" }}
                aria-hidden="true"
              >
                🍿
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
                {t.logo.appName}
              </span>
              <span className="text-xs text-gray-400 group-hover:text-purple-400 transition-colors font-medium">
                {t.logo.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label={t.ariaLabels.mainNavigation}
          >
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
                        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 relative group focus:outline-none focus:ring-2 focus:ring-purple-500/50 ` +
                        (isPending
                          ? "pending"
                          : isActive
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                          : "text-gray-300 hover:text-white hover:bg-purple-500/10 hover:border-purple-500/20 border border-transparent")
                      }
                      aria-label={`${t.ariaLabels.navigateTo} ${item.name}`}
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className="w-4 h-4" aria-hidden="true" />
                          {item.name}
                          {/* Active indicator */}
                          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          {isActive && (
                            <span className="sr-only">(current page)</span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
                {isLoggedIn ? (
                  <div className="relative ml-4" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                      aria-label={`${t.ariaLabels.accountMenu} ${user?.email}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg glass-card hover:bg-purple-500/10 transition-colors border border-purple-500/20 hover:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                      <div
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold"
                        aria-hidden="true"
                      >
                        {user?.email ? getAvatarInitials(user.email) : "U"}
                      </div>
                      <span className="text-xs text-gray-300 max-w-32 truncate">
                        {user?.email}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-purple-400 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {isDropdownOpen && (
                      <div
                        className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl border border-purple-500/30 py-1 z-50 backdrop-blur-xl bg-gray-900/95"
                        role="menu"
                      >
                        <button
                          onClick={handleLogout}
                          role="menuitem"
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-purple-500/10 transition-colors flex items-center gap-2 focus:outline-none focus:bg-purple-500/10"
                        >
                          <LogOut className="w-4 h-4" aria-hidden="true" />
                          {t.auth.logout}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    aria-label={t.ariaLabels.openLoginDialog}
                    className="ml-4 px-4 py-2 rounded-lg text-gray-300 hover:text-white font-medium hover:bg-purple-500/10 transition-colors flex items-center gap-2 border border-purple-500/20 hover:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  >
                    <LogIn className="w-4 h-4" aria-hidden="true" />
                    {t.auth.login}
                  </button>
                )}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={t.ariaLabels.toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-purple-500/10 transition-colors border border-purple-500/20 hover:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-500/20">
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
                            ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-l-2 border-purple-500 shadow-lg shadow-purple-500/10"
                            : "text-gray-300 hover:text-white hover:bg-purple-500/10")
                        }
                      >
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </NavLink>
                    );
                  })}
                  {isLoggedIn ? (
                    <div className="mt-2 border-t border-purple-500/20 pt-2">
                      <div className="flex items-center gap-3 px-4 py-2 text-xs text-gray-400">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                          {user?.email ? getAvatarInitials(user.email) : "U"}
                        </div>
                        <span className="flex-1 truncate">{user?.email}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full mt-1 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300 flex items-center gap-2 justify-center shadow-lg shadow-red-500/20"
                      >
                        <LogOut className="w-5 h-5" />
                        {t.auth.logout}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="mt-2 px-6 py-3 rounded-lg text-gray-300 hover:text-white font-medium hover:bg-purple-500/10 transition-colors flex items-center gap-2 justify-center border border-purple-500/20 hover:border-purple-500/40"
                    >
                      <LogIn className="w-5 h-5" />
                      {t.auth.login}
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
