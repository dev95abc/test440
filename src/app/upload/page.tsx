'use client'


import { useState } from 'react';
import Tesseract from 'tesseract.js';
import ParsedSyllabus from '@/component/ParsedSyllabus'

// mockData.ts
export const mockSyllabusData = {
  semester: "Semester 1",
  courseCode: "PSCS505",
  courseTitle: "Principles of Compiler Design",
  credits: 2,
  modules: [
    {
      module: "MODULE -1",
      units: [
        {
          unit: "Unit 1: Front end of Compiler",
          topics: [
            {
              title: "Introduction to Compiler Design",
              explanations: null,
              // explanations: [
              //   {
              //     id: 1,
              //     text: "Compilers are programs that translate source code...",
              //     prompt: "Original explanation",
              //     likes: 5,
              //   },
              //   {
              //     id: 2,
              //     text: "Think of a compiler like a translator converting languages...",
              //     prompt: "Explain like I’m 12",
              //     likes: 8,
              //   },
              // ],
            },
            {
              title: "Lexical Analysis",
                explanations: null,
              // explanations: [
              //   {
              //     id: 3,
              //     text: "Lexical analysis is the first phase of a compiler...",
              //     prompt: "Original explanation",
              //     likes: 3,
              //   },
              // ],
            },
          ],
        },
        // ...more units
      ],
    },
  ],
};



export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setExtractedText(''); //type is string 
    }
  };

  const handleUpload = async () => {
    // if (!image) return;
alert('test')
    setIsLoading(true);
    setExtractedText(null); // type is null

    try {
      // const result = await Tesseract.recognize(image, 'eng', {
      //   logger: (m) => console.log(m),
      // });


      const res = await fetch("/api/parse-syllabus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text:' result.data.text' }),
      });

      //like this?? 
      const parsedData = await res.json(); 
 
    setIsLoading(false);


    setExtractedText(parsedData);  
    } catch (error) {
      console.error('OCR Error:', error);
      setExtractedText('Failed to extract text.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Upload Your Syllabus Screenshot</h1>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full max-h-96 object-contain mb-4 border"
        />
      )}

      <button
        onClick={handleUpload}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? 'Extracting...' : 'Extract Text with OCR'}
      </button>

      {extractedText && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-medium mb-2">Extracted Text:</h2>
          <ParsedSyllabus data={mockSyllabusData} /> 

        </div>
      )}
    </div>
  );
}
