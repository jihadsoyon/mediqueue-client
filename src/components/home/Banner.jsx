"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Find the Perfect Tutor & Book Your Learning Session",
    subtitle:
      "Connect with expert tutors, explore subjects you love, and achieve your academic goals with ease.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Learn from Verified & Experienced Tutors",
    subtitle:
      "Every tutor on MediQueue is vetted for subject expertise and teaching experience.",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Flexible Scheduling That Fits Your Life",
    subtitle: "Book sessions around your own timetable — no more scheduling conflicts.",
    image:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1600&q=80",
  },
];

export default function Banner() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop
      className="rounded-2xl overflow-hidden"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div
            className="relative w-full min-h-[420px] md:min-h-[480px] flex items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* dark/green gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/10" />

            <div className="relative z-10 px-8 md:px-16 py-16 max-w-2xl flex flex-col items-start gap-5">
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {slide.title}
              </h1>
              <p className="text-gray-200 text-lg">{slide.subtitle}</p>
              <Link
                href="/tutors"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Browse Tutors
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}