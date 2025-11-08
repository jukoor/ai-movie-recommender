import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ScrollToTop } from "./ScrollToTop";

export const PageLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-gradient text-white">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        Skip to main content
      </a>

      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main id="main-content" className="relative" role="main">
        <ScrollToTop />
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
