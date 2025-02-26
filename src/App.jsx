import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DocumentEditor from "./pages/DocumentEditor";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<DocumentEditor />} />
      </Routes>
    </>
      

  );
};

export default App;
