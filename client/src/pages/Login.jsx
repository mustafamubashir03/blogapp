import React, { useContext, useRef } from "react";
import Button from "../components/Button";
import ButtonSecondary from "../components/ButtonSecondary";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../../context/context.jsx";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const { dispatch } = useContext(context);
  const userRef = useRef();
  const passRef = useRef();
  const submitLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/log-in",
        {
          username: userRef.current.value,
          password: passRef.current.value,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      navigate("/")
    } catch (e) {
      dispatch({ type: "LOGIN_ERROR" });
      navigate("/sign-up")
    }
  };
  return (
    <div className="flex max-w-screen-xl m-auto px-4 gap-10">
      <div className="flex-9 flex items-center flex-col py-5 text-center text-gray-700 mt-6">
        <h2 className="font-bold text-3xl text-gray-800 mb-5">Log in</h2>
        <form
          className="flex flex-col items-center justify-center gap-2 w-2/4"
          onSubmit={submitLogin}
        >
          <div className="flex flex-col text-gray-600 w-full items-stretch gap-4  ">
            <input
              className="border-b-2 focus:border-b-2 italic border-gray-300 rounded-sm py-2 px-4"
              type="text"
              placeholder="Enter Username"
              ref={userRef}
            />
            <input
              className="border-b-2 focus:border-b-2 italic border-gray-300 rounded-sm py-2 px-4"
              type="text"
              placeholder="Enter Password"
              ref={passRef}
            />
          </div>

          <Button type={"submit"} label={"Log in"} />

          <Link to={"/sign-up"}>
            <p className="text-gray-500 font-medium text-sm mt-3">
              Don't have an account?
            </p>
            <ButtonSecondary label={"Sign up"} />
          </Link>
        </form>
      </div>
    </div>
  );
}
