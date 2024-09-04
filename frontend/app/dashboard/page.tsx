"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Term {
  username: string;
  study_term: string;
  courses: string[];
}

export default function DashboardPage() {
  const [userTerms, setTermsData] = useState<Term[]>([]);

  useEffect(() => {
    const getTerms = async () => {
      try {
        const csrftoken = Cookies.get("csrftoken");
        const response = await fetch("http://localhost:8000/api/terms/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken ?? "",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTermsData(data);
        } else {
          console.log("An error occured fetching terms");
          // Do stuff
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getTerms();
  }, []);

  const handleInputChange = (
    termIndex: number,
    courseIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newTermsData = [...userTerms];

    newTermsData[termIndex].courses[courseIndex] = e.target.value;
    setTermsData(newTermsData);
  };

  //for (let i = 0; i < inputFields.length; i++) {
  //  terms.push(inputFields)
  //}
  return (
    <div className="h-screen w-screen sm:bg-gradient-to-b from-green-300 to-indigo-400">
      {userTerms.map((term, termIndex) => (
        <div key={termIndex}>
          <h2>Term {termIndex + 1}</h2>
          {term.courses.map((course, courseIndex) => (
            <input
              key={courseIndex}
              value={course}
              onChange={(e) => handleInputChange(termIndex, courseIndex, e)}
            ></input>
          ))}
        </div>
      ))}
    </div>
  );
}
