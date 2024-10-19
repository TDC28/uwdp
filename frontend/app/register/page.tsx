"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface RegisterFormInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const { createUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInput>();
  const password = watch("password");

  return (
    <MaxWidthWrapper className="mt-20">
      <div className="p-4">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(createUser)}
        >
          <h1 className="text-4xl font-bold">Create an account</h1>
          <div className="flex flex-row gap-4 items-center">
            <p className="text-lg">Already have an account?</p>
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Log in
            </Link>
          </div>

          <Input
            id="email"
            placeholder="Email"
            type="email"
            {...register("email", { required: "Enter a valid email address" })}
          />
          {errors.email && (
            <span className="text-red-500 tex-sm">{errors.email.message}</span>
          )}

          <Input
            id="username"
            placeholder="Username"
            {...register("username", { required: "Enter a username" })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}

          <Input
            id="password"
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <Input
            id="confirmPassword"
            placeholder="Confirm password"
            type="password"
            {...register("confirmPassword", {
              required: "Enter a password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}

          <Button type="submit">Create account</Button>
        </form>
      </div>
    </MaxWidthWrapper>
  );
}
