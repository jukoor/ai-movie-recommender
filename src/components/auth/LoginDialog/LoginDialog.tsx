import { Dialog, DialogTitle } from "@headlessui/react";
import { useRef, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useShowToast } from "../../../context/ToastContext";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Sparkles,
  LogIn,
  UserPlus,
} from "lucide-react";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const { showToast } = useShowToast();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [dialogTab, setDialogTab] = useState<"login" | "signup">("login");

  // Handler for login form submission
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Welcome back! You've successfully logged in.", "success");
      onClose();
    } catch (err: any) {
      showToast(err.message || "Login failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handler for signup form submission
  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await initializeUserLists(userCredential.user);
      showToast(
        "Account created successfully! Welcome to PopcornAI!",
        "success"
      );
      onClose();
    } catch (err: any) {
      showToast(
        err.message || "Account creation failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handler for demo login
  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, "demo@popcornai.com", "demo123");
      showToast(
        "Welcome to the demo! Explore PopcornAI's features.",
        "success"
      );
      onClose();
    } catch (err: any) {
      showToast(err.message || "Demo login failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Create default lists on user account creation
  async function initializeUserLists(user: User) {
    const db = getFirestore();

    const baseLists = ["watchlist", "favorites", "watched"];

    for (const listName of baseLists) {
      await setDoc(doc(db, "users", user.uid, "movieLists", listName), {
        title: listName.charAt(0).toUpperCase() + listName.slice(1),
        movies: [],
        creationDate: new Date(),
      });
    }
  }

  // Handler for closing the dialog
  const handleClose = () => {
    onClose();
  };

  // Handler for switching to login tab
  const handleLoginTabClick = () => {
    setDialogTab("login");
  };

  // Handler for switching to signup tab
  const handleSignupTabClick = () => {
    setDialogTab("signup");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />
      <div className="relative glass-card rounded-lg shadow-2xl max-w-md w-full mx-auto border border-gray-700/30 overflow-hidden animate-fadeInUp">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-emerald-700/90 px-8 py-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-white">
                {dialogTab === "login" ? "Welcome Back" : "Join PopcornAI"}
              </DialogTitle>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-emerald-100 mt-2 relative">
            {dialogTab === "login"
              ? "Sign in to discover your next favorite movie"
              : "Create your account to get personalized recommendations"}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Tab switcher */}
          <div className="flex gap-1 mb-8 p-1 bg-gray-800/30 rounded-lg border border-gray-700/30">
            <button
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                dialogTab === "login"
                  ? "bg-emerald-500/15 text-emerald-300 shadow-sm border border-emerald-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/30"
              }`}
              onClick={handleLoginTabClick}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                dialogTab === "signup"
                  ? "bg-emerald-500/15 text-emerald-300 shadow-sm border border-emerald-500/20"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/30"
              }`}
              onClick={handleSignupTabClick}
            >
              Sign Up
            </button>
          </div>

          {dialogTab === "login" ? (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-800/30 focus:bg-gray-800/50 transition-all duration-200 placeholder-gray-400 text-white"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Enter your password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-800/30 focus:bg-gray-800/50 transition-all duration-200 placeholder-gray-400 text-white"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <LogIn className="w-5 h-5" />
                      Sign In
                    </div>
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600/50"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 glass-card text-gray-300">or</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  {loading ? "Accessing demo..." : "Try Demo Account"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-800/30 focus:bg-gray-800/50 transition-all duration-200 placeholder-gray-400 text-white"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Create a password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-800/30 focus:bg-gray-800/50 transition-all duration-200 placeholder-gray-400 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </div>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </Dialog>
  );
};
