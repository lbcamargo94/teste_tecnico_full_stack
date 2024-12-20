import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./css/globals.css";

createRoot(
  document.getElementById("root") || document.createElement("div")
).render(
  <StrictMode>
    <App />
  </StrictMode>
);
