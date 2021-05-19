import { Fragment } from 'react';
import Head from 'next/head';

import PostContent from '../../components/posts/post-detail/post-content';
import { getPostFiles, getPostData } from '../../helpers/posts-util';

const PostPage = ({ post }) => {
  const { title, excerpt } = post;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
};

export const getStaticPaths = () => {
  const postFileNames = getPostFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

  const paths = slugs.map((slug) => ({
    params: {
      slug
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = (context) => {
  const { params } = context;
  const { slug } = params;

  const post = getPostData(slug);

  return {
    props: {
      post
    },
    revalidate: 600
  };
};

export default PostPage;
