import { useEffect, useState } from "react";
import "./Toast.css";

export type ToastType = "success" | "error" | "loading" | "info";

export interface ToastMessage {
  id: number;
  type: ToastType;
  title: string;
  desc?: string;
  duration?: number;
}

interface ToastProps {
  toasts: ToastMessage[];
  remove: (id: number) => void;
}

const ICONS: Record<ToastType, string> = {
  success: "✅",
  error:   "❌",
  loading: "⏳",
  info:    "ℹ️",
};

export default function Toast({ toasts, remove }: ToastProps) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} remove={remove} />
      ))}
    </div>
  );
}

function ToastItem({ toast, remove }: { toast: ToastMessage; remove: (id: number) => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // mount animation
    requestAnimationFrame(() => setVisible(true));
    if (toast.type !== "loading") {
      const t = setTimeout(() => {
        setVisible(false);
        setTimeout(() => remove(toast.id), 300);
      }, toast.duration || 3500);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className={`toast-item toast-${toast.type} ${visible ? "toast-visible" : ""}`}>
      <span className="toast-icon">{ICONS[toast.type]}</span>
      <div className="toast-body">
        <div className="toast-title">{toast.title}</div>
        {toast.desc && <div className="toast-desc">{toast.desc}</div>}
      </div>
      {toast.type !== "loading" && (
        <button className="toast-close" onClick={() => remove(toast.id)}>✕</button>
      )}
      {toast.type === "loading" && (
        <div className="toast-spinner" />
      )}
    </div>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
let _id = 0;
export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const add = (msg: Omit<ToastMessage, "id">) => {
    const id = ++_id;
    setToasts(t => [...t, { ...msg, id }]);
    return id;
  };

  const remove = (id: number) => setToasts(t => t.filter(x => x.id !== id));

  const success = (title: string, desc?: string) => add({ type: "success", title, desc });
  const error   = (title: string, desc?: string) => add({ type: "error",   title, desc });
  const loading = (title: string, desc?: string) => add({ type: "loading", title, desc });
  const info    = (title: string, desc?: string) => add({ type: "info",    title, desc });

  const dismiss = (id: number) => remove(id);

  return { toasts, remove, success, error, loading, info, dismiss };
}
