import React from "react";

const Dashboard = () => {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "3rem auto",
        padding: "2rem",
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 12px #e0e0e0",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: 16, color: "#1976d2" }}>🏋️‍♂️ Workout Track</h1>
      <p style={{ fontSize: 18, color: "#444", marginBottom: 32 }}>
        Welcome to Workout Track! Easily log, view, and manage your workouts and
        exercises.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <a href="/workouts">
          <button
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: 16,
              borderRadius: 6,
              background: "#1976d2",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            View Workouts
          </button>
        </a>
        <a href="/add-workout">
          <button
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: 16,
              borderRadius: 6,
              background: "#43a047",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Workout
          </button>
        </a>
      </div>
    </div>
  );
};

export default Dashboard;
