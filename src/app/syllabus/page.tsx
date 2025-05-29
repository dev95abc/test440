'use client';

import SyllabusDisplay from '@/component/SyllabusDisplay'; // adjust path as needed

export default function SyllabusPage() {
  const syllabusData = [
    {
      module: 'Algebra',
      units: [
        {
          unit: 'Linear Equations',
          topics: [
            {
              title: 'Solving single variable equations',
              explanations: [
                {
                  id: 1,
                  prompt: 'Explain simply',
                  text: 'To solve x + 3 = 7, subtract 3 from both sides: x = 4.',
                  likes: 5,
                },
                {
                  id: 2,
                  prompt: 'Give an analogy',
                  text: 'Solving x + 3 = 7 is like having 3 apples already and needing 7, so you need 4 more.',
                  likes: 8,
                },
              ],
            },
            {
              title: 'Graphing lines',
              explanations: [],
            },
          ],
        },
      ],
    },
    {
      module: 'Calculus',
      units: [
        {
          unit: 'Limits',
          topics: [
            {
              title: 'Understanding limits',
              explanations: [],
            },
          ],
        },
      ],
    },
  ];

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">📘 Your Syllabus</h1>
      {/* <SyllabusDisplay syllabus={syllabusData} /> */}
    </main>
  );
}
