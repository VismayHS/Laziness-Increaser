import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@/components/theme-provider";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <App />
      <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
    </ThemeProvider>
  </React.StrictMode>
);
