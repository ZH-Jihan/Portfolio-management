import QueryBuilder from '../../build/quaryBuilder';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const postBlogInDb = async (payload: TBlog) => {
  const blog = await Blog.create(payload);
  return blog;
};

const getAllBlogsFromDb = async () => {
  const blogs = new QueryBuilder(Blog.find(), {})
    .filter()
    .sort()
    .fields()
    .paginate();
  const blogsData = await blogs.queryModel;
  return blogsData;
};

const getBlogByIdFromDb = async (id: string) => {
  const blog = await Blog.findById(id);
  return blog;
};

const updateBlogInDb = async (id: string, payload: Partial<TBlog>) => {
  const blog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return blog;
};

const deleteBlogInDb = async (id: string) => {
  const blog = await Blog.findByIdAndDelete(id);
  return blog;
};

export const blogService = {
  postBlogInDb,
  getAllBlogsFromDb,
  getBlogByIdFromDb,
  updateBlogInDb,
  deleteBlogInDb,
};
