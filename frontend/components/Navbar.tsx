import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import ProfileIcon from "./ProfileIcon";

const Navbar = () => (
  <nav className="sticky h-14 z-30 inset-x-0 w-full border-b border-gray-200">
    <MaxWidthWrapper className="flex flex-row items-center justify-between pt-2">
      <div>
        <p className="text-lg font-bold">(Logo)</p>
      </div>

      <div className="flex flex-row gap-2">
        <ProfileIcon />
        <Link href="/dashboard" className={buttonVariants()}>
          Dashboard
        </Link>
      </div>
    </MaxWidthWrapper>
  </nav>
);

export default Navbar;
