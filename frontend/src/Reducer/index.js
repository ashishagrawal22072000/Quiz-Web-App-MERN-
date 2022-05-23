const studentReducer = (state = { student: [] }, action) => {
  switch (action.type) {
    case "REGISTER_STUDENT":
      return {
        ...state,
        student: action.payload,
      };
    case "LOGIN_STUDENT":
      return {
        ...state,
        student: action.payload,
      };
    case "SCORE_STUDENT":
      return {
        ...state,
        student: action.payload,
      };
      case "ADMIN_DATA":
      return {
        ...state,
        student: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
