import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './AttorneyDirectory.module.css';

const fetchAttorneyDirectoryData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { message: 'Attorney Directory Page' };
};

const AttorneyDirectory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['attorneyDirectory'],
    queryFn: fetchAttorneyDirectoryData
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Attorney Directory</h1>
      <p className={styles.description}>{data?.message}</p>
    </div>
  );
};

export default AttorneyDirectory;

