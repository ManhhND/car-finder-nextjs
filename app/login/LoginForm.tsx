"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema } from "@/app/utils/validation";
import { userLogIn } from "@/lib/auth";
import { useForm } from "react-hook-form";

const LoginForm = ({
  demoAccount,
}: {
  demoAccount: { username: string; password: string };
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const formOptions = { resolver: yupResolver(loginSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await userLogIn({ username, password });
      if (!res.message) {
        router.push("/");
        router.refresh();
      } else {
        setSubmitError(res.message);
      }
    } catch (error) {
      console.log("[User login] error => ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-form-wrapper bg-gray flex flex-col items-center justify-center gap-8 py-10">
        <h2 className="text-5xl font-black">Log in</h2>
        <section className="demo-account w-[20rem] bg-white p-4 text-gray-2">
          Demo account: <strong>{demoAccount.username}</strong> /{" "}
          <strong>{demoAccount.password}</strong>
        </section>
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
              value={username}
              onInput={(e) => setUsername(e.currentTarget.value)}
              autoFocus
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
            {isLoading ? "LOGGING IN..." : "LOG IN"}
          </button>
          <span className="italic text-red-400">{submitError}</span>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
