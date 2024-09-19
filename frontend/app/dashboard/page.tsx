"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Term {
  study_term: string;
  courses: string[];
}

export default function DeshboardPage() {
  const [termsData, setTermsData] = useState<Term[]>([]);
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const csrftoken = Cookies.get("csrftoken");

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/terms/", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.terms);
          setTermsData(data.terms);
        } else {
          console.log("An error occured fetching terms");
          console.log("Are you logged in?");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTerms();
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
    <MaxWidthWrapper>
      <div></div>
    </MaxWidthWrapper>
  );
}
