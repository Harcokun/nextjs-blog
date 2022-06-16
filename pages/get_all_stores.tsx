import React, { useState, useEffect } from "react";
import Layout, { siteTitle } from "../components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import { userService } from "../services/container";

const GetAllStores = () => {
  //console.log(userService.getUserName);

  const router = useRouter();
  const [errorCode, setErrorCode] = useState("");
  const [hasError, setErrorExisted] = useState(false);
  //const [token, setToken] = useState("");
  let token = "";

  if (typeof window !== "undefined" && !localStorage.getItem("token")) {
    router.push("/login");
  }
  if (typeof window !== "undefined") {
    //setToken(localStorage.getItem("token"));
    token = localStorage.getItem("token");
  }

  console.log(`Token: ${token}`);

  //var storeArray = [];
  const [stores, setStores] = useState([]);

  const handleClick = async () => {
    //console.log("The button is clicked");

    await axios
      .get("http://127.0.0.1:8000/api/stores/", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then(function (response) {
        //storeArray = response.data;
        console.log(response.data);
        setStores(JSON.parse(response.data));
        setErrorExisted(false);
        console.log(stores);
      })
      .catch(function (error) {
        if (error.response) {
          setErrorCode(error.response.status);
          setErrorExisted(true);
          console.log(`Error Code: ${error.response.status}`);
        }
      });
  };

  return (
    <Layout home>
      <div className="text-center mb-4 font-bold">
        Welcome to get all stores page.
      </div>
      <div className="text-center mt-4">
        <button
          className="rounded-[60px] bg-green-400 font-medium text-[16px] border hover:opacity-60 p-2 mb-2"
          type="submit"
          onClick={handleClick}
        >
          GET All Stores
        </button>
      </div>

      <ul>
        {stores.map((store) => {
          console.log(``);
          return <li>{store.id}</li>;
        })}
      </ul>
    </Layout>
  );
};

export default GetAllStores;
