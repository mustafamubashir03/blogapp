import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import ButtonSecondary from "../components/ButtonSecondary";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    setError(false);
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/sign-up", {
        username,
        password,
        email,
      });
      navigate("/log-in");
    } catch (e) {
      if (e.response || e.request) {
        setError(true);
      }
    }
  };

  return (
    <div className="flex max-w-screen-xl m-auto px-4 gap-10">
      <div className="flex-9 flex items-center flex-col py-5 text-center text-gray-700 mt-6">
        <h2 className="font-bold text-3xl text-gray-800 mb-5">Sign up</h2>
        <form
          className="flex flex-col items-center justify-center gap-2 w-2/4 "
          onSubmit={submitForm}
        >
          <div className="flex flex-col text-gray-600 w-full items-stretch gap-4  ">
            <input
              className="border-b-2 focus:border-b-2   border-gray-300 rounded-sm py-2 px-4 w-full"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
            />
            <input
              className="border-b-2 focus:border-b-2 italic border-gray-300 rounded-sm py-2 px-4"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            <input
              className="border-b-2 focus:border-b-2 italic border-gray-300 rounded-sm py-2 px-4"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>

          <Button type={"submit"} label={"Sign up"} />
          {error && (
            <p className="font-medium text-red-700">Error has occurred</p>
          )}
          <Link to={"/log-in"}>
          <p className="text-gray-500 font-medium text-sm mt-3">Already have an account?</p>
            <ButtonSecondary label={"Log in"} />
          </Link>
        </form>
      </div>
    </div>
  );
}
