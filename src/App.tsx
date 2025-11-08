import React from "react";
import { BrowserRouter, useRoutes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { routes } from "./routes/routes";
import "./utils/firebase";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { LanguageProvider } from "./context/LanguageContext";
import { MetaTags } from "./components/layout/Header/MetaTags";
import { ThemeInit } from "../.flowbite-react/init";

function AppRoutes() {
  const element = useRoutes(routes);
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {element && React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <ToastProvider>
            <ThemeInit />
            <MetaTags />
            <AppRoutes />
          </ToastProvider>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
