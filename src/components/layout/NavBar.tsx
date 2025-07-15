import { Film, X, Menu, Home } from "lucide-react";
import { LoginDialog } from "./LoginDialog";
import { useRef, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const navigation = [
    { name: "Home", href: "/", icon: Home },
    // { name: "Movies", href: "/movies", icon: Film },
    // { name: "Favorites", href: "/favorites", icon: Star },
    // { name: "Search", href: "/search", icon: Search },
    // { name: "Profile", href: "/profile", icon: User },
  ];

  // Todo: Replace
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
              CineVault
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
            {isLoggedIn ? (
              <button
                onClick={async () => {
                  await signOut(getAuth());
                  setIsLoggedIn(false);
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
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
              {isLoggedIn ? (
                <button
                  onClick={async () => {
                    await signOut(getAuth());
                    setIsLoggedIn(false);
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
            setIsLoggedIn(true);
          }}
        />
      </div>
    </header>
  );
};
