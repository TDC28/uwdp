"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface LoginFormInput {
  username: string;
  password: string;
}

interface RegisterFormInput {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

type User = {
  user_status: string;
  user: string;
};

type AuthContextType = {
  user: User | null;
  getUser: () => Promise<void>;
  logOut: () => Promise<void>;
  logIn: (data: LoginFormInput) => Promise<void>;
  createUser: (data: RegisterFormInput) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const csrftoken = Cookies.get("csrftoken");
  const [user, setUser] = useState(null);
  const router = useRouter();

  const getUser = async () => {
    try {
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
    } catch (error) {
      console.log("Could not fetch response:", error);
    }
  };

  const logOut = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken ?? "",
        },
      });
      setUser(null);
    } catch (error) {
      console.log("Error logging out");
    }
  };

  const logIn = async (data: LoginFormInput) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken ?? "",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getUser();
    }
  };

  const createUser = async (data: RegisterFormInput) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/register/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken ?? "",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, getUser, logOut, logIn, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
