import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiTwotoneDelete } from "react-icons/ai";
export default function CreateQuizz() {
  const navigate = useNavigate();
  const [queData, setQueData] = useState([]);
  const [addQue, setAddQue] = useState({
    question: "",
    answer: "",
  });
  const [options, setOptions] = useState([
    { option1: "", option2: "", option3: "", option4: "" },
  ]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

      if (!data.status === 200) {
        const err = new Error(data.error);
        throw err;
      }
    } catch (err) {
      console.log(err);
      navigate("/admin/login", { replace: true });
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

  const deleteQuiz = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete");
    if (confirmation) {
      const res = await fetch("/question/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await res.json();
      if (res.status === 200) {
        toast.success(data.message);
        callquestion();
      }
    }
  };

  const AddQuestion = async (e) => {
    e.preventDefault();
    if (addQue.answer == "Please Select" || addQue.answer == "") {
      alert("Please Select The Appropriate Option");
    } else {
      const res = await fetch("/question/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          question: addQue.question,
          options: [
            options.option1,
            options.option2,
            options.option3,
            options.option4,
          ],
          answer: addQue.answer,
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        toast.success(data.message);
        callquestion();
        handleClose();
        setOptions([{ option1: "", option2: "", option3: "", option4: "" }]);
        setAddQue({
          question: "",
          answer: "",
        });
      } else {
        toast.error(data.error);
      }
    }
  };

  useEffect(() => {
    callquestion();
    getAuth();
  }, [setQueData]);
  return (
    <>
      <div className="container-fluid p-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">Question</th>
              <th scope="col">Option 1</th>
              <th scope="col">Option 2</th>
              <th scope="col">Option 3</th>
              <th scope="col">Option 4</th>
              <th scope="col">answer</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {queData.map((ele, i) => {
              return (
                <>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{ele.question}</td>
                    {ele.options.map((option) => {
                      return (
                        <>
                          <td>{option}</td>
                        </>
                      );
                    })}

                    <td>{ele.answer}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteQuiz(ele._id)}
                      >
                        <AiTwotoneDelete />
                      </button>
                      {queData.length == i + 1 ? (
                        <>
                          <Button
                            variant="primary"
                            onClick={handleShow}
                            className="mx-2 rounded-circle fw-bold text-light text-center btn btn-success"
                            style={{ fontSize: "20px" }}
                          >
                            +
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <div className="container">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form method="POST">
                <div className="form-group p-1">
                  <label htmlFor="question">Question</label>
                  <input
                    type="text"
                    className="form-control mb-3 fw-bold"
                    id="question"
                    aria-describedby="emailHelp"
                    placeholder="Question"
                    value={addQue.question}
                    onChange={(e) =>
                      setAddQue({ ...addQue, question: e.target.value })
                    }
                  />
                </div>
                <div className="form-group p-1">
                  <label htmlFor="option1">Option 1</label>
                  <input
                    type="text"
                    className="form-control mb-3 fw-bold"
                    id="option1"
                    aria-describedby="emailHelp"
                    placeholder="Option 1"
                    value={options.option1}
                    onChange={(e) =>
                      setOptions({ ...options, option1: e.target.value })
                    }
                  />
                </div>
                <div className="form-group p-1">
                  <label htmlFor="option2">Option 2</label>
                  <input
                    type="text"
                    className="form-control mb-3 fw-bold"
                    id="option2"
                    aria-describedby="emailHelp"
                    placeholder="Option 2"
                    value={options.option2}
                    onChange={(e) =>
                      setOptions({ ...options, option2: e.target.value })
                    }
                  />
                </div>
                <div className="form-group p-1">
                  <label htmlFor="option3">Option 3</label>
                  <input
                    type="text"
                    className="form-control mb-3 fw-bold"
                    id="option3"
                    aria-describedby="emailHelp"
                    placeholder="Option 3"
                    value={options.option3}
                    onChange={(e) =>
                      setOptions({ ...options, option3: e.target.value })
                    }
                  />
                </div>
                <div className="form-group p-1">
                  <label htmlFor="option4">Option 4</label>
                  <input
                    type="text"
                    className="form-control mb-3 fw-bold"
                    id="option4"
                    aria-describedby="emailHelp"
                    placeholder="Option 4"
                    value={options.option4}
                    onChange={(e) =>
                      setOptions({ ...options, option4: e.target.value })
                    }
                  />
                </div>
                <div className="form-group p-1">
                  <label>Select Answer</label>
                  <select
                    className="custom-select custom-select-lg mb-3"
                    onChange={(e) =>
                      setAddQue({ ...addQue, answer: e.target.value })
                    }
                    value={addQue.answer}
                  >
                    <option defaultValue>Please Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={AddQuestion}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
