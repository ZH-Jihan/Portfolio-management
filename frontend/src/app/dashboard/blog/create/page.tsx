"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { BlogPost } from "@/interfaces/services/blog.interface";
import { createBlog } from "@/services/blog";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const initialBlogPost: BlogPost = {
  title: "",
  content: "",
  author: "",
  tags: [],
  image: [],
};

export default function BlogPage() {
  const [blogPost, setBlogPost] = useState<BlogPost>(initialBlogPost);
  const [isUpdate, setIsUpdate] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBlogPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlogPost((prev) => ({
      ...prev,
      image: e.target.value.split(",").map((img) => img.trim()),
    }));
  };

  const handleContentChange = (value: string) => {
    setBlogPost((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createBlog(blogPost);
    console.log(res);
    if (res.statusCode === 201) {
      toast({
        title: "Success",
        description: res.message,
      });
      setBlogPost(initialBlogPost);
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
        {isUpdate ? "Update" : "Create"} Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="title"
          placeholder="Title"
          value={blogPost.title}
          onChange={handleChange}
          required
        />
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <ReactQuill
            value={blogPost.content}
            onChange={handleContentChange}
            theme="snow"
            placeholder="Write your blog content here..."
          />
        </div>
        <Input
          name="author"
          placeholder="Author"
          value={blogPost.author}
          onChange={handleChange}
          required
        />
        <Input
          name="tags"
          placeholder="Tags (comma separated)"
          value={blogPost.tags?.join(", ") || ""}
          onChange={handleTagsChange}
        />
        <Input
          name="image"
          placeholder="Image URLs (comma separated)"
          value={blogPost.image?.join(", ") || ""}
          onChange={handleImagesChange}
        />
        <Button type="submit">{isUpdate ? "Update" : "Create"} Post</Button>
      </form>
    </div>
  );
}
