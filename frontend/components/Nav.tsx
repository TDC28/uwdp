import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Nav() {
  return (
    <header>
      <nav className="flex justify-between">
        <div className="flex items-center space-x-5">
          <Link href="/" className="hover:text-gray-500">
            <img src="/logo.png" alt="UWDP Logo" className="h-14 pl-3" />
          </Link>
          <Link href="/dashboard" className="hover:text-gray-500">
            Dashboard
          </Link>
          <Link href="/auth/login" className="hover:text-gray-500">
            Login
          </Link>
          <Link href="/auth/register" className="hover:text-gray-500">
            Register
          </Link>
        </div>
        <div className="flex justify-right items-center pr-5">
          <Link href="/auth/login">
            <img src="/profile.png" alt="Profile" className="h-8 px-3" />
          </Link>
          <Link href="https://github.com/TDC28/uwdp">
            <img src="/github.png" alt="GitHub" className="h-7 px-3" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
