import Link from "next/link";
import { auth0 } from "@/lib/auth0";

export default async function Navbar() {
    const session = await auth0.getSession();

    return (
        <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl font-bold text-blue-600">
                    <Link href="/home">🧠 Syllabrain</Link>
                </div>

                {/* Navigation Links */}
                <div className="space-x-4 flex items-center">
                    <Link
                        href="/upload"
                        className="px-4 py-2 bg-blue-700 text-white rounded-sm hover:text-black"
                    >
                        Upload Your Syllabus
                    </Link>
                    <Link
                        href="/home"
                        className="px-4 py-2 bg-green-700 text-white rounded-sm hover:text-black"
                    >Home
                    </Link>

                    {session && (
                        <Link
                            href="/auth/logout"
                            className="px-4 py-2 bg-red-700 text-white rounded-sm hover:text-black"
                        >
                            Log out
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
