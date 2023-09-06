import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/login";
export default function LoginRoute() {
  return (
    <Routes>
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/login" element={<Login />} />

    </Routes>
  );
}
