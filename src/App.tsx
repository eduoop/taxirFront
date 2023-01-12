import { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes/app.routes";
import toast, { Toaster } from "react-hot-toast";



function App() {


  return (
    <>
      <AppRoutes />
      <div className="not_hide">
        <Toaster
          position="top-left"
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
