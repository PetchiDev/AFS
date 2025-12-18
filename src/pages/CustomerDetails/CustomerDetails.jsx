import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './CustomerDetails.module.css';

const fetchCustomerDetailsData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { message: 'Customer Details Page' };
};

const CustomerDetails = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['customerDetails'],
    queryFn: fetchCustomerDetailsData
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customer Details</h1>
      <p className={styles.description}>{data?.message}</p>
    </div>
  );
};

export default CustomerDetails;

