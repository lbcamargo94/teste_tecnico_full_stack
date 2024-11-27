import axios, { type AxiosInstance } from "axios";

const GOOGLE_API_URL =
  process.env.GOOGLE_API_URL ||
  "https://routes.googleapis.com/directions/v2:computeRoutes?key=";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";

const apiInstance: AxiosInstance = axios.create({
  baseURL: `${GOOGLE_API_URL}${GOOGLE_API_KEY}`,
});

export { apiInstance };
