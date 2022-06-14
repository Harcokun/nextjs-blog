import React, { useState, useEffect } from "react";
import Layout, { siteTitle } from "../components/layout";
import axios from "axios";

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
  const [errorCode, setErrorCode] = useState(0);
  const handleClick = () => {
    console.log("The button is clicked");
      axios
        .get("http://127.0.0.1:8000/api/users/" + id)
        .then(function (response) {
          const data = response.data;
          console.log(data);
          setUser((user) => ({ ...user, ...data }));
          setCallUser(true);
          setErrorCode(0);
          console.log(user);
        })
        .catch(function (error) {
          if(error.response) {
            console.log(error.response);
            setErrorCode(error.response.status);
          }
        })
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
                setId(e.target.value)
                setInputExisted(true)
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
        {callUser && errorCode == 0 && (
          <div>
            Hello, {user.firstname} {user.lastname}
          </div>
        )}
        {errorCode == 400 && <div>Error: Bad Request</div>}
        {errorCode == 401 && <div>Error: Unauthorized, please log in.</div>}
        {errorCode == 404 && <div>Error: Cannot find this user</div>}
      </div>
    </Layout>
  );
};

export default GetOneUSer;
