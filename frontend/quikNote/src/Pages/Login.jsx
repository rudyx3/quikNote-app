import React, { useState } from "react";
import notebookImage from "../assets/Images/notebook.png";
import { Link, useNavigate } from "react-router-dom";
import MyIcon from "../Components/Icons";
import Passwordinput from "../Components/Passwordinput";
import { validateEmail } from "../utils/emailValidate";
import axiosInstance from "../utils/API";
const Login = () => {
  //react controlled elements
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //POST API for LOGIN

    try {
      // Send a POST request to the /login endpoint
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Check and save the access token
      if (response.data && response.data.accessToken) {
        //saving the token to the localStorage
        localStorage.setItem("token", response.data.accessToken);
        console.log("Token saved successfully");

        navigate("/notes");
        console.log("User Logged in");
      } else {
        setError("Login failed: No access token received.");
      }
    } catch (error) {
      // Handle login errors
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex items-center px-1 py-3 absolute">
        <MyIcon width="40px" className="mt-1 ml-4" />
        <h1 className="text-2xl font-semibold font-playfair text-custom-green mt-1">
          QuikNote
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
        <div className="px-10 py-10 bg-white border-2 border-gray-200 rounded-3xl shadow-md">
          <h3 className="text-lg font-semibold text-custom-green font-playfair">
            Welcome Back to{" "}
            <span className="text-lg font-semibold text-custom-orange font-playfair">
              QuikNote
            </span>
          </h3>{" "}
          <h1 className="mt-8 text-5xl font-semibold font-playfair text-custom-green">
            Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mt-7">
              <div className="min-h-[70px] min-w-[300px] ">
                <input
                  className="w-full p-2 mt-1 bg-transparent border-2 rounded-md border-custom-green"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Passwordinput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between ">
              <div>
                <input
                  type="checkbox"
                  id="remember"
                  className="accent-custom-orange"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-base font-medium text-custom-green"
                >
                  Remember me
                </label>
              </div>
              <button className="text-base font-medium text-custom-green">
                Forgot Password?
              </button>
            </div>
            {error && (
              <p className="text-xs font-semibold text-red-500 pt-2">{error}</p>
            )}
            <div className="flex flex-col mt-5 text-center">
              <button
                type="submit"
                className="hover:scale-[1.01] ease-in-out text-lg font-medium text-white rounded-md active:scale-[.98] active:duration-75 transition-all py-2 bg-custom-green"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-5">
            <button className=" text-custom-green">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-custom-orange">
                Get Started
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="items-center justify-evenly hidden h-full bg-[#F9F7F0] lg:flex w-1/2 flex-col">
        <div>
          <img src={notebookImage} width="200px" />
        </div>
        <div className="mb-8 font-bold text-center animate-pulse text-custom-orange">
          <h4 className="text-3xl font-playfair">"Store your Memories"</h4>
          <span className="font-semibold font-playfair">-Rudraa Patel</span>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 text-sm text-custom-green">
        Copyright © 2024 <span className="text-custom-orange">QuikNote</span>{" "}
        All rights reserved.
      </div>
    </div>
  );
};

export default Login;
