import { auth0 } from "@/lib/auth0";
import './globals.css';
import UserSyncClient from '@/component/Auth/UserSyncClient';

export default async function Home() {
  // Fetch the user session
  const session = await auth0.getSession();

  // If no session, show sign-up and login buttons
  if (!session) {
    return (
      //      <style type="text/css">
      // 	body{
      // 		background: #edf2f7;
      // 	}
      // </style>
      // <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">

      <div className="container px-4 max-w-6xl mx-auto my-8">

        <div className="w-full max-w-xl mx-auto">
          <form className="LgnForm max-w-sm mx-auto  shadow-lg bg-white rounded-lg pt-6 pb-8 mb-4 px-8">
            {/* <img className="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto" src="https://i.imgur.com/6NEUhor.jpg" /> */}
            {/* <div className="MskForm" >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 " >
                  Username
                </label>
                <input className="shadow apperance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                <p className="text-red-500 text-xs italic">Please choose a password.</p>
              </div>

              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Sign In
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                  Forgot Password?
                </a>
              </div>
              <p className="mt-2 text-black-500 text-xs">
                Don't have an account, <a href="#" className="text-black-700 font-bold">Create an account</a> now.
              </p> */}
              <div className="LgnSm my-4 max-w-sm text-center">
                {/* <h2 className="underline my-2 font-bold">Login With Social Media</h2>
                <a href="#" className="LgnFb p-2 block bg-blue-700 rounded-sm text-white md:hover:text-black-600 my-2">
                  Sign up with Facebook
                </a> */}
                <a href="/auth/login" className="LgnFb p-2 block bg-blue-700 rounded-sm text-white md:hover:text-black-600 my-2">
                  Login in with Google
                </a>
                <a href="/auth/login?screen_hint=signup" className="LgnFb p-2 block bg-red-700 rounded-sm text-white md:hover:text-black-600 my-2">
                  Sign up with Google
                </a>
              </div>
              {/* </div> */}
          </form>
        </div>
      </div> 

//  <main>
//         <a href="/auth/login?screen_hint=signup">
//           <button>Sign up</button>
//         </a>
//         <a href="/auth/login">
//           <button>Log in</button>
//         </a>
//       </main>
    );
  }

  // If session exists, show a welcome message and logout button
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