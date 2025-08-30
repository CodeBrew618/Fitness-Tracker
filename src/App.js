import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import WorkoutList from "./WorkoutList";
import WorkoutDetails from "./WorkoutDetails";
import AddEditWorkout from "./AddEditWorkout";
import AddEditExercise from "./AddEditExercise";
import "./App.css";

function App() {
  return (
    <Router>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
          boxShadow: "0 2px 8px #e0e0e0",
          padding: "0.75rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: 22,
              color: "#1976d2",
              marginRight: 32,
            }}
          >
            Fitness Tracker
          </span>
          <Link
            to="/"
            style={{
              marginRight: 20,
              color: "#333",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/workouts"
            style={{
              marginRight: 20,
              color: "#333",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Workouts
          </Link>
        </div>
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
      </nav>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/workouts" element={<WorkoutList />} />
          <Route path="/workouts/:id" element={<WorkoutDetails />} />
          <Route path="/add-workout" element={<AddEditWorkout />} />
          <Route path="/edit-workout/:id" element={<AddEditWorkout />} />
          <Route
            path="/add-exercise/:workoutId"
            element={<AddEditExercise />}
          />
          <Route path="/edit-exercise/:id" element={<AddEditExercise />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
