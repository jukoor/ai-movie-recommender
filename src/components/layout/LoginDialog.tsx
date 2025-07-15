import { Dialog, DialogTitle } from "@headlessui/react";
import { useRef, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [dialogTab, setDialogTab] = useState<"login" | "signup">("login");

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
            onClick={onClose}
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
            onClick={() => {
              setDialogTab("login");
              setLoginError(null);
            }}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
              dialogTab === "signup"
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-600 border border-emerald-200"
            }`}
            onClick={() => {
              setDialogTab("signup");
              setLoginError(null);
            }}
          >
            Create Account
          </button>
        </div>
        {dialogTab === "login" ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setLoginError(null);
              const email = emailRef.current?.value || "";
              const password = passwordRef.current?.value || "";
              try {
                const auth = getAuth();
                await signInWithEmailAndPassword(auth, email, password);
                onClose();
              } catch (err: any) {
                setLoginError(err.message || "Login failed");
              } finally {
                setLoading(false);
              }
            }}
            className="flex flex-col gap-4"
          >
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
            {loginError && (
              <div className="text-red-600 text-sm text-center">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setLoginError(null);
              const email = emailRef.current?.value || "";
              const password = passwordRef.current?.value || "";
              try {
                const auth = getAuth();
                await createUserWithEmailAndPassword(auth, email, password);
                onClose();
              } catch (err: any) {
                setLoginError(err.message || "Account creation failed");
              } finally {
                setLoading(false);
              }
            }}
            className="flex flex-col gap-4"
          >
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
            {loginError && (
              <div className="text-red-600 text-sm text-center">
                {loginError}
              </div>
            )}
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
