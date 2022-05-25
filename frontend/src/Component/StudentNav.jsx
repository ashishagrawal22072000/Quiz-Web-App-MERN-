import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
export default function StudentNav() {
  const [currStudent, setCurrStudent] = useState();
  const navigate = useNavigate();

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
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    fetch("/logout", {
      method: "POST",
      headers: {
        Accept: "appllication/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        navigate("/", { replace: true });
        if (!res.status === 200) {
          const err = new Error(res.error);
          throw err;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-Navbarbrand" to="/">
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
            {currStudent ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/quizz"
                    >
                      Home
                    </Link>
                  </li>
                </ul>
                {currStudent?.status ? (
                  <>
                    <div>
                      <button className="btn btn-dark" onClick={logout}>
                        LogOut
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <ul className="navbar-nav ms-auto mx-5 mb-2 mb-lg-0">
                  <Link to="/student/login">
                    <button className="btn btn-dark fw-bold mx-3">Login</button>
                  </Link>
                  <Link to="/student/register">
                    <button className="btn btn-dark fw-bold">Register</button>
                  </Link>
                </ul>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
