"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [loginAlert, setLoginAlert] = useState("");

  useEffect(() => {
    setIsButtonEnabled(password != "" && username != "");
  }, [password, username]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",

      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Authenticated ", data.username);
      router.push("/profile");
    } else {
      const message = data.error;
      setLoginAlert(message);
    }
  };

  return (
    <form className="space-y-8 w-full sm:w-80 " onSubmit={onSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Username</Label>
        <Input
          id="username"
          type="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="content-start">
        <div className="flex mb-2">
          <Label htmlFor="password">Password</Label>
          <Label className="text-indigo-500 text-right flex-1 hover:underline">
            <Link href="/createResetPassword"> Forgot Password ?</Link>
          </Label>
        </div>
        <Input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Label className="m-3 text-red-500"> {loginAlert}</Label>
      </div>
      <div className="w-full">
        <Button
          variant="outline"
          className="w-full bg-black text-white"
          disabled={!isButtonEnabled}
        >
          Login
        </Button>
      </div>
    </form>
  );
}
