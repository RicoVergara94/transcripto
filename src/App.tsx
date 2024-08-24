import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//TODO: May need to change the landing page name
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Signin" element={<LandingPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
