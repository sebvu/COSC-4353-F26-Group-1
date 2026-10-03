import styles from "@/app/ui/admin-dashboard/admin-dashboard.module.css";

function createQueue() {

}

function createButton() {

}

export default function Page() {
  return (
    // must always return a root!
    <div className={styles.main}>
      <div className={styles.queueListContainer}>
        <h1>Hi this is the queue list sidebar</h1>
        <button className={styles.createQueueButton}>Create Queue</button>
        <ul className={styles.queueList}>
          <li className={styles.queueItem}>queue 1</li>
          <li className={styles.queueItem}>queue 2</li>
          <li className={styles.queueItem}>queue 3</li>
        </ul>
      </div>
      <div className={styles.mainContent}>
        <h1>example admin dashboard fuck fuck fuck</h1>
        <p className={styles.text}>this is 100% a button FUCK!</p>
      </div>
    </div>
  );
}