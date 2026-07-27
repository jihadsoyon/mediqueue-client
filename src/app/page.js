import Banner from "@/components/home/Banner";
import PopularTutors from "@/components/home/PopularTutors";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";

export const metadata = {
  title: "MediQueue | Find Your Perfect Tutor",
};

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-8">
      <Banner />
      <PopularTutors />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}