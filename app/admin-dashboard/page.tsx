"use client";

import styles from "@/app/ui/admin-dashboard/admin-dashboard.module.css";
import { useState } from "react";

class Queue {
  id: number;
  name: string;
  currQueueLength: number;
  constructor(id: number, name: string, currQueueLength: number) {
    this.id = id;
    this.name = name;
    this.currQueueLength = currQueueLength
  }
}



export default function Page() {
  const [queues, setQueues] = useState<Queue[]>([]);

  function createQueue () {
    const newQueue = new Queue(queues.length + 1, "queue", 12);

    setQueues((currentQueues) => [
      ...currentQueues,
      newQueue,
    ]);
  }


  return (
    // must always return a root!
    <div className={styles.main}>
      <div className={styles.queueListContainer}>
        <h1>Queue List</h1>
        <button onClick={createQueue} className={styles.createQueueButton}>
          Create Queue
        </button>
        <ul className={styles.queueList}>
          {queues.map((queue) => (
            <li key={queue.id} className={styles.queueItem}>
              {queue.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.mainContent}>
        <ul className={styles.queuePanel}>
          {queues.map((queue) => (
            <li key={queue.id} className={styles.panelItem}>
              <div className={styles.panelItemInfo}>
                <p>{"Name: " + queue.name}</p>
                <p>{"ID: " + queue.id}</p>
                <p>{queue.currQueueLength + " in Line"}</p>
              </div>

              <div className={styles.panelItemButtons}>
                <button>Open/Close</button>
                <button>Delete Queue</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}