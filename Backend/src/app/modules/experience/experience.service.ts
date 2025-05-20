import QueryBuilder from '../../build/quaryBuilder';
import { TExperience } from './experience.interface';
import { Experience } from './experience.model';

const postExperienceInDb = async (payload: TExperience) => {
  const experience = await Experience.create(payload);
  return experience;
};

const getAllExperienceFromDb = async () => {
  const experience = new QueryBuilder(Experience.find(), {})
    .filter()
    .sort()
    .fields()
    .paginate();
  const experienceData = await experience.queryModel;
  return experienceData;
};

const getExperienceByIdFromDb = async (id: string) => {
  const experience = await Experience.findById(id);
  return experience;
};

const updateExperienceInDb = async (
  id: string,
  payload: Partial<TExperience>,
) => {
  const experience = await Experience.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return experience;
};

const deleteExperienceInDb = async (id: string) => {
  const experience = await Experience.findByIdAndDelete(id);
  return experience;
};

export const experienceService = {
  postExperienceInDb,
  getAllExperienceFromDb,
  getExperienceByIdFromDb,
  updateExperienceInDb,
  deleteExperienceInDb,
};
