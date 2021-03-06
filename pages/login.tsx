import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
//import { authService } from "../services/container";
import Layout from "../components/layout";
import { useContainer } from "../services/containerProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authService } = useContainer();

  const handleSubmit = async (event) => {
    event.preventDefault();
    //setErrorMsg("");
    let [login_token, login_errorMsg] = await authService.login(
      email,
      password
    );
    //console.log(`login_token: ${login_token}`);
    if (login_token) {
      location.reload();
    }
    if (login_errorMsg == "401") {
      alert("Unauthorized.");
    }
  };

  return (
    <Layout home>
      <div className="flex flex-col text-center">
        <h1>Please Log In</h1>
        <form className="mt-5" onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input
              className="w-3/5 h-8 placeholder-gray-200 border border-gray-200 rounded-[10px] p-2 text-sm"
              type="text"
              value={email}
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              className="w-3/5 h-8 placeholder-gray-200 border border-gray-200 rounded-[10px] p-2 text-sm"
              type="password"
              value={password}
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <button
              className="rounded-[60px] bg-green-400 font-medium text-[16px] border hover:opacity-60 p-2 mt-2 mb-2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
