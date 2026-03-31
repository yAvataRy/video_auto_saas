import { ref, readonly } from "vue";

type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

const toasts = ref<Toast[]>([]);

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 6)}`;

export const useAppToast = () => {
  const addToast = (
    message: string,
    type: ToastType = "success",
    duration = 3000,
  ) => {
    const id = generateId();
    const toast: Toast = {
      id,
      message,
      type,
      duration,
    };
    toasts.value.push(toast);

    setTimeout(() => {
      const index = toasts.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        toasts.value.splice(index, 1);
      }
    }, duration);

    return toast;
  };

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      toasts.value.splice(index, 1);
    }
  };

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
  };
};
