import { Sparkles, Film, TrendingUp } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <div className="relative px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Why Choose Our AI?
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* AI Powered Feature */}
        <div className="group relative">
          <div className="glass-card glass-card-hover text-center p-8 rounded-3xl h-full">
            {/* Floating icon with glow */}
            <div className="relative mb-6 inline-block">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-3 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
              AI Powered
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Advanced machine learning algorithms analyze your preferences and
              mood to deliver perfectly tailored recommendations
            </p>

            {/* Animated background particles */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-1 h-1 bg-pink-400/50 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>

        {/* Vast Library Feature */}
        <div className="group relative">
          <div className="glass-card glass-card-hover text-center p-8 rounded-3xl h-full">
            {/* Floating icon with glow */}
            <div className="relative mb-6 inline-block">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                <Film className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-3 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">
              Vast Library
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Access to millions of movies from every genre, era, and culture.
              From blockbusters to hidden gems
            </p>

            {/* Animated background particles */}
            <div className="absolute top-6 left-4 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse delay-150"></div>
            <div className="absolute bottom-4 right-8 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>

        {/* Personalized Feature */}
        <div className="group relative">
          <div className="glass-card glass-card-hover text-center p-8 rounded-3xl h-full">
            {/* Floating icon with glow */}
            <div className="relative mb-6 inline-block">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-3 bg-gradient-to-br from-emerald-500/30 to-green-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-300 transition-colors duration-300">
              Personalized
            </h3>
            <p className="text-gray-300 text-base leading-relaxed">
              Smart recommendations that evolve and improve with every
              interaction, learning your unique taste
            </p>

            {/* Animated background particles */}
            <div className="absolute top-8 right-6 w-1 h-1 bg-emerald-400/40 rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-8 left-4 w-1.5 h-1.5 bg-green-400/50 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="mt-16 text-center">
        <div className="inline-block">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
