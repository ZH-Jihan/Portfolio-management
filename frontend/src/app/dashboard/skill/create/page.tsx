"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Skill } from "@/interfaces/services/skill.interface";
import { createSkill } from "@/services/skill";
import { useState } from "react";

const initialSkill: Skill = {
  name: "",
  level: "Beginner",
  yearsOfExperience: 0,
};

export default function SkillPage() {
  const [skill, setSkill] = useState<Skill>(initialSkill);
  const [isUpdate, setIsUpdate] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSkill((prev) => ({
      ...prev,
      [name]: name === "yearsOfExperience" ? Number(value) : value,
    }));
  };

  const handleLevelChange = (value: string) => {
    setSkill((prev) => ({ ...prev, level: value as Skill["level"] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createSkill(skill);
    if (res.statusCode === 201) {
      toast({
        title: "Success",
        description: res.message,
      });
      setSkill(initialSkill);
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: res.message,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Create New Skill</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Skill Name</label>
          <Input
            name="name"
            value={skill.name}
            onChange={handleChange}
            required
            placeholder="e.g. JavaScript"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Level</label>
          <Select value={skill.level} onValueChange={handleLevelChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Years of Experience</label>
          <Input
            name="yearsOfExperience"
            type="number"
            min={0}
            value={skill.yearsOfExperience}
            onChange={handleChange}
            required
            placeholder="e.g. 3"
          />
        </div>
        <Button type="submit" className="w-full">
          Create Skill
        </Button>
      </form>
    </div>
  );
}
