"use client";

import ParsedSyllabus from "@/component/ParsedSyllabus";
import { useRouter } from 'next/navigation';
import { use } from "react";
import { useEffect, useState } from "react";
 
interface Props {  syllabus_id: string };
 

export default  function ClientSyllabus({ syllabus_id } : Props) { 
  const [parsedData, setParsedData] = useState();

  const fetchData = async () => {  
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
