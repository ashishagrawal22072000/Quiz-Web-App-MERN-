import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import StudentNav from "./StudentNav";
import { toast } from "react-toastify";
export default function Quizz() {
  const navigate = useNavigate();
  const [quedata, setquedata] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [saveans, setsaveans] = useState([]);
  const [completeQuiz, setCompleteQuiz] = useState("");
  const [inputval, setinputval] = useState("");
  const [result, setResult] = useState();
  const input = useRef([]);
  const [loading, setLoading] = useState(true);

  const submitAnswer = () => {
    if (inputval === "") {
      alert("Please Select An Option");
    } else {
      const submit = window.confirm("Are You Sure To Submit");
      if (submit) {
        setsaveans([...saveans, inputval]);
        if (
          inputval ==
          quedata[currentQuestion]?.options[
            quedata[currentQuestion]?.answer - 1
          ]
        ) {
          setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quedata.length) {
          setCurrentQuestion(nextQuestion);
          setinputval("");
        } else {
          if (score >= quedata.length / 2) {
            setResult("Pass");
          } else {
            setResult("Fail");
          }
          setShowScore(true);
        }
      }
    }
  };

  const logout = () => {
    fetch("/student/logout", {
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

  const save = async () => {
    if (score >= quedata.length / 2) {
      setResult("Pass");
    } else {
      setResult("Fail");
    }
    const confirm = window.confirm("Are You Sure To Save");
    if (confirm) {
      const res = await fetch("/quizz/result", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: score,
          status: true,
          answer: saveans,
          result: result,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        toast.success(data.message);
        console.log(data.message);
        logout();
      } else {
        toast.error(data.error);
        console.log(data.error);
      }
    }
  };



  const calldata = async () => {
    try {
      const res = await fetch("/quizz", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setquedata(data);
      setCompleteQuiz(data.error);
      setLoading(false);

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
    calldata();
  }, []);

  return (
    <>
      <StudentNav compQuizz={completeQuiz} />
      {loading ? (
        <>
          <div className="container d-flex justify-content-center align-item-center mt-5">
            <div className="container d-flex justify-content-center align-item-center mt-5">
              <div
                class="spinner-border mt-5"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            {showScore ? (
              <div className="score-section container p-5 mt-5 bg-warning">
                <h1 className="text-center">
                  You scored{" "}
                  <span
                    className={`${
                      score >= quedata.length / 2
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {score}
                  </span>{" "}
                  out of {quedata.length}
                </h1>
                <div className="container d-flex mt-5 justify-content-center align-items-center">
                  <button className="btn btn-dark fw-bold" onClick={save}>
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <>
                {completeQuiz ? (
                  <>
                    <h1 className="text-center">{completeQuiz}</h1>
                  </>
                ) : (
                  <div className="container p-5 mt-5 bg-warning ">
                    <h1 className="text-center">Quizz App</h1>
                    <hr />
                    <div className="question-count mt-5">
                      <span className="fw-bold text-muted">
                        Question {currentQuestion + 1} of {quedata.length}
                      </span>
                    </div>
                    <div className="question-text mt-3">
                      <h2 className="fw-bold">
                        {quedata[currentQuestion]?.question}
                      </h2>
                    </div>
                    <div className="container d-flex flex-column justify-content-center align-items-start">
                      {quedata[currentQuestion]?.options.map(
                        (answerOption, i) => {
                          return (
                            <>
                              <div className="form-check my-3">
                                <input
                                  className="form-check-input text-center"
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios2"
                                  value={answerOption}
                                  onClick={(el) => {
                                    input.current[i] = el;
                                    let val = input.current[i].target.value;
                                    setinputval(val);
                                  }}
                                  style={{ height: "20px", width: "20px" }}
                                />
                                <label
                                  className="form-check-label text-center text-secondary"
                                  for="exampleRadios2"
                                >
                                  <h4>{answerOption}</h4>
                                </label>
                              </div>
                            </>
                          );
                        }
                      )}
                    </div>
                    <div className="conatiner-fluid d-flex justify-content-end">
                      <button className="btn btn-danger" onClick={submitAnswer}>
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
