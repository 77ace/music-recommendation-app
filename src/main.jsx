import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HomeSection from "./Sections/HomeSection.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouter } from "./AppRouter.jsx";
createRoot(document.getElementById("root")).render(
  <Router>
    <AppRouter />
  </Router>,
);
