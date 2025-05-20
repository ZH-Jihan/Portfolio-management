export type TProject = {
  name: string;
  description: string;
  features: string[];
  liveLink: string;
  gitLink?: string;
  technologies: string[];
  imageUrl: string;
  otherLinks?: { label: string; url: string }[];
};
