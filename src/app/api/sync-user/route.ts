import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { auth0_id, email, name } = body;
    console.log('Syncing user:', { auth0_id, email, name });

    // Replace this with your actual backend URL
    const backendRes = await fetch('http://localhost:8080/users/auth0-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auth0_id, email, name }),
    });

    if (!backendRes.ok) {
      const text = await backendRes.text();
      console.error('Backend error:', text);
      return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
