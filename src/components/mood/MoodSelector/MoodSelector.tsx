import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Zap } from "lucide-react";

interface Mood {
  id: string;
  emoji: string;
  label: string;
  description: string;
  searchQuery: string;
  color: string;
  bgColor: string;
}

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
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
    bgColor: "bg-yellow-100 hover:bg-yellow-200",
  },
  {
    id: "romantic",
    emoji: "💕",
    label: "Romantic",
    description: "Love stories and romantic comedies",
    searchQuery: "romantic love story romance heartfelt emotional",
    color: "text-pink-600",
    bgColor: "bg-pink-100 hover:bg-pink-200",
  },
  {
    id: "adventurous",
    emoji: "🚀",
    label: "Adventurous",
    description: "Action-packed and thrilling adventures",
    searchQuery: "adventure action thrilling exciting epic journey",
    color: "text-blue-600",
    bgColor: "bg-blue-100 hover:bg-blue-200",
  },
  {
    id: "intense",
    emoji: "🔥",
    label: "Intense",
    description: "High-stakes and adrenaline-pumping",
    searchQuery: "intense action high-stakes adrenaline explosive dramatic",
    color: "text-orange-600",
    bgColor: "bg-orange-100 hover:bg-orange-200",
  },
  {
    id: "peaceful",
    emoji: "🌙",
    label: "Peaceful",
    description: "Calm and relaxing movies",
    searchQuery: "peaceful calm relaxing gentle soothing meditative quiet",
    color: "text-teal-600",
    bgColor: "bg-teal-100 hover:bg-teal-200",
  },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  onMoodSelect,
  selectedMood,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMoodClick = (mood: Mood, index: number) => {
    setCurrentIndex(index);
    onMoodSelect(mood);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    setCurrentIndex(index);
    onMoodSelect(moods[index]);
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
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />

          {/* Mood Labels on Slider */}
          <div className="flex justify-between mt-4 px-2">
            {moods.map((mood, index) => (
              <button
                key={mood.id}
                onClick={() => handleMoodClick(mood, index)}
                className={`flex flex-col items-center transition-all duration-300 ${
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
              <Heart className="w-5 h-5" />
              Find {moods[currentIndex].label} Movies
              <Zap className="w-5 h-5" />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
