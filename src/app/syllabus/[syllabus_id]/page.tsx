"use client";

import ParsedSyllabus from "@/component/ParsedSyllabus";
import { useRouter } from 'next/navigation';
import { use } from "react";
import { useEffect, useState } from "react";
 
interface Props {
  params: { syllabus_id: string };
}
export default async function SyllabusPage({ params } : Props) {
  const { syllabus_id } =   params;
  console.log(params, 'in the chat')
  const [parsedData, setParsedData] = useState();

  const fetchData = async () => {
    // gets the formated syllabus

    // http://localhost:8080/courses/getAllDet/13
    const res = await fetch(`/api/parse-syllabus?syllabus_id=${syllabus_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // like this??
    const data = await res.json();
    setParsedData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">📘 Your Syllabus</h1>
      {/* <SyllabusDisplay syllabus={syllabusData} /> */}
      {parsedData && <ParsedSyllabus data={parsedData} />}
    </main>
  );
}
