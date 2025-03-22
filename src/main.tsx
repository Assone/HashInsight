import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./assets/main.css";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);

const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

const onChangeTheme = () => {
  if (matchMedia.matches) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

matchMedia.addEventListener("change", onChangeTheme);

onChangeTheme();
