import Link from "next/link";

async function getPopularTutors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutors?limit=6`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function PopularTutors() {
  const tutors = await getPopularTutors();

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Popular Tutors
        </h2>
        <Link href="/tutors" className="text-green-600 font-medium hover:underline">
          View All Tutors →
        </Link>
      </div>

      {tutors.length === 0 ? (
        <p className="text-gray-500">No tutors available yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {tutors.map((tutor) => (
            <div
              key={tutor._id}
              className="border dark:border-gray-700 rounded-xl p-4 text-center hover:shadow-lg transition"
            >
              <img
                src={tutor.photoURL}
                alt={tutor.tutorName}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
              />
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {tutor.tutorName}
              </h3>
              <p className="text-sm text-gray-500">{tutor.subject}</p>
              <p className="text-green-600 font-medium text-sm mt-1">
                ৳ {tutor.hourlyFee} / hour
              </p>
              <Link
                href={`/tutors/${tutor._id}`}
                className="mt-3 inline-block w-full bg-green-600 text-white text-sm py-2 rounded-lg hover:bg-green-700"
              >
                Book Session
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}