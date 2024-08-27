import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-wrap h-screen w-screen justify-center items-center  bg-white sm:bg-gradient-to-b from-green-300 to-indigo-400">
      <div className="sm:shadow-xl p-8 sm:bg-white rounded-lg">
        <h1 className="font-semibold text-xl mb-4 py-3 text-center">
          {" "}
          Log in{" "}
        </h1>
        <LoginForm />
        <p className="text-center font-medium mt-5 text-sm">
          No account?{" "}
          <Link href="register" className="text-indigo-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
