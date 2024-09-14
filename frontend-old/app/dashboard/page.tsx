"use client";

import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IconContext } from "react-icons";
import Cookies from "js-cookie";

interface Term {
  study_term: string;
  courses: string[];
}

export default function DashboardPage() {
  const [termsData, setTermsData] = useState<Term[]>([]);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const csrftoken = Cookies.get("csrftoken");

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
          setTermsData(data.terms);
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
    setSaveButtonEnabled(true);
  };

  const handleCourseCreate = (termIndex: number) => {
    const newTermsData = [...termsData];

    newTermsData[termIndex].courses.push("");

    setTermsData(newTermsData);
    setSaveButtonEnabled(true);
  };

  const handleCourseDelete = (termIndex: number, courseIndex: number) => {
    const newTermsData = [...termsData];

    newTermsData[termIndex].courses.splice(courseIndex, 1);

    setTermsData(newTermsData);
    setSaveButtonEnabled(true);
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
    setSaveButtonEnabled(true);
  };

  const handleDeleteTerm = () => {
    const newTermsData = [...termsData];
    const lastIndex = newTermsData.length - 1;

    if (lastIndex >= 0) {
      newTermsData.splice(lastIndex);
    }

    setTermsData(newTermsData);
  };

  const handleSaveTerms = async () => {
    for (let i = 0; i < termsData.length; i++) {
      termsData[i].courses.sort();
    }
    setTermsData(termsData);

    const response = await fetch("http://localhost:8000/api/terms/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken ?? "",
      },
      credentials: "include",
      body: JSON.stringify({ terms: termsData }),
    });

    if (response.ok) {
      console.log("Updated terms successfully");
    } else {
      const data = await response.json();
      console.log(data);
    }

    setSaveButtonEnabled(false);
  };

  return (
    <div className="sm:bg-gradient-to-b from-green-300 to-indigo-400">
      <div className="flex flex-col items-center h-screen w-screen ">
        <h1 className="text-5xl font-bold p-4 bg-white rounded-lg m-4">
          Dashboard
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 p-4 w-2/3 gap-4 bg-gray-700 rounded-lg bg-transparent/20">
          {termsData.map((term, termIndex) => (
            <div
              key={termIndex}
              className="flex flex-col bg-white rounded-lg p-2 shadow shadow-black"
            >
              <h2 className="self-center text-xl">{term.study_term}</h2>
              {term.courses.map((course, courseIndex) => (
                <div className="flex items-center gap-2">
                  <input
                    key={courseIndex}
                    value={course}
                    onChange={(e) =>
                      handleCourseChange(termIndex, courseIndex, e)
                    }
                    className="w-full p-1 my-1 bg-gray-200 rounded-lg border border-black shadow shadow-black"
                  ></input>
                  <button
                    onClick={() => handleCourseDelete(termIndex, courseIndex)}
                  >
                    <IconContext.Provider value={{ color: "#CC0000" }}>
                      <IoIosCloseCircle size={20} />
                    </IconContext.Provider>
                  </button>
                </div>
              ))}
              <button onClick={() => handleCourseCreate(termIndex)}>
                Add new course
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-white rounded-lg m-2 p-2"
            onClick={() => handleNewTerm()}
          >
            Add new term
          </button>
          <button
            className="bg-white rounded-lg m-2 p-2"
            onClick={() => handleDeleteTerm()}
          >
            Delete last term
          </button>
          <button
            className="bg-white rounded-lg m-2 p-2"
            onClick={() => handleSaveTerms()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
