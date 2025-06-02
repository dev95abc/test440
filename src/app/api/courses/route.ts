import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
 
    const majorId = req.nextUrl.searchParams.get('majorId');
    console.log('majorId:', majorId);
    if (!majorId) {
        return NextResponse.json({ error: 'majorId is required' }, { status: 400 });
    }

    try {
        const backendRes = await fetch(`http://localhost:8080/courses/getCourseByMajorId/${majorId}`, {
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
        console.log('Fetched majors:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching majors:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}