import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Film, Home, Star, User, Search, Menu, X } from "lucide-react";
import { useState } from "react";

export const PageLayout: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    // { name: "Movies", href: "/movies", icon: Film },
    // { name: "Favorites", href: "/favorites", icon: Star },
    // { name: "Search", href: "/search", icon: Search },
    // { name: "Profile", href: "/profile", icon: User },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
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
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-600 rounded-lg">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">CineVault</span>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-md">
                Your ultimate destination for discovering and exploring the
                world of cinema. From timeless classics to modern masterpieces.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link
                    to="/movies"
                    className="hover:text-white transition-colors"
                  >
                    Browse Movies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className="hover:text-white transition-colors"
                  >
                    My Favorites
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    className="hover:text-white transition-colors"
                  >
                    Advanced Search
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-white transition-colors"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Settings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 CineVault. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
