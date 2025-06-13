import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  
    try {
        const majorId = req.nextUrl.searchParams.get('majorId');

        // const { user_id }  = await req.json();
 
        // console.log('majorId:', user_id);
        if (!majorId) {
            return NextResponse.json({ error: 'majorId is required' }, { status: 400 });
        }

        const backendRes = await fetch(`https://server404-production.up.railway.app/courses/getCourseByMajorId/${majorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //     user_id: user_id
            // }),
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