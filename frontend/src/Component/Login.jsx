import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentNav from "./StudentNav";
export default function Login() {
  const navigate = useNavigate();
  const [currStudent, setCurrStudent] = useState();

  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const loginStudent = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    const res = await fetch("/student/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const datas = await res.json();

    if (res.status === 400 || res.status === 422 || !datas) {
      toast.error(datas.error);
    } else {
      toast.success(datas.message);

      navigate(`/student`, { replace: true });
    }
  };

  const getAuth = async () => {
    try {
      const res = await fetch("/student", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setCurrStudent(data);

      if (!data.status === 200) {
        const err = new Error(data.error);
        throw err;
      } else {
        navigate("/student", { replace: true });
      }
    } catch (err) {
      console.log(err);
      navigate("/student/login", { replace: true });
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  // if (currStudent) {
  // }

  return (
    <>
      <StudentNav />
      <div className="container p-5 mt-5 bg-warning">
        <form method="POST">
          <h1 className="text-center">Login Yourself</h1>
          <hr />

          <div className="mb-5">
            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              autoComplete="off"
              value={data.email}
              onChange={(e) => setdata({ ...data, email: e.target.value })}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-bold"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={data.password}
              onChange={(e) => setdata({ ...data, password: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-dark fw-bold"
              onClick={loginStudent}
            >
              Login
            </button>
          </div>
          <p className="d-flex justify-content-center mt-3 fw-bold">
            Don't have An Account ?<Link to="/student/register">Register</Link>
          </p>
        </form>
      </div>
    </>
  );
}
