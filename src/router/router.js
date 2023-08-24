import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Middleware from './middleware';
import Home from "../components/home";
export default function WebRoute() {
  return (
    <Routes>
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Middleware> */}
        <Route path="/" element={<Middleware><Home /></Middleware>} />
      {/* </Middleware> */}
      <Route path="project:id" />
    </Routes>
  );
}
