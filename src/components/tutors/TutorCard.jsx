import Link from "next/link";

export default function TutorCard({ tutor }) {
  return (
    <div className="border dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition bg-white dark:bg-gray-800  ">
      <img
        src={tutor.photoURL}
        alt={tutor.tutorName}
        className="w-full h-48 object-center"
      />
      <div className="p-5">
        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
          {tutor.tutorName}
        </h3>
        <p className="text-sm text-gray-500">{tutor.subject}</p>
        <p className="text-sm text-gray-500 mt-1">
          Available: {tutor.availableDays}, {tutor.availableTime}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-green-600 font-semibold">৳ {tutor.hourlyFee} / hour</span>
        </div>
        <Link
          href={`/tutors/${tutor._id}`}
          className="mt-4 block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
        >
          Book Session
        </Link>
      </div>
    </div>
  );
}