import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DocumentEditor from "./pages/DocumentEditor";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/auth/AuthPage"; // ✅ Login Page
import SignupPage from "./pages/auth/SignupPage"; // ✅ Separate Signup Page

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<DocumentEditor />} />
        <Route path="/login" element={<AuthPage isSignup={false} />} />
        <Route path="/signup" element={<SignupPage />} /> {/* ✅ Corrected Signup Route */}
      </Routes>
    </>
  );
};

export default App;
