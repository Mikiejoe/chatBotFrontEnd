import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../hooks/authContext";
import { useNavigate } from "react-router-dom";
// import {baseUrl} from "../utils/constants"

function Login() {
  const {login} = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate()
  // console.log(baseUrl)
  

 
  const handleSubmit = async (e) => {
    const baseProdUrl = "https://chat-bot-azure-chi.vercel.app"
    // const baseProdUrl = "http://localhost:5000"
    e.preventDefault();
    console.log(password,email);
    const res = await fetch(`${baseProdUrl}/auth/login`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
    const data = await res.json()
    console.log(data)
    if(res.ok){
      login(data);
      navigate("/")
      // console.log(isAuthenticated);
    }
    

    // window.location.href = "/"
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const handleEmailChange = (e) => {
    console.log(submit);

    setEmail(e.target.value);
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
        <div className="bg-red-500  hidden items-center justify-center md:flex">dfghj</div>
        <div className="bg-gray-300 h-screen flex-col gap-4 px-8 sm:px-16 md:px-18 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-bold font-mono bg-blue-600 px-2 py-1 rounded-lg">Itakua Fty</h1>
        <h1 className="text-xl font-bold font-serif">Login</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
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
        </div>
        <div className="h-10 w-full bg-red-500 rounded-md overflow-hidden">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            className="p-3 h-full w-full shadow-lg placeholder:text-gray-800  outline-none"
          />
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
            Login
          </button>
        </div>
      </form>
      <div className="flex w-full gap-2 justify-end">
        <p className="flex-2">Dont have an account?
        <Link to={"/register"} className="cursor-pointer text-blue-500">
          Register
        </Link></p>
      </div>

      <div className="w-full gap-2 flex items-center text-center">
        <div className="h-[1px] bg-gray-400 w-full"></div>
        <p className="h-full p-0">or</p>
        <div className="h-[1px] bg-gray-400 w-full"></div>
      </div>
      <div className="text-center flex items-center gap-2 justify-center p-2 w-full font-semibold bg-white rounded-lg">
        <FaGoogle color="blue" />
        <p>Sign In with Google</p>
      </div>
    </div>
    </div>
  );
}

export default Login;
