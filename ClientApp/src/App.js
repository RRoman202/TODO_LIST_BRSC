import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Todo from "./components/Pages/Todo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <Router>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/login" />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
