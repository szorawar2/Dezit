import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.css";
import ContextProvider from "./Context.jsx";

// Render the app with context and routing enabled
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <Router>
        <App />
      </Router>
    </ContextProvider>
  </StrictMode>
);
