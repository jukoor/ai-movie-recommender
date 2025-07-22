import { RouteObject } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayouts";
import { HomePage } from "../pages/HomePage";
import { FavoritesPage } from "../pages/FavoritesPages";
import SearchPage from "../pages/SearchPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <HomePage /> },
      // { path: "movies", element: <MoviesPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "search", element: <SearchPage /> },
      // { path: "profile", element: <ProfilePage /> },
    ],
  },
];
