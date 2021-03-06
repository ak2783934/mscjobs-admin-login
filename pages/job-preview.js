import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { isAuthenticated, signin } from "../contexts/auth";
import { api } from "./api";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";

const ApplicationPreview = ({ jobApplication }) => {
  const [currJobApplication, setCurrJobApplication] = useState(jobApplication);
  const handleOnChange = async (event) => {
    var tempJobApplication = jobApplication;
    tempJobApplication.status = event.target.value;
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    await api
      .put(
        `/jobapplication/${jobApplication._id}/${userId}`,
        tempJobApplication,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCurrJobApplication({
          ...currJobApplication,
          status: tempJobApplication.status,
        });
        alert("application updated");
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
  };
  return (
    <div className="bg-[#B6B3B3] my-3 p-2 py-3 font-semibold rounded">
      <div className="flex flex-row">
        <div className="w-[200px] text-right">
          <div>Name of Candidate :</div>
          <div>Contact no. :</div>
          <div>Gender :</div>
          <div>Registered Mail Id :</div>
          <div>Resume : </div>
        </div>
        <div className="grow">
          <div>{currJobApplication.nameOfCandidate}</div>
          <div>{currJobApplication.contactNo}</div>
          <div>{currJobApplication.gender}</div>
          <div>{currJobApplication.emailId}</div>
          <Link
            href={`${process.env.NEXT_PUBLIC_BASE_URL}/fileinfo/${currJobApplication.resume}`}
          >
            Download
          </Link>
        </div>
      </div>

      <div className="my-1 w-[200px] mx-auto">
        <select
          id="applicationStage"
          className="px-1 py-1 mx-auto rounded"
          name="applicationStage"
          value={currJobApplication.status}
          onChange={handleOnChange}
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
  const [jobData, setJobData] = useState({});
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const Router = useRouter();
  useEffect(() => {
    const isAuthenticate = isAuthenticated();
    if (!isAuthenticate) {
      Router.push("/");
      return;
    }
    const data = Router.query;
    setJobData(data);
    // console.log(data);
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    api
      .get(`/jobapplications/${data._id}/${userId}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setJobApplications(response.data);
        console.log(jobApplications);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setLoading(false);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setLoading(false);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          setLoading(false);
        }
      });
  }, []);

  const deleteJob = (event) => {
    event.preventDefault();

    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    api
      .delete(`/job/${jobData._id}/${userId}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //routing thing here
        console.log(response);
        alert("Job deleted");
        Router.push("/jobs");
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
  };

  const {
    _id,
    companyName,
    jobRole,
    workExp,
    jobType1,
    jobType2,
    lastDateOfApplication,
    noOfOpenings,
    user,
    attachments,
    additionalNotes,
    isVerified,
    workLoc,
    jobDescription,
  } = jobData;
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
            <Link href="/jobs">
              <div className="text-[#008BF3] cursor-pointer">
                <span className="inline">
                  <img
                    src="/leftarrow.svg"
                    className="inline w-3 h-3 mr-1"
                    alt="arrow"
                  />
                </span>
                <span className="inline">Back</span>
              </div>
            </Link>
            {isVerified ? (
              <div className="text-sm text-green-700">Verified</div>
            ) : (
              <div className="text-sm text-red-700">Not Verified</div>
            )}
          </div>
          <div className="text-xl text-center">{companyName}</div>
          <div className="flex flex-row justify-between mx-4">
            <div className="px-5 bg-gray-300 py-auto rounded-xl disabled">
              <button>Update Job</button>
            </div>
            <div className="text-sm text-gray-700">{jobRole}</div>
            <div className="px-5 py-auto bg-[#02BEFA] rounded-xl">
              <button onClick={deleteJob}>Delete Job</button>
            </div>
          </div>
          <hr className="mx-4 my-2 border-t-2 border-black" />
          <div className="mx-4">
            <div className="py-1">
              <span className="font-bold">Job Role:</span> {jobRole}
            </div>
            <div className="py-1">
              <span className="font-bold">Job Type:</span> {jobType1}/{jobType2}
            </div>
            <div className="py-1">
              <span className="font-bold">Location:</span> {workLoc}
            </div>
            <div className="py-1">
              <span className="font-bold">Experience Req: </span> {workExp}
            </div>

            <div className="py-1">
              <span className="font-bold">No. of Openings:</span> {noOfOpenings}
            </div>
            <div className="py-1">
              <span className="font-bold">Last Date of application: </span>{" "}
              {lastDateOfApplication}
            </div>
            <div className="py-1">
              <span className="font-bold">Job Description: </span>{" "}
              {jobDescription}
            </div>
            <div className="py-1">
              <span className="font-bold">Additional Notes: </span>
              {additionalNotes}
            </div>
            {attachments && (
              <div className="py-1">
                <span className="font-bold">Attachments:</span>{" "}
                <Link
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}/fileinfo/${attachments}`}
                >
                  <img
                    src="/anchor-icon.svg"
                    alt="anchor"
                    className="inline w-4 h-4 mx-1 cursor-pointer"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="w-[800px] bg-white mx-auto pb-4 px-7 my-5">
          <div className="py-2 text-xl font-bold text-center text-red-600">
            Job Application
          </div>
          <hr className="my-3 border-t-2 border-black" />
          {loading && (
            <ReactLoading
              className="mx-auto"
              type={"spinningBubbles"}
              color="#008BF3"
            />
          )}

          <div className="overflow-auto px-2 h-[500px]">
            {jobApplications.length == 0 && (
              <div className="text-center text-red-700">
                No job applications
              </div>
            )}
            {jobApplications.map((jobApplication, index) => {
              return (
                <ApplicationPreview
                  jobApplication={jobApplication}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobPreview;
