import { BlogPost } from "@/interfaces/services/blog.interface";
import { API_BASE_URL } from "@/lib/api";
import { token } from "../auth";

// Create a new blog
export const createBlog = async (blog: BlogPost) => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token()}`,
      },
      body: JSON.stringify(blog),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

// Fetch all blogs
export const getAllBlogs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog`, {
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
