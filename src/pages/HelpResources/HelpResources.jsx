import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './HelpResources.module.css';

const fetchHelpResourcesData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { message: 'Help & Resources Page' };
};

const HelpResources = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['helpResources'],
    queryFn: fetchHelpResourcesData
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Help & Resources</h1>
      <p className={styles.description}>{data?.message}</p>
    </div>
  );
};

export default HelpResources;

