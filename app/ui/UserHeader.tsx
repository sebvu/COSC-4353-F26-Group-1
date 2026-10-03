"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationBell from "@/app/ui/NotificationBell";
import styles from "@/app/ui/user-header/user-header.module.css";

const LINKS = [
  { href: "/user-dashboard", label: "Dashboard" },
  { href: "/history", label: "History" },
];

export default function UserHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/user-dashboard" className={styles.brand}>
          SmartQueue
        </Link>
        <nav className={styles.nav} aria-label="Main">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.link}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.bell}>
          <NotificationBell />
        </div>
      </div>
    </header>
  );
}
