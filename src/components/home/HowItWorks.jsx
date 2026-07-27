const steps = [
  { title: "1. Find a Tutor", desc: "Browse tutors by subject and availability." },
  { title: "2. Book a Session", desc: "Choose your preferred time slot and book instantly." },
  { title: "3. Get Your Token", desc: "Receive a digital session token after confirmation." },
  { title: "4. Start Learning", desc: "Join your session and start learning." },
];

export default function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div key={idx} className="text-center border dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-semibold text-green-600 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}