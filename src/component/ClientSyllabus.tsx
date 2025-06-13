"use client";

import ParsedSyllabus from "@/component/ParsedSyllabus"; 
import { useEffect, useState } from "react"; 
import { useUserStore } from "@/app/stores/userStore";
import { useLearnedTopicsStore } from "@/app/stores/learnedTopicsStore";

interface Props { syllabus_id: string };


export default function ClientSyllabus({ syllabus_id }: Props) {
  // const { user } = useUser();
  const user = useUserStore((state) => state.user);
  const [parsedData, setParsedData] = useState();
  const [percentLearned, setPercentLearned] = useState(0);

  const { learnedTopics, setLearnedTopics } = useLearnedTopicsStore();
  const fetchData = async () => {
    // https://server404-production.up.railway.app/courses/getAllDet/13
    // console.log("Fetching syllabus data for ID:", user);
    // if (!user) {
    //   console.error("User not authenticated");
    //   return;
    // }
    const res = await fetch(`/api/parse-syllabus?syllabus_id=${syllabus_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        auth0_id: user?.id || 0,
      }),
    });

    // like this?? 
    const data = await res.json();

    setParsedData(data);
  };



  useEffect(() => {
    fetchData();
  } );


  useEffect(() => {
    if (parsedData?.topicLength) {
      const percentage = (learnedTopics.length / parsedData.topicLength) * 100;
      console.log("Learned topics:", learnedTopics);
      console.log("Percentage learned:", percentage);
      setPercentLearned(percentage);
      console.log("Total topics in syllabus:", parsedData.topicLength);
    }
  }, [parsedData, learnedTopics]);



  useEffect(() => {

    console.log("user in syllabus", user);
    if (user?.id) {
      fetch(`/api/learned_topics/${user?.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

      }).then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setLearnedTopics(data || []);
          console.log("Learned topics data:", parsedData);
          // Now we have both data sets, calculate percentage

          // console.log("Learned topics data:", data);
          // setLearnedTopics(data || []);

        } else {
          console.error('Failed to sync user');
        }
      })
        .catch(console.error);
    }
  }, [user, parsedData, setLearnedTopics]);


  return (
    <main className="p-4">  
      <p className="mb-4">Course Completed :</p>
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${percentLearned}%`}}>  {Math.trunc(percentLearned)}%</div>
      </div>
      {/* <SyllabusDisplay syllabus={syllabusData} /> */}
      {parsedData && <ParsedSyllabus data={parsedData} />}
    </main>
  );
}
