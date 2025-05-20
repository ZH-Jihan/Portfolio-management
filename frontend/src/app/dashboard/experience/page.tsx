"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Experience } from "@/interfaces/services/experience.interface";
import { createExperience } from "@/services/experience";
import React, { useState } from "react";

const initialExperience: Experience = {
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  responsibilties: [""],
  tags: [],
};

export default function ExperiencePage() {
  const [experience, setExperience] = useState<Experience>(initialExperience);
  const [isUpdate, setIsUpdate] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleResponsibilityChange = (idx: number, value: string) => {
    setExperience((prev) => {
      const responsibilties = [...(prev.responsibilties || [])];
      responsibilties[idx] = value;
      return { ...prev, responsibilties };
    });
  };

  const addResponsibility = () => {
    setExperience((prev) => ({
      ...prev,
      responsibilties: [...(prev.responsibilties || []), ""],
    }));
  };

  const removeResponsibility = (idx: number) => {
    setExperience((prev) => {
      const responsibilties = [...(prev.responsibilties || [])];
      responsibilties.splice(idx, 1);
      return { ...prev, responsibilties };
    });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperience((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExperience((prev) => ({ ...prev, endDate: value }));
  };

  const handlePresentToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setExperience((prev) => ({ ...prev, endDate: "Present" }));
    } else {
      setExperience((prev) => ({ ...prev, endDate: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createExperience(experience);
    if (res.statusCode === 201) {
      toast({
        title: "Success",
        description: res.message,
      });
      setExperience(initialExperience);
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: res.message,
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isUpdate ? "Update" : "Add"} Experience
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Title"
          value={experience.title}
          onChange={handleChange}
          required
        />
        <Input
          name="company"
          placeholder="Company"
          value={experience.company}
          onChange={handleChange}
          required
        />
        <Input
          name="location"
          placeholder="Location"
          value={experience.location}
          onChange={handleChange}
          required
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Start Date</label>
            <Input
              type="date"
              name="startDate"
              value={experience.startDate || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">End Date</label>
            <Input
              type={experience.endDate === "Present" ? "text" : "date"}
              name="endDate"
              value={experience.endDate || ""}
              onChange={handleEndDateChange}
              disabled={experience.endDate === "Present"}
              required
            />
            <label className="flex items-center gap-2 mt-1">
              <input
                type="checkbox"
                checked={experience.endDate === "Present"}
                onChange={handlePresentToggle}
              />
              Present
            </label>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Responsibilities</label>
          {experience.responsibilties.map((resp, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <Input
                value={resp}
                onChange={(e) =>
                  handleResponsibilityChange(idx, e.target.value)
                }
                placeholder={`Responsibility #${idx + 1}`}
                required
              />
              {experience.responsibilties.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeResponsibility(idx)}
                  variant="destructive"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addResponsibility} variant="secondary">
            Add Responsibility
          </Button>
        </div>
        <Input
          name="tags"
          placeholder="Tags (comma separated)"
          value={experience.tags?.join(", ") || ""}
          onChange={handleTagsChange}
        />
        <Button type="submit">{isUpdate ? "Update" : "Add"} Experience</Button>
      </form>
    </div>
  );
}
