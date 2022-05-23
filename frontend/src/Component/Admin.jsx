import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import AdminNav from "./AdminNav";
export default function Admin() {
  const [datas, setdatas] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const admin = async (e) => {
    e.preventDefault();
    const { email, password } = datas;
    const res = await fetch("/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 400 || res.status === 422 || !data) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      navigate("/admin/data", { replace: true });
    }
  };
  // useEffect(() => {
  //   const cookie = Cookies.get("admin");
  //   if (cookie) {
  //     navigate("/data", { replace: true });
  //   }
  // });
  return (
    <>
      <AdminNav />
      <div className="container p-5 mt-5 bg-warning">
        <form method="POST">
          <h1 className="text-center">Login Admin</h1>
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
              value={datas.email}
              onChange={(e) => setdatas({ ...datas, email: e.target.value })}
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
              value={datas.password}
              onChange={(e) => setdatas({ ...datas, password: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-dark fw-bold"
              onClick={admin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
