import "./globals.css";
import Providers from "@/providers/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "MediQueue | Find Your Perfect Tutor",
  description: "Book online tutor sessions with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-300px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}