import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import { isAuthenticated } from "../contexts/auth";
import { api } from "./api";
import ReactLoading from "react-loading";

const IndividualJob = (job) => {
  const { _id, companyName, jobRole, workExp, workLoc } = job.job;
  return (
    <Link href={{ pathname: "/job-preview", query: job.job }}>
      <div className="w-auto h-20 m-1 cursor-pointer overflow-hidden bg-[#AEBAD2] md:h-40 md:m-4">
        <div className="px-1 pt-1 font-semibold md:pb-1 md:px-4 md:pt-2 text-[0.55rem] md:text-lg">
          {companyName}
        </div>
        <div className="px-1 md:px-4 text-[#757171] text-[0.3rem] md:text-xs md:py-1">
          {jobRole}
        </div>
        <div className="px-1 md:px-4 text-[0.4rem] md:text-sm font-semibold">
          Experience : {workExp}
        </div>
        <div className="px-1 text-[0.4rem] md:px-4 md:pt-1 md:text-sm font-semibold">
          Location : {workLoc}
        </div>
      </div>
    </Link>
  );
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const isAuthenticate = isAuthenticated();
    if (!isAuthenticate) {
      Router.push("/");
    }

    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    api
      .get(`/jobs/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
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
      <div className="h-auto bg-[#008BF3] py-[70px]">
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
        </div>
        <div className="w-[800px] my-6 h-auto mx-auto bg-white px-[30px] py-[30px]">
          <div
            href="/post-job"
            className="w-[200px] mb-3 text-center py-2 rounded mx-auto text-xl cursor-pointer bg-[#AEBAD2] font-bold text-red-700"
          >
            <Link href="/post-job">
              <a>Post New Job</a>
            </Link>
          </div>
          {loading && (
            <ReactLoading
              className="mx-auto"
              type={"spinningBubbles"}
              color="#008BF3"
            />
          )}
          {jobs.length === 0 && (
            <div className="py-3 text-center text-red-700">No Jobs Created</div>
          )}
          <div className="h-[400px] overflow-auto grid grid-cols-2 gap-4">
            {jobs.map((job, index) => {
              return <IndividualJob key={index} job={job} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;
