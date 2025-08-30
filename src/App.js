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
      <nav style={{ padding: "1rem", background: "#03ffb3ff" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Dashboard
        </Link>
        <Link to="/workouts" style={{ marginRight: "1rem" }}>
          Workouts
        </Link>
        <Link to="/add-workout" style={{ marginRight: "1rem" }}>
          Add Workout
        </Link>
        <Link to="/add-workout" style={{ marginRight: "1rem" }}>
          +++
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
