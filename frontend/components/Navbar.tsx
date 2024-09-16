import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="sticky h-14 z-30 inset-x-0 w-full border-b border-gray-200">
      <MaxWidthWrapper className="flex flex-row items-center justify-between pt-2">
        <div>
          <p className="text-lg font-bold">(Logo)</p>
        </div>

        <div className="flex flex-row">
          <Link
            href="/Log in"
            className={buttonVariants({
              variant: "ghost",
            })}
          >
            Log in
          </Link>
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "ghost",
            })}
          >
            Dashboard
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
