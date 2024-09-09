"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const router = useRouter();

  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/user/", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        console.log(data);
        console.log(data.status == "logged-in");

        if (response.ok && data.user_status == "logged-in") {
          setUsername(data.user);

          console.log(data);
          router.push("/profile");
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.log("An error occured");
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-screen sm:bg-gradient-to-b from-green-300 to-indigo-400"></div>
    );
  }

  return (
    <div className="flex flex-wrap h-screen w-screen justify-center items-center sm:bg-gradient-to-b from-green-300 to-indigo-400">
      <div className="w-2/5 p-3 sm:shadow-xl sm:bg-white rounded-lg">
        <div className="text-2xl font-medium p-6">Welcome {username}</div>
        <div className="flex flex-col items-center gap-3 px-4 pt-2 pb-4 mt-3">
          <div className="text-xl">Degree specifications</div>
          <div className="w-full">
            <div>Majors</div>
            <Input className="" />
          </div>
          <div className="w-full">
            <div>Minors</div>
            <Input />
          </div>
          <div className="w-full">
            <div>Options</div>
            <Input />
          </div>
          <Button className="w-full">Log Out</Button>
        </div>
      </div>
    </div>
  );
}
