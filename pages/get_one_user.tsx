import React, { useState, useEffect } from "react";
import Layout, { siteTitle } from "../components/layout";
import axios from "axios";
import { useContainer } from "../services/containerProvider";
import Login from "./login";

const GetOneUSer = () => {
  const [user, setUser] = useState({
    api_token: null,
    created_at: "",
    email: "",
    email_verified_at: "",
    firstname: "",
    id: 0,
    lastname: "",
    updated_at: "",
  });
  const [id, setId] = useState("0");
  const [hasInput, setInputExisted] = useState(false);
  const [callUser, setCallUser] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const { authService, userService } = useContainer();

  // const token = localStorage.getItem("token");
  // console.log(token);

  if (!authService.isLogin) {
    return <Login />;
  }

  const handleClick = async () => {
    var data = null;
    await userService.getOneUser(id).then((result) => {
      data = result[0];
      setErrorCode(result[1]);
    });
    //console.log(errorCode);
    if (!errorCode) {
      setUser((user) => ({ ...user, ...data }));
      //console.log(`user: ${user.id}`);
      setCallUser(true);
    } else {
      setCallUser(false);
    }
  };

  return (
    <Layout home>
      <div className="text-center mb-4 font-bold">
        Welcome to get one user page.
      </div>
      <div className="text-center">
        <form>
          <label>
            Enter a user id:&nbsp;
            <input
              className="w-20 h-8 placeholder-gray-200 border border-gray-200 rounded-[10px] p-2 text-sm"
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                if (id != null) {
                  setInputExisted(true);
                } else {
                  setInputExisted(false);
                }
              }}
            />
          </label>
        </form>
      </div>
      <div className="text-center mt-4">
        <button
          className="rounded-[60px] bg-green-400 font-medium text-[16px] border hover:opacity-60 p-2 mb-2"
          type="submit"
          onClick={handleClick}
          disabled={!hasInput}
        >
          GET User
        </button>
        {callUser && !errorCode && (
          <div>
            Hello, {user.firstname} {user.lastname}
          </div>
        )}
        {errorCode == "400" && <div>Error: Bad Request</div>}
        {errorCode == "401" && <div>Error: Unauthorized, please log in.</div>}
        {errorCode == "404" && <div>Error: Cannot find this user</div>}
      </div>
    </Layout>
  );
};

export default GetOneUSer;
