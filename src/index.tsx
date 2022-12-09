import React from "react";
import ReactDOM from "react-dom/client";

import "assets/styles/index.css";
import "assets/styles/tailwind.css";

import App from "components/app/app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
