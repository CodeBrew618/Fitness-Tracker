import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  // Delete workout handler
  const handleDeleteWorkout = async (workoutId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this workout? This will also delete all its exercises."
      )
    )
      return;
    setDeletingId(workoutId);
    // Delete exercises for this workout
    await supabase.from("exercises").delete().eq("workout_id", workoutId);
    // Delete the workout
    const { error } = await supabase
      .from("workouts")
      .delete()
      .eq("id", workoutId);
    setDeletingId(null);
    if (error) {
      setError("Failed to delete workout.");
    } else {
      setWorkouts((prev) => prev.filter((w) => w.id !== workoutId));
    }
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("workouts")
        .select("id, user_id, date, notes")
        .order("date", { ascending: false });
      if (error) {
        setError("Failed to load workouts.");
      } else {
        setWorkouts(data || []);
      }
      setLoading(false);
    };
    fetchWorkouts();
  }, []);

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
          maxWidth: 650,
          margin: "0 auto",
          padding: "2.5rem 2rem 2rem 2rem",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px #e0e0e0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#1976d2",
              fontWeight: 800,
              fontSize: 28,
            }}
          >
            Your Workouts
          </h2>
          <Link to="/add-workout">
            <button
              style={{
                padding: "0.5rem 1.2rem",
                fontSize: 16,
                borderRadius: 24,
                background: "#1976d2",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                boxShadow: "0 2px 8px #e3e3e3",
                transition: "background 0.2s",
              }}
            >
              + Add Workout
            </button>
          </Link>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", color: "#888", marginTop: 40 }}>
            Loading...
          </div>
        ) : error ? (
          <div style={{ color: "red", textAlign: "center", marginTop: 40 }}>
            {error}
          </div>
        ) : workouts.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888", marginTop: 40 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🗓️</div>
            <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 8 }}>
              No workouts yet.
            </div>
            <div style={{ fontSize: 16, color: "#aaa" }}>
              Start by adding your first workout!
            </div>
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {workouts.map((workout) => (
              <li
                key={workout.id}
                style={{
                  marginBottom: 20,
                  borderRadius: 14,
                  boxShadow: "0 2px 12px #e3e3e3",
                  background: "#f8fafc",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1.2rem 1.5rem",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow = "0 4px 24px #b3e5fc")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.boxShadow = "0 2px 12px #e3e3e3")
                }
              >
                <div>
                  <Link
                    to={`/workouts/${workout.id}`}
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    <span style={{ fontSize: 22, marginRight: 10 }}>📅</span>
                    {workout.date} {workout.notes ? `- ${workout.notes}` : ""}
                  </Link>
                </div>
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  disabled={deletingId === workout.id}
                  style={{
                    background: "#d32f2f",
                    color: "#fff",
                    border: "none",
                    borderRadius: 24,
                    padding: "0.3rem 1.1rem",
                    fontSize: 15,
                    cursor: "pointer",
                    marginLeft: 12,
                    fontWeight: 600,
                    boxShadow: "0 2px 8px #f8bbd0",
                  }}
                >
                  {deletingId === workout.id ? "Deleting..." : "Delete"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WorkoutList;
