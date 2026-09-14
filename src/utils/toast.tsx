import toast from "react-hot-toast";

export const ShowCustomToast = {
  success: (message: string) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-[toast-enter_0.3s_ease-out]" : "animate-[toast-leave_0.2s_ease-in]"
        } max-w-sm w-full bg-white shadow-custom-md rounded-custom-lg pointer-events-none flex items-center p-4 border border-surface-border border-l-4 border-l-status-success space-x-3`}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-status-success/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-status-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-brand-navy">{message}</p>
        </div>
      </div>
    ));
  },

  error: (message: string) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-[toast-enter_0.3s_ease-out]" : "animate-[toast-leave_0.2s_ease-in]"
        } max-w-sm w-full bg-white shadow-custom-md rounded-custom-lg pointer-events-none flex items-center p-4 border border-surface-border border-l-4 border-l-status-error space-x-3`}
      >
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-status-error/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-status-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-brand-navy">{message}</p>
        </div>
      </div>
    ));
  },
};
