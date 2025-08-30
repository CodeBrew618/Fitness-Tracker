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
        minHeight: "calc(100vh - 80px)",
        background: "linear-gradient(120deg, #e3f2fd 0%, #f8fafc 100%)",
        paddingTop: 60,
        paddingBottom: 60,
      }}
    >
      <div
        style={{
          maxWidth: 500,
          margin: "0 auto",
          padding: "2.5rem 2rem 2rem 2rem",
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px #e0e0e0",
        }}
      >
        <h2
          style={{
            marginBottom: 28,
            color: "#1976d2",
            fontWeight: 800,
            fontSize: 28,
            textAlign: "center",
          }}
        >
          Add Exercise
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1976d2",
                fontSize: 16,
              }}
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 12,
                fontSize: 17,
                borderRadius: 8,
                border: "1.5px solid #b3e5fc",
                background: "#f8fafc",
                outline: "none",
                marginBottom: 2,
              }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1976d2",
                fontSize: 16,
              }}
            >
              Sets
            </label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              min="1"
              style={{
                width: "100%",
                padding: 12,
                fontSize: 17,
                borderRadius: 8,
                border: "1.5px solid #b3e5fc",
                background: "#f8fafc",
                outline: "none",
                marginBottom: 2,
              }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1976d2",
                fontSize: 16,
              }}
            >
              Reps
            </label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              min="1"
              style={{
                width: "100%",
                padding: 12,
                fontSize: 17,
                borderRadius: 8,
                border: "1.5px solid #b3e5fc",
                background: "#f8fafc",
                outline: "none",
                marginBottom: 2,
              }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontWeight: 600,
                color: "#1976d2",
                fontSize: 16,
              }}
            >
              Weight
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
              step="0.1"
              style={{
                width: "100%",
                padding: 12,
                fontSize: 17,
                borderRadius: 8,
                border: "1.5px solid #b3e5fc",
                background: "#f8fafc",
                outline: "none",
                marginBottom: 2,
              }}
            />
          </div>
          {error && (
            <div
              style={{ color: "#d32f2f", marginBottom: 16, fontWeight: 600 }}
            >
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
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
            {loading ? "Adding..." : "Add Exercise"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditExercise;
