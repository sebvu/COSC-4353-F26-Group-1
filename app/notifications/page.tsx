"use client";

import { useMemo, useState } from "react";
import { useNotifications } from "@/app/lib/NotificationContext";
import type { AppNotification } from "@/app/lib/types";
import styles from "@/app/ui/notifications/notifications.module.css";

type Filter = "all" | "unread";

const TYPE_LABELS: Record<AppNotification["type"], string> = {
  queue_update: "Queue update",
  status_change: "Status change",
};

function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function TypeIcon({ type }: { type: AppNotification["type"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "status_change" ? (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </>
      ) : (
        <>
          <path d="M8 6h13M8 12h13M8 18h13" />
          <path d="M3 6h.01M3 12h.01M3 18h.01" />
        </>
      )}
    </svg>
  );
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();
  const [filter, setFilter] = useState<Filter>("all");

  const sorted = useMemo(
    () =>
      [...notifications].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    [notifications]
  );

  const visible =
    filter === "unread" ? sorted.filter((n) => !n.read) : sorted;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Notifications</h1>
          <p className={styles.summary} aria-live="polite">
            {unreadCount > 0
              ? `${unreadCount} unread`
              : "You're all caught up"}
          </p>
        </div>
        <button
          type="button"
          className={styles.markAll}
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </button>
      </header>

      <div className={styles.filters} role="group" aria-label="Filter notifications">
        <button
          type="button"
          className={styles.filter}
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All
          <span className={styles.count}>{notifications.length}</span>
        </button>
        <button
          type="button"
          className={styles.filter}
          aria-pressed={filter === "unread"}
          onClick={() => setFilter("unread")}
        >
          Unread
          <span className={styles.count}>{unreadCount}</span>
        </button>
      </div>

      {visible.length === 0 ? (
        <section className={styles.empty}>
          <h2 className={styles.emptyTitle}>
            {filter === "unread" ? "Nothing unread" : "No notifications yet"}
          </h2>
          <p className={styles.emptyText}>
            {filter === "unread"
              ? "Every update has been read. Switch to All to see past updates."
              : "Join a queue and updates about your place in line will show up here."}
          </p>
        </section>
      ) : (
        <ul className={styles.list}>
          {visible.map((n) => (
            <li
              key={n.id}
              className={`${styles.item} ${n.read ? styles.read : styles.unread}`}
            >
              <span className={styles.icon}>
                <TypeIcon type={n.type} />
              </span>
              <div className={styles.body}>
                <p className={styles.message}>
                  {!n.read && <span className={styles.srOnly}>Unread: </span>}
                  {n.message}
                </p>
                <p className={styles.meta}>
                  {TYPE_LABELS[n.type]}
                  <span className={styles.sep} aria-hidden="true">
                    /
                  </span>
                  <time dateTime={n.timestamp}>{formatTime(n.timestamp)}</time>
                </p>
              </div>
              {!n.read && (
                <button
                  type="button"
                  className={styles.markOne}
                  onClick={() => markAsRead(n.id)}
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
