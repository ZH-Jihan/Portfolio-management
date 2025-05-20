import { TSkill } from './skill.interface';
import { Skill } from './skill.model';

const postSkillInDb = async (payload: TSkill) => {
  const skill = await Skill.create(payload);
  return skill;
};
const getAllSkillsFromDb = async () => {
  const skills = await Skill.find();
  return skills;
};
const getSkillByIdFromDb = async (id: string) => {
  const skill = await Skill.findById(id);
  return skill;
}
const updateSkillInDb = async (id: string, payload: Partial<TSkill>) => {
  const skill = await Skill.findByIdAndUpdate(id, payload, {
    new: true, 
  });
  return skill;
}

export const SkillService ={
  postSkillInDb,
  getAllSkillsFromDb,
  getSkillByIdFromDb,
  updateSkillInDb,
}
