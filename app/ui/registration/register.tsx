"use client";

import { useState } from "react";
import styles from "./registration.module.css";
import { verifyInput, VerifyPair } from "./validation";

interface RegisterProps {
  onToggleMode: () => void;
}

export default function Register({ onToggleMode }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const verifyPairs: VerifyPair[] = [
      {
        field: "username",
        input: username,
        verifier: (val) => val.length < 5 || val.length > 18,
        errMsg: "Username must be between 5 and 18 characters.",
      },
      {
        field: "email",
        input: email,
        verifier: (val) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), // Basic Regex for deeper email check
        errMsg: "Please enter a valid email address.",
      },
      {
        field: "password",
        input: password,
        verifier: (val) => val.length < 6 || val.length > 20,
        errMsg: "Password must be between 6 and 20 characters.",
      },
      {
        field: "confirmPassword",
        input: confirmPassword,
        verifier: (val) => val !== password || val.length === 0,
        errMsg: "Passwords do not match.",
      },
    ];

    const result = verifyInput(verifyPairs);
    setErrors(result.errors);

    if (!result.hasError) {
      console.log("Dummy Registration Submitted:", {
        username,
        email,
        password,
      });
      alert("Registration successful! (Check console)");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.title}>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="coolcat123"
          />
          {errors.username && (
            <span className={styles.errorText}>{errors.username}</span>
          )}
        </div>

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

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <span className={styles.errorText}>{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Sign Up
        </button>
      </form>

      <p className={styles.toggleText}>
        Already have an account?
        <button
          type="button"
          onClick={onToggleMode}
          className={styles.toggleLink}
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
