import { Schema, model } from 'mongoose';
import { TProject } from './project.interface';

const ProjectSchema = new Schema<TProject>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    features: { type: [String], required: true },
    liveLink: { type: String, required: true },
    gitLink: { type: String },
    technologies: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    otherLinks: [
      {
        label: { type: String },
        url: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Project = model<TProject>('Project', ProjectSchema);
