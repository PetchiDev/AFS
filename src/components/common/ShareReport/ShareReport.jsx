
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { fetchShareLink } from '@/services/report.service';
import Button from '@/components/common/Button';
import CopyIcon from '@/assets/icons/Copy.svg';
import styles from './ShareReport.module.css';

const ShareReport = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Fetch share link using TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['shareLink'],
    queryFn: fetchShareLink,
    enabled: isOpen, // Only fetch when modal is open
    staleTime: Infinity // Keep the link fresh once fetched
  });

  const handleCopy = () => {
    if (data?.link) {
      navigator.clipboard.writeText(data.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
            <h2 className={styles.title}>Share Report</h2>
             <button className={styles.closeIconBtn} onClick={onClose} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
             </button>
        </div>
        <p className={styles.subtitle}>Share this analysis with colleagues in your organization.</p>

        <div className={styles.inputGroup}>
            <label className={styles.label}>Secure Link</label>
            <div className={styles.inputWrapper}>
                <input 
                    type="text" 
                    value={data?.link || (isLoading ? 'Loading...' : '')} 
                    readOnly 
                    className={styles.input}
                />
                <button className={styles.copyButton} onClick={handleCopy}>
                    <img src={CopyIcon} alt="Copy" style={{ width: 16, height: 16 }} />
                    {copied ? 'Copied!' : 'Copy Link'}
                </button>
            </div>
        </div>

        <div className={styles.footer}>
            <Button 
                variant="white" 
                onClick={onClose}
                className={styles.closeButton}
            >
                Close
            </Button>
        </div>
      </div>
    </div>
  );
};

ShareReport.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ShareReport;
