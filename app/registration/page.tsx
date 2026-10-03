"use client";

import { useState } from "react";
import Login from "@/app/ui/registration/login";
import Register from "@/app/ui/registration/register";

export default function RegistrationPage() {
  // Toggle between 'login' and 'register'
  const [mode, setMode] = useState<"login" | "register">("login");

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      {mode === "login" ? (
        <Login onToggleMode={toggleMode} />
      ) : (
        <Register onToggleMode={toggleMode} />
      )}
    </main>
  );
}
