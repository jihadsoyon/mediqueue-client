"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    title: "Find the Perfect Tutor & Book Your Learning Session",
    subtitle: "Connect with expert tutors, explore subjects you love, and achieve your academic goals with ease.",
  },
  {
    title: "Learn from Verified & Experienced Tutors",
    subtitle: "Every tutor on MediQueue is vetted for subject expertise and teaching experience.",
  },
  {
    title: "Flexible Scheduling That Fits Your Life",
    subtitle: "Book sessions around your own timetable — no more scheduling conflicts.",
  },
];

export default function Banner() {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4500 }}
      pagination={{ clickable: true }}
      loop
      className="rounded-2xl"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div className="bg-green-50 dark:bg-gray-800 rounded-2xl px-8 py-16 md:py-24 flex flex-col items-start gap-5 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
              {slide.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {slide.subtitle}
            </p>
            <Link
              href="/tutors"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Browse Tutors
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}