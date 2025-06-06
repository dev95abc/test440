'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/app/stores/userStore'; // adjust path as needed
export default function UploadPage() {

     const user = useUserStore((state) => state.user);

    const [universities, setUniversities] = useState([]);
    const [majors, setMajors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('');
    const [recentlyViewed, setRecentlyViewed] = useState([]); // Track recently viewed courses

    console.log(user, 'userData');

    const router = useRouter();

    useEffect(() => {
        fetch('/api/universities')
            .then(res => res.json())
            .then(setUniversities)
            .catch(console.error);

    }, []);

  useEffect(() => {  
        if( user?.id ) {
            fetch(`/api/fetch_last_visited?userId=${user?.id}`)
                .then(res => res.json())
                .then(setRecentlyViewed)
                .catch(console.error);
        }

    }, [user]);


    const handleUniversityClick = (id: string) => {
        setSelectedUniversity(id);
        setSelectedMajor('');
        setCourses([]);
        fetch(`/api/major?universityId=${id}`)
            .then(res => res.json())
            .then(setMajors)
            .catch(console.error);
    };

    const handleMajorClick = (id: string) => {
        setSelectedMajor(id);
        fetch(`/api/courses?majorId=${id}`)
            .then(res => res.json())
            .then(setCourses)
            .catch(console.error);
    };

    const handleCourseClick = (id: string) => {
        router.push(`/syllabus/${id}`);
    };
    console.log(courses, 'courses')
    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-xl font-semibold">Universities</h2>
                <div className="flex gap-2 flex-wrap">
                    {universities.map((u: any) => (
                        <button
                            key={u.id}
                            onClick={() => handleUniversityClick(u.id)}
                            className={`px - 3 py-1 border rounded ${selectedUniversity === u.id ? 'bg-blue-600 text-white' : ''}`}>
                            {u.name}
                        </button>
                    ))}
                </div>
            </div>
            {
                majors.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold">Majors</h2>
                        <div className="flex gap-2 flex-wrap">
                            {majors.map((m: any) => (
                                <button
                                    key={m.id}
                                    onClick={() => handleMajorClick(m.id)}
                                    className={`px-3 py-1 border rounded ${selectedMajor === m.id ? 'bg-green-600 text-white' : ''
                                        }`}
                                >
                                    {m.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )
            }

            {
                courses.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold">Courses</h2>
                        <ul className="list-disc list-inside">
                            {courses.map((c: any) => (
                                <li key={c.id} onClick={() => handleCourseClick(c.id)}>{c.course_title} | {c.course_code}</li> //on click redirect to /syllabus/{c.id}
                            ))}
                        </ul>
                    </div>
                )
            }
        </div >
    );
}