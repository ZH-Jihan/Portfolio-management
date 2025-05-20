"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Project, ProjectLink } from "@/interfaces/services/project.interface";
import { createProject } from "@/services/project";
import React, { useState } from "react";

const initialProject: Project = {
  name: "",
  description: "",
  features: [""],
  liveLink: "",
  gitLink: "",
  technologies: [""],
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
    const formData = new FormData();
    formData.append("file", project.imageFile as Blob);
    // Exclude imageFile from project data
    const { imageFile, ...projectData } = project;
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
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {isUpdate ? "Update" : "Add"} Project
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Project Name"
          value={project.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={project.description}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 min-h-[80px]"
        />
        <div>
          <label className="block mb-1 font-medium">Features</label>
          {project.features.map((feature, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(idx, e.target.value)}
                placeholder={`Feature #${idx + 1}`}
                required
              />
              {project.features.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeFeature(idx)}
                  variant="destructive"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addFeature} variant="secondary">
            Add Feature
          </Button>
        </div>
        <Input
          name="liveLink"
          placeholder="Live Link (URL)"
          value={project.liveLink}
          onChange={handleChange}
          required
        />
        <Input
          name="gitLink"
          placeholder="GitHub Link (URL)"
          value={project.gitLink || ""}
          onChange={handleChange}
        />
        <div>
          <label className="block mb-1 font-medium">Technologies</label>
          {project.technologies.map((tech, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <Input
                value={tech}
                onChange={(e) => handleTechChange(idx, e.target.value)}
                placeholder={`Technology #${idx + 1}`}
                required
              />
              {project.technologies.length > 1 && (
                <Button
                  type="button"
                  onClick={() => removeTech(idx)}
                  variant="destructive"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button type="button" onClick={addTech} variant="secondary">
            Add Technology
          </Button>
        </div>
        <div>
          <label className="block mb-1 font-medium">Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setProject((prev) => ({
                  ...prev,
                  imageUrl: URL.createObjectURL(file), // for preview
                  imageFile: file, // store file for FormData
                }));
              }
            }}
            className="mb-2"
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
          <label className="block mb-1 font-medium">Other Links</label>
          {project.otherLinks &&
            project.otherLinks.map((link, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <Input
                  value={link.label}
                  onChange={(e) =>
                    handleOtherLinkChange(idx, "label", e.target.value)
                  }
                  placeholder="Label"
                />
                <Input
                  value={link.url}
                  onChange={(e) =>
                    handleOtherLinkChange(idx, "url", e.target.value)
                  }
                  placeholder="URL"
                />
                <Button
                  type="button"
                  onClick={() => removeOtherLink(idx)}
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            ))}
          <Button type="button" onClick={addOtherLink} variant="secondary">
            Add Link
          </Button>
        </div>
        <Button type="submit">{isUpdate ? "Update" : "Add"} Project</Button>
      </form>
    </div>
  );
}
