import { useState } from "react";
import styles from "./registration.module.css";
import { verifyInput, VerifyPair } from "./validation";

interface LoginProps {
  onToggleMode: () => void;
}

export default function Login({ onToggleMode }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const verifyPairs: VerifyPair[] = [
      {
        field: "email",
        input: email,
        verifier: (val) => !val.includes("@") || val.trim().length === 0,
        errMsg: "Please enter a valid email address.",
      },
      {
        field: "password",
        input: password,
        verifier: (val) => val.length < 1,
        errMsg: "Password is required.",
      },
    ];

    const result = verifyInput(verifyPairs);
    setErrors(result.errors);

    if (!result.hasError) {
      console.log("Dummy Login Submitted:", { email, password });
      alert("Login successful! (Check console)");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.title}>Welcome Back</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {errors.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Sign In
        </button>
      </form>

      <p className={styles.toggleText}>
        Don't have an account?
        <button
          type="button"
          onClick={onToggleMode}
          className={styles.toggleLink}
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
