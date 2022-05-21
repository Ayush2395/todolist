import React from "react";
import Menubar from "./components/menubar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import AppState from "./context/AppState";
import Register from "./pages/register";
import Todo from "./pages/todo";
import ProfileSetting from "./components/profileSetings";
import VerifyEmail from "./components/verifyEmail";

export default function App() {
  return (
    <>
      <AppState>
        <Menubar />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/verifyemail" element={<VerifyEmail />} />
            <Route path="/settings" element={<ProfileSetting />} />
          </Routes>
        </Router>
      </AppState>
    </>
  );
}
