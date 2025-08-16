import React from "react";

export const SkeletonHeadline: React.FC = () => {
  return (
    <div className="text-center mb-12 mt-16 animate-pulse">
      <div className="flex items-center justify-center gap-3 mb-4">
        {/* Icon skeleton */}
        <div className="w-8 h-8 bg-slate-200 rounded"></div>
        {/* Title skeleton */}
        <div className="h-10 bg-slate-200 rounded w-48"></div>
      </div>
      {/* Description skeleton */}
      <div className="mx-auto max-w-2xl">
        <div className="h-6 bg-slate-200 rounded w-96 mx-auto mb-2"></div>
        <div className="h-6 bg-slate-200 rounded w-80 mx-auto"></div>
      </div>
    </div>
  );
};
