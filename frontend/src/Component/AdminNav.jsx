import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
export default function AdminNav() {
  const navigate = useNavigate();
  const [currAdmin, setCurrAdmin] = useState();
  const logout = () => {
    fetch("/admin/logout", {
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
  const getAuth = async () => {
    try {
      const res = await fetch("/admin", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setCurrAdmin(data);

      if (!data.status === 200) {
        const err = new Error(data.error);
        throw err;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

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
            {currAdmin ? (
              <>
                <div className="me-auto mb-2 mb-lg-0">
                  <button
                    className="btn btn-dark fw-bold text-light"
                    onClick={logout}
                  >
                    LogOut
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
