import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import Card from '@/components/common/Card';
import InputField from '@/components/common/InputField';
import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import FileUpload from '@/components/common/FileUpload';
import { PRACTICE_AREAS, NEW_ANALYSIS, COLORS } from '@/config/constants';
import styles from './NewAnalysis.module.css';

import SearchIcon from '@/assets/icons/Search.svg';
import EmailDraftsIcon from '@/assets/icons/EmailDrafts.svg';
import PersonIcon from '@/assets/icons/Person.svg';
import ShareReport from '@/components/common/ShareReport/ShareReport';
import CopyIcon from '@/assets/icons/Copy.svg';

const NewAnalysis = () => {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const formRef = useRef(null);

  const reportRef = useRef(null);
  const emailDraftRef = useRef(null);
  
  // Initialize state from URL params
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      return {
        report: view === 'report' || view === 'email', // Report is also underlying for email view in terms of flow
        email: view === 'email'
      };
    }
    return { report: false, email: false };
  };

  const initialState = getInitialState();
  const [showReport, setShowReport] = useState(initialState.report);
  const [showEmailDraft, setShowEmailDraft] = useState(initialState.email);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('Re: Compliance risks identified for Acme Manufacturing');
  const [emailBody, setEmailBody] = useState(`Hi A.K. ABC company,

Our analysis for Acme Manufacturing identified three key compliance-related risks:
• Environmental permit gaps
• Supplier contract exposure
• Potential employee misclassification

Based on your experience with compliance and manufacturing clients, you appear to be the best internal expert to support this matter.

Please let me know if you'd like a meeting arranged.

Regards,
John`);

  // Handle Initial Animation State on Mount
  React.useEffect(() => {
    if (initialState.email) {
      // If loading directly into email, ensure report is hidden and email is visible without animation first
      gsap.set(formRef.current, { display: 'none', opacity: 0 });
      gsap.set(reportRef.current, { display: 'none', opacity: 0 }); 
      gsap.set(emailDraftRef.current, { display: 'flex', opacity: 1, x: '0%' });
    } else if (initialState.report) {
       // If loading directly into report
       gsap.set(formRef.current, { display: 'none', opacity: 0 });
       gsap.set(reportRef.current, { display: 'flex', opacity: 1, x: '0%' });
    }
  }, []);

  const updateUrl = (view) => {
    const url = new URL(window.location);
    if (view) {
      url.searchParams.set('view', view);
    } else {
      url.searchParams.delete('view');
    }
    window.history.pushState({}, '', url);
  };

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.02,
      boxShadow: '0 4px 15px rgba(238, 32, 46, 0.4)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      boxShadow: 'none',
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  const [companyName, setCompanyName] = useState('ABC company');
  const [companyEmail, setCompanyEmail] = useState('ABC@gamil.com');
  const [companyPhone, setCompanyPhone] = useState('+1 (555) 123-4567');
  const [practiceArea, setPracticeArea] = useState('Regulatory & Compliance Law');
  const [includeInternalDocs, setIncludeInternalDocs] = useState(true);
  const [includePublicNews, setIncludePublicNews] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [usePastMatters, setUsePastMatters] = useState(true);

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleCompanyEmailChange = (event) => {
    setCompanyEmail(event.target.value);
  };

  const handleCompanyPhoneChange = (event) => {
    setCompanyPhone(event.target.value);
  };

  const handlePracticeAreaChange = (event) => {
    setPracticeArea(event.target.value || event.target.label);
  };

  const handleInternalDocsChange = (event) => {
    setIncludeInternalDocs(event.target.checked);
  };

  const handlePublicNewsChange = (event) => {
    setIncludePublicNews(event.target.checked);
  };

  const handlePastMattersChange = (event) => {
    setUsePastMatters(event.target.checked);
  };

  const handleFileSelect = (file) => {
    console.log('File selected:', file);
    setUploadedFile(file);
  };

  const handleFileRemove = () => {
    setUploadedFile(null);
  };

  const handleRunAnalysis = () => {
    console.log('Running analysis...', {
      companyName,
      companyEmail
    });

    const tl = gsap.timeline();
    
    // Ensure report is visible for animation
    gsap.set(reportRef.current, { display: 'flex' });
    
    tl.to(formRef.current, {
      x: '-20%',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(formRef.current, { display: 'none' });
      }
    })
    .fromTo(reportRef.current, 
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' },
      "-=0.2"
    );
    
    setShowReport(true);
    updateUrl('report');
  };

  const handleBack = () => {
    const tl = gsap.timeline();
    
    if (showEmailDraft) {
      // Back from Email Draft to Report
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
      updateUrl('report');
    } else {
      // Back from Report to Form
      gsap.set(formRef.current, { display: 'block' }); 

      tl.to(reportRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(reportRef.current, { display: 'none' });
        }
      })
      .fromTo(formRef.current,
        { x: '-20%', opacity: 0 }, 
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' },
        "-=0.2"
      );
      
      setShowReport(false);
      updateUrl(null);
    }
  };

  const handleDraftEmail = () => {
    const tl = gsap.timeline();
    
    gsap.set(emailDraftRef.current, { display: 'flex' });
    
    // Parallax effect: Animate elements of email draft view with stagger
    // First slide out the report view
    tl.to(reportRef.current, {
      x: '-20%',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(reportRef.current, { display: 'none' });
      }
    });

    // Animate Email Draft container in
    tl.fromTo(emailDraftRef.current,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.6, ease: 'power2.out' },
      "-=0.2"
    );
    
    // Stagger internal elements for parallax feel (if specific classes available/ref'd, simplified for now to container)
    // We can add refinement here by selecting children if needed.
    
    setShowEmailDraft(true);
    updateUrl('email');
  };

  const practiceAreaOptions = PRACTICE_AREAS.map((area) => ({
    label: area,
    value: area
  }));

  return (
    <div className={styles.container} ref={containerRef}>
      <div ref={formRef} className={styles.formContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>{NEW_ANALYSIS.TITLE}</h1>
          <p className={styles.subtitle}>{NEW_ANALYSIS.SUBTITLE}</p>
        </div>

        <div className={styles.content}>
          <Card
            className={styles.companyCard}
            radius="12px"
          >
            <h2 className={styles.cardTitle}>{NEW_ANALYSIS.COMPANY_INFORMATION}</h2>
            <div className={styles.formGroup}>
              <InputField
                type="text"
                value={companyName}
                onChange={handleCompanyNameChange}
                placeholder={NEW_ANALYSIS.COMPANY_NAME}
                className={styles.input}
                border={`1.5px solid ${COLORS.PRIMARY}`}
                radius="6px"
                height="44px"
              />
              <p className={styles.hint}>{NEW_ANALYSIS.COMPANY_NAME_HINT}</p>
            </div>

            <div className={styles.formGroup}>
              <InputField
                type="email"
                value={companyEmail}
                onChange={handleCompanyEmailChange}
                placeholder={NEW_ANALYSIS.COMPANY_EMAIL}
                className={styles.input}
                border={`1.5px solid ${COLORS.PRIMARY}`}
                radius="6px"
                height="44px"
              />
            </div>

            <div className={styles.formGroup}>
              <InputField
                type="tel"
                value={companyPhone}
                onChange={handleCompanyPhoneChange}
                placeholder={NEW_ANALYSIS.COMPANY_PHONE}
                className={styles.input}
                border={`1.5px solid ${COLORS.PRIMARY}`}
                radius="6px"
                height="44px"
              />
            </div>

            <div className={styles.formGroup}>
              <Dropdown
                options={practiceAreaOptions}
                value={practiceArea}
                onChange={handlePracticeAreaChange}
                placeholder={NEW_ANALYSIS.PRACTICE_AREA}
                className={styles.dropdown}
                border={`1.5px solid ${COLORS.PRIMARY}`}
                borderWidth="1.5px"
                radius="6px"
                height="44px"
              />
              <p className={styles.hint}>{NEW_ANALYSIS.PRACTICE_AREA_HINT}</p>
            </div>

            <Button
              ref={buttonRef}
              onClick={handleRunAnalysis}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              variant="primary"
              className={styles.runButton}
              icon={<img src={SearchIcon} alt="Search" style={{ width: 30, height: 30, filter: 'brightness(0) invert(1)' }} />}
              color={COLORS.PRIMARY}
              textColor={COLORS.WHITE}
              radius="12px"
              height="40px"
            >
              {NEW_ANALYSIS.RUN_ANALYSIS}
            </Button>
          </Card>

          <Card
            className={styles.attachmentCard}
            radius="13.31px"
          >
            <h2 className={styles.cardTitle}>{NEW_ANALYSIS.SUPPORTING_ATTACHMENT}</h2>
            
            <div className={styles.checkboxGroup}>
              <Checkbox
                checked={includeInternalDocs}
                onChange={handleInternalDocsChange}
                label={NEW_ANALYSIS.INCLUDE_INTERNAL_DOCS}
                className={styles.checkbox}
              />
            </div>

            {includeInternalDocs && (
              <div className={styles.fileUploadWrapper}>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={uploadedFile}
                  onRemove={handleFileRemove}
                  className={styles.fileUpload}
                  border={`1.5px dashed ${COLORS.PRIMARY}`}
                  radius="6px"
                />
              </div>
            )}

            <div className={styles.checkboxGroup}>
              <Checkbox
                checked={includePublicNews}
                onChange={handlePublicNewsChange}
                label={NEW_ANALYSIS.INCLUDE_PUBLIC_NEWS}
                className={styles.checkbox}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <Checkbox
                checked={usePastMatters}
                onChange={handlePastMattersChange}
                label={NEW_ANALYSIS.USE_PAST_MATTERS}
                className={styles.checkbox}
              />
            </div>
          </Card>
        </div>
      </div>

      {/* Report View */}
      <div ref={reportRef} className={styles.reportContainer}>
        <button className={styles.backButton} onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Back
        </button>

        <div className={styles.reportHeaderCard}>
          <div className={styles.headerTop}>
            <div>
              <h2 className={styles.companyTitle}>ABC company</h2>
              <p className={styles.practiceAreaText}>Practice Area: compliance</p>
            </div>
            <div className={styles.scoreContainer}>
              <span className={styles.scoreLabel}>Confidence Score</span>
              <span className={styles.scoreValue}>92%</span>
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
               <li className={styles.riskItem}>
                 <span className={styles.riskDot}></span>
                 Environmental compliance gaps
               </li>
               <li className={styles.riskItem}>
                 <span className={styles.riskDot}></span>
                 Supplier contract exposure
               </li>
               <li className={styles.riskItem}>
                 <span className={styles.riskDot}></span>
                 Employee misclassification risk
               </li>
             </ul>
          </div>

          <div className={styles.attorneyCard}>
             <h3 className={styles.sectionTitle}>Recommended Attorney</h3>
             <div className={styles.attorneyProfile}>
               <div className={styles.attorneyAvatar}>AR</div>
               <div className={styles.attorneyInfo}>
                 <h3>A.K. Raman</h3>
                 <p>Partner, Corporate</p>
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
               <div className={styles.evidenceItem}>
                 <span>Regulatory Filing</span>
                 <a href="#" className={styles.viewLink}>[View]</a>
               </div>
               <div className={styles.evidenceItem}>
                 <span>News Article</span>
                 <a href="#" className={styles.viewLink}>[View]</a>
               </div>
               <div className={styles.evidenceItem}>
                 <span>Internal Doc</span>
                 <a href="#" className={styles.viewLink}>[Open]</a>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Email Draft View */}
      <div ref={emailDraftRef} className={styles.emailDraftContainer}>
        <div className={styles.header}>
            <button className={styles.backButton} onClick={handleBack}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back to Email Drafts
            </button>
            <h1 className={styles.title} style={{ marginTop: '16px' }}>Email Draft for: Acme Manufacturing</h1>
            <p className={styles.subtitle}>To: A.K. Raman (Partner, Corporate)</p>
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
                        <img src={CopyIcon} alt="Copy" style={{ width: 16, height: 16 }} />
                        Copy Email
                    </button>
                    <button className={styles.secondaryActionButton}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <line x1="22" y1="2" x2="11" y2="13"></line>
                           <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        Send via Outlook
                    </button>
                    <button className={styles.primaryActionButton} style={{ marginLeft: 'auto', borderRadius: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                        <span className={styles.summaryValue}>Acme Manufacturing</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>Practice Area</span>
                        <span className={styles.summaryValue}>Compliance</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>Confidence Score</span>
                        <span className={styles.summaryValue} style={{ color: '#22C55E' }}>92%</span>
                    </div>
                </Card>

                <Card className={styles.sidebarCard} radius="12px">
                    <h3 className={styles.sidebarTitle}>Key Risks</h3>
                    <ul className={styles.riskList}>
                        <li className={styles.riskItem}>
                            <span className={styles.riskDot} style={{ backgroundColor: '#EE202E' }}></span>
                            Environmental permits
                        </li>
                        <li className={styles.riskItem}>
                            <span className={styles.riskDot} style={{ backgroundColor: '#EE202E' }}></span>
                            Contract exposure
                        </li>
                        <li className={styles.riskItem}>
                            <span className={styles.riskDot} style={{ backgroundColor: '#EE202E' }}></span>
                            Misclassification risk
                        </li>
                    </ul>
                </Card>

                <Card className={styles.sidebarCard} radius="12px">
                    <h3 className={styles.sidebarTitle}>Recommended Attorney</h3>
                     <div className={styles.attorneyProfile}>
                       <div className={styles.attorneyAvatar}>AR</div>
                       <div className={styles.attorneyInfo}>
                         <h3>A.K. Raman</h3>
                         <p>Partner, Corporate</p>
                       </div>
                     </div>
                     <p className={styles.pastMatters}>Past Matters: 16</p>
                     
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


export default NewAnalysis;
