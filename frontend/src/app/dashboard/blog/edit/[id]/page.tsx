"use client";
import { useParams } from "next/navigation";

export default function BlogEditPage() {
  const params = useParams();
  console.log(params);
  return <div>Edit Blog ID: {params.id}</div>;
}
