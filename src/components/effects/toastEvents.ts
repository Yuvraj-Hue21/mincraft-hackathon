export interface ToastItem {
  id: number;
  message: string;
  type?: "success" | "info" | "error";
  icon?: string;
}

export type ToastListener = (toast: Omit<ToastItem, "id"> & { id?: number }) => void;

const listeners = new Set<ToastListener>();
let nextId = 1;

export function toast(message: string, opts?: { type?: ToastItem["type"]; icon?: string }) {
  listeners.forEach((l) => l({ message, type: opts?.type ?? "info", icon: opts?.icon, id: nextId++ }));
}

export function onToast(listener: ToastListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}