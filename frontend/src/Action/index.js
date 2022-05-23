import axios from "axios";
import {
  LOGIN_STUDENT,
  REGISTER_STUDENT,
  SCORE_STUDENT,
  ADMIN_DATA,
} from "./actionType";

export const register = (student) => {
  return (dispatch) => {
    axios({
      method: "POST",
      url: "http://localhost:3000/students",
      data: student,
    })
      .then((res) => {
        dispatch({
          type: REGISTER_STUDENT,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const login = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "http://localhost:3000/students",
    })
      .then((res) => {
        dispatch({
          type: LOGIN_STUDENT,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const studentscore = (id, data) => {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: `http://localhost:3000/students/${id}`,
      data: data,
    })
      .then((res) => {
        dispatch({
          type: SCORE_STUDENT,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const admindata = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "http://localhost:3000/students",
    })
      .then((res) => {
        dispatch({
          type: ADMIN_DATA,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
