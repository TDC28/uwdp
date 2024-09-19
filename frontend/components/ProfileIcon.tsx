"use client";

import Link from "next/link";
import { buttonVariants, Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const ProfileIcon = () => {
  const { user, logOut } = useAuth();

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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <UserRound className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-2">
        <div className="flex flex-col gap-1">
          <Button variant="ghost" size="sm" asChild>
            <button>Account</button>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <button onClick={logOut}>Log out</button>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileIcon;
