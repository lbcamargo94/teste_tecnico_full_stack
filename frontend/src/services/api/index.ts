import axios from "axios";

const PORT = import.meta.env.VITE_APPLICATION_PORT;

const BACKEND_BASE_URL = `http://localhost:${PORT}`;

const api = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export { api };
