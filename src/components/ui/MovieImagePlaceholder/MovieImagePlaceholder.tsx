import React from "react";
import { Film } from "lucide-react";

interface MovieImagePlaceholderProps {
  title: string;
  type?: "poster" | "backdrop";
  className?: string;
}

export const MovieImagePlaceholder: React.FC<MovieImagePlaceholderProps> = ({
  title,
  type = "poster",
  className = "",
}) => {
  const isPoster = type === "poster";

  return (
    <div
      className={`${className} w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700/50 ${
        isPoster ? "h-full" : "aspect-video"
      }`}
      role="img"
      aria-label={`Placeholder for ${title}`}
    >
      <Film className="w-16 h-16 text-gray-600 mb-3" aria-hidden="true" />
      <p className="text-gray-500 text-sm font-medium text-center px-4 line-clamp-2">
        {title}
      </p>
      <p className="text-gray-600 text-xs mt-1">No Image Available</p>
    </div>
  );
};
