import { NextResponse } from 'next/server';

export async function GET() {


    try {
        // const response = await fetch(`http://localhost:8080/explanations/topic/${topicId}`);  
        const response = await fetch(`http://localhost:8080/universities`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }, 
        });
        console.log('test', response)

        if (!response.ok) throw new Error('Failed to fetch from backend');


        const data = await response.json();
        console.log('Fetched data:', data);
        return NextResponse.json(data);
    } catch (err) {  
        console.log('Backend fetch error:', err);
        return NextResponse.json(err);
    }
 
}