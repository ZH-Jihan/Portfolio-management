import { Schema, model } from 'mongoose';
import { TSkill } from './skill.interface';

const SkillSchema = new Schema<TSkill>({
  name: { type: String, required: true },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  yearsOfExperience: { type: Number, required: true },
});

export const Skill = model<TSkill>('Skill', SkillSchema);
