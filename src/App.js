import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import Home from "./components/Pages/Home";
import Agent from "./components/Pages/Agent";
import AddListing from "./components/Pages/AddListing";
import LoginForm from "./components/Pages/LoginForm";
import RegisterForm from "./components/Pages/RegisterForm";
import EditProfile from "./components/Pages/EditProfile";
import Footer from "./components/UI/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/agent/addlisting" element={<AddListing isEditing={false} />} />
        <Route path="/agent/editlisting/:propertyId" element={<AddListing isEditing={true} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
