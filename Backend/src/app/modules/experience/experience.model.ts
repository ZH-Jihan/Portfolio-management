import { Schema, model } from 'mongoose';
import { TExperience } from './experience.interface';

const ExperienceSchema = new Schema<TExperience>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: Date || String, required: true }, // Date or "Present"
    responsibilties: { type: [String], required: true },
    tags: { type: [String] },
  },
  {
    timestamps: true,
  },
);

export const Experience = model<TExperience>('Experience', ExperienceSchema);
