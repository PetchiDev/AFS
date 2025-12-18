import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './EmailDrafts.module.css';

const fetchEmailDraftsData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { message: 'Email Drafts Page' };
};

const EmailDrafts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['emailDrafts'],
    queryFn: fetchEmailDraftsData
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Email Drafts</h1>
      <p className={styles.description}>{data?.message}</p>
    </div>
  );
};

export default EmailDrafts;

