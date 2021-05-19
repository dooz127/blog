import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts');

export const getPostData = (postIdentifier) => {
  const slug = postIdentifier.replace(/\.md$/, '');
  const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const postData = {
    slug,
    ...data,
    content
  };

  return postData;
};

export const getPostFiles = () => {
  return fs.readdirSync(POSTS_DIRECTORY);
};

export const getAllPosts = () => {
  const files = getPostFiles();

  const allPosts = files.map((file) => getPostData(file));

  const sortedPaths = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return sortedPaths;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
};
