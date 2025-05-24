import { Experience } from "@/interfaces/services/experience.interface";
import { API_BASE_URL } from "@/lib/api";
import { token } from "../auth";

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

// Fetch all experiences
export const getAllExperiences = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/experience`, {
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
