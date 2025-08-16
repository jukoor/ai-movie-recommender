import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Trash2, X } from "lucide-react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  message?: string;
  count?: number;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Delete favorites?",
  message = "This action cannot be undone.",
  count,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 bg-gray-900 rounded-lg shadow-xl p-6">
          {/* Close button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center">
              <Trash2 className="h-12 w-12 text-red-500" />
            </div>
            <DialogTitle className="mb-4 text-lg font-semibold text-white">
              {count !== undefined
                ? `Delete ${count} favorite${count !== 1 ? "s" : ""}?`
                : title}
            </DialogTitle>
            <p className="mb-6 text-sm text-gray-300">
              {count !== undefined && count > 0
                ? `You're about to delete ${count} movie${
                    count !== 1 ? "s" : ""
                  } from your favorites. ${message}`
                : message}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="py-2.5 px-5 text-sm font-medium text-gray-300 focus:outline-none bg-transparent rounded-lg border border-gray-600 hover:bg-gray-800 focus:z-10 focus:ring-4 focus:ring-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
