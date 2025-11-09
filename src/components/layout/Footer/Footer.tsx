import { useLanguage } from "../../../hooks/useLanguage";

export const Footer = () => {
  const { t } = useLanguage();
  const footerT = t.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-transparent via-gray-100/50 dark:via-gray-900/50 to-gray-200 dark:to-gray-900 backdrop-blur-sm border-t border-gray-200 dark:border-white/10">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100/20 dark:from-black/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        {/* Main footer content */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="relative w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg"></div>
              <span className="relative text-xl" aria-hidden="true">
                🍿
              </span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {footerT.appName}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {footerT.tagline}
          </p>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-300 dark:border-white/10 pt-8 text-gray-600 dark:text-gray-400 text-sm flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
          <p>
            &copy; {currentYear} {footerT.copyright}
          </p>
          <p className="flex items-center gap-1">
            {footerT.codedWith}{" "}
            <span className="text-red-400 animate-pulse">♥</span> {footerT.by}{" "}
            <a
              href={footerT.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 dark:text-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors duration-300 underline decoration-purple-500/50 dark:decoration-purple-400/50 hover:decoration-purple-600 dark:hover:decoration-purple-300 underline-offset-2"
            >
              {footerT.authorName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
