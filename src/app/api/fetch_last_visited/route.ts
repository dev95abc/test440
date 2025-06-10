import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest ) {

    try {
      const user_id = req.nextUrl.searchParams.get('userId'); 
      console.log('user_id in last-visited:', user_id); // Debugging line to check user_id

    const response = await fetch(`http://localhost:8080/courses/last-visited-course/${user_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }, 
    });

    if (!response.ok) throw new Error('Failed to fetch from backend');
 
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {

    console.log('Backend fetch error:', err);
    return NextResponse.json(err);
  } 
}
