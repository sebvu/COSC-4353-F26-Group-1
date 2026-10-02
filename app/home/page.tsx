import styles from "@/app/ui/home/home.module.css";

export default function Page() {
  return (
    // must always return a root!
    <div>
      <h1>example home page</h1>
      <p className={styles.text}>example text ig</p>
    </div>
  );
}
