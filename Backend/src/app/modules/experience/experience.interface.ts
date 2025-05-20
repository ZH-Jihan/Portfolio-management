export type TExperience = {
  id: string;
  title: string; // e.g., "PS Of Consultant"
  company: string; // e.g., "Abul Khair Group"
  location: string; // e.g., "Road-93, Gulshan 2, Dhaka"
  startDate: string; // e.g., Feb 2021
  endDate: Date | string; // e.g., Feb 2025 or "Present"
  responsibilties: string[]; // List of duty responsibilities
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
