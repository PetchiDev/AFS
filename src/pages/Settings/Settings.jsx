import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './Settings.module.css';

const fetchSettingsData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { message: 'Settings Page' };
};

const Settings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettingsData
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.description}>{data?.message}</p>
    </div>
  );
};

export default Settings;

