import React, { useState } from 'react';
import InputField from '@/components/common/InputField';
import Dropdown from '@/components/common/Dropdown';
import Table from '@/components/common/Table';
import ReportView from '@/components/features/Analysis/ReportView';

import { REPORTS_CONSTANTS, REPORT_FILTERS, MOCK_REPORTS_DATA, COLORS } from '@/config/constants';
import SearchIcon from '@/assets/icons/Search.svg';
import styles from './Reports.module.css';

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 days');
  const [selectedSort, setSelectedSort] = useState('Latest First');
  const [selectedReport, setSelectedReport] = useState(null);

  const practiceAreaOptions = [
    { label: REPORTS_CONSTANTS.ALL_PRACTICE_AREAS, value: '' },
    ...REPORT_FILTERS.PRACTICE_AREAS.map(area => ({ label: area, value: area }))
  ];

  const dateRangeOptions = REPORT_FILTERS.DATE_RANGES.map(range => ({ label: range, value: range }));
  const sortOptions = REPORT_FILTERS.SORT_OPTIONS.map(sort => ({ label: sort, value: sort }));

  const handleViewReport = (report) => {
    // Generate mock analysis result based on report data if needed, or assume ReportView handles it
    // For now we pass the basic details and ReportView can handle the rest or we mock fuller data
    const mockFullData = {
        score: report.confidence,
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
    };
    setSelectedReport({ ...report, ...mockFullData });
  };

  const columns = [
    {
      key: 'companyName',
      title: 'Company Name',
      width: '25%',
      render: (row) => <span className={styles.companyName}>{row.companyName}</span>
    },
    {
      key: 'practiceArea',
      title: 'Practice Area',
      width: '20%'
    },
    {
      key: 'date',
      title: 'Date',
      width: '15%'
    },
    {
      key: 'confidence',
      title: 'Confidence',
      width: '25%',
      render: (row) => (
        <div className={styles.confidenceWrapper}>
           <div className={styles.progressBarBg}>
              <div 
                className={styles.progressBarFill} 
                style={{ 
                  width: `${row.confidence}%`,
                  backgroundColor: row.confidence > 90 ? '#22C55E' : row.confidence > 80 ? '#F59E0B' : '#64748B' 
                }} 
              />
           </div>
           <span className={styles.confidenceText}>{row.confidence}%</span>
        </div>
      )
    },
    {
      key: 'action',
      title: 'Action',
      width: '15%',
      align: 'right',
      render: (row) => (
        <button className={styles.viewButton} onClick={() => handleViewReport(row)}>
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
           </svg>
           {REPORTS_CONSTANTS.VIEW_ACTION}
        </button>
      )
    }
  ];

  const filteredData = MOCK_REPORTS_DATA.filter(item => {
    const matchesSearch = item.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPractice = !selectedPracticeArea || item.practiceArea === selectedPracticeArea;
    return matchesSearch && matchesPractice;
  });

  if (selectedReport) {
     return (
        <ReportView 
            analysisResult={selectedReport}
            companyName={selectedReport.companyName}
            practiceArea={selectedReport.practiceArea}
            onBack={() => setSelectedReport(null)}
        />
     );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{REPORTS_CONSTANTS.TITLE}</h1>
        <p className={styles.subtitle}>{REPORTS_CONSTANTS.SUBTITLE}</p>
      </div>

      <div className={styles.filtersBar}>
         <div className={styles.searchWrapper}>
            <img src={SearchIcon} alt="Search" className={styles.searchIcon} />
            <InputField 
              type="text" 
              placeholder={REPORTS_CONSTANTS.SEARCH_PLACEHOLDER}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
         </div>
         
         <div className={styles.dropdownsWrapper}>
             <Dropdown 
                options={practiceAreaOptions}
                value={selectedPracticeArea}
                onChange={(e) => setSelectedPracticeArea(e.target.value)}
                placeholder={REPORTS_CONSTANTS.ALL_PRACTICE_AREAS}
                className={styles.filterDropdown}
                height="44px"
             />
             <Dropdown 
                options={dateRangeOptions}
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className={styles.filterDropdown}
                height="44px"
             />
             <Dropdown 
                options={sortOptions}
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className={styles.filterDropdown}
                height="44px"
             />
         </div>
      </div>

      <div className={styles.tableCard}>
         <Table 
            columns={columns}
            data={filteredData}
         />
      </div>
    </div>
  );
};

export default Reports;
