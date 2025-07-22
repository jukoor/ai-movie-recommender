// toast/ToastContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const toastTemplates = {
    success: {
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      ),
      iconClass:
        "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200",
      containerClass: "bg-white dark:bg-gray-800",
    },
    error: {
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>
      ),
      iconClass: "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200",
      containerClass: "bg-white dark:bg-gray-800",
    },
    info: {
      icon: (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <circle cx="10" cy="10" r="9" />
          <rect x="9" y="7" width="2" height="6" rx="1" />
          <rect x="9" y="5" width="2" height="2" rx="1" />
        </svg>
      ),
      iconClass:
        "text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200",
      containerClass: "bg-white dark:bg-gray-800",
    },
  };
  // ...existing code...

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => {
          const template = toastTemplates[toast.type];
          return (
            <div
              key={toast.id}
              className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 rounded-lg shadow-sm dark:text-gray-400 ${template.containerClass}`}
              role="alert"
            >
              <div
                className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${template.iconClass}`}
              >
                {template.icon}
                <span className="sr-only">
                  {toast.type === "success"
                    ? "Check icon"
                    : toast.type === "error"
                    ? "Error icon"
                    : "Info icon"}
                </span>
              </div>
              <div className="ms-3 text-sm font-normal">{toast.message}</div>
              <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-label="Close"
                onClick={() =>
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                }
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useShowToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
