import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import AdminNav from "./AdminNav";
import Chart from "./Chart";
import { ImCheckmark, ImCross } from "react-icons/im";
export default function Data() {
  const navigate = useNavigate();
  const [currAdmin, setCurrAdmin] = useState();
  const [studentData, setStudentData] = useState([]);
  const [queData, setQueData] = useState([]);

  const getAuth = async () => {
    try {
      const res = await fetch("/admin/data", {
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
      navigate("/admin/login", { replace: true });
    }
  };

  const calldata = async () => {
    try {
      const res = await fetch("/admin/alldata", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setStudentData(data);

      if (!data.status === 200) {
        const err = new Error(data.error);
        throw err;
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  const complete_quiz = studentData.filter((ele) => {
    return ele.status == true;
  });
  const pass_quiz = studentData.filter((ele) => {
    return ele.result  == 'Pass';
  });
  useEffect(() => {
    getAuth();
    calldata();
  }, []);

  const chartdata = studentData.map((ele) => {
    return ele.score;
  });
  const chartlabel = studentData.map((ele) => {
    return ele.username;
  });

  return (
    <>
      <AdminNav />
      {studentData.length === 0 ? (
        <>
          <h1 className="text-center">No Data Found</h1>
        </>
      ) : (
        <>
          <div className="container-fluid d-flex mt-5 justify-content-center">
            <div className="container bg-info mx-3 p-5 shadow-lg rounded">
              <h1 className="text-dark">{studentData.length}</h1>
              <h3 className="text-dark">Total Students</h3>
            </div>
            <div className="container bg-warning mx-3 p-5 shadow-lg rounded">
              <h1 className="text-dark">{complete_quiz.length}</h1>
              <h3 className="text-dark">Complete Quiz</h3>
            </div>
            <div className="container bg-danger mx-3 p-5 shadow-lg rounded">
              <h1 className="text-dark">
                {complete_quiz.length - pass_quiz.length}
              </h1>
              <h3 className="text-dark">Fail Students</h3>
            </div>
            <div className="container bg-success mx-3 p-5 shadow-lg rounded">
              <h1 className="text-dark">{pass_quiz.length}</h1>
              <h3 className="text-dark">Pass Students</h3>
            </div>
          </div>

          <div className="container-fluid  mt-5">
            <h1 className="text-center mb-3">All Students Data</h1>
            <hr />
            <table className="table table-border">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Score</th>
                  <th scope="col">Status</th>
                  <th scope="col">Result</th>
                  <th scope="col">Answers</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((ele, i) => {
                  return (
                    <>
                      <tr
                        key={i + 1}
                        className={`${ele.status ? "bg-light" : "bg-danger"}`}
                      >
                        <th>{i + 1}</th>
                        <th>{ele._id}</th>
                        <td>{ele.username}</td>
                        <td>{ele.email}</td>
                        <td>{ele.score}</td>
                        {ele.status ? (
                          <>
                            <td>
                              <ImCheckmark />
                            </td>{" "}
                          </>
                        ) : (
                          <>
                            <td>
                              <ImCross />
                            </td>
                          </>
                        )}
                        <td className="fw-bold">{ele.result}</td>
                        <td>{ele.answer.join(",")}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="container-fluid p-5 mt-5">
            <h1 className="text-center">Students Report</h1>
            <hr />
            <Chart datas={chartdata} label={chartlabel} />
          </div>
        </>
      )}
    </>
  );
}
