import React, { useState } from "react";
import TodoList from "./components/TodoList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserAuthState from "./context/UserAuthState";

function App() {
  return (
    <>
      <UserAuthState>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<TodoList />} />
          </Routes>
        </Router>
      </UserAuthState>
    </>
  );
}

export default App;
