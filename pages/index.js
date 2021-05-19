import { Fragment } from 'react';
import Head from 'next/head';

import Hero from '../components/home/hero';
import FeaturedPosts from '../components/home/featured-posts';
import { getFeaturedPosts } from '../helpers/posts-util';

const HomePage = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>Duy&apos;s Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  );
};

export const getStaticProps = () => {
  const posts = getFeaturedPosts();

  return {
    props: {
      posts
    }
  };
};

export default HomePage;
