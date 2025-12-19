import React, { useState, useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ROUTES } from '@/config/constants';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import InputField from '@/components/common/InputField';
import styles from './AttorneyDirectory.module.css';

import { MOCK_ATTORNEYS } from '@/data/mockAttorneys';

const PRACTICE_AREAS = [
  { label: 'All Practice Areas', value: '' },
  { label: 'Corporate', value: 'Corporate' },
  { label: 'Litigation', value: 'Litigation' },
  { label: 'Employment', value: 'Employment' },
  { label: 'IP', value: 'IP' },
  { label: 'Compliance', value: 'Compliance' }
];

const ROLES = [
  { label: 'All Roles', value: '' },
  { label: 'Partner', value: 'Partner' },
  { label: 'Senior Associate', value: 'Senior Associate' },
  { label: 'Associate', value: 'Associate' },
  { label: 'Counsel', value: 'Counsel' }
];

const SORT_OPTIONS = [
  { label: 'Name A-Z', value: 'name_asc' },
  { label: 'Name Z-A', value: 'name_desc' },
  { label: 'Seniority (High-Low)', value: 'matters_desc' }
];

// Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L16.65 16.65" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExportIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 16V17C4 17.7956 4.31607 18.5587 4.87868 19.1213C5.44129 19.6839 6.20435 20 7 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 8L12 12L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ImportIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 16V17C4 17.7956 4.31607 18.5587 4.87868 19.1213C5.44129 19.6839 6.20435 20 7 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7956 20 17V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 8L12 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AttorneyDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPractice, setSelectedPractice] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [sortBy, setSortBy] = useState('name_asc');

  const navigate = useNavigate();

  // Filter Logic
  const filteredAttorneys = useMemo(() => {
    return MOCK_ATTORNEYS.filter(attorney => {
      const matchSearch = attorney.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          attorney.practiceArea.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPractice = selectedPractice ? attorney.practiceArea === selectedPractice : true;
      const matchRole = selectedRole ? attorney.role === selectedRole : true;
      
      return matchSearch && matchPractice && matchRole;
    }).sort((a, b) => {
      if (sortBy === 'name_asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'name_desc') {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === 'matters_desc') {
        return b.pastMatters - a.pastMatters;
      }
      return 0;
    });
  }, [searchQuery, selectedPractice, selectedRole, sortBy]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePracticeChange = (option) => {
    setSelectedPractice(option.target.value);
  };

  const handleRoleChange = (option) => {
    setSelectedRole(option.target.value);
  };

  const handleSortChange = (option) => {
    setSortBy(option.target.value);
  };

  const handleViewProfile = (attorneyId) => {
    navigate({ to: ROUTES.ATTORNEY_PROFILE.replace('$attorneyId', attorneyId) });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Attorney Directory</h1>
          <p className={styles.description}>Browse and filter internal attorneys by practice area, expertise, or seniority.</p>
        </div>
        <div className={styles.actions}>
          <Button variant="danger" icon={<PlusIcon />}>Add Attorney</Button>
          <Button variant="white" icon={<ExportIcon />}>Export</Button>
          <Button variant="white" icon={<ImportIcon />}>Import</Button>
        </div>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.searchContainer}>
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
                <SearchIcon />
            </div>
            <InputField 
                placeholder="Search attorney..." 
                value={searchQuery}
                onChange={handleSearchChange}
                width="100%"
                className={styles.searchInput}
            />
        </div>
        
        <div className={styles.filterDropdown}>
          <Dropdown 
            options={PRACTICE_AREAS} 
            value={selectedPractice} 
            onChange={handlePracticeChange} 
            placeholder="All Practice Areas"
            backgroundColor="transparent"
            border="none"
          />
        </div>

        <div className={styles.filterDropdown}>
          <Dropdown 
            options={ROLES} 
            value={selectedRole} 
            onChange={handleRoleChange} 
            placeholder="All Roles"
            backgroundColor="transparent"
            border="none"
          />
        </div>

        <div className={styles.filterDropdown}>
           <Dropdown 
            options={SORT_OPTIONS} 
            value={sortBy} 
            onChange={handleSortChange}
            placeholder="Sort By" 
            backgroundColor="transparent"
            border="none"
           />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredAttorneys.map(attorney => (
          <div key={attorney.id} className={styles.card}>
            <div className={styles.avatar}>
              {attorney.initials}
            </div>
            <h3 className={styles.name}>{attorney.name}</h3>
            <p className={styles.role}>{attorney.role} – {attorney.practiceArea}</p>
            
            <div className={styles.details}>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Expertise:</span>
                    <span className={styles.detailValue}>{attorney.expertise.join(', ')}</span>
                </div>
                <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Past Matters:</span>
                    <span className={styles.detailValue}>{attorney.pastMatters}</span>
                </div>
            </div>

            <button 
                className={styles.viewProfileButton}
                onClick={() => handleViewProfile(attorney.id)}
            >
                View Profile
            </button>
          </div>
        ))}
        {filteredAttorneys.length === 0 && (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666'}}>
                No attorneys found matching your filters.
            </div>
        )}
      </div>
    </div>
  );
};

export default AttorneyDirectory;
