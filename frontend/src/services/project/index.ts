import { API_BASE_URL } from "@/lib/api";
import { token } from "../auth";

// Create a new project
export const createProject = async (project: FormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/project`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
      body: project,
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
