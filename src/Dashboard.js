import React from "react";

const Dashboard = () => {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "linear-gradient(120deg, #e3f2fd 0%, #f8fafc 100%)",
        paddingTop: 60,
        paddingBottom: 60,
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "2.5rem 2rem 2rem 2rem",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px #e0e0e0",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <span style={{ fontSize: 54, display: "block", marginBottom: 8 }}>
            🏋️‍♂️
          </span>
          <h1
            style={{
              margin: 0,
              color: "#1976d2",
              fontWeight: 800,
              fontSize: 36,
              letterSpacing: 1,
            }}
          >
            Welcome Back!
          </h1>
        </div>
        <p
          style={{
            fontSize: 20,
            color: "#444",
            marginBottom: 32,
            fontWeight: 500,
          }}
        >
          Track your progress, stay motivated, and crush your fitness goals.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            marginBottom: 32,
          }}
        >
          <a href="/workouts" style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#e3f2fd",
                borderRadius: 12,
                padding: "1.5rem 2.2rem",
                boxShadow: "0 2px 8px #e0e0e0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "box-shadow 0.2s, transform 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 16px #b3e5fc")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow = "0 2px 8px #e0e0e0")
              }
            >
              <span style={{ fontSize: 32, marginBottom: 8, color: "#1976d2" }}>
                📋
              </span>
              <span style={{ fontWeight: 700, color: "#1976d2", fontSize: 18 }}>
                View Workouts
              </span>
            </div>
          </a>
          <a href="/add-workout" style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#e8f5e9",
                borderRadius: 12,
                padding: "1.5rem 2.2rem",
                boxShadow: "0 2px 8px #e0e0e0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "box-shadow 0.2s, transform 0.2s",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow = "0 4px 16px #a5d6a7")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow = "0 2px 8px #e0e0e0")
              }
            >
              <span style={{ fontSize: 32, marginBottom: 8, color: "#43a047" }}>
                ➕
              </span>
              <span style={{ fontWeight: 700, color: "#43a047", fontSize: 18 }}>
                Add Workout
              </span>
            </div>
          </a>
        </div>
        <div style={{ color: "#888", fontSize: 15, marginTop: 18 }}>
          <em>"The only bad workout is the one you didn't do."</em>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
