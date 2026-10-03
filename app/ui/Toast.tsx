"use client";

import Link from "next/link";
import { useNotifications } from "@/app/lib/NotificationContext";
import styles from "@/app/ui/toast/toast.module.css";

const TYPE_LABELS = {
  queue_update: "Queue update",
  status_change: "Status change",
} as const;

export default function Toast() {
  const { toast, dismissToast } = useNotifications();

  return (
    // The live region stays mounted so screen readers announce new toasts.
    <div className={styles.region} role="status" aria-live="polite">
      {toast && (
        // key restarts the entrance animation when a new toast replaces an old one
        <div key={toast.id} className={styles.toast}>
          <span className={styles.icon} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
          </span>
          <div className={styles.body}>
            <p className={styles.type}>{TYPE_LABELS[toast.type]}</p>
            <p className={styles.message}>{toast.message}</p>
            <Link
              href="/notifications"
              className={styles.link}
              onClick={dismissToast}
            >
              View notifications
            </Link>
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={dismissToast}
            aria-label="Dismiss notification"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
