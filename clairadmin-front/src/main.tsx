import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";

async function start() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    worker.start();
  }

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

start();
