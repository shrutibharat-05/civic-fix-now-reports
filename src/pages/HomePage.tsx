
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Stats from '@/components/home/Stats';

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <Stats />
      <Features />
    </Layout>
  );
};

export default HomePage;
