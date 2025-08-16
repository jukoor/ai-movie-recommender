import { RouteObject } from "react-router-dom";
import { PageLayout } from "../components/layout/PageLayouts";
import { HomePage } from "../pages/HomePage";
import { FavoritesPage } from "../pages/FavoritesPages";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <PageLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "favorites", element: <FavoritesPage /> },
      // { path: "profile", element: <ProfilePage /> },
    ],
  },
];
