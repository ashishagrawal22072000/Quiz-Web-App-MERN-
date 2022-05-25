import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentNav from "./StudentNav";
export default function Register() {
  const navigate = useNavigate();
  const [datas, setdatas] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerStudent = async (e) => {
    e.preventDefault();

    const { username, email, password } = datas;
    const res = await fetch("/student/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (res.status === 400 || !data) {
      toast.error(data.errors[0].msg);
    } else {
      toast.success(data.message);
      navigate("/student/login", { replace: true });
    }
  };

  return (
    <>
      <StudentNav />
      
      <div className="container p-5 mt-5 bg-warning w-50 d-flex justify-content-center">
        <div className="container">
        <form method="POST">
          <h1 className="text-center">Register Yourself</h1>
          <hr />
          <div className="mb-5">
            <label htmlFor="name" className="form-label fw-bold">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autoComplete="off"
              value={datas.username}
              onChange={(e) =>
                setdatas({
                  ...datas,
                  username: e.target.value.toUpperCase(),
                })
              }
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="form-label fw-bold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              autoComplete="off"
              value={datas.email}
              onChange={(e) => setdatas({ ...datas, email: e.target.value })}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="form-label fw-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={datas.password}
              onChange={(e) => setdatas({ ...datas, password: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-dark fw-bold"
              onClick={registerStudent}
            >
              Register
            </button>
          </div>
          <p className="text-center mt-3">
            Already Have An Account ? <Link to="/student/login">Login</Link>
          </p>
        </form>
        </div>
      </div>
    </>
  );
}
