import React, { useEffect } from "react";
import Layout from "../layout";
import Head from "next/head";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isAuthenticated } from "../contexts/auth";
import { api } from "./api";
import Cookies from "js-cookie";

const PostJob = () => {
  const Router = useRouter();
  useEffect(() => {
    const isAuthenticate = isAuthenticated();
    if (!isAuthenticate) {
      Router.push("/");
    }
  }, []);

  // const handleFileChange

  const formik = useFormik({
    initialValues: {
      companyName: "",
      jobRole: "",
      workExp: "",
      workLoc: "",
      jobType1: "",
      jobType2: "",
      lastDateOfApplication: "",
      noOfOpenings: "",
      jobDescription: "",
      additionalNotes: "",
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
      jobRole: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
      workExp: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
      workLoc: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
      jobType1: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
      jobType2: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
      lastDateOfApplication: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
      noOfOpenings: Yup.string().required("Required"),
      jobDescription: Yup.string().min(3, "Too Short!").required("Required"),
      additionalNotes: Yup.string().min(3, "Too Short!").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      var formData = new FormData();
      formData.append("companyName", values.companyName);
      formData.append("jobRole", values.jobRole);
      formData.append("workExp", values.workExp);
      formData.append("workLoc", values.workLoc);
      formData.append("jobType1", values.jobType1);
      formData.append("jobType2", values.jobType2);
      formData.append("lastDateOfApplication", values.lastDateOfApplication);
      formData.append("noOfOpenings", values.noOfOpenings);
      formData.append("jobDescription", values.jobDescription);
      formData.append("additionalNotes", values.additionalNotes);
      formData.append("attachments", values.attachments);
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");
      await api
        .post(`/job/create/${userId}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          alert("Job Created Successfully");
          resetForm();
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
    },
  });

  return (
    <Layout>
      <Head>
        <title>Msc jobs employers </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-auto pt-[30px] pb-[70px]">
        <div className="w-[600px] h-auto mx-auto py-[30px]">
          <div className="text-3xl pb-[30px] font-bold text-center text-red-600">
            POST JOB
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">
                Institute/Organisation Name
              </div>
              <input
                name="companyName"
                id="companyName"
                type="text"
                placeholder="Institute/Organisation Name"
                className="w-full h-8 p-3 my-1 text-sm border border-black rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.companyName}
              />
              {formik.touched.companyName && formik.errors.companyName ? (
                <div className="text-red-700">{formik.errors.companyName}</div>
              ) : null}
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">Job Role</div>
              <input
                name="jobRole"
                id="jobRole"
                type="text"
                placeholder="Job Role"
                className="w-full h-8 p-3 my-1 text-sm border border-black rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jobRole}
              />
              {formik.touched.jobRole && formik.errors.jobRole ? (
                <div className="text-red-700">{formik.errors.jobRole}</div>
              ) : null}
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">Work Experience</div>
              <input
                name="workExp"
                id="workExp"
                type="text"
                placeholder="Work Experience"
                className="w-full h-8 p-3 my-1 text-sm border border-black rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.workExp}
              />
              {formik.touched.workExp && formik.errors.workExp ? (
                <div className="text-red-700">{formik.errors.workExp}</div>
              ) : null}
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">Job Type</div>
              <select
                id="jobType1"
                name="jobType1"
                className="w-full h-8 my-1 text-sm border border-black rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jobType1}
              >
                <option
                  value=""
                  selected
                  disabled
                  hidden
                  label="Select a job type"
                >
                  Select a job type
                </option>
                <option value="Government job" label="Government job">
                  Government job
                </option>
                <option value="Private job" label="Private job">
                  Private job
                </option>
              </select>
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">Job Category</div>
              <select
                id="jobType2"
                name="jobType2"
                className="w-full h-8 my-1 text-sm border border-black rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jobType2}
              >
                <option
                  value=""
                  selected
                  disabled
                  hidden
                  label="Select a job category"
                >
                  Select a job type
                </option>
                <option value="State Government" label="State Government">
                  State Government
                </option>
                <option value="Central Government" label="Central Government">
                  Central Government
                </option>
                <option value="Teaching jobs" label="Teaching jobs">
                  Teaching jobs
                </option>
                <option value="Home Tutor jobs" label="Home Tutor jobs">
                  Home Tutor jobs
                </option>
                <option value="Other jobs" label="Other jobs">
                  Other jobs
                </option>
              </select>
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">Work Location</div>
              <input
                name="workLoc"
                id="workLoc"
                type="text"
                placeholder="Work Location"
                className="w-full h-8 p-3 my-1 text-sm border border-black rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.workLoc}
              />
              {formik.touched.workLoc && formik.errors.workLoc ? (
                <div className="text-red-700">{formik.errors.workLoc}</div>
              ) : null}
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">
                Last date of Application
              </div>
              <input
                name="lastDateOfApplication"
                id="lastDateOfApplication"
                type="date"
                placeholder="Last date of application"
                className="w-full h-8 p-3 my-1 text-sm border border-black rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastDateOfApplication}
              />
              {formik.touched.lastDateOfApplication &&
              formik.errors.lastDateOfApplication ? (
                <div className="text-red-700">
                  {formik.errors.lastDateOfApplication}
                </div>
              ) : null}
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">No. of openings</div>
              <input
                name="noOfOpenings"
                id="noOfOpenings"
                type="number"
                placeholder="No of openings"
                className="w-full h-8 p-3 my-1 text-sm border border-black rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.noOfOpenings}
              />
              {formik.touched.noOfOpenings && formik.errors.noOfOpenings ? (
                <div className="text-red-700">{formik.errors.noOfOpenings}</div>
              ) : null}
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">Job Description</div>
              <textarea
                name="jobDescription"
                id="jobDescription"
                type="text"
                placeholder="Job Description"
                className="w-full h-[100px] p-3 my-1 text-sm border border-black rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.jobDescription}
              />
              {formik.touched.jobDescription && formik.errors.jobDescription ? (
                <div className="text-red-700">
                  {formik.errors.jobDescription}
                </div>
              ) : null}
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">Additional Notes</div>
              <textarea
                name="additionalNotes"
                id="additionalNotes"
                type="text"
                placeholder="Additional Notes"
                className="w-full h-[50px] p-3 my-1 text-sm border border-black rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.additionalNotes}
              />
              {formik.touched.additionalNotes &&
              formik.errors.additionalNotes ? (
                <div className="text-red-700">
                  {formik.errors.additionalNotes}
                </div>
              ) : null}
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="text-lg font-medium">Attachments </div>
              <input
                name="attachments"
                id="attachments"
                type="file"
                className="w-full p-1 my-1 text-sm border border-black rounded"
                onChange={(event) => {
                  const file = event.target.files;
                  let myFiles = Array.from(file);
                  formik.setFieldValue("attachments", myFiles[0]);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.attachments && formik.errors.attachments ? (
                <div className="text-red-700">{formik.errors.attachments}</div>
              ) : null}
            </div>
            <div className="px-4 py-1 mx-auto">
              <div className="w-[30%] mx-auto ">
                <button
                  name="Submit"
                  value="Submit"
                  className="w-full p-1 my-1 text-lg bg-blue-300 border border-black rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PostJob;
