"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TagInput from "@/components/ui/TagInput";
import { useToast } from "@/hooks/use-toast";
import { Project, ProjectLink } from "@/interfaces/services/project.interface";
import { createProject } from "@/services/project";
import React, { useState } from "react";

const initialProject: Project = {
  name: "",
  description: "",
  features: [],
  liveLink: "",
  gitLink: "",
  technologies: [],
  imageUrl: "",
  imageFile: null,
  otherLinks: [],
};

export default function ProjectPage() {
  const [project, setProject] = useState<Project>(initialProject);
  const [isUpdate, setIsUpdate] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  // Features
  const handleFeatureChange = (idx: number, value: string) => {
    setProject((prev) => {
      const features = [...(prev.features || [])];
      features[idx] = value;
      return { ...prev, features };
    });
  };
  const addFeature = () => {
    setProject((prev) => ({
      ...prev,
      features: [...(prev.features || []), ""],
    }));
  };
  const removeFeature = (idx: number) => {
    setProject((prev) => {
      const features = [...(prev.features || [])];
      features.splice(idx, 1);
      return { ...prev, features };
    });
  };

  // Technologies
  const handleTechChange = (idx: number, value: string) => {
    setProject((prev) => {
      const technologies = [...(prev.technologies || [])];
      technologies[idx] = value;
      return { ...prev, technologies };
    });
  };
  const addTech = () => {
    setProject((prev) => ({
      ...prev,
      technologies: [...(prev.technologies || []), ""],
    }));
  };
  const removeTech = (idx: number) => {
    setProject((prev) => {
      const technologies = [...(prev.technologies || [])];
      technologies.splice(idx, 1);
      return { ...prev, technologies };
    });
  };

  // Other Links
  const handleOtherLinkChange = (
    idx: number,
    field: keyof ProjectLink,
    value: string
  ) => {
    setProject((prev) => {
      const otherLinks = [...(prev.otherLinks || [])];
      otherLinks[idx] = { ...otherLinks[idx], [field]: value };
      return { ...prev, otherLinks };
    });
  };
  const addOtherLink = () => {
    setProject((prev) => ({
      ...prev,
      otherLinks: [...(prev.otherLinks || []), { label: "", url: "" }],
    }));
  };
  const removeOtherLink = (idx: number) => {
    setProject((prev) => {
      const otherLinks = [...(prev.otherLinks || [])];
      otherLinks.splice(idx, 1);
      return { ...prev, otherLinks };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project.imageFile) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Please upload an image",
      });
      return;
    }
    const formData = new FormData();
    if (project.imageFile instanceof Blob) {
      formData.append("file", project.imageFile);
    }
    // Exclude imageFile from project data  
    const { imageFile,imageUrl, ...projectData } = project;
    formData.append("data", JSON.stringify(projectData));
    const res = await createProject(formData);
    console.log(res);
    if (res.statusCode === 201) {
      toast({
        title: "Success",
        description: res.message,
      });
      setProject(initialProject);
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: res.message,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">
        {isUpdate ? "Update" : "Add"} Project
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
            Project Name
          </label>
          <Input
            name="name"
            placeholder="Project Name"
            value={project.name}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            value={project.description}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 min-h-[80px] bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
        <TagInput
          value={project.features}
          onChange={(features) => setProject((prev) => ({ ...prev, features }))}
          placeholder="Add feature and press Enter"
          label="Features:"
        />
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
            Live Link (URL)
          </label>
          <Input
            name="liveLink"
            placeholder="Live Link (URL)"
            value={project.liveLink}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
            GitHub Link (URL)
          </label>
          <Input
            name="gitLink"
            placeholder="GitHub Link (URL)"
            value={project.gitLink || ""}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <TagInput
          value={project.technologies}
          onChange={(technologies) =>
            setProject((prev) => ({ ...prev, technologies }))
          }
          placeholder="Add technology and press Enter"
          label="Technologies:"
        />
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
            Project Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setProject((prev) => ({
                  ...prev,
                  imageUrl: URL.createObjectURL(file),
                  imageFile: file,
                }));
              }
            }}
            className="mb-2 w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold fill-gray-800 file:text-black hover:file:bg-primary/90"
          />
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border mb-2"
            />
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
            Other Links
          </label>
          {project.otherLinks &&
            project.otherLinks.map((link, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={link.label}
                  onChange={(e) =>
                    handleOtherLinkChange(idx, "label", e.target.value)
                  }
                  placeholder="Label"
                  className="w-1/3"
                />
                <Input
                  value={link.url}
                  onChange={(e) =>
                    handleOtherLinkChange(idx, "url", e.target.value)
                  }
                  placeholder="URL"
                  className="w-2/3"
                />
                <Button
                  type="button"
                  onClick={() => removeOtherLink(idx)}
                  variant="destructive"
                  className="ml-2"
                >
                  Remove
                </Button>
              </div>
            ))}
          <Button type="button" onClick={addOtherLink} variant="secondary">
            Add Link
          </Button>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-400 py-3 text-lg font-semibold rounded"
          variant="default"
        >
          {isUpdate ? "Update" : "Add"} Project
        </Button>
      </form>
    </div>
  );
}
