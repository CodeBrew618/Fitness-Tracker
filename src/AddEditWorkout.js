import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const AddEditWorkout = () => {
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Insert new workout (no user_id for now)
    const { error } = await supabase.from("workouts").insert([{ date, notes }]);
    setLoading(false);
    if (error) {
      setError("Failed to add workout.");
    } else {
      navigate("/workouts");
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
      <h2 style={{ marginBottom: 24 }}>Add Workout</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          <label style={{ display: "block", marginBottom: 6 }}>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
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
          {loading ? "Adding..." : "Add Workout"}
        </button>
      </form>
    </div>
  );
};

export default AddEditWorkout;
