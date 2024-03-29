"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle } from "react-icons/fa";
import Cookies from "universal-cookie";
import * as Yup from "yup";
import { userLogIn } from "../api";

export interface LogInData {
  username: string;
  password: string;
}

const Login = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) => {
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const cookies = new Cookies();
  const accountActivated = searchParams && searchParams.activated === "1";

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } =
    useForm<LogInData>(formOptions);
  const { errors, isSubmitting } = formState;

  const handleLogin = async (data: LogInData) => {
    const res = await userLogIn(data);
    if (!res.message) {
      cookies.set("csrf-token", `${res.csrf_token}`);
      router.push("/");
      router.refresh();
    } else {
      setSubmitError(res.message);
    }
  };

  return (
    <>
      <div className="login-form-wrapper bg-gray flex flex-col items-center justify-center gap-8 py-10">
        {accountActivated && (
          <section className="message flex gap-4 p-4">
            <div className="message-header flex justify-center">
              <FaCheckCircle size={24} style={{ color: "green" }} />
            </div>
            <div className="message-content text-center">
              Your account has been activated! You are now able to log in using
              your credentials.
            </div>
          </section>
        )}
        <h2 className="text-5xl font-black">Log in</h2>
        <form
          className="flex w-[20rem] flex-col space-y-10"
          onSubmit={handleSubmit(handleLogin)}
          id="login-form"
        >
          <div className="w-full transform border-b bg-transparent text-lg duration-300 focus-within:border-slate-500">
            <input
              {...register("username")}
              className="w-full border-none bg-transparent outline-none focus:outline-none"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              defaultValue=""
              autoFocus
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
            title="Login"
          >
            {isSubmitting ? "LOGGING IN..." : "LOG IN"}
          </button>
          <span className="italic text-red-400">{submitError}</span>
        </form>
      </div>
    </>
  );
};

export default Login;
