import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import Home from "./components/Pages/Home";
import LoginForm from "./components/Pages/LoginForm";
import SignUpForm from "./components/Pages/SignUpForm";
import Footer from "./components/UI/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
