import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

type User = {
  user_status: string;
  user: string;
};

type AuthContextType = {
  user: User | null;
  getUser: () => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const csrftoken = Cookies.get("csrftoken");
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, getUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
