import React, { useState, useEffect } from "react";
import Layout, { siteTitle } from "../components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import { useContainer } from "../services/containerProvider";
import Login from "./login";

const GetAllStores = () => {
  //console.log(userService.getUserName);

  const router = useRouter();
  const [errorCode, setErrorCode] = useState("");
  const [hasError, setErrorExisted] = useState(false);
  const { authService, storeService } = useContainer();

  if (!authService.isLogin) {
    return <Login />;
  }

  //var storeArray = [];
  const [stores, setStores] = useState<any[]>([]);

  const handleClick = async () => {
    //console.log("The button is clicked");
    const allStores = await storeService.getAllStores();
    //console.log(`allStores: ${JSON.stringify(allStores[0])}`);
    setStores(allStores[0]);
  };

  console.log(`Stores after axios: ${stores}`);
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

      <div>
        {" "}
        <table className="table-auto">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">StoreID</th>
              <th scope="col">StoreName</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store: any, i) => {
              return (
                <tr key={store.id}>
                  <th scope="row">{i}</th>
                  <td>{store.id}</td>
                  <td>{store.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default GetAllStores;
