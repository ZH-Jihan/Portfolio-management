"use client";
import { useParams } from "next/navigation";

export default function SkillEditPage() {
  const params = useParams();
  return <div>Edit Skill ID: {params.id}</div>;
}
