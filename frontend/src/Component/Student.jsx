import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImUser } from "react-icons/im";
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
      console.log(data);

      if (!data.status === 200) {
        const err = new Error(data.error);
        throw err;
      }
    } catch (err) {
      console.log(err);
      navigate("/student/login", { replace: true });
    }
  };

  console.log(currStudent?.status);
  useEffect(() => {
    getAuth();
  }, []);
  return (
    <>
      <StudentNav />
      {/* <section class="vh-100" style={{backgroundColor : '#9de2ff'}}>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-md-9 col-lg-7 col-xl-5">
        <div class="card" style={{borderRadius: '15px'}}>
          <div class="card-body p-4">
            <div class="d-flex text-black">
              <div class="flex-shrink-0">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                  alt="Generic placeholder image" class="img-fluid"
                  style={{width: '180px',borderRadius: '10px'}} />
              </div>
              <div class="flex-grow-1 ms-3">
                <h5 class="mb-1">Danny McLoan</h5>
                <p class="mb-2 pb-1" style={{color: '#2b2a2a'}}>Senior Journalist</p>
                <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
                  style={{backgroundColor: '#efefef'}}>
                  <div>
                    <p class="small text-muted mb-1">Articles</p>
                    <p class="mb-0">41</p>
                  </div>
                  <div class="px-3">
                    <p class="small text-muted mb-1">Followers</p>
                    <p class="mb-0">976</p>
                  </div>
                  <div>
                    <p class="small text-muted mb-1">Rating</p>
                    <p class="mb-0">8.5</p>
                  </div>
                </div>
                <div class="d-flex pt-1">
                  <button type="button" class="btn btn-outline-primary me-1 flex-grow-1">Chat</button>
                  <button type="button" class="btn btn-primary flex-grow-1">Follow</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}

      {/* <section class="vh-100" style={{backgroundColor: '#f4f5f7'}}>
  <div class="container py-5 h-100">
    <div class="row d-flex flex-column justify-content-start align-items-center h-100">
      <div class="col col-lg-6 mb-4 mb-lg-0">
        <div class="card vh-90" style={{borderRadius: '.5rem'}}>
          <div class="row g-0">
            <div class="col-md-4 gradient-custom text-center text-white"
              style={{borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem'}}>
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="Avatar" class="img-fluid my-5" style={{width: '80px'}} />
              <h5>Marie Horwitz</h5>
              <p>Web Designer</p>
              <i class="far fa-edit mb-5"></i>
            </div>
            <div class="col-md-8">
              <div class="card-body p-4">
                <h6>Information</h6>
                <hr class="mt-0 mb-4" /><img class="card-img-top" src="..." alt="Card image cap" />
                    <h6>Phone</h6>
                    <p class="text-muted">123 456 789</p>
                  </div>
                </div>
                <h6>Projects</h6>
                <hr class="mt-0 mb-4" />
                <div class="row pt-1">
                  <div class="col-6 mb-3">
                    <h6>Recent</h6>
                    <p class="text-muted">Lorem ipsum</p>
                  </div>
                  <div class="col-6 mb-3">
                    <h6>Most Viewed</h6>
                    <p class="text-muted">Dolor sit amet</p>
                  </div>
                </div>
                <div class="d-flex justify-content-start">
                  <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
                  <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
                  <a href="#!"><i class="fab fa-instagram fa-lg"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}

      <div className="container p-5 mt-5 d-flex justify-content-center">
        <div class="card p-5" style={{ width: "50rem" }}>
          <div class="card-body">
            <div className="container d-flex justify-content-center">
              <i class="fa-solid fa-user" style={{ fontSize: "70px" }}></i>
            </div>

            <h1 class="card-title text-center">Student Profile</h1>
            <hr />
            <h5 className="my-4">Student ID : {currStudent?._id}</h5>
            <h5 className="my-4">Name : {currStudent?.username}</h5>
            <h5 className="my-4">Email-ID : {currStudent?.email}</h5>
            <h5 className="my-4">Score : {currStudent?.score}</h5>
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
          <div class="card-body d-flex justify-content-center">
            {currStudent?.status ? (
              <>
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
