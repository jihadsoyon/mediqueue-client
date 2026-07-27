"use client";

import { HeroUIProvider } from "@heroui/react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <HeroUIProvider>
      {children}
      <Toaster position="top-center" reverseOrder={false} />
    </HeroUIProvider>
  );
}


