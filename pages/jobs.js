import React from "react";
import Layout from "../layout";
import Head from "next/head";
import Link from "next/link";

const IndividualJob = () => {
  return (
    <div className="w-auto h-20 m-1 cursor-pointer overflow-hidden bg-[#AEBAD2] md:h-40 md:m-4">
      <div className="px-1 pt-1 font-semibold md:pb-1 md:px-4 md:pt-2 text-[0.55rem] md:text-lg">
        Infodriven solutions Pvt Ltd.
      </div>
      <div className="px-1 md:px-4 text-[#757171] text-[0.3rem] md:text-xs md:py-1">
        Salesforce Developer
      </div>
      <div className="px-1 md:px-4 text-[0.4rem] md:text-sm font-semibold">
        Experience : 3-10 Year
      </div>
      <div className="px-1 text-[0.4rem] md:px-4 md:pt-1 md:text-sm font-semibold">
        Location : Bangaluru/ Banglore, Delhi
      </div>
    </div>
  );
};

const jobs = () => {
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
          <div className="h-[400px] overflow-auto grid grid-cols-2 gap-4">
            <IndividualJob />
            <IndividualJob />
            <IndividualJob />
            <IndividualJob />
            <IndividualJob />
            <IndividualJob />
            <IndividualJob />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default jobs;