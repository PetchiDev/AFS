import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import InputField from '@/components/common/InputField';
import ShareReport from '@/components/common/ShareReport/ShareReport';
import { COLORS } from '@/config/constants';
import styles from './ReportView.module.css';

import EmailDraftsIcon from '@/assets/icons/EmailDrafts.svg';
import PersonIcon from '@/assets/icons/Person.svg';
import CopyIcon from '@/assets/icons/Copy.svg';

const ReportView = ({ 
    analysisResult, 
    companyName, 
    practiceArea, 
    onBack 
}) => {
    const reportRef = useRef(null);
    const emailDraftRef = useRef(null);
    const [showEmailDraft, setShowEmailDraft] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    
    // Email Draft State
    const [emailSubject, setEmailSubject] = useState(`Re: Compliance risks identified for ${companyName || 'the company'}`);
    const [emailBody, setEmailBody] = useState(analysisResult?.email_template || `Hi A.K. ${companyName},

Our analysis for ${companyName} identified three key compliance-related risks:
• Environmental permit gaps
• Supplier contract exposure
• Potential employee misclassification

Based on your experience with compliance and manufacturing clients, you appear to be the best internal expert to support this matter.

Please let me know if you'd like a meeting arranged.

Regards,
John`);

    useEffect(() => {
        if (analysisResult?.email_template) {
            setEmailBody(analysisResult.email_template);
        }
    }, [analysisResult]);

    useEffect(() => {
        // Initial animation or state set
        if (!showEmailDraft) {
             gsap.set(reportRef.current, { display: 'flex', opacity: 1, x: '0%' });
             gsap.set(emailDraftRef.current, { display: 'none', opacity: 0 });
        }
    }, []);

    const handleDraftEmail = () => {
        const tl = gsap.timeline();
        
        gsap.set(emailDraftRef.current, { display: 'flex' });
        
        // Slide out report view
        tl.to(reportRef.current, {
          x: '-20%',
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(reportRef.current, { display: 'none' });
          }
        });
    
        // Slide in Email Draft container
        tl.fromTo(emailDraftRef.current,
          { x: '100%', opacity: 0 },
          { x: '0%', opacity: 1, duration: 0.6, ease: 'power2.out' },
          "-=0.2"
        );
        
        setShowEmailDraft(true);
    };

    const handleBackFromEmail = () => {
        const tl = gsap.timeline();
        
        gsap.set(reportRef.current, { display: 'flex' });
        
        tl.to(emailDraftRef.current, {
            x: '100%',
            opacity: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
            gsap.set(emailDraftRef.current, { display: 'none' });
            }
        })
        .fromTo(reportRef.current,
            { x: '-20%', opacity: 0 },
            { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' },
            "-=0.2"
        );
        
        setShowEmailDraft(false);
    };

    const handleMainBack = () => {
        if (showEmailDraft) {
            handleBackFromEmail();
        } else {
            onBack();
        }
    };

    return (
        <div className={styles.container}>
            {/* Report View */}
            <div ref={reportRef} className={styles.reportContainer} style={{ display: 'flex' }}>
                <button className={styles.backButton} onClick={onBack}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    Back
                </button>

                <div className={styles.reportHeaderCard}>
                    <div className={styles.headerTop}>
                        <div>
                            <h2 className={styles.companyTitle}>{companyName}</h2>
                            <p className={styles.practiceAreaText}>Practice Area: {practiceArea}</p>
                        </div>
                        <div className={styles.scoreContainer}>
                            <span className={styles.scoreLabel}>Confidence Score</span>
                            <span className={styles.scoreValue}>{analysisResult?.score || 92}%</span>
                        </div>
                    </div>
                    
                    <div className={styles.actionButtons}>
                        <button className={`${styles.actionButton} ${styles.primaryActionButton}`} onClick={handleDraftEmail}>
                            <img src={EmailDraftsIcon} alt="Draft Email" style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }} />
                            Draft Email
                        </button>
                        <button className={styles.actionButton} onClick={() => setIsShareModalOpen(true)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                            Share
                        </button>
                        <button className={styles.actionButton}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            PDF
                        </button>
                    </div>
                </div>

                <div className={styles.reportGrid}>
                    <div className={styles.riskCard}>
                        <h3 className={styles.sectionTitle}>Key Risk Areas</h3>
                        <ul className={styles.riskList}>
                            {analysisResult?.risks?.map((risk, index) => (
                                <li key={index} className={styles.riskItem}>
                                    <span className={styles.riskDot}></span>
                                    {risk}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.attorneyCard}>
                        <h3 className={styles.sectionTitle}>Recommended Attorney</h3>
                        <div className={styles.attorneyProfile}>
                            <div className={styles.attorneyAvatar}>{analysisResult?.attorney?.initials || 'AR'}</div>
                            <div className={styles.attorneyInfo}>
                                <h3>{analysisResult?.attorney?.name || 'A.K. Raman'}</h3>
                                <p>{analysisResult?.attorney?.title || 'Partner, Corporate'}</p>
                            </div>
                        </div>
                        
                        <Button
                            variant="secondary"
                            fullWidth={true}
                            className={styles.viewProfileButton}
                            icon={<img src={PersonIcon} alt="Profile" style={{ width: 16, height: 16 }} />}
                            onClick={() => {}}
                        >
                            View Profile
                        </Button>
                        
                        <Button
                            variant="primary"
                            fullWidth={true}
                            className={styles.draftEmailButton}
                            icon={<img src={EmailDraftsIcon} alt="Draft Email" style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }} />}
                            onClick={handleDraftEmail}
                        >
                            Draft Email
                        </Button>
                    </div>

                    <div className={styles.evidenceCard}>
                        <h3 className={styles.sectionTitle}>Supporting Evidence</h3>
                        <div className={styles.evidenceList}>
                            {analysisResult?.evidence?.map((item, index) => (
                                <div key={index} className={styles.evidenceItem}>
                                    <span>{item.label}</span>
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>[{item.action}]</a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Email Draft View */}
            <div ref={emailDraftRef} className={styles.emailDraftContainer} style={{ display: 'none' }}>
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={handleBackFromEmail}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Analysis
                    </button>
                    <h1 className={styles.title} style={{ marginTop: '16px' }}>Email Draft for: {companyName}</h1>
                    <p className={styles.subtitle}>To: {analysisResult?.attorney?.name || 'A.K. Raman'} ({analysisResult?.attorney?.title || 'Partner, Corporate'})</p>
                </div>

                <div className={styles.emailDraftContent}>
                    <Card className={styles.emailEditorCard} radius="12px">
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Subject</label>
                            <InputField
                                type="text"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
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
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                            />
                        </div>
                        
                        <div className={styles.emailActions}>
                            <button className={styles.secondaryActionButton}>
                                <img src={CopyIcon} alt="Copy" style={{ width: 20, height: 20 }} />
                                Copy Email
                            </button>
                            <button className={styles.secondaryActionButton}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                                Send via Outlook
                            </button>
                            <button className={styles.saveDraftButton}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                                <span className={styles.summaryValue}>{companyName}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Practice Area</span>
                                <span className={styles.summaryValue}>{practiceArea}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>Confidence Score</span>
                                <span className={styles.summaryValue} style={{ color: '#22C55E' }}>{analysisResult?.score || 92}%</span>
                            </div>
                        </Card>

                        <Card className={styles.sidebarCard} radius="12px">
                            <h3 className={styles.sidebarTitle}>Key Risks</h3>
                            <ul className={styles.riskList}>
                                {analysisResult?.risks?.map((risk, index) => (
                                    <li key={index} className={styles.riskItem}>
                                        <span className={styles.riskDot} style={{ backgroundColor: '#EE202E' }}></span>
                                        {risk}
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        <Card className={styles.sidebarCard} radius="12px">
                            <h3 className={styles.sidebarTitle}>Recommended Attorney</h3>
                            <div className={styles.attorneyProfile}>
                                <div className={styles.attorneyAvatar}>{analysisResult?.attorney?.initials || 'AR'}</div>
                                <div className={styles.attorneyInfo}>
                                    <h3>{analysisResult?.attorney?.name || 'A.K. Raman'}</h3>
                                    <p>{analysisResult?.attorney?.title || 'Partner, Corporate'}</p>
                                </div>
                            </div>
                            <p className={styles.pastMatters}>Past Matters: {analysisResult?.attorney?.pastMatters || 16}</p>
                            
                            <button className={styles.viewProfileLinkData} style={{ marginTop: '16px', marginBottom: 0 }}>
                                View Profile
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </Card>
                    </div>
                </div>
            </div>

            <ShareReport isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
        </div>
    );
};

export default ReportView;
