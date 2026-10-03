import type { AppNotification } from "./types";

export const TYPE_LABELS: Record<AppNotification["type"], string> = {
  queue_update: "Queue update",
  status_change: "Status change",
};

export function formatTime(timestamp: string): string {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// 15 -> "15 min", 60 -> "1 hr", 75 -> "1 hr 15 min"
export function formatWait(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
}
