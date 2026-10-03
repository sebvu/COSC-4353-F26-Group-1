"use client";

import styles from "@/app/ui/admin-dashboard/admin-dashboard.module.css";
import { useState } from "react";

class Queue {
  id: number;
  name: string;
  currQueueLength: number;
  open: boolean;
  constructor(id: number, name: string, currQueueLength: number) {
    this.id = id;
    this.name = name;
    this.currQueueLength = currQueueLength
    this.open = true;
  }
}



export default function Page() {
  const [queues, setQueues] = useState<Queue[]>([]);

  let isHome = false;
  let currQueue = queues.at(0);

  function createQueue () {
    const newQueue = new Queue(Date.now(), "queue", 12);

    setQueues((currentQueues) => [
      ...currentQueues,
      newQueue,
    ]);
  }

  function deleteQueue(id: number) {
    setQueues((currentQueues) => currentQueues.filter((queue) => queue.id !== id))
  }

  function updateQueueStatus(queue: Queue) {
    queue.open = (queue.open ? false : true);
  }

  function QueueList() {
    return (
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
    )
  }

  function Panel() {
    return (
      <div className={styles.mainContent}>
          <ul className={styles.queuePanel}>
            {queues.map((queue) => (
              <li key={queue.id} className={styles.panelItem}>
                <div className={styles.panelItemInfo}>
                  <p>{"Name: " + queue.name}</p>
                  <p>{"ID: " + queue.id}</p>
                  <p>{"Status: " + (queue.open ? "Open" : "Closed")}</p>
                  <p>{queue.currQueueLength + " in Line"}</p>
                </div>

                <div className={styles.panelItemButtons}>
                  <button onClick={() => updateQueueStatus(queue)}>Open/Close</button>
                  <button>Manage Queue</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
    )
  }

  function ManageQueue(queue: Queue) {

  }

  return (
    // must always return a root!
    <div className={styles.main}>
      <QueueList/>
      
      <Panel/>
    </div>
  );
}