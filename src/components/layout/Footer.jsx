import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-10 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">MediQueue</h3>
          <p className="text-sm">
            Your trusted platform to find expert tutors and best learning sessions easily and securely.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Tutor Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/tutors">Browse Tutors</Link></li>
            <li><Link href="/tutors">Popular Subjects</Link></li>
            <li><Link href="/">How It Works</Link></li>
            <li><Link href="/add-tutor">Become a Tutor</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>support@mediqueue.com</li>
            <li>+880 1234-567890</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-xl">
            <FaFacebook /> <FaInstagram /> <RiTwitterXFill /> <FaLinkedin />
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
        © 2026 MediQueue. All rights reserved.
      </div>
    </footer>
  );
}