import React from "react";
import {
  Sparkles,
  Heart,
  Brain,
  Code,
  Film,
  Server,
  Zap,
  Search,
  Database,
  Shield,
  Rocket,
} from "lucide-react";
import { PageTitle } from "../components/layout/Header/PageTitle";
import { MetaTags } from "../components/layout/Header/MetaTags";
import { useLanguage } from "../context/LanguageContext";

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const aboutT = t.about;

  return (
    <main className="min-h-screen relative overflow-hidden">
      <PageTitle title={aboutT.pageTitle} />
      <MetaTags
        title="About PopcornAI - AI Movie Recommendation Technology"
        description="Learn how PopcornAI uses advanced AI technology and TMDB data to deliver personalized movie recommendations. Discover the tech stack behind our intelligent film discovery platform."
        canonical="https://popcornai.app/about"
        ogUrl="https://popcornai.app/about"
      />

      {/* Dark background with gradient overlay */}
      <div
        className="absolute inset-0 bg-hero-gradient pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 pt-20 pb-16 px-4">
        <article className="min-h-screen text-gray-100 mx-auto max-w-5xl">
          {/* Hero Section */}
          <header className="relative overflow-hidden">
            <div className="relative max-w-4xl mx-auto px-4 py-1">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4 animate-fadeIn">
                  <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-fadeIn">
                    {aboutT.hero.title}
                  </h1>
                </div>
                <p
                  className="text-xl text-gray-300 max-w-2xl mx-auto animate-fadeIn"
                  style={{ animationDelay: "200ms", animationFillMode: "both" }}
                >
                  {aboutT.hero.subtitle}
                </p>
              </div>
            </div>
          </header>

          {/* Mission Section */}
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl mb-6">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-white">
                {aboutT.mission.title}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                {aboutT.mission.description}
              </p>
            </div>
          </div>

          {/* Core Features Section */}
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl mb-6">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">
                {aboutT.coreFeatures.title}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {aboutT.coreFeatures.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* AI-Powered Recommendations */}
              <div className="group p-6 rounded-xl glass-card border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-purple-500/30 transition-colors">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {aboutT.coreFeatures.aiRecommendations.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {aboutT.coreFeatures.aiRecommendations.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mood-Based Search */}
              <div className="group p-6 rounded-xl glass-card border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-500/30 transition-colors">
                    <Search className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {aboutT.coreFeatures.moodSearch.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {aboutT.coreFeatures.moodSearch.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* User Authentication */}
              <div className="group p-6 rounded-xl glass-card border border-gray-700/30 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-yellow-500/30 transition-colors">
                    <Shield className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {aboutT.coreFeatures.authentication.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {aboutT.coreFeatures.authentication.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Favorites Management */}
              <div className="group p-6 rounded-xl glass-card border border-gray-700/30 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-pink-500/30 transition-colors">
                    <Heart className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {aboutT.coreFeatures.favorites.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {aboutT.coreFeatures.favorites.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Movie Database */}
              <div className="group p-6 rounded-xl glass-card border border-gray-700/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-500/30 transition-colors">
                    <Database className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {aboutT.coreFeatures.movieDatabase.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {aboutT.coreFeatures.movieDatabase.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed Movie Info */}
              <div className="group p-6 rounded-xl glass-card border border-gray-700/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-cyan-500/30 transition-colors">
                    <Film className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {aboutT.coreFeatures.richDetails.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {aboutT.coreFeatures.richDetails.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-6">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-white">
                {aboutT.techStack.title}
              </h2>
            </div>

            <div className="space-y-8">
              {/* Frontend */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  {aboutT.techStack.frontend}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.react.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.react.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.typescript.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.typescript.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.tailwind.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.tailwind.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-blue-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.flowbite.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.flowbite.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.lucide.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.lucide.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.framerMotion.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.framerMotion.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend & Database */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  {aboutT.techStack.backend}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Server className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.express.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.express.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.firebaseAuth.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.firebaseAuth.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                      <Server className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.firebaseDb.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.firebaseDb.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Build Tools & APIs */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  {aboutT.techStack.buildTools}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.vite.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.vite.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <Film className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.tmdb.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.tmdb.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 rounded-xl glass-card border border-gray-700/30">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {aboutT.techStack.technologies.openrouter.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {aboutT.techStack.technologies.openrouter.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};
