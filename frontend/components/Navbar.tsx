import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import ProfileIcon from "./ProfileIcon";

const Navbar = () => (
  <nav className="sticky h-14 z-30 inset-x-0 w-full border-b border-gray-200">
    <MaxWidthWrapper className="flex flex-row items-center justify-between pt-2">
      <Link href="/" className="font-bold">
        (Logo)
      </Link>

      <div className="flex flex-row gap-4 items-center">
        <Link href="/dashboard" className={buttonVariants()}>
          Dashboard
        </Link>
        <ProfileIcon />
      </div>
    </MaxWidthWrapper>
  </nav>
);

export default Navbar;
