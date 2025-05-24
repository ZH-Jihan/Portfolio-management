import { Skill } from "@/interfaces/services/skill.interface";
import { API_BASE_URL } from "@/lib/api";
import { token } from "../auth";

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

// Fetch all skills
export const getAllSkills = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/skill`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};
