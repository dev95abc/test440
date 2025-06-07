import { auth0 } from "@/lib/auth0";
import './globals.css';
import UserSyncClient from '@/component/Auth/UserSyncClient';

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons
  if (!session) {
    return ( 

      <div className="container px-4 max-w-6xl mx-auto my-8">

        <div className="w-full max-w-xl mx-auto">
          <form className="LgnForm max-w-sm mx-auto  shadow-lg bg-white rounded-lg pt-6 pb-8 mb-4 px-8">
            
              <div className="LgnSm my-4 max-w-sm text-center">
              
                <a href="/auth/login" className="LgnFb p-2 block bg-blue-700 rounded-sm text-white md:hover:text-black-600 my-2">
                  Login in with Google
                </a>
                <a href="/auth/login?screen_hint=signup" className="LgnFb p-2 block bg-red-700 rounded-sm text-white md:hover:text-black-600 my-2">
                  Sign up with Google
                </a>
              </div> 
          </form>
        </div>
      </div>  
    );
  } 
  return (
    <main>

      <UserSyncClient user={session.user} />
      <h1>Welcome, {session.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <button>Log out</button>
        </a>
      </p>
    </main>
  );
}