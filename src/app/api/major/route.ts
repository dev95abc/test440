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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
}