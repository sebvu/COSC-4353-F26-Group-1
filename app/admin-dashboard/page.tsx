"use client";

import styles from "@/app/ui/admin-dashboard/admin-dashboard.module.css";
import { useState } from "react";

export default function Page() {
  const [queues, setQueues] = useState<string[]>([]);

  function createQueue () {
    setQueues((currentQueues) => [...currentQueues, "queue"])
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
          {queues.map((queue, index) => (
            <li key={index} className={styles.queueItem}>
              {queue}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.mainContent}>
        <h1>example admin dashboard fuck fuck fuck</h1>
        <p className={styles.text}>this is 100% a button FUCK!</p>
      </div>
    </div>
  );
}