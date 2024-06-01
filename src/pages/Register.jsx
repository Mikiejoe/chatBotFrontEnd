import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError,setPasswordError] = useState(null)
  const [emailError,setEmailError] = useState(null)
  const [usernameError,setUsernameError] = useState(null)
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setEmailError(null)
    setPasswordError(null)
    setUsernameError(null)
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      password: password,
      email: email,
      username: username,
    });

    let response = await fetch("https://chat-bot-azure-chi.vercel.app/auth/signup", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    // const data = await res.json()
    console.log(response);
    const data = await response.json();
    console.log(data);
    let errorMessage = '';
    if (!data.ok) {
      if (data.errors) {
        data.errors.map(({ field, message }) =>
   
          {
            if(field == "password") {
              errorMessage = message;
              // console.log(message)
              // console.log(passwordError);
              // setPasswordError(message)
              // console.log(passwordError);
              // return
            }
            if(field == "email") setEmailError(message)
            if(field == "username") setUsernameError(message)
              
          }
        );
      }else{
        errorMessage = data.message;
      }
      setMessage(errorMessage);
      setError(true);
      console.log("out",errorMessage);
    }
    // TODO: Implement register logic
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const handleEmailChange = (e) => {
    console.log(submit);

    setEmail(e.target.value);
  };
  const handleUsernameChange = (e) => {
    console.log(submit);

    setUsername(e.target.value);
  };
  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  }, [email, password]);

  return (
    <div className="md:grid grid-cols-2">
      <div className="bg-red-500  hidden items-center justify-center md:flex">
        dfghj
      </div>
      <div className="bg-gray-300 h-screen flex-col gap-4 px-8 sm:px-16 md:px-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold font-mono bg-blue-600 px-2 py-1 rounded-lg">
            Itakua Fty
          </h1>
          <h1 className="text-xl font-bold font-serif">Register</h1>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {error && <p className="bg-red-300 text-sm rounded-md p-2 text-red-5-700">{message}</p>}
          <div className="h-10 w-full bg-red-500 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Email"
              required={true}
              name="email"
              className="p-3 h-full w-full placeholder:text-gray-800 shadow-lg outline-none"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p>{emailError}</p>}
          </div>
          <div className="h-10 w-full bg-red-500 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Username"
              required={true}
              name="username"
              className="p-3 h-full w-full placeholder:text-gray-800 shadow-lg outline-none"
              value={username}
              onChange={handleUsernameChange}
            />
            {usernameError && <p>{usernameError} </p>}
          </div>
          <div className="h-10 w-full bg-red-500 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="p-3 h-full w-full shadow-lg placeholder:text-gray-800  outline-none"
            />
            {passwordError && <p>{passwordError}</p>}
          </div>
          <div className="h-10 w-full rounded-[12px] overflow-hidden">
            <button
              type="submit"
              onSubmit={handleSubmit}
              disabled={submit}
              className={`h-full w-full font-semibold text-white shadow-lg ${
                submit ? "bg-gray-400" : "bg-[#229912]"
              }  outline-none`}
            >
              Register
            </button>
          </div>
        </form>
        <div className="flex w-full gap-2 justify-end">
          <p className="flex-2">Already have an account?</p>
          <Link to={"/login"} className="cursor-pointer text-blue-500">
            Login
          </Link>
        </div>

        <div className="w-full gap-2 flex items-center text-center">
          <div className="h-[1px] bg-gray-400 w-full"></div>
          <p className="h-full p-0">or</p>
          <div className="h-[1px] bg-gray-400 w-full"></div>
        </div>
        <div className="text-center flex items-center gap-2 justify-center p-2 w-full font-semibold bg-white rounded-lg">
          <FaGoogle color="blue" />
          <p>Sign Up with Google</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
