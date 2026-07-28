import Link from "next/link";

export const metadata = {
  title: "Page Not Found | MediQueue",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <p className="text-green-600 font-semibold tracking-widest mb-2">ERROR 404</p>
      <h1 className="text-7xl font-bold text-gray-800 dark:text-white mb-4">
        Oops!
      </h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist, may have been moved,
        or the URL was typed incorrectly.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Back to Home
        </Link>
        <Link
          href="/tutors"
          className="border dark:border-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          Browse Tutors
        </Link>
      </div>
    </div>
  );
}