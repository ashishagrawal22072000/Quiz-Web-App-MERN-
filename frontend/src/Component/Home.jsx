import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const student = () => {
    navigate("/student/register", { replace: true });
  };
  const admin = () => {
    navigate("/admin/login", { replace: true });
  };
  return (
    <>
      <div className="container p-5 mt-5">
        <div className="container p-5 mt-5">
          <div className="container p-lg-5 mt-5 d-flex jsutify-content-center align-items-center">
            <button
              className="btn btn-dark mx-5"
              onClick={student}
              style={{
                height: "300px",
                width: "500px",
                fontWeight: 1000,
                fontSize: "40px",
              }}
            >
              Student
            </button>
            <button
              className="btn btn-dark"
              onClick={admin}
              style={{
                height: "300px",
                width: "500px",
                fontWeight: 1000,
                fontSize: "40px",
              }}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
