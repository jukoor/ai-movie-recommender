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
import { useLanguage } from "../../../hooks/useLanguage";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const { t } = useLanguage();
  const loginT = t.loginDialog;
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
      showToast(loginT.toast.loginSuccess, "success");
      onClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : loginT.toast.loginError;
      showToast(errorMessage, "error");
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
      showToast(loginT.toast.signupSuccess, "success");
      onClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : loginT.toast.signupError;
      showToast(errorMessage, "error");
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
      showToast(loginT.toast.demoSuccess, "success");
      onClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : loginT.toast.demoError;
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="relative glass-card rounded-lg shadow-2xl max-w-md w-full mx-auto border border-gray-200 dark:border-gray-700/30 overflow-hidden animate-fadeInUp bg-white dark:bg-gray-900">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-emerald-700/90 px-8 py-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold text-white">
                {dialogTab === "login"
                  ? loginT.titles.login
                  : loginT.titles.signup}
              </DialogTitle>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
              aria-label={loginT.form.closeLabel}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-emerald-100 mt-2 relative">
            {dialogTab === "login"
              ? loginT.subtitles.login
              : loginT.subtitles.signup}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Tab switcher */}
          <div
            className="flex gap-1 mb-8 p-1 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
            role="tablist"
            aria-label={loginT.tabs.ariaLabel}
          >
            <button
              role="tab"
              aria-selected={dialogTab === "login"}
              aria-controls="login-panel"
              id="login-tab"
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                dialogTab === "login"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 shadow-sm border border-emerald-500/20"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700/30"
              }`}
              onClick={handleLoginTabClick}
            >
              {loginT.tabs.login}
            </button>
            <button
              role="tab"
              aria-selected={dialogTab === "signup"}
              aria-controls="signup-panel"
              id="signup-tab"
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                dialogTab === "signup"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 shadow-sm border border-emerald-500/20"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700/30"
              }`}
              onClick={handleSignupTabClick}
            >
              {loginT.tabs.signup}
            </button>
          </div>

          <div
            id={dialogTab === "login" ? "login-panel" : "signup-panel"}
            role="tabpanel"
            aria-labelledby={dialogTab === "login" ? "login-tab" : "signup-tab"}
          >
            {dialogTab === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <label htmlFor="login-email" className="sr-only">
                      {loginT.form.emailLabel}
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={emailRef}
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder={loginT.form.emailPlaceholder}
                      required
                      autoComplete="email"
                      aria-required="true"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 transition-all duration-200 placeholder-gray-400 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="login-password" className="sr-only">
                      {loginT.form.passwordLabel}
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={passwordRef}
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder={loginT.form.passwordPlaceholder}
                      required
                      autoComplete="current-password"
                      aria-required="true"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-700 transition-all duration-200 placeholder-gray-400 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    aria-disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                          role="status"
                          aria-label={loginT.form.signingIn}
                        ></div>
                        {loginT.form.signingIn}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <LogIn className="w-5 h-5" aria-hidden="true" />
                        {loginT.form.loginButton}
                      </div>
                    )}
                  </button>

                  <div
                    className="relative"
                    role="separator"
                    aria-label={loginT.demo.divider}
                  >
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600/50"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300">
                        {loginT.demo.divider}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    disabled={loading}
                    aria-disabled={loading}
                    aria-label={loginT.demo.info}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-lg px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" aria-hidden="true" />
                    {loading ? loginT.demo.loading : loginT.demo.button}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <label htmlFor="signup-email" className="sr-only">
                      {loginT.form.emailLabel}
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={emailRef}
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder={loginT.form.emailPlaceholder}
                      required
                      autoComplete="email"
                      aria-required="true"
                      className="w-full pl-10 pr-4 py-3 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-800 focus:bg-gray-700 transition-all duration-200 placeholder-gray-400 text-white"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="signup-password" className="sr-only">
                      {loginT.form.passwordLabel}
                    </label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      ref={passwordRef}
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder={loginT.form.passwordPlaceholder}
                      required
                      autoComplete="new-password"
                      aria-required="true"
                      aria-describedby="password-requirements"
                      className="w-full pl-10 pr-4 py-3 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-gray-800 focus:bg-gray-700 transition-all duration-200 placeholder-gray-400 text-white"
                    />
                    <p id="password-requirements" className="sr-only">
                      {loginT.form.passwordRequirements}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  aria-disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-transparent transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        role="status"
                        aria-label={loginT.form.creatingAccount}
                      ></div>
                      {loginT.form.creatingAccount}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <UserPlus className="w-5 h-5" aria-hidden="true" />
                      {loginT.form.signupButton}
                    </div>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};
