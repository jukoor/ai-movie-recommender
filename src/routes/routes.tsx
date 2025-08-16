import { RouteObject } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { FavoritesPage } from "../pages/FavoritesPages";
import { PageLayout } from "../components/layout/PageLayout/PageLayout";

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
