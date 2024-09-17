"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Decoration from "@/components/Decoration";

export default function Home() {
  const getUser = async () => {
    const response = await fetch("http://localhost:8000/api/auth/user/", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (data.user_status === "logged-out") {
      return null;
    }

    return data.user;
  };

  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:test-7xl">
          Planning your <span className="text-primary">UW degree</span> won't
          get easier than this.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          UWDP is the ultimate degree planner for University of Waterloo
          students. It ensures you meet your program's requirements and the
          requirements for all courses you want to enrol in.
        </p>
        <Link
          className={buttonVariants({
            className: "mt-4",
            size: "lg",
            variant: "outline",
          })}
          href="/dashboard"
        >
          Get started <ArrowRight className="ml-2 h-4 w-4 sm:text-sm" />
        </Link>
      </MaxWidthWrapper>

      <Decoration />
    </>
  );
}
