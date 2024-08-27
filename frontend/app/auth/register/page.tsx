import Link from "next/link";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-wrap h-screen w-screen justify-center items-center  bg-white sm:bg-gradient-to-b from-green-300 to-indigo-400">
      <div className="sm:shadow-xl p-8 sm:bg-white rounded-lg">
        <h1 className="font-semibold text-xl mb-7 py-3 text-center">
          {" "}
          Create your account.{" "}
        </h1>
        <RegisterForm />
        <p className="text-center font-medium mt-5 text-sm">
          Already have an account?{" "}
          <Link href="login" className="text-indigo-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
