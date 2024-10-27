export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { user: null, dataFetching: true, error: false };

    case "LOGIN_SUCCESS":
      return { user: action.payload, dataFetching: false, error: false };

    case "LOGIN_FAILURE":
      return { user: null, dataFetching: false, error: true };
    case "UPDATE_START":
      return { ...state, dataFetching: true };

    case "UPDATE_SUCCESS":
      return { user: action.payload, dataFetching: false, error: false };

    case "UPDATE_FAILURE":
      return { user: state.user, dataFetching: false, error: true };
    case "LOGOUT":
      return { user: null, dataFetching: false, error: false };

    default:
      return state;
  }
};
