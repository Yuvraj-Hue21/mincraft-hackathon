import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { GlobalEffects } from "./components/effects";
import { SmoothScrollProvider } from "./components/effects/SmoothScroll";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SmoothScrollProvider>
        <App />
        <GlobalEffects />
      </SmoothScrollProvider>
    </BrowserRouter>
  </StrictMode>,
);
