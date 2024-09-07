"use client";

import { useEffect, useState } from "react";

interface Term {
  study_term: string;
  courses: string[];
}

export default function DashboardPage() {
  const [termsData, setTermsData] = useState<Term[]>([]);

  useEffect(() => {
    const getTerms = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/terms/", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setTermsData(data);
        } else {
          console.log("An error occured fetching terms");
          console.log("Are you logged in?");
          // Do stuff
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getTerms();
  }, []);

  const handleCourseChange = (
    termIndex: number,
    courseIndex: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newTermsData = [...termsData];

    newTermsData[termIndex].courses[courseIndex] = e.target.value;
    setTermsData(newTermsData);
  };

  const handleCourseCreate = (termIndex: number) => {
    const newTermsData = [...termsData];

    newTermsData[termIndex].courses.push("");
    setTermsData(newTermsData);
  };

  const handleNewTerm = () => {
    const newTermsData = [...termsData];
    const new_study_term =
      String(Math.floor(newTermsData.length / 2) + 1) +
      (newTermsData.length % 2 === 0 ? "A" : "B");

    newTermsData.push({
      study_term: new_study_term,
      courses: [],
    });

    setTermsData(newTermsData);
  };

  //for (let i = 0; i < inputFields.length; i++) {
  //  terms.push(inputFields)
  //}
  return (
    <div className="h-screen w-screen sm:bg-gradient-to-b from-green-300 to-indigo-400">
      {termsData.map((term, termIndex) => (
        <div key={termIndex}>
          <h2>Term {termIndex + 1}</h2>
          {term.courses.map((course, courseIndex) => (
            <input
              key={courseIndex}
              value={course}
              onChange={(e) => handleCourseChange(termIndex, courseIndex, e)}
            ></input>
          ))}
          <button onClick={() => handleCourseCreate(termIndex)}>
            Add new course
          </button>
        </div>
      ))}
      <button onClick={() => handleNewTerm()}>Add new term</button>
    </div>
  );
}
