import React from "react";
import { BrowserRouter, useRoutes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { routes } from "./routes/routes";
import "./utils/firebase";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

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
    <AuthProvider>
      <BrowserRouter>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
