import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ScrollToTop } from "./ScrollToTop";

export const PageLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main>
        <ScrollToTop />
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
