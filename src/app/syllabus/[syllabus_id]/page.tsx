// app/syllabus/[syllabus_id]/page.tsx

import React from "react";
import ClientSyllabus from "@/component/ClientSyllabus"; // We'll make this next

interface Props {
  params: { syllabus_id: string };
}

export default async function SyllabusPage({ params }: Props) {
  const { syllabus_id } = await params;

  
  return (
    <main className="p-4">
      {/* <h1 className="text-2xl font-bold mb-4">📘 Your Syllabus : {syllabus_id}</h1> */}
       <ClientSyllabus syllabus_id={syllabus_id} />
    </main>
  );
}
