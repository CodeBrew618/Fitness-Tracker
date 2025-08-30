import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const WorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  // Add Exercise form state
  const [exName, setExName] = useState("");
  const [exSets, setExSets] = useState("");
  const [exReps, setExReps] = useState("");
  const [exWeight, setExWeight] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState(null);
  // Add Exercise handler (re-organized)
  const handleAddExercise = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError(null);
    try {
      // Validate input (optional, for better UX)
      if (!exName.trim()) throw new Error("Exercise name is required");
      if (!exSets || exSets < 1) throw new Error("Sets must be at least 1");
      if (!exReps || exReps < 1) throw new Error("Reps must be at least 1");
      if (exWeight === "" || isNaN(Number(exWeight)))
        throw new Error("Weight is required");

      // Insert exercise (let id auto-generate, use workout_id)
      const { error, data } = await supabase
        .from("exercises")
        .insert([
          {
            workout_id: parseInt(id),
            name: exName,
            sets: parseInt(exSets),
            reps: parseInt(exReps),
            weight: parseFloat(exWeight),
          },
        ])
        .select();
      if (error) throw error;
      setExercises((prev) => [...prev, ...(data || [])]);
      setExName("");
      setExSets("");
      setExReps("");
      setExWeight("");
      setShowAddForm(false);
    } catch (err) {
      setAddError("Failed to add exercise: " + err.message);
    } finally {
      setAddLoading(false);
    }
  };

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
        .eq("workout_id", id)
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
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: 60,
          color: "#1976d2",
          fontSize: 22,
        }}
      >
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div
        style={{
          color: "#d32f2f",
          textAlign: "center",
          marginTop: 60,
          fontSize: 18,
        }}
      >
        {error}
      </div>
    );
  }
  if (!workout) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: 60,
          color: "#888",
          fontSize: 20,
        }}
      >
        Workout not found.
      </div>
    );
  }

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
            marginBottom: 24,
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
            Workout Details
          </h2>
          <button
            onClick={handleDeleteWorkout}
            disabled={deleting}
            style={{
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: 24,
              padding: "0.5rem 1.2rem",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 2px 8px #f8bbd0",
              marginLeft: 12,
              transition: "background 0.2s",
            }}
          >
            {deleting ? "Deleting..." : "Delete Workout"}
          </button>
        </div>
        <div style={{ marginBottom: 18, fontSize: 18, color: "#333" }}>
          <strong>Date:</strong> {workout.date}
        </div>
        <div style={{ marginBottom: 32, fontSize: 18, color: "#333" }}>
          <strong>Notes:</strong> {workout.notes || "-"}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 24,
              marginBottom: 18,
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#1976d2",
                fontWeight: 700,
                fontSize: 22,
                flex: 1,
              }}
            >
              Exercises
            </h3>
            <button
              onClick={() => setShowAddForm((v) => !v)}
              style={{
                padding: "0.5rem 1.2rem",
                fontSize: 16,
                borderRadius: 24,
                background: showAddForm ? "#bdbdbd" : "#43a047",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                boxShadow: "0 2px 8px #c8e6c9",
                transition: "background 0.2s",
                marginLeft: 0,
              }}
            >
              {showAddForm ? "Cancel" : "+ Add Exercise"}
            </button>
          </div>
          {showAddForm && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: 32,
              }}
            >
              <form
                onSubmit={handleAddExercise}
                style={{
                  background: "#f8fafc",
                  borderRadius: 18,
                  boxShadow: "0 2px 12px #e3e3e3",
                  padding: 32,
                  maxWidth: 350,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 18,
                }}
              >
                <div style={{ width: "100%" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      fontWeight: 700,
                      color: "#1976d2",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={exName}
                    onChange={(e) => setExName(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: 12,
                      fontSize: 17,
                      borderRadius: 8,
                      border: "1.5px solid #2196f3",
                      background: "#fff",
                      outline: "none",
                      marginBottom: 2,
                      textAlign: "center",
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      fontWeight: 700,
                      color: "#1976d2",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    Sets
                  </label>
                  <input
                    type="number"
                    value={exSets}
                    onChange={(e) => setExSets(e.target.value)}
                    min="1"
                    style={{
                      width: "100%",
                      padding: 12,
                      fontSize: 17,
                      borderRadius: 8,
                      border: "1.5px solid #2196f3",
                      background: "#fff",
                      outline: "none",
                      marginBottom: 2,
                      textAlign: "center",
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      fontWeight: 700,
                      color: "#1976d2",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    Reps
                  </label>
                  <input
                    type="number"
                    value={exReps}
                    onChange={(e) => setExReps(e.target.value)}
                    min="1"
                    style={{
                      width: "100%",
                      padding: 12,
                      fontSize: 17,
                      borderRadius: 8,
                      border: "1.5px solid #2196f3",
                      background: "#fff",
                      outline: "none",
                      marginBottom: 2,
                      textAlign: "center",
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      fontWeight: 700,
                      color: "#1976d2",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    Weight
                  </label>
                  <input
                    type="number"
                    value={exWeight}
                    onChange={(e) => setExWeight(e.target.value)}
                    min="0"
                    step="0.1"
                    style={{
                      width: "100%",
                      padding: 12,
                      fontSize: 17,
                      borderRadius: 8,
                      border: "1.5px solid #2196f3",
                      background: "#fff",
                      outline: "none",
                      marginBottom: 2,
                      textAlign: "center",
                    }}
                  />
                </div>
                {addError && (
                  <div
                    style={{
                      color: "#d32f2f",
                      marginBottom: 8,
                      fontWeight: 600,
                    }}
                  >
                    {addError}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={addLoading}
                  style={{
                    padding: "0.75rem 1.5rem",
                    fontSize: 17,
                    borderRadius: 24,
                    background: "#1976d2",
                    color: "#fff",
                    border: "none",
                    fontWeight: 700,
                    boxShadow: "0 2px 8px #e3e3e3",
                    cursor: "pointer",
                    width: "100%",
                    marginTop: 8,
                    transition: "background 0.2s",
                  }}
                >
                  {addLoading ? "Adding..." : "Add Exercise"}
                </button>
              </form>
            </div>
          )}
        </div>
        {exercises.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#888",
              marginTop: 32,
              fontSize: 18,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 10 }}>💪</div>
            No exercises yet.
          </div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              marginTop: 10,
              background: "#f8fafc",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ background: "#e3f2fd" }}>
                <th
                  style={{
                    padding: 12,
                    border: "none",
                    fontWeight: 700,
                    color: "#1976d2",
                    fontSize: 16,
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: 12,
                    border: "none",
                    fontWeight: 700,
                    color: "#1976d2",
                    fontSize: 16,
                  }}
                >
                  Sets
                </th>
                <th
                  style={{
                    padding: 12,
                    border: "none",
                    fontWeight: 700,
                    color: "#1976d2",
                    fontSize: 16,
                  }}
                >
                  Reps
                </th>
                <th
                  style={{
                    padding: 12,
                    border: "none",
                    fontWeight: 700,
                    color: "#1976d2",
                    fontSize: 16,
                  }}
                >
                  Weight
                </th>
                <th
                  style={{
                    padding: 12,
                    border: "none",
                    fontWeight: 700,
                    color: "#1976d2",
                    fontSize: 16,
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((ex, idx) => (
                <tr
                  key={ex.id}
                  style={{ background: idx % 2 === 0 ? "#f8fafc" : "#e3f2fd" }}
                >
                  <td style={{ padding: 12, border: "none", fontSize: 16 }}>
                    {ex.name}
                  </td>
                  <td style={{ padding: 12, border: "none", fontSize: 16 }}>
                    {ex.sets}
                  </td>
                  <td style={{ padding: 12, border: "none", fontSize: 16 }}>
                    {ex.reps}
                  </td>
                  <td style={{ padding: 12, border: "none", fontSize: 16 }}>
                    {ex.weight}
                  </td>
                  <td style={{ padding: 12, border: "none" }}>
                    <button
                      onClick={() => handleDeleteExercise(ex.id)}
                      disabled={deleting}
                      title="Delete Exercise"
                      style={{
                        background: "#d32f2f",
                        color: "#fff",
                        border: "none",
                        borderRadius: 24,
                        padding: "0.3rem 1.1rem",
                        fontSize: 15,
                        cursor: "pointer",
                        fontWeight: 600,
                        boxShadow: "0 2px 8px #f8bbd0",
                        marginRight: 6,
                        transition: "background 0.2s",
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetails;
