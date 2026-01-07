import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import "@/i18n";

console.log(import.meta.env.MODE); // "staging"
console.log(import.meta.env.VITE_API_BASE_URL);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
