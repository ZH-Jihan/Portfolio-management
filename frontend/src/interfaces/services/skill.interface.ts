export interface Skill {
  id?: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  yearsOfExperience: number;
}
