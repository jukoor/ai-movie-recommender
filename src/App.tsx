import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageLayout } from "./components/global/PageLayouts";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="movies" element={<MoviesPage />} /> */}
          {/* <Route path="favorites" element={<FavoritesPage />} /> */}
          {/* <Route path="search" element={<SearchPage />} /> */}
          {/* <Route path="profile" element={<ProfilePage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
