const testimonials = [
  { name: "Tanvir Rahman", batch: "HSC 26 Batch", text: "MediQueue helped me find the perfect tutor. The booking process is smooth and hassle-free." },
  { name: "Riad Ahmed", batch: "HSC 24 Batch", text: "Best platform for online tutor booking. Highly recommended for every student." },
  { name: "Rafid Khan", batch: "HSC 25 Batch", text: "I love how I can choose my own time and book sessions without any hassle." },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        What Our Students Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="border dark:border-gray-700 rounded-xl p-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">"{t.text}"</p>
            <h4 className="font-semibold text-gray-800 dark:text-white">{t.name}</h4>
            <p className="text-xs text-gray-500">{t.batch}</p>
          </div>
        ))}
      </div>
    </section>
  );
}