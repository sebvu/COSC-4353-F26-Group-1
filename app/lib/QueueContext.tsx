"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { QueueEntry, Service } from "./types";
import { mockQueueEntry } from "./mockData";

type QueueContextType = {
  queueEntry: QueueEntry | null;
  joinQueue: (service: Service) => void;
  leaveQueue: () => void;
  advance: () => void;
};

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export function QueueProvider({ children }: { children: ReactNode }) {
  const [queueEntry, setQueueEntry] = useState<QueueEntry | null>(
    mockQueueEntry
  );

  function joinQueue(service: Service) {
    setQueueEntry({
      id: `q-${Date.now()}`,
      serviceId: service.id,
      position: service.queueLength + 1,
      estimatedWaitMinutes: service.estimatedWaitMinutes,
      status: "waiting",
    });
  }

  function leaveQueue() {
    setQueueEntry(null);
  }

  function advance() {
    setQueueEntry((current) => {
      if (!current) return null;

      if (current.status === "waiting") {
        if (current.position > 1) {
          return {
            ...current,
            position: current.position - 1,
            estimatedWaitMinutes: Math.max(
              0,
              current.estimatedWaitMinutes - 5
            ),
          };
        }

        return {
          ...current,
          position: 1,
          estimatedWaitMinutes: 0,
          status: "almost_ready",
        };
      }

      if (current.status === "almost_ready") {
        return {
          ...current,
          position: 0,
          estimatedWaitMinutes: 0,
          status: "served",
        };
      }

      return current;
    });
  }

  return (
    <QueueContext.Provider
      value={{ queueEntry, joinQueue, leaveQueue, advance }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  const context = useContext(QueueContext);

  if (!context) {
    throw new Error("useQueue must be used inside QueueProvider");
  }

  return context;
}