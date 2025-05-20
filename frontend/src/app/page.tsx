"use client";

import { useAuth } from "@/lib/use-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else if (user) {
      setLoading(false);
    }
  }, [user, router]);

  if (user === null || loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
    </div>
  );
}
