"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import Cookies from "js-cookie";

interface IFormInput {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const csrftoken = Cookies.get("csrftoken");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = async (data: IFormInput) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken ?? "",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const responseData = await response.json();
      console.log("Login successful", responseData);
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <MaxWidthWrapper className="mt-20">
      <div className="p-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
