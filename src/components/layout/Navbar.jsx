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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // মোবাইল মেনুর জন্য নতুন স্টেট

  const publicLinks = (
    <>
      <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
      <Link href="/tutors" onClick={() => setMobileMenuOpen(false)}>Tutors</Link>
    </>
  );

  const privateLinks = (
    <>
      <Link href="/add-tutor" onClick={() => setMobileMenuOpen(false)}>Add Tutor</Link>
      <Link href="/my-tutors" onClick={() => setMobileMenuOpen(false)}>My Tutors</Link>
      <Link href="/my-booked-sessions" onClick={() => setMobileMenuOpen(false)}>My Booked Sessions</Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm px-6 py-3 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <Link href="/" className="text-xl font-bold text-green-600">
            MediQueue
          </Link>
        </div>

        {/* Desktop Links */}
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
                  alt={user.name || "User Profile"}
                  className="w-9 h-9 rounded-full object-cover"
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50">
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
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-md p-4 flex flex-col gap-4 z-40">
          {publicLinks}
          {!loading && user && privateLinks}
        </div>
      )}
    </nav>
  );
}