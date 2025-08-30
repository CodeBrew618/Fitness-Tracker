import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabaseClient";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
              }}
            >
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;
