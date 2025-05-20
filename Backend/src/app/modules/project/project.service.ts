import QueryBuilder from '../../build/quaryBuilder';
import { uploadImgToCloudinary } from '../../middlewares/uploadImgToCloudinary';
import { TProject } from './project.interface';
import { Project } from './project.model';

const postProjectInDb = async (file: any, payload: TProject) => {
  const result = await uploadImgToCloudinary(file.path, file.originalname);
  payload.imageUrl = result.secure_url as string;

  const project = await Project.create(payload);
  return project;
};

const getAllProjectsFromDb = async () => {
  const projects = new QueryBuilder(Project.find(), {})
    .filter()
    .sort()
    .fields()
    .paginate();
  const projectsData = await projects.queryModel;
  return projectsData;
};

const getProjectByIdFromDb = async (id: string) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

const updateProjectInDb = async (
  id: string,
  file: any,
  payload: Partial<TProject>,
) => {
  let imageUrl;
  if (file) {
    const result = await uploadImgToCloudinary(file.path, file.originalname);
    imageUrl = result.secure_url as string;
  }
  const project = await Project.findByIdAndUpdate(
    id,
    { ...payload, imageUrl },
    { new: true },
  );
  return project;
};

const deleteProjectInDb = async (id: string) => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

export const projectService = {
  postProjectInDb,
  getAllProjectsFromDb,
  getProjectByIdFromDb,
  updateProjectInDb,
  deleteProjectInDb,
};
