import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendResponse = await fetch('http://localhost:8080/groke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({textData :body.text}),
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error('Error in API proxy:', error);
    return NextResponse.json(
      { error: 'Failed to reach backend', details: (error as Error).message },
      { status: 500 }
    );
  }
}
