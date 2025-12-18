import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './KnowledgeHub.module.css';

const fetchKnowledgeHubData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { message: 'Knowledge Hub Page' };
};

const KnowledgeHub = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['knowledgeHub'],
    queryFn: fetchKnowledgeHubData
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Knowledge Hub</h1>
      <p className={styles.description}>{data?.message}</p>
    </div>
  );
};

export default KnowledgeHub;

