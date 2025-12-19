import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { gsap } from 'gsap';
import styles from './EmailDrafts.module.css';
import Table from '../../components/common/Table/Table';
import Card from '../../components/common/Card/Card';
import InputField from '../../components/common/InputField/InputField';
import OpenIcon from '../../components/common/Icon/OpenIcon';

// Mock Data
const MOCK_DRAFTS = [
  {
    id: 1,
    company: 'Acme Manufacturing',
    attorney: 'A.K. Raman',
    attorneyTitle: 'Partner, Corporate',
    attorneyInitials: 'AR',
    subject: 'Compliance risks identified',
    date: 'Jan 12, 2024',
    practiceArea: 'Corporate',
    confidenceScore: 92,
    risks: ["Environmental permits", "Contract exposure", "Misclassification risk"],
    pastMatters: 16,
    body: `Hi A.K. Raman,

Our analysis for Acme Manufacturing identified three key compliance-related risks:
• Environmental permit gaps
• Supplier contract exposure
• Potential employee misclassification

Based on your experience with compliance and manufacturing clients, you appear to be the best internal expert to support this matter.

Please let me know if you'd like a meeting arranged.

Regards,
CivilVision AI`
  },
  {
    id: 2,
    company: 'Bluestone Media',
    attorney: 'Sarah Lewis',
    attorneyTitle: 'Senior Associate',
    attorneyInitials: 'SL',
    subject: 'M&A due diligence review',
    date: 'Jan 10, 2024',
    practiceArea: 'Corporate',
    confidenceScore: 88,
    risks: ["IP ownership clarity", "Employee retention risks", "Contract termination clauses"],
    pastMatters: 11,
    body: `Hi Sarah Lewis,

Our analysis for Bluestone Media regarding the upcoming M&A activity has highlighted several areas for due diligence...`
  },
  {
    id: 3,
    company: 'Orion Logistics',
    attorney: 'Ajay Rao',
    attorneyTitle: 'Partner, Litigation',
    attorneyInitials: 'AR',
    subject: 'Contract dispute analysis',
    date: 'Jan 09, 2024',
    practiceArea: 'Litigation',
    confidenceScore: 95,
    risks: ["Breach of contract", "Jurisdictional issues", "Damages validation"],
    pastMatters: 21,
    body: `Hi Ajay Rao,

Regarding the Orion Logistics contract dispute...`
  },
  {
    id: 4,
    company: 'NextGen Pharma',
    attorney: 'Emma Thompson',
    attorneyTitle: 'Partner, Compliance',
    attorneyInitials: 'ET',
    subject: 'Regulatory compliance review',
    date: 'Jan 08, 2024',
    practiceArea: 'Compliance',
    confidenceScore: 91,
    risks: ["FDA regulation changes", "Marketing compliance", "Data privacy"],
    pastMatters: 19,
    body: `Hi Emma Thompson,

New analysis indicates regulatory shifts affecting NextGen Pharma...`
  }
];

const fetchEmailDraftsData = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_DRAFTS;
};

const EmailDrafts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDraft, setSelectedDraft] = useState(null);
  
  // Refs for GSAP
  const listViewRef = useRef(null);
  const detailViewRef = useRef(null);

  const { data: drafts = [], isLoading } = useQuery({
    queryKey: ['emailDrafts'],
    queryFn: fetchEmailDraftsData,
    initialData: MOCK_DRAFTS
  });

  // Handle Search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDrafts = drafts.filter(draft =>
    draft.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    draft.attorney.toLowerCase().includes(searchTerm.toLowerCase()) ||
    draft.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation effect when selectedDraft changes
  useEffect(() => {
    if (selectedDraft) {
      const tl = gsap.timeline();
      
      // Ensure detail view is visible (flex) before animating
      gsap.set(detailViewRef.current, { 
        display: 'flex',
        opacity: 0,
        x: '100%'
      });

      // Slide out List View
      tl.to(listViewRef.current, {
        x: '-20%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(listViewRef.current, { display: 'none' });
        }
      });

      // Slide in Detail View
      tl.to(detailViewRef.current, {
        x: '0%',
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }, "-=0.2");
    }
  }, [selectedDraft]);

  const handleOpenDraft = (draft) => {
    setSelectedDraft(draft);
  };

  const handleBackToList = () => {
    const tl = gsap.timeline();

    // Ensure list view is visible
    gsap.set(listViewRef.current, { display: 'block' });

    // Slide out Detail View
    tl.to(detailViewRef.current, {
      x: '100%',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(detailViewRef.current, { display: 'none' });
        setSelectedDraft(null);
      }
    })
    .fromTo(listViewRef.current,
      { x: '-20%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' },
      "-=0.2"
    );
  };

  // Initial GSAP setup
  useEffect(() => {
    if (!selectedDraft) {
      gsap.set(listViewRef.current, { display: 'block', opacity: 1, x: '0%' });
      gsap.set(detailViewRef.current, { display: 'none', opacity: 0 });
    }
  }, []);

  const columns = [
    {
      key: 'company',
      title: 'Company',
      width: '20%'
    },
    {
      key: 'attorney',
      title: 'Attorney',
      width: '20%'
    },
    {
      key: 'subject',
      title: 'Subject',
      width: '35%'
    },
    {
      key: 'date',
      title: 'Date',
      width: '15%'
    },
    {
      key: 'action',
      title: 'Action',
      width: '10%',
      align: 'right',
      render: (row) => (
        <button 
          className={styles.actionButton} 
          onClick={() => handleOpenDraft(row)}
        >
          <OpenIcon className={styles.actionIcon} />
          <span className={styles.actionText}>Open</span>
        </button>
      )
    }
  ];

  return (
    <div className={styles.container}>
      {/* List View */}
      <div ref={listViewRef}>
        <header className={styles.header}>
          <h1 className={styles.title}>Email Drafts</h1>
          <p className={styles.description}>View and continue working on email drafts generated by AI.</p>
        </header>

        <div className={styles.searchContainer}>
          <InputField
            type="search"
            placeholder="Search drafts..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
            width="100%"
            height="44px"
          />
        </div>

        <Card className={styles.tableCard}>
          {isLoading ? (
            <div className={styles.loading}>Loading...</div>
          ) : (
            <Table columns={columns} data={filteredDrafts} />
          )}
        </Card>
      </div>

      {/* Detail View */}
      <div ref={detailViewRef} className={styles.detailContainer}>
        <button className={styles.backButton} onClick={handleBackToList}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Email Drafts
        </button>

        {selectedDraft && (
          <>
            <div className={styles.detailHeader}>
                <h1 className={styles.title}>Email Draft for: {selectedDraft.company}</h1>
                <p className={styles.detailSubtitle}>To: {selectedDraft.attorney} ({selectedDraft.attorneyTitle})</p>
            </div>

            <div className={styles.detailContent}>
                <Card className={styles.emailEditorCard} radius="12px">
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Subject</label>
                        <InputField
                            type="text"
                            value={selectedDraft.subject}
                            onChange={() => {}} 
                            className={styles.input}
                            border="1px solid #E2E8F0"
                            radius="6px"
                            height="44px"
                        />
                    </div>
                    <div className={styles.formGroup} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <label className={styles.label}>Email Body</label>
                        <textarea 
                            className={styles.textarea}
                            defaultValue={selectedDraft.body}
                        />
                    </div>
                    
                    <div className={styles.emailActions}>
                        <button className={styles.secondaryActionButton}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy Email
                        </button>
                        <button className={styles.secondaryActionButton}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                            Send via Outlook
                        </button>
                        <button className={styles.primaryActionButton}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                            Save Draft
                        </button>
                    </div>
                </Card>

                <div className={styles.sidebar}>
                    <Card className={styles.sidebarCard} radius="12px">
                        <h3 className={styles.sidebarTitle}>Company Summary</h3>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Name</span>
                            <span className={styles.summaryValue}>{selectedDraft.company}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Practice Area</span>
                            <span className={styles.summaryValue}>{selectedDraft.practiceArea}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Confidence Score</span>
                            <span className={styles.summaryValue} style={{ color: '#22C55E' }}>{selectedDraft.confidenceScore}%</span>
                        </div>
                    </Card>

                    <Card className={styles.sidebarCard} radius="12px">
                        <h3 className={styles.sidebarTitle}>Key Risks</h3>
                        <ul className={styles.riskList}>
                            {selectedDraft.risks.map((risk, index) => (
                                <li key={index} className={styles.riskItem}>
                                    <span className={styles.riskDot}></span>
                                    {risk}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card className={styles.sidebarCard} radius="12px">
                        <h3 className={styles.sidebarTitle}>Recommended Attorney</h3>
                        <div className={styles.attorneyProfile}>
                            <div className={styles.attorneyAvatar}>{selectedDraft.attorneyInitials}</div>
                            <div className={styles.attorneyInfo}>
                                <h3>{selectedDraft.attorney}</h3>
                                <p>{selectedDraft.attorneyTitle}</p>
                            </div>
                        </div>
                        <p className={styles.pastMatters}>Past Matters: {selectedDraft.pastMatters}</p>
                        
                        <button className={styles.viewProfileLinkData}>
                            View Profile
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </Card>
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default EmailDrafts;
