import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Component/Home";
import Register from "../Component/Register";
import Login from "../Component/Login";
import Admin from "../Component/Admin";
import Data from "../Component/Data";
import Quizz from "../Component/Quizz";
import Error from "../Component/Error";
import CreateQuizz from "../Component/CreateQuizz";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/login" element={<Login />} />
          <Route path="/student/register" element={<Register />} />
          <Route path="/admin/login" element={<Admin />} />
          <Route path="/admin/data" element={<Data />} />
          <Route path="/quizz" element={<Quizz />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin/create" element={<CreateQuizz />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
