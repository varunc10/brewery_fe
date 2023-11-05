import React from "react";
import { Button } from "antd";
import Register from "./auth/register";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./auth/login";
import { useAuth } from "./auth/AuthContext";
import Home from "./home";
import BreweryInfo from "./auth/brewery";

function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Brewery Finder</h1>
      {isAuthenticated && (
        <Button type="primary" className="logout" onClick={() => logout()}>
          Logout
        </Button>
      )}
      <Router>
        <Routes>
          <Route
            path="/home"
            element={isAuthenticated ? <Home /> : <Register />}
          />
          <Route
            path="/brewery/:breweryId"
            element={isAuthenticated ? <BreweryInfo /> : <Register />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/home" /> : <Register />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/home" /> : <Login />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
