import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './AdminPanel.module.css';

const fetchAdminPanelData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { message: 'Admin Panel Page' };
};

const AdminPanel = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['adminPanel'],
    queryFn: fetchAdminPanelData
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Panel</h1>
      <p className={styles.description}>{data?.message}</p>
    </div>
  );
};

export default AdminPanel;

