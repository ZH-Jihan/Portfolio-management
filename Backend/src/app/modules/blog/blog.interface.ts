export type TBlog = {
  id: string;
  title: string;
  content: string;
  author: string;
  image: string[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

