import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const WorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      // Fetch workout
      const { data: workoutData, error: workoutError } = await supabase
        .from("workouts")
        .select("id, date, notes")
        .eq("id", id)
        .single();
      // Fetch exercises for this workout (use workout_id foreign key)
      const { data: exercisesData, error: exercisesError } = await supabase
        .from("exercises")
        .select("id, name, sets, reps, weight")
        .eq("id", id)
        .order("id");
      if (workoutError) {
        setError("Failed to load workout.");
      } else {
        setWorkout(workoutData);
        setExercises(exercisesData || []);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  // Delete workout handler
  const handleDeleteWorkout = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this workout? This will also delete all its exercises."
      )
    )
      return;
    setDeleting(true);
    // First, delete exercises for this workout
    const { error: exError } = await supabase
      .from("exercises")
      .delete()
      .eq("workout_id", id);
    // Then, delete the workout
    const { error: workoutError } = await supabase
      .from("workouts")
      .delete()
      .eq("id", id);
    setDeleting(false);
    if (exError || workoutError) {
      setError(
        "Failed to delete workout." +
          (exError?.message || "") +
          (workoutError?.message || "")
      );
    } else {
      navigate("/", { replace: true });
    }
  };

  // Delete exercise handler
  const handleDeleteExercise = async (exerciseId) => {
    if (!window.confirm("Delete this exercise?")) return;
    setDeleting(true);
    const { error } = await supabase
      .from("exercises")
      .delete()
      .eq("id", exerciseId);
    setDeleting(false);
    if (error) {
      setError("Failed to delete exercise.");
    } else {
      setExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: 40 }}>Loading...</div>;
  }
  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: 40 }}>
        {error}
      </div>
    );
  }
  if (!workout) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        Workout not found.
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px #eee",
      }}
    >
      <h2 style={{ marginBottom: 12 }}>Workout Details</h2>
      <div style={{ marginBottom: 18 }}>
        <strong>Date:</strong> {workout.date}
      </div>
      <div style={{ marginBottom: 18 }}>
        <strong>Notes:</strong> {workout.notes || "-"}
      </div>
      <div style={{ marginBottom: 18 }}>
        <button
          onClick={handleDeleteWorkout}
          disabled={deleting}
          style={{
            background: "#d32f2f",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "0.5rem 1rem",
            fontSize: 15,
            cursor: "pointer",
            marginBottom: 8,
          }}
        >
          {deleting ? "Deleting..." : "Delete Workout"}
        </button>
      </div>
      <div
        style={{
          marginBottom: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Exercises</h3>
        <Link to={`/add-exercise/${workout.id}`}>
          <button
            style={{
              padding: "0.5rem 1rem",
              fontSize: 15,
              borderRadius: 4,
              background: "#43a047",
              color: "#fff",
              border: "none",
            }}
          >
            + Add Exercise
          </button>
        </Link>
      </div>
      {exercises.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888", marginTop: 20 }}>
          No exercises yet.
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: 8, border: "1px solid #eee" }}>Name</th>
              <th style={{ padding: 8, border: "1px solid #eee" }}>Sets</th>
              <th style={{ padding: 8, border: "1px solid #eee" }}>Reps</th>
              <th style={{ padding: 8, border: "1px solid #eee" }}>Weight</th>
              <th style={{ padding: 8, border: "1px solid #eee" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((ex) => (
              <tr key={ex.id}>
                <td style={{ padding: 8, border: "1px solid #eee" }}>
                  {ex.name}
                </td>
                <td style={{ padding: 8, border: "1px solid #eee" }}>
                  {ex.sets}
                </td>
                <td style={{ padding: 8, border: "1px solid #eee" }}>
                  {ex.reps}
                </td>
                <td style={{ padding: 8, border: "1px solid #eee" }}>
                  {ex.weight}
                </td>
                <td style={{ padding: 8, border: "1px solid #eee" }}>
                  <button
                    onClick={() => handleDeleteExercise(ex.id)}
                    disabled={deleting}
                    style={{
                      background: "#d32f2f",
                      color: "#fff",
                      border: "none",
                      borderRadius: 4,
                      padding: "0.3rem 0.7rem",
                      fontSize: 14,
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkoutDetails;
