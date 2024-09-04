"use client";

import Cookies from "js-cookie";

export default function LogoutPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

    const csrftoken = Cookies.get("csrftoken");

    const response = await fetch("http://localhost:8000/api/auth/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrftoken ?? "",
      },
    });

    if (response.ok) {
      console.log("Logged out");
      // Optionally, redirect to login or home page
    } else {
      console.log("Error logging out");
    }
  };

  return <button onClick={onSubmit}>Logout</button>;
}
