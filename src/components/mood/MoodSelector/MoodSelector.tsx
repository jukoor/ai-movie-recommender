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
    color: "text-yellow-600",
    pageGradient:
      "bg-gradient-to-br from-yellow-100 via-amber-50 to-orange-100",
  },
  {
    id: "peaceful",
    emoji: "🌙",
    label: "Peaceful",
    description: "Calm and relaxing movies",
    searchQuery: "peaceful calm relaxing gentle soothing meditative quiet",
    color: "text-teal-600",
    pageGradient: "bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100",
  },
  {
    id: "romantic",
    emoji: "💕",
    label: "Romantic",
    description: "Love stories and romantic comedies",
    searchQuery: "romantic love story romance heartfelt emotional",
    color: "text-pink-600",
    pageGradient: "bg-gradient-to-br from-pink-100 via-rose-50 to-red-100",
  },
  {
    id: "adventurous",
    emoji: "🚀",
    label: "Adventurous",
    description: "Action-packed and thrilling adventures",
    searchQuery: "adventure action thrilling exciting epic journey",
    color: "text-blue-600",
    pageGradient: "bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100",
  },
  {
    id: "intense",
    emoji: "🔥",
    label: "Intense",
    description: "High-stakes and adrenaline-pumping",
    searchQuery: "intense action high-stakes adrenaline explosive dramatic",
    color: "text-orange-600",
    pageGradient: "bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100",
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
            <p className="text-gray-600 text-sm max-w-xs mx-auto">
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
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:shadow-none"
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
            className="px-8 py-4 rounded-full font-semibold text-white bg-emerald-500 hover:bg-emerald-600 shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <WandSparkles className="w-5 h-5" />
              Find {moods[currentIndex].label} Movies
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
