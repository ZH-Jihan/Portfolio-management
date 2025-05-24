"use client";
import { useParams } from "next/navigation";

export default function ProjectEditPage() {
  const params = useParams();
  return <div>Edit Project ID: {params.id}</div>;
}
