import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const AddEditExercise = () => {
  const { workoutId } = useParams();
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("exercises").insert([
      {
        id: parseInt(workoutId, 10),
        name,
        sets: sets ? parseInt(sets) : null,
        reps: reps ? parseInt(reps) : null,
        weight: weight ? parseFloat(weight) : null,
      },
    ]);
    setLoading(false);
    if (error) {
      setError("Failed to add exercise: " + error.message);
    } else {
      navigate(`/workouts/${workoutId}`);
    }
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "2rem auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px #eee",
      }}
    >
      <h2 style={{ marginBottom: 24 }}>Add Exercise</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 8,
              fontSize: 16,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Sets</label>
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            min="1"
            style={{
              width: "100%",
              padding: 8,
              fontSize: 16,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Reps</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            min="1"
            style={{
              width: "100%",
              padding: 8,
              fontSize: 16,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Weight</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="0"
            step="0.1"
            style={{
              width: "100%",
              padding: 8,
              fontSize: 16,
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
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
          {loading ? "Adding..." : "Add Exercise"}
        </button>
      </form>
    </div>
  );
};

export default AddEditExercise;
