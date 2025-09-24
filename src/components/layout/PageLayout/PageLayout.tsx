import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ScrollToTop } from "./ScrollToTop";

export const PageLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-gradient text-white">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="relative">
        <ScrollToTop />
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
