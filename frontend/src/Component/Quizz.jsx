import React, { useState, useEffect } from "react";
import Questions from "../Questions";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { login, studentscore } from "../Action";
import { useSelector, useDispatch } from "react-redux";
import StudentNav from "./StudentNav";
import { toast } from "react-toastify";
export default function Quizz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector((state) => state.student.student);
  const [currStudent, setCurrStudent] = useState();
  const [quedata, setquedata] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [saveans, setsaveans] = useState([]);
  const [completeQuiz, setCompleteQuiz] = useState("");

  const handleAnswerOptionClick = (text) => {
    console.log("wgvfbfjhrrnegkvrngnweigwqefwjeqnfkjwnevke", text);
    setsaveans([...saveans, text]);
    if (
      text ==
      quedata[currentQuestion]?.options[quedata[currentQuestion]?.answer-1]
    ) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quedata.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
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

  const save = async () => {
    const confirm = window.confirm("Are You Sure To Save");
    if (confirm) {
      const res = await fetch("/result", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currStudent._id,
          score: score,
          status: true,
          answer: saveans,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        toast.success(data.message);
        logout();
      } else {
        toast.error(data.error);
      }
    }
  };

  const getAuth = async () => {
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
      console.log(data[currentQuestion]?.answer);
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

  const calldata = async () => {
    try {
      const res = await fetch("/quizzdata", {
        method: "GET",
        headers: {
          Accept: "appllication/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setquedata(data);
      setCompleteQuiz(data.error);

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
    calldata();
  }, []);

  console.log(quedata[currentQuestion]?.answer);

  return (
    <>
      <StudentNav compQuizz={completeQuiz} />
      <div className="container">
        {showScore ? (
          <div className="score-section container p-5 mt-5 bg-warning">
            <h1 className="text-center">
              You scored{" "}
              <span
                className={`${
                  score >= quedata.length / 2 ? "text-success" : "text-danger"
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
                  {quedata[currentQuestion]?.options.map((answerOption, i) => {
                    return (
                      <>
                        <button
                          className="btn btn-dark mt-5 fw-bold "
                          style={{ width: "200px", height: "50px" }}
                          onClick={() => handleAnswerOptionClick(answerOption)}
                        >
                          {answerOption}
                        </button>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* <div className="container">
        {showScore ? (
          <div className="score-section container p-5 mt-5 bg-warning">
            <h1 className="text-center">
              You scored{" "}
              <span
                className={`${
                  score >= quedata.length / 2 ? "text-success" : "text-danger"
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
            <div className="container p-5 mt-5 bg-warning ">
              <h1 className="text-center">Quizz App</h1>
              <hr />
              <div className="question-count mt-5">
                <span className="fw-bold text-muted">
                  Question {currentQuestion + 1} of {quedata.length}
                </span>
              </div>
              <div className="question-text mt-3">
              <h2 className="fw-bold">{quedata[1].question}</h2>

                  
               
              </div>
              <div className="container d-flex flex-column justify-content-center align-items-start">
                {Questions[currentQuestion].options.map((answerOption) => {
                  return (
                    <>
                      <button
                        className="btn btn-dark mt-5 fw-bold "
                        style={{ width: "200px", height: "50px" }}
                        onClick={() =>
                          handleAnswerOptionClick(
                            answerOption.isCorrect,
                            answerOption.answerText
                          )
                        }
                      >
                        {answerOption.answerText}
                      </button>
                    </>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div> */}
    </>
  );
}
