import React from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import Button from '@/components/common/Button';
import { MOCK_ATTORNEYS } from '@/data/mockAttorneys';
import { ROUTES } from '@/config/constants';
import styles from './AttorneyProfile.module.css';

// Reuse EmailIcon from AttorneyDirectory or create new if not exported
const EmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const PhoneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92V19.92C22.0011 20.1986 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2137 21.3521 21.402C21.1468 21.5902 20.9046 21.7336 20.6407 21.8228C20.3769 21.912 20.0974 21.9452 19.82 21.92C16.7428 21.5857 13.787 20.5342 11.19 18.85C8.77382 17.2436 6.72533 15.1951 5.11999 12.7799C3.43398 10.1802 2.38114 7.22165 2.04999 4.13999C2.02462 3.86241 2.05786 3.5828 2.14725 3.31899C2.23664 3.05518 2.38012 2.81308 2.56828 2.60799C2.75644 2.40291 2.98502 2.23946 3.23992 2.12814C3.49481 2.01682 3.77026 1.95999 4.04999 1.95999H7.04999C7.54924 1.9562 8.03173 2.13702 8.40696 2.46875C8.78219 2.80047 9.02986 3.26496 9.10999 3.77999C9.25997 4.90806 9.53503 6.01569 9.92999 7.08999C10.0526 7.42065 10.0768 7.77884 9.99967 8.12128C9.92257 8.46372 9.74737 8.77589 9.49999 9.01999L8.22999 10.29C9.65345 12.7937 11.7263 14.8665 14.23 16.29L15.5 15.02C15.7441 14.7726 16.0563 14.5974 16.3987 14.5203C16.7411 14.4432 17.0993 14.4674 17.43 14.59C18.5043 14.985 19.6119 15.26 20.74 15.41C21.2588 15.4897 21.7265 15.7388 22.0597 16.1167C22.3929 16.4946 22.5735 16.9814 22.57 17.48V16.92H22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const LocationIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ArrowLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DraftEmailIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AttorneyProfile = () => {
  const { attorneyId } = useParams({ from: ROUTES.ATTORNEY_PROFILE });
  const navigate = useNavigate();
  
  const attorney = MOCK_ATTORNEYS.find(a => a.id === parseInt(attorneyId));

  if (!attorney) {
    return (
        <div className={styles.container}>
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                Attorney not found.
                <button 
                  onClick={() => navigate({ to: ROUTES.ATTORNEY_DIRECTORY })}
                  style={{ display: 'block', margin: '20px auto', color: '#EE202E', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Back to Directory
                </button>
            </div>
        </div>
    );
  }

  const handleBack = () => {
    navigate({ to: ROUTES.ATTORNEY_DIRECTORY });
  };

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.backLink}>
        <ArrowLeftIcon /> Back to Directory
      </button>

      <h1 className={styles.pageTitle}>Attorney Profile</h1>

      <div className={styles.layout}>
        <div className={styles.mainContent}>
          {/* Profile Header Card */}
          <div className={styles.profileCard}>
            <div className={styles.avatar}>
              {attorney.initials}
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.name}>{attorney.name}</h2>
              <p className={styles.role}>{attorney.role}, {attorney.practiceArea}</p>
              
              <Button 
                variant="danger" 
                icon={<DraftEmailIcon />}
                onClick={() => console.log('Draft Email')}
              >
                Draft Email
              </Button>
            </div>
          </div>

          {/* About Card */}
          <div className={styles.aboutCard}>
            <h3 className={styles.cardTitle}>About</h3>
            <p className={styles.aboutText}>{attorney.about}</p>
          </div>
        </div>

        <div className={styles.sidebar}>
          {/* Practice Area Card */}
          <div className={styles.sidebarCard}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Practice Area</h3>
              <p className={styles.sectionValue}>{attorney.practiceArea}</p>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Expertise</h3>
              <div className={styles.tags}>
                {attorney.expertise.map(skill => (
                  <span key={skill} className={styles.tag}>{skill}</span>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Past Matters</h3>
              <p className={styles.pastMattersCount}>{attorney.pastMatters}</p>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.cardTitle}>Contact Information</h3>
            <div className={styles.contactItem}>
              <div className={styles.icon}><EmailIcon /></div>
              <span>{attorney.email}</span>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.icon}><PhoneIcon /></div>
              <span>{attorney.phone}</span>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.icon}><LocationIcon /></div>
              <span>{attorney.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttorneyProfile;
