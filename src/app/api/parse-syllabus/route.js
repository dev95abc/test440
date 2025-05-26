export const dynamic = 'force-dynamic';

const dummyResult = {
  "semester": "Semester 1",
  "courseCode": "PSCS505",
  "courseTitle": "Principles of Compiler Design",
  "credits": 2,
  "modules": [
    {
      "module": "MODULE -1",
      "units": [
        {
          "unit": "Unit 1: Front end of Compiler",
          "topics": [
            "Introduction to Compiler Design: Role and importance of compilers, Phases of compilation process, Compiler architecture and components",
            "Lexical Analysis: Role of lexical analyzer, Regular expressions and finite automata, Lexical analyzer generators (e.g., Lex)",
            "Syntax Analysis: Role of parser, Context-free grammars, Top-down parsing (LL parsing), Bottom-up parsing (LR parsing), Syntax analyzer generators (e.g., Yacc/Bison)",
            "Semantic Analysis: Role of semantic analyzer, Symbol table management, Type checking and type systems, Attribute grammars",
            "Intermediate Code Generation: Intermediate representations (IR), Three-address code generation, Quadruples and triples, Syntax-directed translation"
          ]
        },
        {
          "unit": "Unit 2: Back end of Compiler",
          "topics": [
            "Code Optimization: Data flow analysis, Common subexpression elimination, Constant folding and propagation, Loop optimization techniques",
            "Code Generation: Code generation techniques, Target machine description, Register allocation, Instruction selection and scheduling",
            "Runtime Environments: Activation records and stack management, Heap memory management, Call and return mechanisms, Exception handling",
            "Lexical and Syntax Error Handling: Error recovery strategies, Error reporting and handling",
            "Introduction to Compiler Tools, Techniques and Advanced Topics in Compiler Design: Lexical and syntax analyzer generators, Code generation frameworks (e.g., LLVM), Debugging and testing compilers, Just-in-time (JIT) compilation, Parallel and concurrent programming support, Compiler optimization frameworks, Domain-specific language (DSL) compilation"
          ]
        }
      ]
    }
  ]
}



export async function POST(req) {
  console.log(process.env.OPENAI_API_KEY, 'process.env.OPENAI_API_KEY}')
  try {
    const { text } = await req.json();



    if (!text || text.trim() === "") {
      return new Response(JSON.stringify({ error: "Text is required" }), { status: 400 });
    }

    const prompt = `
You're an assistant that extracts structured syllabus information from raw text.
Input: "${text}"
Output format:
{
  "semester": "Semester 1",
  "modules": [
    {
      "unit": "Unit 1",
      "topics": ["Topic 1", "Topic 2"]
    }
  ]
}
Return only JSON.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error("OpenAI response malformed:", data);
      //   return new Response(JSON.stringify({ error: "Invalid OpenAI response" }), { status: 500 });
      return new Response(JSON.stringify(dummyResult), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ result: dummyResult }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("API Error:", error);
    // return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    return new Response(JSON.stringify({ result: dummyResult }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
