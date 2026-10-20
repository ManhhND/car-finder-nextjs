"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/app/utils/validation";
import { userRegister } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const formOptions = { resolver: yupResolver(registerSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await userRegister({ username, email, password });
      if (!res.message) {
        router.push("/");
        router.refresh();
      } else {
        setSubmitError(res.message);
      }
    } catch (error) {
      console.log("[User register] error => ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register-form-wrapper bg-gray flex flex-col items-center justify-center gap-8 py-10">
        <h2 className="text-3xl md:text-5xl font-black">Creat new account</h2>
        <form
          className="flex w-[20rem] flex-col space-y-10"
          onSubmit={handleSubmit(handleLogin)}
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
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
              autoFocus
            />
          </div>
          {errors.email && (
            <span className="italic text-red-400">{errors.email?.message}</span>
          )}
          <div className="w-full transform border-b bg-transparent text-lg duration-300 focus-within:border-slate-500">
            <input
              {...register("username")}
              className="w-full border-none bg-transparent outline-none focus:outline-none"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onInput={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          {errors.username && (
            <span className="italic text-red-400">
              {errors.username?.message}
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
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          {errors.password && (
            <span className="italic text-red-400">
              {errors.password?.message}
            </span>
          )}
          <button
            type="submit"
            className="relative text-white inset-0 bg-blue py-2 font-bold"
            disabled={isLoading}
            title="Login"
          >
            {isLoading ? "PROCESSING..." : "CREAT ACCOUNT"}
          </button>
          <span className="italic text-red-400">{submitError}</span>
        </form>
      </div>
    </>
  );
};

export default Register;
