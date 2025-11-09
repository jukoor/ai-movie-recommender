import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Sparkles, X, LogIn } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

interface AuthRequiredDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export const AuthRequiredDialog: React.FC<AuthRequiredDialogProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
}) => {
  const { t } = useLanguage();
  const authRequiredT = t.authRequiredDialog;

  const handleLoginClick = () => {
    onClose();
    onOpenLogin();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 bg-gray-900 rounded-lg shadow-xl p-6 border border-gray-800">
          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 transition-colors"
              aria-label={t.common.close}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full">
              <Sparkles className="h-8 w-8 text-purple-400" />
            </div>

            {/* Title */}
            <DialogTitle className="text-2xl font-bold text-white mb-2">
              {authRequiredT.title}
            </DialogTitle>

            {/* Message */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              {authRequiredT.message}
            </p>

            {/* Demo Account Info */}
            <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700">
              <p className="text-sm text-gray-300 mb-2">
                <span className="font-semibold text-purple-400">
                  {authRequiredT.demoInfo.title}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                {authRequiredT.demoInfo.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLoginClick}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
              >
                <LogIn className="h-5 w-5" />
                {authRequiredT.buttons.login}
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 px-6 rounded-lg transition-all duration-200 border border-gray-700"
              >
                {authRequiredT.buttons.later}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
