import React, { useState } from 'react';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import ViewIcon from '../../assets/icons/View.svg';
import DeleteIcon from '../../assets/icons/Delete.svg';
import styles from './KnowledgeHub.module.css';

const KnowledgeHub = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Mock Data
  const [data, setData] = useState([
    { id: 1, sno: '01', sourceName: 'Supply Chain Risk Articles', category: 'Regulatory Documents', createdDate: '12 Jan 2025' },
    { id: 2, sno: '02', sourceName: 'Supply Chain', category: 'Internal Legal Documents', createdDate: '10 Jan 2025' },
    { id: 3, sno: '03', sourceName: 'Market News', category: 'Internal Legal Documents', createdDate: '08 Jan 2025' },
  ]);

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const columns = [
    { 
      key: 'sno', 
      title: 'S.NO', 
      width: '80px',
      sortable: true 
    },
    { 
      key: 'sourceName', 
      title: 'Source Name', 
      sortable: true 
    },
    { 
      key: 'category', 
      title: 'Category', 
      sortable: true 
    },
    { 
      key: 'createdDate', 
      title: 'Created Date', 
      sortable: true 
    },
    {
      key: 'action',
      title: 'Action',
      align: 'right',
      render: (row) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className={styles.viewBtn}>
            <img src={ViewIcon} alt="View" className={styles.icon} />
            View
          </button>
          <button className={styles.deleteBtn}>
            <img src={DeleteIcon} alt="Delete" className={styles.icon} />
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Knowledge Hub</h1>
          <p className={styles.subtitle}>Upload, store, and manage all related documents in one place.</p>
        </div>
        <div className={styles.actionSection}>
          <Button 
            variant="primary" 
            onClick={() => console.log('Add New Source')}
            color="#EE202E"
            icon={<span>+</span>}
          >
            Add New Source
          </Button>
        </div>
      </header>

      <Table 
        columns={columns} 
        data={data} 
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default KnowledgeHub;
