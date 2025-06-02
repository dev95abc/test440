import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) { 
    const { searchParams } = new URL(req.url);
    const topicId = searchParams.get('topicId');
    const chpId = searchParams.get('chpId');
    const { title } = await req.json();
    if (!topicId) {
        return NextResponse.json({ error: 'Missing topicId' }, { status: 400 });
    } 
    try {
        // const response = await fetch(`http://localhost:8080/explanations/topic/${topicId}`);  
        const response = await fetch(`http://localhost:8080/explanations/topic/${topicId}/${chpId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        }); 

        if (!response.ok) throw new Error('Failed to fetch from backend');


        const data = await response.json(); 
        return NextResponse.json(data);
    } catch (err) {
        console.log('Backend fetch error:', err);
        const fallback = {
            id: Date.now(),
            text: `Generated explanation for ${topicId}`,
            prompt: 'Auto-generated prompt',
            likes: Math.floor(Math.random() * 10),
        };
        return NextResponse.json(err);
    }
}
