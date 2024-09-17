"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { buttonVariants } from "./ui/button";
import { UserRound } from "lucide-react";

const ProfileIcon = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await fetch("http://localhost:8000/api/auth/user/", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (data.user_status === "logged-out") {
      setUser(null);
    } else {
      setUser(data.user);
    }
  };

  useEffect(() => {
    getUser();
    console.log(user);
  }, [user]);

  if (user == null) {
    return (
      <Link
        href="/login"
        className={buttonVariants({
          variant: "ghost",
        })}
      >
        Log in
      </Link>
    );
  }

  return <UserRound />;
};

export default ProfileIcon;
