// app/api/learned-topics/[topic]/route.ts
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, { params }: { params:  { id: string } }) {
  try {
    
    const user_id = parseInt(params.id); 
    // let userID = Number(auth0_id.split('|')[1]); 

    const backendRes = await fetch(`http://localhost:8080/users/learned_topics/${user_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }, 
    });

    if (!backendRes.ok) {
      const text = await backendRes.text();
      console.error('Backend error:', text);
      return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
    }
    const learnedTopics = await backendRes.json();
    return NextResponse.json(learnedTopics);

    // return NextResponse.json({ user: backendRes, success: true }); //how can i get user in my component?
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}



export async function POST(req: NextRequest, { params }: { params:  { id: string } }) {
  try {
    const explanation_id = parseInt(params.id);
    const body = await req.json();
    const {  user_id, chapter_id} = body;
    console.log("body in learned-topics", body, explanation_id, user_id, chapter_id);

    if (!user_id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(`http://localhost:8080/users/learned_topics/${explanation_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  
        user_id:user_id,
        chapter_id:chapter_id
      }),
    });

    if (!response.ok) {
      throw new Error(await response.text() || 'Failed to update learning status');
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (err) {
    console.error('Error in learned-topics API:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}