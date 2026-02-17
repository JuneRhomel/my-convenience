"use client";


import ButtonComponent from "@/component/button/button.component";
import InputComponent from "@/component/input/input.component";
import { useSubmitLogin } from "./hook/login.hook";
import { GoogleLogin } from "@react-oauth/google";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;

export function LoginForm() {
  const { handleSubmit, LoginError, handleGoogleLogin, isSubmitting, register, errors, handleFormSubmit, handleGoogleError } = useSubmitLogin()


  return (
    <form
      onSubmit={handleFormSubmit(handleSubmit)}
      className="flex w-full max-w-sm flex-col gap-6"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Welcome back
        </h1>
        <p className="text-sm text-zinc-500">
          Enter your credentials to access your account.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {LoginError && (
          <p className=" text-red-600 text-xs" role="alert">
            {LoginError}
          </p>
        )}
        <InputComponent
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: EMAIL_PATTERN,
              message: "Enter a valid email address",
            },
          })}
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          labelName="Email"
          error={errors.email?.message ?? ""}
        />
        <InputComponent
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
            },
          })}
          id="password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          labelName="Password"
          error={errors.password?.message ?? ""}
        />

        <div className="flex items-center justify-between">
          <a
            href="#"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            Forgot password?
          </a>
        </div>
        <ButtonComponent buttonType={"primary"} isLoading={isSubmitting} type="submit" isDisabled={isSubmitting} label={"Sign in"} />
        <div className=" grid place-items-center text-zinc-500 text-xs my-2">
          or
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleError}
        />
      </div>
      <p className="text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <a href="#" className="font-medium text-zinc-900 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}
