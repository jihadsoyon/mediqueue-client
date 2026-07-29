"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth-client";
import ThemeToggle from "../shared/ThemeToggle";
import { useState } from "react";
import { clearTokenCache } from "@/lib/api";

export default function Navbar() {
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const publicLinks = (
    <>
      <Link href="/">Home</Link>
      <Link href="/tutors">Tutors</Link>
    </>
  );

  const privateLinks = (
    <>
      <Link href="/add-tutor">Add Tutor</Link>
      <Link href="/my-tutors">My Tutors</Link>
      <Link href="/my-booked-sessions">My Booked Sessions</Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm px-6 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-green-600">
        MediQueue
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {publicLinks}
        {!loading && user && privateLinks}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {!loading && !user && (
          <>
            <Link href="/login" className="px-4 py-2 border rounded-lg">
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Register
            </Link>
          </>
        )}
        {!loading && user && (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <img
                src={user.image || "https://i.ibb.co/2Y6h6qh/default-avatar.png"}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover"
              />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    clearTokenCache();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}