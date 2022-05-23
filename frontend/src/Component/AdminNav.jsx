import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function AdminNav() {
  const cookie = Cookies.get("admin");

  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("admin");
    navigate("/admin/login", { replace: true });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-Navbarbrand" to="/quizz">
            Quizz.com
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className={`${cookie ? "d-block" : "d-none"}`}>
              <button
                className="btn btn-dark fw-bold text-light"
                onClick={logout}
              >
                LogOut
              </button>
            </div>
            <div className={`${cookie ? "d-none" : "d-block"}`}>
              <button className="btn btn-dark mx-3 fw-bold text-light">
                <Link to="/admin/login" className="fw-bold text-light">
                  Admin
                </Link>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
