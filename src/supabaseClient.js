// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aevuxxkixpgqlwmqerov.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFldnV4eGtpeHBncWx3bXFlcm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MDg0OTcsImV4cCI6MjA3MjA4NDQ5N30.pGi0ekv2O59u0ZlHWKkT3skPyHEgyeKzgCD5jy2AhvE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
