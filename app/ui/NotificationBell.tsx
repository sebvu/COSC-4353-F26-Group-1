"use client";

import Link from "next/link";
import { useNotifications } from "../lib/NotificationContext";
import styles from "./notification-bell/notification-bell.module.css";

export default function NotificationBell() {
  const { unreadCount } = useNotifications();

  return (
    <Link
      href="/notifications"
      className={styles.bell}
      aria-label={
        unreadCount > 0
          ? `Notifications, ${unreadCount} unread`
          : "Notifications"
      }
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
      {unreadCount > 0 && (
        <span className={styles.badge}>{unreadCount > 9 ? "9+" : unreadCount}</span>
      )}
    </Link>
  );
}
