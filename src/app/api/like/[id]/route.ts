import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {

  try {
    const explanation_id = parseInt(params.id);
    const body = await req.json();
    const { auth0_id, email, name, picture } = body;
    console.log('Like request body:', { auth0_id, email, name, picture } );

    const response = await fetch(`${process.env.API_URL}users/like/${explanation_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  auth0_id, email, name, picture }),
    });

    if (!response.ok) throw new Error('Failed to fetch from backend');
 
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.log('Backend fetch error:', err);
 
    return NextResponse.json(err);
  }



}
