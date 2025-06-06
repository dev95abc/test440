// app/api/learned-topics/[topic]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params:  { id: string } }) {
  try {
    const explanation_id = parseInt(params.id);
    const body = await req.json();
    const {  user_id} = body;

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
        id:user_id
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