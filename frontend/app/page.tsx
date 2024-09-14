import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:test-7xl">
        Plan your <span className="text-green-600">UW degree</span> like never
        before
      </h1>

      <Link className={buttonVariants()} href="/dashboard">
        Get started <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </MaxWidthWrapper>
  );
}
