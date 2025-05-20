import { BlogPost } from "@/interfaces/services/blog.interface";
import { API_BASE_URL } from "@/lib/api";
import { token } from "../auth";
import { Experience } from "@/interfaces/services/experience.interface";

// Create a new experience
export const createExperience = async (experience: Experience) => {
  try {
    const response = await fetch(`${API_BASE_URL}/experience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
      body: JSON.stringify(experience),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
