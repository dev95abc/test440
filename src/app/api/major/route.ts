import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const universityId = req.nextUrl.searchParams.get('universityId');

    if (!universityId) {
        return NextResponse.json({ error: 'universityId is required' }, { status: 400 });
    }

    try {
        const backendRes = await fetch(`http://localhost:8080/majors/${universityId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // You can forward cookies or auth headers here if needed
            // credentials: 'include'
        });
        if (!backendRes.ok) {
            return NextResponse.json({ error: 'Failed to fetch majors from backend' }, { status: backendRes.status });
        }

        const data = await backendRes.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching majors:', error);
        console.log(error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, universityId } = body;

        const response = await fetch('http://localhost:8080/majors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, universityId }),
        });

        console.log('POST /major response:', response); 
        if (!response.ok) throw new Error('Failed to create major');

        const data = await response.json();
        return NextResponse.json(data, { status: 201 });
    } catch (err) {
        console.error('POST /major error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
