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

// Fetch all projects
export const getAllProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/project`, {
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

// delete project
export const deleteProject = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/project/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await token()}`,
      },
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};