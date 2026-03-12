import axios from "axios";

const API = axios.create({ baseURL: "" }); // Uses Vite proxy

/**
 * Fetch all stored Reddit posts from the backend.
 */
export async function getPosts() {
  const { data } = await API.get("/posts");
  return data;
}

/**
 * Trigger the Reddit API fetch on the backend.
 */
export async function fetchRedditPosts() {
  const { data } = await API.post("/fetch");
  return data;
}

/**
 * Run OpenAI classification on all unanalyzed posts.
 */
export async function analyzeWithAI() {
  const { data } = await API.post("/analyze");
  return data;
}

/**
 * Get aggregated dashboard stats/KPIs.
 */
export async function getStats() {
  const { data } = await API.get("/stats");
  return data;
}
