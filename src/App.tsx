import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";
import "./utils/firebase";
import { AuthProvider } from "./context/AuthContext";

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
