"use client";

import styles from "@/app/ui/admin-dashboard/admin-dashboard.module.css";
import { useState } from "react";

class User {
  id: number;
  name: string;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

class Queue {
  id: number;
  name: string;
  currQueueLength: number;
  open: boolean;
  users: User[];
  currentUser: User | null;
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.currQueueLength = 0;
    this.open = true;
    this.users = [];
    this.currentUser = null;
  }

  addUser(user: User) {
    this.users.push(user);
    this.currQueueLength = this.users.length;
  }

  removeUser(user: User) {
    this.users = this.users.filter((currentUser) => currentUser !== user);
    this.currQueueLength = this.users.length;
  }

  serviceNextUser() {
    if (this.currQueueLength > 0) {
      this.users.pop();
      this.currQueueLength = this.users.length;
    }
  }
}



export default function Page() {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [selectedQueueId, setSelectedQueueId] = useState<number | null>(null);
  const selectedQueue = queues.find((queue) => queue.id === selectedQueueId);


  function createQueue () {
    const newQueue = new Queue(Date.now(), "queue");

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
          <h1 onClick={() => setSelectedQueueId(null)}>Queue List</h1>
          <button onClick={createQueue} className={styles.createQueueButton}>
            Create Queue
          </button>
          <ul className={styles.queueList}>
            {queues.map((queue) => (
              <li
                key={queue.id}
                className={styles.queueItem}
                onClick={() => setSelectedQueueId(queue.id)}>
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
                  <button onClick={() => setSelectedQueueId(queue.id)}>Manage Queue</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
    )
  }

  function ManageQueue() {
    return (
      <div className={styles.mainContent}>
        <h1>{selectedQueue?.name}</h1>
        <p>{selectedQueue?.id}</p>
        <p>{selectedQueue?.open ? "Open" : "Closed"}</p>
        <p>{selectedQueue?.currQueueLength + " in Line"}</p>
        <p>{"Current User: " + (selectedQueue?.currentUser ? selectedQueue?.currentUser : "None")}</p>
        <button onClick={selectedQueue?.serviceNextUser}>Service Next User</button>
        <button onClick={() => selectedQueue?.addUser(new User(Date.now(), "hi"))}>Add hi</button>
        <ul>
          {selectedQueue?.users.map((user) => (
            <li key={user.id}>
              {user.name}
              <button onClick={() => selectedQueue.removeUser(user)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    // must always return a root!
    <div className={styles.main}>
      <QueueList/>
      {selectedQueue ? (
        <ManageQueue/>
      ) : (
        <Panel />
      )}
    </div>
  );
}