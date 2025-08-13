import { Sparkles, Film, TrendingUp } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-16 max-w-4xl mx-auto">
      <div className="text-center p-6 backdrop-blur-sm bg-white/5 rounded-2xl border-2 hover:bg-white/10 hover:border-black/30 transition-all duration-300">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">AI Powered</h3>
        <p className="text-gray-400 text-sm">
          Advanced machine learning algorithms analyze your preferences
        </p>
      </div>

      <div className="text-center p-6 backdrop-blur-sm bg-white/5 rounded-2xl border-2  hover:bg-white/10 hover:border-black/30 transition-all duration-300">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <Film className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Vast Library</h3>
        <p className="text-gray-400 text-sm">
          Access to millions of movies from every genre and era
        </p>
      </div>

      <div className="text-center p-6 backdrop-blur-sm bg-white/5 rounded-2xl border-2 hover:bg-white/10 hover:border-black/30 transition-all duration-300">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Personalized</h3>
        <p className="text-gray-400 text-sm">
          Recommendations that get better with every interaction
        </p>
      </div>
    </div>
  );
};
