import React, { useState } from "react";
import { motion } from "framer-motion";
import { WandSparkles } from "lucide-react";
import { Mood } from "../../../types/Mood";

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  onMoodChange?: (mood: Mood) => void;
  selectedMood: Mood | null;
}

const moods: Mood[] = [
  {
    id: "happy",
    emoji: "😊",
    label: "Happy",
    description: "Uplifting and feel-good movies",
    searchQuery: "uplifting feel-good comedy heartwarming positive",
    color: "text-yellow-400",
    pageGradient:
      "radial-gradient(ellipse at center, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 80%)",
  },
  {
    id: "peaceful",
    emoji: "🌙",
    label: "Peaceful",
    description: "Calm and relaxing movies",
    searchQuery: "peaceful calm relaxing gentle soothing meditative quiet",
    color: "text-teal-400",
    pageGradient:
      "radial-gradient(ellipse at center, rgba(20, 184, 166, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)",
  },
  {
    id: "romantic",
    emoji: "💕",
    label: "Romantic",
    description: "Love stories and romantic comedies",
    searchQuery: "romantic love story romance heartfelt emotional",
    color: "text-pink-400",
    pageGradient:
      "radial-gradient(ellipse at center, rgba(236, 72, 153, 0.1) 0%, rgba(219, 39, 119, 0.05) 50%, transparent 80%)",
  },
  {
    id: "adventurous",
    emoji: "🚀",
    label: "Adventurous",
    description: "Action-packed and thrilling adventures",
    searchQuery: "adventure action thrilling exciting epic journey",
    color: "text-blue-400",
    pageGradient:
      "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, rgba(14, 165, 233, 0.05) 50%, transparent 80%)",
  },
  {
    id: "intense",
    emoji: "🔥",
    label: "Intense",
    description: "High-stakes and adrenaline-pumping",
    searchQuery: "intense action high-stakes adrenaline explosive dramatic",
    color: "text-orange-400",
    pageGradient:
      "radial-gradient(ellipse at center, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.05) 50%, transparent 80%)",
  },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  onMoodSelect,
  onMoodChange,
  selectedMood,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMoodClick = (mood: Mood, index: number) => {
    setCurrentIndex(index);
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    setCurrentIndex(index);
    if (onMoodChange) {
      onMoodChange(moods[index]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Mood Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative"
      >
        {/* Emoji Display */}
        <div className="flex justify-center items-center mb-8">
          <motion.div
            key={currentIndex}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <motion.div
              animate={{
                rotate: [0, -5, 5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.6,
                repeat:
                  selectedMood?.id === moods[currentIndex].id ? Infinity : 0,
                repeatDelay: 2,
              }}
              className="text-8xl mb-4"
            >
              {moods[currentIndex].emoji}
            </motion.div>
            <h3
              className={`text-2xl font-bold ${moods[currentIndex].color} mb-2`}
            >
              {moods[currentIndex].label}
            </h3>
            <p className="text-gray-300 text-sm max-w-xs mx-auto">
              {moods[currentIndex].description}
            </p>
          </motion.div>
        </div>

        {/* Custom Slider */}
        <div className="relative mb-8">
          <input
            type="range"
            min="0"
            max={moods.length - 1}
            value={currentIndex}
            onChange={handleSliderChange}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:shadow-none slider-thumb"
          />

          {/* Mood Labels on Slider */}
          <div className="flex justify-between mt-4 px-2">
            {moods.map((mood, index) => (
              <button
                key={mood.id}
                onClick={() => handleMoodClick(mood, index)}
                className={`flex flex-col items-center transition-all duration-300 focus:outline-none focus:shadow-none ${
                  index === currentIndex
                    ? "transform scale-110"
                    : "opacity-60 hover:opacity-80"
                }`}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <span
                  className={`text-xs font-medium ${mood.color} hidden sm:block`}
                >
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onMoodSelect(moods[currentIndex])}
            className="group relative px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-500/20 overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="relative z-10 flex items-center gap-2">
              <WandSparkles className="w-5 h-5" />
              Find {moods[currentIndex].label} Movies
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
