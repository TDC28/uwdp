"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

export function RegisterForm() {
  const csrftoken = Cookies.get("csrftoken");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [doPasswordsMatch, setDoPasswordsMatch] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [registerAlert, setRegisterAlert] = useState<string | null>(null);

  useEffect(() => {
    setDoPasswordsMatch(password === confirmPassword);
    setIsButtonEnabled(
      password === confirmPassword &&
        password != "" &&
        username != "" &&
        email != "",
    );
  }, [password, confirmPassword]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken ?? "",
      },

      body: JSON.stringify({ username, password, email }),
    });

    if (response.ok) {
      setRegisterAlert("User registered successfully");
    } else {
      const data = await response.json();
      const message = data.username;
      console.log(data);
      setRegisterAlert(message);
    }
  };

  return (
    <form className="space-y-8 w-full sm:w-80 " onSubmit={onSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {doPasswordsMatch ? null : (
        <div>
          <Label className="m-3 text-red-500">
            Your passwords do not match.{" "}
          </Label>
        </div>
      )}
      {registerAlert != null ? (
        <div>
          <Label className="m-3 text-red-500 text-center">
            {registerAlert}
          </Label>
        </div>
      ) : null}

      <div className="w-full">
        <Button
          variant="outline"
          className="w-full bg-black text-white"
          disabled={!isButtonEnabled}
        >
          Register
        </Button>
      </div>
    </form>
  );
}
