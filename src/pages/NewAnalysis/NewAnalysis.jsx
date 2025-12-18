import React, { useState } from 'react';
import Card from '@/components/common/Card';
import InputField from '@/components/common/InputField';
import Dropdown from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import FileUpload from '@/components/common/FileUpload';
import { PRACTICE_AREAS, NEW_ANALYSIS, COLORS } from '@/config/constants';
import styles from './NewAnalysis.module.css';

import SearchIcon from '@/assets/icons/Search.svg';

const NewAnalysis = () => {
  const [companyName, setCompanyName] = useState('ABC company');
  const [companyEmail, setCompanyEmail] = useState('ABC@gamil.com');
  const [companyPhone, setCompanyPhone] = useState('+1 (555) 123-4567');
  const [practiceArea, setPracticeArea] = useState('Regulatory & Compliance Law');
  const [includeInternalDocs, setIncludeInternalDocs] = useState(true);
  const [includePublicNews, setIncludePublicNews] = useState(true);
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
  };

  const handleRunAnalysis = () => {
    console.log('Running analysis...', {
      companyName,
      companyEmail,
      companyPhone,
      practiceArea,
      includeInternalDocs,
      includePublicNews,
      usePastMatters
    });
  };

  const practiceAreaOptions = PRACTICE_AREAS.map((area) => ({
    label: area,
    value: area
  }));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{NEW_ANALYSIS.TITLE}</h1>
        <p className={styles.subtitle}>{NEW_ANALYSIS.SUBTITLE}</p>
      </div>

      <div className={styles.content}>
        <Card
          className={styles.companyCard}
          border={`1px solid ${COLORS.PRIMARY}`}
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
            onClick={handleRunAnalysis}
            variant="primary"
            className={styles.runButton}
            icon={<img src={SearchIcon} alt="Search" style={{ width: 20, height: 20 }} />}
            color={COLORS.PRIMARY}
            textColor={COLORS.WHITE}
            radius="6px"
            height="44px"
          >
            {NEW_ANALYSIS.RUN_ANALYSIS}
          </Button>
        </Card>

        <Card
          className={styles.attachmentCard}
          border={`1.11px solid ${COLORS.PRIMARY}`}
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
  );
};

export default NewAnalysis;

