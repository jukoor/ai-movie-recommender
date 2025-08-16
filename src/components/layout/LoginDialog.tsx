import { Dialog, DialogTitle } from "@headlessui/react";
import { useRef, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useShowToast } from "../../context/ToastContext";

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
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="relative bg-gradient-to-br from-white via-emerald-50 to-white rounded-2xl shadow-2xl max-w-sm w-full p-8 mx-auto border border-emerald-100">
        <div className="flex justify-between items-center mb-6">
          <DialogTitle className="text-2xl font-extrabold text-emerald-700">
            {dialogTab === "login" ? "Login" : "Create Account"}
          </DialogTitle>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Close"
          >
            {/* X icon */}
            <span className="text-xl">×</span>
          </button>
        </div>
        <div className="flex gap-2 mb-6">
          <button
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
              dialogTab === "login"
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-600 border border-emerald-200"
            }`}
            onClick={handleLoginTabClick}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
              dialogTab === "signup"
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-600 border border-emerald-200"
            }`}
            onClick={handleSignupTabClick}
          >
            Create Account
          </button>
        </div>

        {dialogTab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              required
              className="border border-emerald-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
              className="border border-emerald-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow"
            >
              {loading ? "Logging in..." : "Try Demo Account"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              required
              className="border border-emerald-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
              className="border border-emerald-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </Dialog>
  );
};
