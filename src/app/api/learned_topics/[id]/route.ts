// src\app\api\learned_topics\[id]\route.ts
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};


export async function GET(req: NextRequest, context: Params) {
  try {
    
   const user_id = parseInt(context.params.id); 
    // let userID = Number(auth0_id.split('|')[1]); 

    const backendRes = await fetch(`https://server404-production.up.railway.app/users/learned_topics/${user_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }, 
    });

    if (!backendRes.ok) {
      const text = await backendRes.text();
      console.error('Backend error:', text);
      return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
    }
    const learnedTopics = await backendRes.json();
    return NextResponse.json(learnedTopics);

    // return NextResponse.json({ user: backendRes, success: true }); //how can i get user in my component?
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}



export async function POST(req: NextRequest, context: Params) {
  try {
    const explanation_id  = parseInt(context.params.id); 
    const body = await req.json();
    const {  user_id, chapter_id} = body;
    console.log("body in learned-topics", body, explanation_id, user_id, chapter_id);

    if (!user_id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(`https://server404-production.up.railway.app/users/learned_topics/${explanation_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  
        user_id:user_id,
        chapter_id:chapter_id
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


// // i get this error wheni build this:
// .next/types/app/api/learned_topics/[id]/route.ts:49:7
// Type error: Type '{ __tag__: "GET"; __param_position__: "second"; __param_type__: Params; }' does not satisfy the constraint 'ParamCheck<RouteContext>'.
//   The types of '__param_type__.params' are incompatible between these types.
//     Type '{ id: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]

//   47 |     Diff<
//   48 |       ParamCheck<RouteContext>,
// > 49 |       {
//      |       ^
//   50 |         __tag__: 'GET'
//   51 |         __param_position__: 'second'
//   52 |         __param_type__: SecondArg<MaybeField<TEntry, 'GET'>>

// Failed to compile.