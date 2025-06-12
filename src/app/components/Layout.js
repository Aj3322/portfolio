import Head from 'next/head';
import AnimatedNetBackground from './AnimatedNetBackground';

export default function Layout({ children, title, description }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      
      <AnimatedNetBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        {children}
      </div>
    </div>
  );
}