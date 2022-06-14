import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import { api } from "../pages/api/index";
import Home from "../pages";

export const getCurrUser = async (values, callback) => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  console.log(token);
  console.log(userId);
  await api
    .get(`/user/${userId}`, {
      header: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      callback(response.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        callback(error.response);
        // return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        callback(error.request);
        // return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback(error.message);
        // return error.message;
      }
    });
};

export const signin = async (values, callback) => {
  await api
    .post("signin", values, {
      header: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response);

      if (response.data.user.role === 0) {
        Cookies.set("token", response.data.token, { expires: 60 });
        Cookies.set("userId", response.data.user._id);
        console.log("Got token");
        callback(response.data);
      } else {
        callback({ error: "You are not authorized to access" });
      }
      // return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        callback(error.response);
        // return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        callback(error.status);
        // return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback(error.message);
        // return error.message;
      }
    });
};

export const signup = async (values, callback) => {
  await api
    .post("signup", values, {
      header: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // console.log(response);
      callback(response.data);
      // return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        callback(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        callback(error.status);
        // return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        callback(error.message);
        // return error.message;
      }
    });
};

export const isAuthenticated = () => {
  const token = Cookies.get("token");
  if (token) {
    return true;
  } else return false;
};

export const signout = async (callback) => {
  await api
    .get("/signout")
    .then((response) => {
      console.log(response);
      Cookies.remove("token");
      Cookies.remove("userId");
      callback(response.data);
      Router.push("/");
    })
    .catch((error) => {
      if (error.response) {
        console.log(response);
        callback(error.response);
      }
    });
};

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    setAuthenticated(isAuthenticated());
    if (!authenticated) {
      router.push("/");
    }
  }, []);
  if (authenticated) return children;
  return <Home />;
};
