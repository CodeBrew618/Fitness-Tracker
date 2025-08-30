import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import WorkoutList from "./WorkoutList";
import WorkoutDetails from "./WorkoutDetails";
import AddEditWorkout from "./AddEditWorkout";
import AddEditExercise from "./AddEditExercise";
import Auth from "./Auth";
import UserContext from "./UserContext";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setLoading(false);
    };
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: 60,
          fontSize: 22,
          color: "#1976d2",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Auth onAuth={() => window.location.reload()} />;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={user}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
            <button
              onClick={handleLogout}
              style={{
                padding: "0.5rem 1.2rem",
                fontSize: 16,
                borderRadius: 24,
                background: "#bdbdbd",
                color: "#333",
                border: "none",
                fontWeight: 600,
                marginLeft: 8,
                boxShadow: "0 2px 8px #e0e0e0",
                transition: "background 0.2s",
              }}
            >
              Log Out
            </button>
          </div>
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
    </UserContext.Provider>
  );
}

export default App;
