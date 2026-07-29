"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "@/lib/auth-client";
import ThemeToggle from "../shared/ThemeToggle";
import { useState } from "react";
import { clearTokenCache } from "@/lib/api";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  const publicLinks = (
    <>
      <Link href="/" onClick={closeMobile}>Home</Link>
      <Link href="/tutors" onClick={closeMobile}>Tutors</Link>
    </>
  );

  const privateLinks = (
    <>
      <Link href="/add-tutor" onClick={closeMobile}>Add Tutor</Link>
      <Link href="/my-tutors" onClick={closeMobile}>My Tutors</Link>
      <Link href="/my-booked-sessions" onClick={closeMobile}>My Booked Sessions</Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm px-6 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-green-600">
          MediQueue
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium">
          {publicLinks}
          {!loading && user && privateLinks}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />

          {!loading && !user && (
            <>
              <Link href="/login" className="px-4 py-2 border dark:border-gray-700 rounded-lg">
                Login
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
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
                  className="w-9 h-9 rounded-full object-cover border-2 border-green-600"
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border dark:border-gray-700">
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      clearTokenCache();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger - mobile only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-3 pt-3 border-t dark:border-gray-700 flex flex-col gap-1 text-gray-700 dark:text-gray-200 font-medium">
          <Link href="/" onClick={closeMobile} className="px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600">
            Home
          </Link>
          <Link href="/tutors" onClick={closeMobile} className="px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600">
            Tutors
          </Link>
          {!loading && user && (
            <>
              <Link href="/add-tutor" onClick={closeMobile} className="px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600">
                Add Tutor
              </Link>
              <Link href="/my-tutors" onClick={closeMobile} className="px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600">
                My Tutors
              </Link>
              <Link href="/my-booked-sessions" onClick={closeMobile} className="px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600">
                My Booked Sessions
              </Link>
            </>
          )}
          {!loading && !user && (
            <Link href="/register" onClick={closeMobile} className="sm:hidden px-2 py-2 rounded-lg bg-green-600 text-white text-center mt-1">
              Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}