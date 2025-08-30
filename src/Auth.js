import React, { useState } from "react";
import { supabase } from "./supabaseClient";

const Auth = ({ onAuth }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notify, setNotify] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotify("");
    let result;
    if (isSignUp) {
      result = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (result.error) {
        setError(result.error.message);
      } else {
        setNotify(
          "Sign up successful! Please check your email to verify your account before logging in."
        );
      }
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (result.error) {
        setError(result.error.message);
      } else {
        onAuth && onAuth();
      }
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "80px auto",
        padding: "2.5rem 2rem 2rem 2rem",
        background: "linear-gradient(120deg, #e3f2fd 0%, #f8fafc 100%)",
        borderRadius: 18,
        boxShadow: "0 4px 24px #e0e0e0",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 18 }}>
        <span
          style={{
            fontWeight: 800,
            fontSize: 32,
            color: "#1976d2",
            letterSpacing: 1,
            display: "block",
            marginBottom: 6,
          }}
        >
          Fitness Tracker
        </span>
        <div
          style={{
            fontSize: 18,
            color: "#333",
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          {isSignUp
            ? "Welcome! Create your account to start tracking your workouts."
            : "Welcome back! Log in to your Fitness Tracker."}
        </div>
      </div>
      <h2
        style={{
          textAlign: "center",
          color: "#1976d2",
          marginBottom: 24,
          fontWeight: 700,
          fontSize: 24,
        }}
      >
        {isSignUp ? "Sign Up" : "Log In"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1.5px solid #2196f3",
            }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1.5px solid #2196f3",
            }}
          />
        </div>
        {error && (
          <div
            style={{ color: "#d32f2f", marginBottom: 12, textAlign: "center" }}
          >
            {error}
          </div>
        )}
        {notify && (
          <div
            style={{
              color: "#388e3c",
              marginBottom: 12,
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            {notify}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: 24,
            background: "#1976d2",
            color: "#fff",
            fontWeight: 700,
            fontSize: 17,
            border: "none",
            marginBottom: 12,
          }}
        >
          {loading
            ? isSignUp
              ? "Signing Up..."
              : "Logging In..."
            : isSignUp
            ? "Sign Up"
            : "Log In"}
        </button>
      </form>
      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => setIsSignUp((v) => !v)}
          style={{
            background: "none",
            border: "none",
            color: "#1976d2",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          {isSignUp
            ? "Already have an account? Log In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
