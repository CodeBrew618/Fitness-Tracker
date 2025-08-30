import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

import UserContext from "./UserContext";

const AddEditWorkout = () => {
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Insert new workout with user_id
    if (!user) {
      setError("User not found. Please log in again.");
      setLoading(false);
      return;
    }
    const { error } = await supabase
      .from("workouts")
      .insert([{ date, notes, user_id: user.id }]);
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
          Add Workout
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
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: 12,
                fontSize: 17,
                borderRadius: 8,
                border: "1.5px solid #b3e5fc",
                background: "#f8fafc",
                outline: "none",
                resize: "vertical",
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
            {loading ? "Adding..." : "Add Workout"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditWorkout;
