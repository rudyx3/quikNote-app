import React, { useState } from "react";
import MyIcon from "../Components/Icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import notebookImage from "../assets/Images/notebook.png";
import Passwordinput from "../Components/Passwordinput";
import { validateEmail } from "../utils/emailValidate";
import axiosInstance from "../utils/API";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter a name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError("");

    //API request for SignUp

    try {
      const response = await axiosInstance.post("/signup", {
        name: name,
        email: email,
        password: password,
      });

      if (response.data) {
        navigate('/')
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An Unexpected error occured. Please try again");
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
            Welcome to{" "}
            <span className="text-lg font-semibold text-custom-orange font-playfair">
              QuikNote
            </span>
          </h3>{" "}
          <h3 className="text-lg font-semibold text-custom-green font-playfair">
            Lets Get Started,
          </h3>
          <h1 className="mt-5 text-5xl font-semibold font-playfair text-custom-green">
            SignUp
          </h1>
          <form onSubmit={handleSignup}>
            <div className="mt-7">
              <div className="min-h-[60px] min-w-[300px] ">
                <input
                  className="w-full p-2 mt-1 bg-transparent border-2 rounded-md border-custom-green"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="min-h-[60px] min-w-[300px] ">
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
            {error && (
              <p className="text-xs font-semibold text-red-500 pt-2">{error}</p>
            )}
            <div className="flex flex-col mt-4 text-center">
              <button className="hover:scale-[1.01] ease-in-out text-lg font-medium text-white rounded-md active:scale-[.98] active:duration-75 transition-all py-2 bg-custom-green">
                SignUp
              </button>
            </div>
            <div className="mt-5 text-center">
              <button className=" text-custom-green">
                Already have an account?{" "}
                <Link to="/" className="underline text-custom-orange">
                  Login
                </Link>
              </button>
            </div>
          </form>
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

export default Signup;
