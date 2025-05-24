export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  features: string[];
  liveLink: string;
  gitLink?: string;
  technologies: string[];
  imageUrl: string;
  imageFile: File | null;
  otherLinks?: ProjectLink[];
}
