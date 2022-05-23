import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../Action";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import StudentNav from "./StudentNav";
export default function Login() {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.student);
 
  const navigate = useNavigate();
  // const cookie = Cookies.get("student");

  // useEffect(() => {
  //   if (cookie) {
  //     navigate("/quizz", { replace: true });
  //   } else {
  //     dispatch(login());
  //   }
  // }, []);

  // const loginStudent = (e) => {
  //   e.preventDefault();
  //   const valid_student = student.filter((ele) => {
  //     return ele.email === data.email && ele.password === data.password;
  //   });

  //   if (valid_student.length !== 0) {
  //     Cookies.set("student", valid_student[0].id);
  //     navigate("/quizz", { replace: true });

  //     setdata({
  //       email: "",
  //       password: "",
  //     });
  //   } else {
  //     toast.error("Invalid logins");
  //   }
  // };

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
      navigate("/quizz", { replace: true });
    }
  };
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
              autocomplete="off"
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
