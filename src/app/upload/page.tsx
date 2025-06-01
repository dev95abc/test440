'use client';

import { useState } from "react";
import Tesseract from "tesseract.js";
import ParsedSyllabus from "@/component/ParsedSyllabus";

// mockData.ts
// export const mockSyllabusData = {
//   "id": 1,
//   "semester_id": 1,
//   "course_code": "CS101",
//   "course_title": "Introduction to Computer Science",
//   "credits": 4,
//   "modules": [
//     {
//       "module_number": 1,
//       "units": [
//         {
//           "unit_number": 1,
//           "chapters": [
//             {
//               "id": 1,
//               "course_id": 1,
//               "name": "Introduction to Programming",
//               "module_number": 1,
//               "unit_number": 1,
//               "topics": [
//                 {
//                   "id": 1,
//                   "chapter_id": 1,
//                   "title": "What is Programming?"
//                 },
//                 {
//                   "id": 2,
//                   "chapter_id": 1,
//                   "title": "History of Programming Languages"
//                 },
//                 {
//                   "id": 3,
//                   "chapter_id": 1,
//                   "title": "Setting Up Development Environment"
//                 },
//                 {
//                   "id": 4,
//                   "chapter_id": 1,
//                   "title": "Writing Your First Program"
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "unit_number": 2,
//           "chapters": [
//             {
//               "id": 2,
//               "course_id": 1,
//               "name": "Variables and Data Types",
//               "module_number": 1,
//               "unit_number": 2,
//               "topics": [
//                 {
//                   "id": 5,
//                   "chapter_id": 2,
//                   "title": "Understanding Variables"
//                 },
//                 {
//                   "id": 6,
//                   "chapter_id": 2,
//                   "title": "Primitive Data Types"
//                 },
//                 {
//                   "id": 7,
//                   "chapter_id": 2,
//                   "title": "Type Conversion"
//                 },
//                 {
//                   "id": 8,
//                   "chapter_id": 2,
//                   "title": "Constants and Literals"
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           "unit_number": 3,
//           "chapters": [
//             {
//               "id": 3,
//               "course_id": 1,
//               "name": "Control Structures",
//               "module_number": 1,
//               "unit_number": 3,
//               "topics": []
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "module_number": 2,
//       "units": [
//         {
//           "unit_number": 1,
//           "chapters": [
//             {
//               "id": 4,
//               "course_id": 1,
//               "name": "Functions",
//               "module_number": 2,
//               "unit_number": 1,
//               "topics": []
//             }
//           ]
//         },
//         {
//           "unit_number": 2,
//           "chapters": [
//             {
//               "id": 5,
//               "course_id": 1,
//               "name": "Object-Oriented Programming",
//               "module_number": 2,
//               "unit_number": 2,
//               "topics": []
//             }
//           ]
//         }
//       ]
//     },
//     {
//       "module_number": 3,
//       "units": [
//         {
//           "unit_number": 1,
//           "chapters": [
//             {
//               "id": 6,
//               "course_id": 1,
//               "name": "Basic Algorithms",
//               "module_number": 3,
//               "unit_number": 1,
//               "topics": []
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setExtractedText(""); //type is string
    }
  };

  const handleUpload1 = async () => {
    if (!image) return;
    setIsLoading(true);
    setExtractedText(null); // type is null

    try {
      const result = await Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m),
      });

      console.log(result, "final data");

    


      try {
        const res = await fetch('/api/groke', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.data.text),
        });
      
        if (!res.ok) {
          console.log('error');
          const errorData = await res.json();
          console.error('Error details:', errorData);
          return;
        }
      
        const data = await res.json();
        
        console.log('success');
        console.log(data);
      } catch (err) {
        console.log('error');
        console.error('Fetch failed:', err);
      }
      


      // const data = await res.json();

      //gets the formated syllabus

      // http://localhost:8080/courses/getAllDet/13
      // const res = await fetch("/api/parse-syllabus", {
      //   method: "GET",
      //   headers: { "Content-Type": "application/json" },
      // });

      //like this??
      // const parsedData = await res.json();

      setIsLoading(false);

      //TODO:
      // call http://localhost:8080/groke by passing parsedData
      // redirect frontend to 'localhost/coursr_name/:id'

      {
        /* move parsedSyllabus to a sperate page 
      call this    const res = await fetch("/api/parse-syllabus", {
        method: "GET",
        headers: { "Content-Type": "application/json" }, 
      });

      in the pasedSyllabus and get the ID from the params 

*/
      }
      // setExtractedText(parsedData);
    } catch (error) {
      console.error("OCR Error:", error);
      setExtractedText("Failed to extract text.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
  
    setIsLoading(true);
    setExtractedText(null);
  
    try {
      const result = await Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m),
      });
  
      const extracted = result.data.text;
      console.log(extracted, 'success 123')
      setExtractedText(extracted); // Store in state
  
      const res = await fetch('/api/groke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extracted }),
      });
  
      if (!res.ok) {
        console.log('error');
        const errorData = await res.json();
        console.error('Error details:', errorData);
        return;
      }
  
      const data = await res.json();
      console.log('success');
      console.log(data, 'success 123');
  
      // Redirect to /syllabus
      // alert('hello worlkd')
      window.location.href = `/syllabus/${data.id}`;
  
    } catch (error) {
      console.log('error');
      console.error("OCR or upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Upload Your Syllabus Screenshot
      </h1>

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
        {isLoading ? "Extracting..." : "Extract Text with OCR"}
      </button>

      {extractedText && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-medium mb-2">Extracted Text:</h2>
          {/* TODO */}
          {/* move parsedSyllabus to a sperate page */}
          {/* <ParsedSyllabus data={extractedText} /> */}
        </div>
      )}
    </div>
  );
}
