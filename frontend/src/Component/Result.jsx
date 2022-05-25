import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StudentNav from "./StudentNav";

export default function Result() {
  const [currStudent, setCurrStudent] = useState();
  const navigate = useNavigate();
  const [queData, setQueData] = useState([]);

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
  const callquestion = async () => {
    try {
      const res = await fetch("/questions", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setQueData(data);
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
    callquestion();
  }, []);
  return (
    <>
      <StudentNav />
      <div className="container-fluid p-5">
        <h1 className="text-center">Result</h1>
        <hr />
        <div className="container p-5 border">
          <h3 className="text-center">Your Score</h3>
          <div className="progress mt-5" style={{ height: "50px" }}>
            <div
              className="progress-bar progress-bar-striped"
              role="progressbar"
              style={{
                width: `${currStudent?.score * 10}%`,
                backgroundColor: `${
                  currStudent?.result === "Pass" ? "green" : "red"
                }`,
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <h1>{currStudent?.score * 10}%</h1>
            </div>
          </div>
        </div>
        {currStudent?.status ? (
          <>
            <div className="container-fluid">
              <div className="question-text mt-3 ">
                {queData.map((ele, i) => {
                  return (
                    <>
                      <div className="container-fluid border my-3 p-2">
                        <h3>
                          Que {i + 1}. {ele.question}
                        </h3>
                        <div className="container mx-4 ">
                          {ele.options.map((option, i) => {
                            return (
                              <>
                                <h4
                                  className={`${
                                    i == ele.answer - 1
                                      ? "text-success"
                                      : "text-dark"
                                  }`}
                                >
                                  op{i + 1}. {option}
                                </h4>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
