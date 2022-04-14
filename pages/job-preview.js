import React from "react";
import Layout from "../layout";
import Head from "next/head";
import Link from "next/link";

const ApplicationPreview = () => {
  return (
    <div className="bg-[#B6B3B3] my-3 p-2 py-3 font-semibold rounded">
      <div className="flex flex-row">
        <div className="w-[200px] text-right">
          <div>Name of Candidate :</div>
          <div>Contact no. :</div>
          <div>Gender :</div>
          <div>Registered Mail Id :</div>
          <div>Job Type : </div>
          <div>Resume : </div>
        </div>
        <div className="grow">
          <div>Ayush Raj</div>
          <div>9835932051</div>
          <div>Male</div>
          <div>xyz@gmail.com</div>
          <div>Teaching / Non-Teaching Job</div>
          <div>Attachment </div>
        </div>
      </div>

      <div className="my-1 w-[200px] mx-auto">
        <select
          id="applicationStage"
          className="px-1 py-1 mx-auto rounded"
          name="applicationStage"
        >
          <option value="Fresh Application">Fresh Application</option>
          <option value="Under Consideration">Under Consideration</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};

const JobPreview = () => {
  return (
    <Layout>
      <Head>
        <title>Msc jobs employers </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-auto bg-[#008BF3] py-[70px]">
        <div className="w-[800px] bg-[#AEBAD2] mx-auto pb-4">
          <div className="flex flex-row justify-between px-4 pt-4">
            <div className="text-[#008BF3]">
              <span className="inline">
                <img
                  src="/leftarrow.svg"
                  className="inline w-3 h-3 mr-1"
                  alt="arrow"
                />
              </span>
              <span className="inline">Back</span>
            </div>
            <div className="text-sm text-green-700">Verified</div>
          </div>
          <div className="text-xl text-center">
            Infodriven solutions Pvt Ltd.
          </div>
          <div className="flex flex-row justify-between mx-4">
            <div className="px-5 py-auto bg-[#02BEFA] rounded-xl">
              <button>Update Job</button>
            </div>
            <div className="text-sm text-gray-700">Salesforce Developer</div>
            <div className="px-5 py-auto bg-[#02BEFA] rounded-xl">
              <button>Delete Job</button>
            </div>
          </div>
          <hr className="mx-4 my-2 border-t-2 border-black" />
          <div className="mx-4">
            <div className="py-1">
              <span className="font-bold">Job Role:</span> BDA(Business
              development Asscociate)
            </div>
            <div className="py-1">
              <span className="font-bold">Location:</span> Remote
            </div>
            <div className="py-1">
              <span className="font-bold">Experience Req: </span> 3-4 years
            </div>

            <div className="py-1">
              <span className="font-bold">No. of Openings:</span> 30
            </div>
            <div className="py-1">
              <span className="font-bold">Last Date of application: </span> 30th
              March 2022
            </div>
            <div className="py-1">
              <span className="font-bold">Job Description: </span> Byju&apos;s
              BDA APPLICATION - Sales (Read this before filling the form as you
              might be questioned upon this) This is a Hybrid sales job for
              people who got the knack to get out of their comfort zone and want
              a 4x faster growth in terms of their career in terms of salary and
              promotion IF you can Convince people in any given scenario, not to
              sell a product but to create a need for the customer wherein they
              are interested to know what you have to offer Identifying the
              problem and using it as an opportunity to pitch your product
              Getting insights from the customer and engaging with them to build
              a successful rapport closing a sale on call as well as on the
              field.
            </div>
            <div className="py-1">
              <span className="font-bold">Additional Notes: </span>This job is
              only for people who has completed their masters from tier 1
              colleges of India. Others applying for this job will be reject.
              Thanks!
            </div>
            <div className="py-1">
              <span className="font-bold">Attachments:</span>{" "}
              <img
                src="/anchor-icon.svg"
                alt="anchor"
                className="inline w-4 h-4 mx-1 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="w-[800px] bg-white mx-auto pb-4 px-7 my-5">
          <div className="py-2 text-xl font-bold text-center text-red-600">
            Job Application
          </div>
          <hr className="my-3 border-t-2 border-black" />

          <div className="overflow-auto px-2 h-[500px]">
            <ApplicationPreview />
            <ApplicationPreview />
            <ApplicationPreview />
            <ApplicationPreview />
            <ApplicationPreview />
            <ApplicationPreview />
            <ApplicationPreview />
            <ApplicationPreview />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobPreview;
