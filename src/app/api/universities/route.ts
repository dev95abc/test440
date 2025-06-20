import { NextResponse } from 'next/server';

export async function GET() {


    try {
        // const response = await fetch(`${process.env.API_URL}explanations/topic/${topicId}`);  
        const response = await fetch(`${process.env.API_URL}universities`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, 
        });
        // console.log('test', response)

        if (!response.ok) throw new Error('Failed to fetch from backend');


        const data = await response.json();
        console.log('Fetched data:', data);
        return NextResponse.json(data);
    } catch (err) {  
        console.log('Backend fetch error:', err);
        return NextResponse.json(err);
    }
 
}


// app/api/universities/route.ts
 
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    const response = await fetch(`${process.env.API_URL}universities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) throw new Error('Failed to create university');
    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
