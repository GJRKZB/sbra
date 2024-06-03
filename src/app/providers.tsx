"use client";

import { NextUIProvider } from "@nextui-org/react";
import NavbarComponent from "./components/navbar/navbar";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noNavbar = pathname === "/auth/login" || pathname === "/auth/register";

  return (
    <NextUIProvider>
      {!noNavbar && <NavbarComponent />}
      {children}
    </NextUIProvider>
  );
}
