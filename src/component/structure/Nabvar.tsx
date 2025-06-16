'use client'
// app/components/NavbarClient.tsx
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavbarClientProps {
    session?: object | null;
}


export default function Navbar({ session }: NavbarClientProps) {
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowNavbar(false); // scroll down
            } else {
                setShowNavbar(true); // scroll up
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`bg-white shadow-sm fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
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
                    >
                        Home
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