"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import * as Yup from "yup";
import { userRegister } from "../api";

export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

const Register = () => {
  const [submitError, setSubmitError] = useState<string>("");
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().matches(emailRegex, "Invalid email"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required()
      .matches(
        passwordRegex,
        "Password must have at least 8 characters, one uppercase, one lowercase, one digit, one special character",
      ),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } =
    useForm<RegisterData>(formOptions);
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const handleRegister = async (data: RegisterData) => {
    try {
      const res = await userRegister(data);
      if (res.message) {
        setSubmitError(res.message);
      }
    } catch (error) {
      console.log("[User register] error => ", error);
    }
    console.log(submitError);
  };

  return (
    <>
      {!isSubmitSuccessful ? (
        <div className="register-form-wrapper bg-gray flex flex-col items-center justify-center gap-8 py-10">
          <h2 className="text-3xl md:text-5xl font-black">Creat new account</h2>
          <form
            className="flex w-[20rem] flex-col space-y-10"
            onSubmit={handleSubmit(handleRegister)}
            id="login-form"
          >
            <div className="w-full transform border-b bg-transparent text-lg duration-300 focus-within:border-slate-500">
              <input
                {...register("email")}
                className="w-full border-none bg-transparent outline-none focus:outline-none"
                name="email"
                type="text"
                id="email"
                placeholder="Email address"
                defaultValue=""
                autoFocus
              />
            </div>
            {errors.email && (
              <span className="italic text-red-400">
                {errors.email.message}
              </span>
            )}
            <div className="w-full transform border-b bg-transparent text-lg duration-300 focus-within:border-slate-500">
              <input
                {...register("username")}
                className="w-full border-none bg-transparent outline-none focus:outline-none"
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                defaultValue=""
              />
            </div>
            {errors.username && (
              <span className="italic text-red-400">
                {errors.username.message}
              </span>
            )}
            <div className="w-full transform border-b bg-transparent text-lg duration-300 focus-within:border-slate-500">
              <input
                {...register("password")}
                className="w-full border-none bg-transparent outline-none focus:outline-none"
                name="password"
                type="password"
                id="password"
                placeholder="Password"
                defaultValue=""
              />
            </div>
            {errors.password && (
              <span className="italic text-red-400">
                {errors.password.message}
              </span>
            )}
            <button
              type="submit"
              className="relative text-white inset-0 bg-blue py-2 font-bold"
              disabled={isSubmitting}
              title="Submit"
            >
              {isSubmitting ? "PROCESSING..." : "CREAT ACCOUNT"}
            </button>
            <span className="italic text-red-400">{submitError}</span>
          </form>
        </div>
      ) : (
        <div className="message-wrapper bg-gray flex flex-col items-center justify-center gap-8 px-10 pt-10 pb-32 md:py-20">
          <div className="message-container w-[20rem]">
            <div className="message-header w-full flex justify-center pb-8 mb-8 border-b">
              <FaCheckCircle size={64} style={{ color: "green" }} />
            </div>
            <div className="message-content text-center">
              A confirmation email with further instructions has been sent to
              your email address.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
