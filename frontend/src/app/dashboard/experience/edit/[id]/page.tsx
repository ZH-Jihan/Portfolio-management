"use client";
import { useParams } from "next/navigation";

export default function ExperienceEditPage() {
  const params = useParams();
  return <div>Edit Experience ID: {params.id}</div>;
}
