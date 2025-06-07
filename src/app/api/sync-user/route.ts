import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { auth0_id, email, name } = body;
    // let userID = Number(auth0_id.split('|')[1]);
    console.log('Syncing user:', { auth0_id, email, name });

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
    const userData = await backendRes.json();
    return NextResponse.json({ user: userData, success: true });

    // return NextResponse.json({ user: backendRes, success: true }); //how can i get user in my component?
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
