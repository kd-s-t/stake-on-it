import Head from 'next/head';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from './layout/Header';
import Content from './layout/Content';
import { useLayout } from './layout/hooks';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useLayout();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Header />
        <Content>{children}</Content>
      </motion.div>
    </>
  );
}