import React from "react";
import { Sparkles, Heart, Brain, Code, Film, Server, Zap } from "lucide-react";
import { PageTitle } from "../components/layout/Header/PageTitle";

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <PageTitle title="About" />

      {/* Dark background with gradient overlay */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none"></div>

      <div className="relative z-10 pt-20 pb-16 px-4">
        <div className="min-h-screen text-gray-100 mx-auto max-w-5xl">
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            <div className="relative max-w-4xl mx-auto px-6 py-20">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  About PopcornAI
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Modern movie recommendations app powered by React and AI
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white">
                How It Works
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                PopcornAI combines movie data from TMDB with AI technology
                (mistral-7b) to create personalized movie recommendations
                tailored to your preferences. You can search using free text,
                tags, or mood-based input. Your prompt gets preprocessed and
                sent to our AI model, which generates a curated list of movie
                titles. These titles are then cross-referenced with the TMDB
                database to pull in detailed movie information and metadata.
              </p>
            </div>
          </div>

          {/* Features Section */}
          {/* <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Smart AI Engine
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Advanced algorithms analyze your preferences to deliver
                  personalized movie suggestions
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <Film className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Vast Movie Database
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Access thousands of films across genres, decades, and cultures
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
                  <Zap className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Instant Results
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Get lightning-fast recommendations tailored to your mood and
                  taste
                </p>
              </div>
            </div>
          </div> */}

          {/* Tech Stack Section */}
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-6">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">Tech Stack</h2>
            </div>

            <div className="space-y-8">
              {/* Frontend */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Frontend
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">React</h4>
                      <p className="text-sm text-gray-400">UI framework</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">TypeScript</h4>
                      <p className="text-sm text-gray-400">Type safety</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Tailwind CSS</h4>
                      <p className="text-sm text-gray-400">Styling</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Flowbite</h4>
                      <p className="text-sm text-gray-400">UI components</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Lucide Icons</h4>
                      <p className="text-sm text-gray-400">Icon library</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        Framer Motion
                      </h4>
                      <p className="text-sm text-gray-400">
                        Animation framework
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend & Database */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Backend & Database
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Server className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Express.js</h4>
                      <p className="text-sm text-gray-400">Backend server</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        Firebase Auth
                      </h4>
                      <p className="text-sm text-gray-400">Authentication</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                      <Server className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Firebase DB</h4>
                      <p className="text-sm text-gray-400">NoSQL database</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Build Tools & APIs */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Build Tool & APIs
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Vite</h4>
                      <p className="text-sm text-gray-400">Build tool</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Film className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">TMDB API</h4>
                      <p className="text-sm text-gray-400">Movie database</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">OpenRouter</h4>
                      <p className="text-sm text-gray-400">
                        LLM integration (mistral-7b)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
