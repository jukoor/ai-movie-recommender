export const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="border-t border-slate-700 mt-8 pt-8 text-slate-400 text-sm flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <p>&copy; 2025 AI Movie Recommender. All rights reserved.</p>
          <p>
            Coded by{" "}
            <a
              href="https://julianorth.de"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline" }}
            >
              Julian Orth
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
