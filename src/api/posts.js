import axios from "axios";

const api = axios.create({
  baseURL: window.location.hostname === "localhost"
  ? "http://localhost:8080"
  : "https://server-production-33bb.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies if your backend uses them
});

export default api;
