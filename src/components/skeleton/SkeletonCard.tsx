import React from "react";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative overflow-hidden">
        <div className="w-full h-80 bg-slate-200"></div>
        {/* Rating badge skeleton */}
        <div className="absolute top-4 right-4 bg-slate-200 rounded-full w-16 h-6"></div>
        {/* Favorite button skeleton */}
        <div className="absolute top-4 left-4 bg-slate-200 rounded-full w-9 h-9"></div>
      </div>

      {/* Content skeleton */}
      <div className="p-6">
        {/* Title skeleton */}
        <div className="mb-3">
          <div className="h-6 bg-slate-200 rounded w-4/5 mb-2"></div>
          <div className="h-6 bg-slate-200 rounded w-3/5"></div>
        </div>

        {/* Date skeleton */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-4 bg-slate-200 rounded w-20"></div>
        </div>

        {/* Genre tags skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-slate-200 rounded-full w-16"></div>
          <div className="h-6 bg-slate-200 rounded-full w-20"></div>
          <div className="h-6 bg-slate-200 rounded-full w-14"></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};
