import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudentNav from "./StudentNav";

export default function Student() {
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
      navigate("/student/login", { replace: true });
    }
  };

  useEffect(() => {
    getAuth();
  }, []);
  return (
    <>
      <StudentNav />

      <div className="container p-5 mt-5 d-flex justify-content-center">
        <div className="card p-5" style={{ width: "50rem" }}>
          <div className="card-body">
            <div className="container d-flex justify-content-center">
              <i className="fa-solid fa-user" style={{ fontSize: "70px" }}></i>
            </div>

            <h1 className="card-title text-center">Student Profile</h1>
            <hr />
            <h5 className="my-4">Student ID : {currStudent?._id}</h5>
            <h5 className="my-4">Name : {currStudent?.username}</h5>
            <h5 className="my-4">Email-ID : {currStudent?.email}</h5>
            <h5 className="my-4">Score : {currStudent?.score}</h5>
            <h5 className="my-4">
              Result :{" "}
              <span
                className={`${
                  currStudent?.result === "Pass"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {currStudent?.result}
              </span>
            </h5>
            {currStudent?.status ? (
              <>
                <h5>
                  Quiz Status : <span className="text-success">Complete</span>
                </h5>
              </>
            ) : (
              <>
                <h5>
                  Quiz Status : <span className="text-danger">In Complete</span>
                </h5>
              </>
            )}
          </div>
          <div className="card-body d-flex justify-content-center">
            {currStudent?.status ? (
              <>
                <button className="btn btn-dark">
                  <Link
                    to="/result"
                    style={{ textDecoration: "none" }}
                    className="text-light"
                  >
                    Check Result
                  </Link>
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-dark">
                  <Link
                    to="/quizz"
                    style={{ textDecoration: "none" }}
                    className="text-light"
                  >
                    Start Quizz
                  </Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
