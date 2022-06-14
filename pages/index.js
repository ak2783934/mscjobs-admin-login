import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../layout";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isAuthenticated, signin, signup } from "../contexts/auth";
import Modal from "react-modal";
import { useRouter } from "next/router";

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
    const isAuthenticate = isAuthenticated();
    if (isAuthenticate) {
      Router.push("/profile");
    }
  }, []);

  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  function openModal1() {
    setIsOpen1(true);
  }
  function closeModal1() {
    setIsOpen1(false);
    Router.push("/profile");
  }

  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  function openModal2() {
    setIsOpen2(true);
  }
  function closeModal2() {
    setIsOpen2(false);
    // Router.push("/profile");
  }

  const formikLogin = useFormik({
    initialValues: {
      emailId: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      emailId: Yup.string().email("Invalid email Id").required("Required"),
      password: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await signin(values, (result) => {
        console.log(result);
        if (result.token) {
          openModal1();
        } else if (result.error) {
          alert(result.error);
        } else {
          alert("Wrong id and password");
        }
      });
    },
  });

  // only able to login if isVerified is true. okay
  // and from here if we are log ing in, then we also check the role in isAuthenticated part. right?
  const formikSignUp = useFormik({
    initialValues: {
      nameOfOrg: "",
      founder: "",
      emailId: "",
      password: "",
      contact: "",
      aboutUs: "",
      role: 0,
      isVerified: false,
    },
    validationSchema: Yup.object().shape({
      nameOfOrg: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
      founder: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
      emailId: Yup.string().email("Invalid email Id").required("Required"),
      password: Yup.string()
        .min(3, "Too Short!")
        .max(32, "Too Long!")
        .required("Required"),
      contact: Yup.number()
        .min(10, "Must be more than 10 characters")
        .required("This field is requried"),
      aboutUs: Yup.string()
        .min(3, "Too short")
        .max(32, "About Us")
        .required("This field is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await signup(values, (result) => {
        console.log(result);
        if (result.status == 400) {
          alert("Couldn't create a new user");
        } else {
          resetForm();
          openModal2();
        }
      });
    },
  });

  const customStyles1 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#008BF3",
    },
  };

  const customStyles2 = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#008BF3",
    },
  };

  return (
    <Layout>
      <Head>
        <title>Msc jobs employers </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen bg-[#008BF3] py-[70px]">
        <div className="w-[800px] h-auto flex flex-row mx-auto bg-[#1F5050]">
          <div className="m-4 border-r-2 border-gray-700">
            <Link href="/">
              <a className="flex flex-col items-center px-16 py-8">
                <img src="/msc-logo.svg" className="h-[100px]" alt="msc-logo" />
                <div className="pt-1 text-white font-Rochester text-tiny md:pt-0 md:text-[10px]">
                  Better Career
                </div>
              </a>
            </Link>
          </div>
          <div className="m-4 mx-[130px] text-center grow">
            <form onSubmit={formikSignUp.handleSubmit}>
              <div className="text-xl font-bold text-white">
                Register Your Organisation
              </div>
              <div>
                <input
                  name="nameOfOrg"
                  type="text"
                  placeholder="Name of Organisation"
                  className="w-full h-6 px-3 my-1 text-sm border border-black mt-7"
                  onChange={formikSignUp.handleChange}
                  onBlur={formikSignUp.handleBlur}
                  value={formikSignUp.values.nameOfOrg}
                />
              </div>
              <div>
                <input
                  name="founder"
                  type="text"
                  placeholder="Name of Founder"
                  className="w-full h-6 px-3 my-1 text-sm border border-black"
                  onChange={formikSignUp.handleChange}
                  onBlur={formikSignUp.handleBlur}
                  value={formikSignUp.values.founder}
                />
              </div>
              <div>
                <input
                  name="emailId"
                  type="text"
                  placeholder="Email"
                  className="w-full h-6 px-3 my-1 text-sm border border-black"
                  onChange={formikSignUp.handleChange}
                  onBlur={formikSignUp.handleBlur}
                  value={formikSignUp.values.emailId}
                />
              </div>
              <div>
                <input
                  name="password"
                  type="text"
                  placeholder="Password"
                  className="w-full h-6 px-3 my-1 text-sm border border-black"
                  onChange={formikSignUp.handleChange}
                  onBlur={formikSignUp.handleBlur}
                  value={formikSignUp.values.password}
                />
              </div>
              <div>
                <input
                  name="contact"
                  type="text"
                  placeholder="Contact"
                  className="w-full h-6 px-3 my-1 text-sm border border-black"
                  onChange={formikSignUp.handleChange}
                  onBlur={formikSignUp.handleBlur}
                  value={formikSignUp.values.contact}
                />
              </div>
              <div>
                <textarea
                  name="aboutUs"
                  type="text"
                  placeholder="About"
                  className="w-full h-[100px] px-3 py-1 my-1 border text-sm border-black"
                  onChange={formikSignUp.handleChange}
                  onBlur={formikSignUp.handleBlur}
                  value={formikSignUp.values.aboutUs}
                />
              </div>
              <div>
                <input
                  type="submit"
                  className="px-4 py-1 text-white bg-red-700 cursor-pointer rounded-xl"
                  value="Submit"
                />
              </div>
            </form>
            <Modal
              isOpen={modalIsOpen2}
              onRequestClose={closeModal2}
              style={customStyles2}
              contentLabel="User Signup Request"
            >
              <div className="text-center text-white">
                <div>THANK YOU FOR CONNECTING WITH US!!! </div>
                <div>YOU ARE ONE STEP AHEAD TO START POSTING JOB YOUR</div>
                APPLICATION HAS BEEN SUBMITTED AND OUR TEAM WILL REVERT YOU
                SOON!!!!!
              </div>
              <div className="text-center">
                <button
                  className="px-auto w-[80px] mx-auto mt-6 h-6 text-white bg-red-600 rounded"
                  onClick={closeModal2}
                >
                  OK
                </button>
              </div>
            </Modal>

            <hr className="my-3 border-t-2 border-black" />
            <div className="mx-[30px]">
              <div className="text-xl font-bold text-white">Login</div>
              <form onSubmit={formikLogin.handleSubmit}>
                <div>
                  <input
                    name="emailId"
                    id="emailId"
                    type="text"
                    placeholder="Email Id"
                    className="w-full h-6 px-3 py-1 my-1 text-sm border border-black"
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    value={formikLogin.values.emailId}
                  />
                  {formikLogin.touched.emailId && formikLogin.errors.emailId ? (
                    <div>{formikLogin.errors.emailId}</div>
                  ) : null}
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full h-6 px-3 py-1 my-1 text-sm border border-black"
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    value={formikLogin.values.password}
                  />
                  {formikLogin.touched.password &&
                  formikLogin.errors.password ? (
                    <div>{formikLogin.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-1 my-3 text-white bg-red-700 cursor-pointer px-7 rounded-xl"
                    value="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <Modal
                isOpen={modalIsOpen1}
                onRequestClose={closeModal1}
                style={customStyles1}
                contentLabel="User Logged In!"
              >
                <div className="text-center text-white">
                  User Login successfull
                </div>
                <div className="text-center">
                  <button
                    className="px-auto w-[80px] mx-auto mt-8 text-white bg-red-600 rounded"
                    onClick={closeModal1}
                  >
                    OK
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
