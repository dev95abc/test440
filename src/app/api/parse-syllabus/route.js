export const dynamic = 'force-dynamic';

const dummyResult = {
  "id": 1,
  "semester_id": 1,
  "course_code": "sagar ",
  "course_title": "Introduction to Computer Science",
  "credits": 4,
  "modules": [
    {
      "module_number": 1,
      "units": [
        {
          "unit_number": 1,
          "chapters": [
            {
              "id": 1,
              "course_id": 1,
              "name": "Isagrntroduction to Programming",
              "module_number": 1,
              "unit_number": 1,
              "topics": [
                {
                  "id": 1,
                  "chapter_id": 1,
                  "title": "What is Programming?"
                },
                {
                  "id": 2,
                  "chapter_id": 1,
                  "title": "History of Programming Languages"
                },
                {
                  "id": 3,
                  "chapter_id": 1,
                  "title": "Setting Up Development Environment"
                },
                {
                  "id": 4,
                  "chapter_id": 1,
                  "title": "Writing Your First Program"
                }
              ]
            }
          ]
        },
        {
          "unit_number": 2,
          "chapters": [
            {
              "id": 2,
              "course_id": 1,
              "name": "Variables and Data Types",
              "module_number": 1,
              "unit_number": 2,
              "topics": [
                {
                  "id": 5,
                  "chapter_id": 2,
                  "title": "Understanding Variables"
                },
                {
                  "id": 6,
                  "chapter_id": 2,
                  "title": "Primitive Data Types"
                },
                {
                  "id": 7,
                  "chapter_id": 2,
                  "title": "Type Conversion"
                },
                {
                  "id": 8,
                  "chapter_id": 2,
                  "title": "Constants and Literals"
                }
              ]
            }
          ]
        },
        {
          "unit_number": 3,
          "chapters": [
            {
              "id": 3,
              "course_id": 1,
              "name": "Control Structures",
              "module_number": 1,
              "unit_number": 3,
              "topics": []
            }
          ]
        }
      ]
    },
    {
      "module_number": 2,
      "units": [
        {
          "unit_number": 1,
          "chapters": [
            {
              "id": 4,
              "course_id": 1,
              "name": "Functions",
              "module_number": 2,
              "unit_number": 1,
              "topics": []
            }
          ]
        },
        {
          "unit_number": 2,
          "chapters": [
            {
              "id": 5,
              "course_id": 1,
              "name": "Object-Oriented Programming",
              "module_number": 2,
              "unit_number": 2,
              "topics": []
            }
          ]
        }
      ]
    },
    {
      "module_number": 3,
      "units": [
        {
          "unit_number": 1,
          "chapters": [
            {
              "id": 6,
              "course_id": 1,
              "name": "Basic Algorithms",
              "module_number": 3,
              "unit_number": 1,
              "topics": []
            }
          ]
        }
      ]
    }
  ]
};



export async function GET(req) {
  try {
    // const response = await fetch('http://localhost:8080/topics/:id', {
    const response = await fetch('http://localhost:8080/courses/getAllDet/13', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
 
    if (!response.ok) {
      throw new Error(`External API returned status ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
