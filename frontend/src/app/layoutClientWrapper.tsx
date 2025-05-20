"use client";
import Header from "@/components/header";
import { usePathname } from "next/navigation";
import React from "react";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Header />}
      <main className={isDashboard ? "flex-1" : "flex-1"}>
        {children}
      </main>
    </>
  );
}
