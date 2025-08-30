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
        maxWidth: 600,
        margin: "2rem auto",
        padding: "1rem",
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px #eee",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h2 style={{ margin: 0 }}>Workouts</h2>
        <Link to="/add-workout">
          <button
            style={{
              padding: "0.5rem 1rem",
              fontSize: 16,
              borderRadius: 4,
              background: "#1976d2",
              color: "#fff",
              border: "none",
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
          No workouts yet.
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {workouts.map((workout) => (
            <li
              key={workout.id}
              style={{
                marginBottom: 18,
                padding: 16,
                border: "1px solid #eee",
                borderRadius: 6,
                background: "#fafafa",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Link
                  to={`/workouts/${workout.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: 500,
                  }}
                >
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
                  borderRadius: 4,
                  padding: "0.3rem 0.7rem",
                  fontSize: 14,
                  cursor: "pointer",
                  marginLeft: 12,
                }}
              >
                {deletingId === workout.id ? "Deleting..." : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;
