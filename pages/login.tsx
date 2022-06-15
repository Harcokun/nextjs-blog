import axios from "axios";
import React, { useState } from "react";
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8000/api/auth/login",
      data: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        setToken(response.data.token);
        console.log(`Response Token: ${response.data.token}`);
        //console.log(`Token: ${token}`);
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
        }
        router.push('/');
      })
      .catch(function (error) {
        if (error.response) {
          setErrorMsg(error.response.status);
          console.log(`Reponse Error Status: ${error.response.status}`);
        }
      });
  };

  return (
    <div className="flex flex-col text-center">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input
            className="w-full h-8 placeholder-gray-200 border border-gray-200 rounded-[10px] p-2 text-sm"
            type="text"
            value={email}
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            className="w-full h-8 placeholder-gray-200 border border-gray-200 rounded-[10px] p-2 text-sm"
            type="password"
            value={password}
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button
            className="rounded-[60px] bg-green-400 font-medium text-[16px] border hover:opacity-60 p-2 mb-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
        {errorMsg == "400" && (<div>Unauthorized: Email or password is incorrect.</div>)}
    </div>
  );
};

export default Login;
