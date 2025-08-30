# Fitness Tracker Web App

This is a modern fitness tracker web application built with React and Supabase. It allows users to:

- Register and log in securely (Supabase Auth)
- Create, view, edit, and delete workouts
- Add multiple exercises to each workout
- Track sets, reps, and weight for each exercise
- Only see and manage their own data (user separation)

## Features

- **User Authentication:** Secure sign up, login, and logout using Supabase Auth
- **Workout Management:** Create, edit, and delete workouts with date and notes
- **Exercise Management:** Add, edit, and delete exercises for each workout
- **Modern UI:** Clean, responsive design with card layouts and gradients
- **Data Privacy:** Each user can only access their own workouts and exercises

## Getting Started

### Prerequisites

- Node.js and npm installed
- Supabase project (with Auth and Postgres enabled)

### Setup

1. Clone this repo and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your Supabase project URL and anon key:
   ```env
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

- **workouts**: id (PK), user_id, date, notes
- **exercises**: id (PK), workout_id (FK), name, sets, reps, weight

## Security

- Row Level Security (RLS) is enabled on all tables
- Policies ensure users can only access their own data (user_id = auth.uid())

## Scripts

- `npm start` — Run the app in development mode
- `npm run build` — Build for production

## License

MIT
