import axios from "axios";
import React, { useState } from "react";
//import "./login.css";

interface LoginProps {
  setToken: (token: any) => void;
}

async function loginUser(credentials) {
  return fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
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
    </div>
  );
};

export default Login;
