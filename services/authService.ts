import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export class AuthService {
  public get isLogin(): boolean {
    this.setToken(localStorage.getItem("token")); // Really I can't use window on server side??? TTTT TTTT
    //console.log(`Get token from authService.isLogin(): ${this.token}`);
    if (this.token && this.token != "null") {
      return true;
    }
    return false;
  }

  public get token(): string {
    const token = localStorage.getItem("token");
    return token;
  }

  public setToken(token): void {
    localStorage.setItem("token", token);
  }

  public async login(email, password) {
    var token = "";
    var errorCode = "";
    var errorMsg = "";

    await axios({
      method: "post",
      url: "http://localhost:8000/api/auth/login",
      data: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        token = response.data.token;
        //console.log(`Response Token: ${response.data.token}`);
        //console.log(`Token: ${token}`);
        //if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        //console.log(`token from authService login: ${token}`);
        //return [token, errorMsg];
        //}
      })
      .catch(function (error) {
        if (error.response) {
          errorCode = error.response.status;
          errorMsg = error.response.statusText;
          console.log(`Reponse Error: ${error.response}`);
          alert(`Unauthorized Code ${errorCode}: ${errorMsg}`);
        }
        //return [token, errorMsg];
      });

    return [token, errorCode];
  }

  public async getMe() {
    var token = localStorage.getItem("token");
    var data = null;
    var errorMsg = "";
    await axios
      .get("http://127.0.0.1:8000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then(function (response) {
        data = response.data;
        //console.log(data);
      })
      .catch(function (error) {
        if (error.response) {
          //console.log(error.response);
          errorMsg = String(error.response.status);
        }
      });
    return [data, errorMsg];
  }

  public logout() {
    var token = localStorage.getItem("token");
    var errorMsg = "";
    //console.log(`Token in logout 1st stage: ${token}`);
    localStorage.removeItem("token");
    //localStorage.setItem("token", null);

    axios
      .post("http://localhost:8000/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
      .then(function (response) {
        //token = null;
        //console.log(`Response Token: ${response.data.token}`);
        //console.log(`Token: ${token}`);
        //if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        //}
      })
      .catch(function (error) {
        if (error.response) {
          errorMsg = error.response.status;
          //console.log(`Reponse Error Status: ${error.response.status}`);
        }
      });
    return errorMsg;
  }
}
