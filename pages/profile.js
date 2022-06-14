import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import Layout from "../layout";
import { useRouter } from "next/router";
import { api } from "../pages/api/index";
import { isAuthenticated, getCurrUser } from "../contexts/auth";

const Profile = () => {
  const Router = useRouter();
  const [currUser, setCurrUser] = useState({});
  useEffect(() => {
    const isAuthenticate = isAuthenticated();
    if (!isAuthenticate) {
      Router.push("/");
      return;
    }

    // getCurrUser({}, (result) => {
    //   // console.log(result);
    //   alert("got current users");
    // });
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");
    console.log(token);
    console.log(userId);

    api
      .get(`/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setCurrUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert("Couldn't find the user");
          // return error.response;
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          // return error.request;
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          // return error.message;
        }
      });
  }, []);

  return (
    <Layout>
      <Head>
        <title>Msc jobs employers </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen bg-[#008BF3] py-[70px]">
        <div className="w-[800px] h-auto mx-auto bg-[#1F5050] py-[30px]">
          <div className="m-4 border-b-2 border-gray-700">
            <Link href="/">
              <a className="flex flex-col items-center px-16 py-8">
                <img src="/msc-logo.svg" className="h-[100px]" alt="msc-logo" />
                <div className="pt-1 text-white font-Rochester text-tiny md:pt-0 md:text-[10px]">
                  Better Career
                </div>
              </a>
            </Link>
          </div>

          <div className="text-xl text-center text-white">
            {currUser.nameOfOrg}
          </div>
          <div className="flex flex-row py-3 text-white mx-[100px]">
            <div className="w-[200px]">
              <div className="text-right">Member Id : </div>
              <div className="text-right">Founder : </div>
              <div className="text-right">Registered Mail Id : </div>
              <div className="text-right">Contact Number : </div>
              <div className="text-right">About Us : </div>
            </div>
            <div className="grow">
              <div>{currUser._id}</div>
              <div>{currUser.founder}</div>
              <div>{currUser.emailId}</div>
              <div>{currUser.contact}</div>
              <div>{currUser.aboutUs}</div>
            </div>
          </div>

          <div className="px-3 py-1 rounded-xl text-white w-[200px] mx-auto text-center bg-red-800">
            Edit Profile
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
