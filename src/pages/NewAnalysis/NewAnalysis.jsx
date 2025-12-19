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
import ReportView from '@/components/features/Analysis/ReportView';

import { useRunAnalysis } from '@/hooks/useAnalysis';

const NewAnalysis = () => {
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const headerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const buttonWrapperRef = useRef(null);

  const reportRef = useRef(null);
  
  // Initialize state from URL params
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view');
      return {
        report: view === 'report' || view === 'email', // Report is also underlying for email view in terms of flow
        email: view === 'email',
        companyName: params.get('companyName'),
        practiceArea: params.get('practiceArea'),
        score: params.get('confidence')
      };
    }
    return { report: false, email: false };
  };

  const initialState = getInitialState();
  // State for internal views
  const [showReport, setShowReport] = useState(initialState.report);

  // Handle Initial Animation State on Mount
  React.useEffect(() => {
    if (initialState.report) {
       // If loading directly into report
       gsap.set(formRef.current, { display: 'none', opacity: 0 });
       gsap.set(reportRef.current, { display: 'flex', opacity: 1, x: '0%' });
    } else {
       // Entrance animation for form
       const tl = gsap.timeline();
       tl.fromTo(headerRef.current, 
         { y: 20, opacity: 0 },
         { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
       )
       .fromTo([row1Ref.current, row2Ref.current, buttonWrapperRef.current],
         { y: 20, opacity: 0 },
         { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
         "-=0.4"
       );
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
  const [companyName, setCompanyName] = useState(initialState.companyName || '');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [practiceArea, setPracticeArea] = useState(initialState.practiceArea || '');
  const [errors, setErrors] = useState({});
  const [includeInternalDocs, setIncludeInternalDocs] = useState(true);
  const [includePublicNews, setIncludePublicNews] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [usePastMatters, setUsePastMatters] = useState(true);
  const [analysisResult, setAnalysisResult] = useState(initialState.report ? {
      score: initialState.score || 92,
      risks: [
        "Environmental compliance gaps",
        "Supplier contract exposure",
        "Employee misclassification risk"
      ],
      attorney: {
        name: "A.K. Raman",
        title: "Partner, Corporate",
        initials: "AR",
        pastMatters: 16
      },
      evidence: [
        { label: "Regulatory Filing", action: "View" },
        { label: "News Article", action: "View" },
        { label: "Internal Doc", action: "Open" }
      ]
  } : null);

  const { mutate: runAnalysis, isPending: isAnalysisLoading } = useRunAnalysis();

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

  const validateForm = () => {
    const newErrors = {};
    if (!companyName.trim()) newErrors.companyName = 'Company Name is required';
    if (!companyEmail.trim()) {
      newErrors.companyEmail = 'Company Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail)) {
      newErrors.companyEmail = 'Invalid email format';
    }
    if (!companyPhone.trim()) newErrors.companyPhone = 'Phone Number is required';
    if (!practiceArea) newErrors.practiceArea = 'Practice Area is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRunAnalysis = () => {
    if (!validateForm()) {
      return;
    }
    console.log('Running analysis...', {
      companyName,
      companyEmail
    });

    const payload = {
      companyName,
      companyemail: companyEmail,
      companyphonenumber: companyPhone,
      practicearea: practiceArea
    };

    runAnalysis(payload, {
      onSuccess: (data) => {
        // Map API response to internal format
        const mappedResult = {
          score: Math.round(data.confidence_score || 0),
          risks: data.risks || [],
          attorney: {
            name: data.recommended_attorney?.name || 'Unknown Attorney',
            title: data.recommended_attorney?.role || 'Associate',
            initials: data.recommended_attorney?.name 
              ? data.recommended_attorney.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() 
              : 'XX',
            pastMatters: 18, // Mock value as API doesn't provide this yet
            email: data.recommended_attorney?.email
          },
          evidence: data.references?.map(ref => ({
            label: ref.label,
            action: 'View',
            url: ref.url
          })) || [],
          email_template: data.email_template
        };

        setAnalysisResult(mappedResult);

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
      },
      onError: (error) => {
        console.error('Analysis failed:', error);
        alert(`Analysis failed: ${error.message}`);
      }
    });
  };

  const handleBack = () => {
    const tl = gsap.timeline();
    
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
  };



  const practiceAreaOptions = PRACTICE_AREAS.map((area) => ({
    label: area,
    value: area
  }));

  return (
    <div className={styles.container} ref={containerRef}>
      <div ref={formRef} className={styles.formContainer}>
        <div className={styles.header} ref={headerRef}>
          <h1 className={styles.title}>{NEW_ANALYSIS.TITLE}</h1>
          <p className={styles.subtitle}>{NEW_ANALYSIS.SUBTITLE}</p>
        </div>

        <div className={styles.content}>
          <Card
            className={styles.companyCard}
            radius="12px"
          >
            <h2 className={styles.cardTitle}>{NEW_ANALYSIS.COMPANY_INFORMATION}</h2>
            <div className={styles.formRow} ref={row1Ref}>
              <div className={styles.formGroup}>
                <InputField
                  type="text"
                  value={companyName}
                  onChange={(e) => {
                    handleCompanyNameChange(e);
                    if (errors.companyName) setErrors({ ...errors, companyName: '' });
                  }}
                  placeholder={NEW_ANALYSIS.COMPANY_NAME}
                  className={`${styles.input} ${errors.companyName ? styles.inputError : ''}`}
                  border={errors.companyName ? '1.5px solid #EE202E' : undefined}
                  height="44px"
                />
                {errors.companyName && <span className={styles.errorText}>{errors.companyName}</span>}
                {!errors.companyName && <p className={styles.hint}>{NEW_ANALYSIS.COMPANY_NAME_HINT}</p>}
              </div>

              <div className={styles.formGroup}>
                <InputField
                  type="email"
                  value={companyEmail}
                  onChange={(e) => {
                    handleCompanyEmailChange(e);
                    if (errors.companyEmail) setErrors({ ...errors, companyEmail: '' });
                  }}
                  placeholder={NEW_ANALYSIS.COMPANY_EMAIL}
                  className={`${styles.input} ${errors.companyEmail ? styles.inputError : ''}`}
                  border={errors.companyEmail ? '1.5px solid #EE202E' : undefined}
                  height="44px"
                />
                {errors.companyEmail && <span className={styles.errorText}>{errors.companyEmail}</span>}
              </div>
            </div>

            <div className={styles.formRow} ref={row2Ref}>
              <div className={styles.formGroup}>
                <InputField
                  type="tel"
                  value={companyPhone}
                  onChange={(e) => {
                    handleCompanyPhoneChange(e);
                    if (errors.companyPhone) setErrors({ ...errors, companyPhone: '' });
                  }}
                  placeholder={NEW_ANALYSIS.COMPANY_PHONE}
                  className={`${styles.input} ${errors.companyPhone ? styles.inputError : ''}`}
                  border={errors.companyPhone ? '1.5px solid #EE202E' : undefined}
                  height="44px"
                />
                {errors.companyPhone && <span className={styles.errorText}>{errors.companyPhone}</span>}
              </div>

              <div className={styles.formGroup}>
                <Dropdown
                  options={practiceAreaOptions}
                  value={practiceArea}
                  onChange={(e) => {
                    handlePracticeAreaChange(e);
                    if (errors.practiceArea) setErrors({ ...errors, practiceArea: '' });
                  }}
                  placeholder={NEW_ANALYSIS.PRACTICE_AREA}
                  className={`${styles.dropdown} ${errors.practiceArea ? styles.dropdownError : ''}`}
                  border={errors.practiceArea ? '1.5px solid #EE202E' : undefined}
                  height="44px"
                />
                {errors.practiceArea && <span className={styles.errorText}>{errors.practiceArea}</span>}
                {!errors.practiceArea && <p className={styles.hint}>{NEW_ANALYSIS.PRACTICE_AREA_HINT}</p>}
              </div>
            </div>

            <div className={styles.buttonWrapper} ref={buttonWrapperRef}>
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
                loading={isAnalysisLoading}
              >
                {NEW_ANALYSIS.RUN_ANALYSIS}
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Report View */}
      {/* Report View */}
      <div ref={reportRef} className={styles.reportContainer}>
         <ReportView 
            analysisResult={analysisResult}
            companyName={companyName}
            practiceArea={practiceArea}
            onBack={handleBack}
         />
      </div>
    </div>
  );
};


export default NewAnalysis;
