import { BlogPost } from "@/interfaces/services/blog.interface";
import { API_BASE_URL } from "@/lib/api";
import { token } from "../auth";
import { Experience } from "@/interfaces/services/experience.interface";
import { Skill } from "@/interfaces/services/skill.interface";

// Create a new skill
export const createSkill = async (skill: Skill) => {
  try {
    const response = await fetch(`${API_BASE_URL}/skill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
      body: JSON.stringify(skill),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
