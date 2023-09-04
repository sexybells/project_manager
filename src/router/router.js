import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Middleware from './middleware';
import Home from "../components/home";
import Projects from "../components/projects/projects";
import CreateProject from "../components/projects/createProject";
import DetailProject from "../components/projects/detailProject";
import CreateTask from "../components/tasks/createTask";
export default function WebRoute() {
  return (
    <Routes>
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Middleware><Home /></Middleware>} />
      <Route path="/register" element={<Middleware><Register /></Middleware>} />
      <Route path="/projects" element={<Middleware><Projects /></Middleware>} />
      <Route path="/create-project" element={<Middleware><CreateProject /></Middleware>} />
      <Route path="/create-task" element={<Middleware><CreateTask /></Middleware>} />
      <Route path="/detail-project/:id" element={<Middleware><DetailProject /></Middleware>} />
    </Routes>
  );
}
