import React from "react";
import Router from "./Router/Router";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router />
    </>
  );
}
