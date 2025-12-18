import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './Reports.module.css';

const fetchReportsData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { message: 'Reports Page' };
};

const Reports = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReportsData
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reports</h1>
      <p className={styles.description}>{data?.message}</p>
    </div>
  );
};

export default Reports;

