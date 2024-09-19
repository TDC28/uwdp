"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface IFormInput {
  username: string;
  password: string;
}

export default function LoginPage() {
  const { logIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  return (
    <MaxWidthWrapper className="mt-20">
      <div className="p-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(logIn)}>
          <h1 className="text-4xl font-bold">Log in</h1>
          <div className="flex flex-row gap-4 items-center">
            <p className="text-lg">No account?</p>
            <Link
              href="/register"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Create an account
            </Link>
          </div>

          <Input
            id="username"
            placeholder="Username"
            {...register("username", { required: "Enter a username" })}
          />
          {errors.username && (
            <span className="text-red-500 tex-sm">
              {errors.username.message}
            </span>
          )}

          <Input
            id="password"
            placeholder="Password"
            type="password"
            {...register("password", { required: "Enter a password" })}
          />
          {errors.password && (
            <span className="text-red-500 tex-sm">
              {errors.password.message}
            </span>
          )}

          <Button type="submit">Log in</Button>
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
