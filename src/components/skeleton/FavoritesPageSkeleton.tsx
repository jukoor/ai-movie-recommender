import React from "react";
import { SkeletonCard } from "./SkeletonCard";
import { SkeletonHeadline } from "./SkeletonHeadline";

export const FavoritesPageSkeleton: React.FC = () => {
  return (
    <div>
      <title>Favorites // PopocornAI</title>

      {/* Skeleton headline */}
      <SkeletonHeadline />

      {/* Skeleton movie list */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {/* "Showing X movies" skeleton */}
              <div className="h-5 bg-slate-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>

          {/* Grid of skeleton cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Show 3 skeleton cards as preview */}
            {Array.from({ length: 3 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
