import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Table from '../../components/common/Table';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import FileUpload from '../../components/common/FileUpload';
import { COLORS } from '../../config/constants';
import ViewIcon from '../../assets/icons/View.svg';
import PlusIcon from '../../assets/icons/Plus.svg';
import DeleteIcon from '../../assets/icons/Delete.svg';
import styles from './KnowledgeHub.module.css';

const KnowledgeHub = () => {
  /* Sort Configs */

  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false); // Add New Source Modal
  const [isAddMoreModalOpen, setIsAddMoreModalOpen] = useState(false); // Add More Modal
  
  // View States
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'details'
  const [selectedSource, setSelectedSource] = useState(null);

  // Animation Refs
  const listContainerRef = useRef(null);
  const detailsContainerRef = useRef(null);
  const pageContainerRef = useRef(null);

  // Form Data States
  const [formData, setFormData] = useState({
    sourceName: '',
    category: '',
    file: null,
    url: '',
    apiKey: ''
  });

  const [addMoreData, setAddMoreData] = useState({
    file: null,
    url: '',
    apiKey: ''
  });

  // Mock Data
  const [data, setData] = useState([
    { id: 1, sno: '01', sourceName: 'Supply Chain Risk Articles', category: 'Regulatory Documents', createdDate: '12 Jan 2025' },
    { id: 2, sno: '02', sourceName: 'Supply Chain', category: 'Internal Legal Documents', createdDate: '10 Jan 2025' },
    { id: 3, sno: '03', sourceName: 'Market News', category: 'Internal Legal Documents', createdDate: '08 Jan 2025' },
  ]);

  // Mock Details Data (Document List)
  const [detailsData, setDetailsData] = useState([
    { id: 1, sno: '01', value: 'contract_policy_01.pdf', type: 'file' },
    { id: 2, sno: '02', value: 'API*********Key', type: 'key' },
    { id: 3, sno: '03', value: 'https://news.example.com/article...', type: 'url' },
  ]);

  useEffect(() => {
    // Initial Setup
    if (viewMode === 'list') {
      gsap.set(listContainerRef.current, { x: '0%', opacity: 1, display: 'block' });
      gsap.set(detailsContainerRef.current, { x: '100%', opacity: 0, display: 'none' });
    }
  }, []);



  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddMoreChange = (field, value) => {
    setAddMoreData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (file, isAddMore = false) => {
    if (isAddMore) {
      setAddMoreData(prev => ({ ...prev, file: file }));
    } else {
      setFormData(prev => ({ ...prev, file: file }));
    }
  };

  const handleFileRemove = (isAddMore = false) => {
    if (isAddMore) {
      setAddMoreData(prev => ({ ...prev, file: null }));
    } else {
      setFormData(prev => ({ ...prev, file: null }));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ sourceName: '', category: '', file: null, url: '', apiKey: '' });
  };

  const handleCloseAddMoreModal = () => {
    setIsAddMoreModalOpen(false);
    setAddMoreData({ file: null, url: '', apiKey: '' });
  };

  const handleViewSource = (source) => {
    setSelectedSource(source);
    
    // Animate List Out Left, Details In from Right
    const tl = gsap.timeline();
    
    gsap.set(detailsContainerRef.current, { display: 'flex' });
    
    tl.to(listContainerRef.current, {
      x: '-20%',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(listContainerRef.current, { display: 'none' });
      }
    })
    .fromTo(detailsContainerRef.current,
      { x: '100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' },
      "-=0.2"
    );
    
    setViewMode('details');
  };

  const handleBack = () => {
    // Animate Details Out Right, List In from Left
    const tl = gsap.timeline();
    
    gsap.set(listContainerRef.current, { display: 'block' });
    
    tl.to(detailsContainerRef.current, {
      x: '100%',
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set(detailsContainerRef.current, { display: 'none' });
        setSelectedSource(null);
      }
    })
    .fromTo(listContainerRef.current,
      { x: '-20%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' },
      "-=0.2"
    );
    
    setViewMode('list');
  };

  const columns = [
    { key: 'sno', title: 'S.NO', width: '80px' },
    { key: 'sourceName', title: 'Source Name' },
    { key: 'category', title: 'Category' },
    { key: 'createdDate', title: 'Created Date' },
    {
      key: 'action',
      title: 'Action',
      align: 'right',
      render: (row) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className={styles.viewBtn} onClick={() => handleViewSource(row)}>
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

  const detailsColumns = [
    { key: 'sno', title: 'S.NO', width: '10%' },
    { key: 'value', title: 'Document / URL / API Value', width: '70%' },
    {
      key: 'action',
      title: 'Action',
      width: '20%',
      align: 'right',
      render: (row) => (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button className={styles.viewBtn}>
            {row.type === 'key' ? 'Copy' : (row.type === 'url' ? 'Open' : 'View')}
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
    <div className={styles.pageContainer} ref={pageContainerRef}>
      
      {/* List View Container */}
      <div ref={listContainerRef} className={styles.listContainer}>
        <header className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Knowledge Hub</h1>
            <p className={styles.subtitle}>Upload, store, and manage all related documents in one place.</p>
          </div>
          <div className={styles.actionSection}>
            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(true)}
              className={styles.addSourceBtn}
              icon={<img src={PlusIcon} alt="Add" style={{ width: '16px', height: '16px' }} />}
            >
              Add New Source
            </Button>
          </div>
        </header>

        <Table 
          columns={columns} 
          data={data} 
        />
      </div>

      {/* Details View Container */}
      <div ref={detailsContainerRef} className={styles.detailsContainer} style={{ display: 'none' }}>
        <div className={styles.detailsHeader}>
          <div className={styles.headerLeft}>
            <button className={styles.backBtn} onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back
            </button>
            <h1 className={styles.detailsTitle}>View Source Details</h1>
          </div>
          
          <Button 
            variant="primary" 
            onClick={() => setIsAddMoreModalOpen(true)}
            className={styles.addSourceBtn}
            icon={<img src={PlusIcon} alt="Add" style={{ width: '16px', height: '16px' }} />}
          >
            Add More
          </Button>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Source Name</span>
              <span className={styles.infoValue}>{selectedSource?.sourceName || 'Compliance Docs'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Category</span>
              <span className={styles.infoValue}>{selectedSource?.category || 'Legal'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Created Date</span>
              <span className={styles.infoValue}>{selectedSource?.createdDate || '12 Jan 2025'}</span>
            </div>
          </div>
        </div>

        <div className={styles.detailsListSection}>
          <h2 className={styles.sectionTitle}>Document / URL / API List</h2>
          <Table
            columns={detailsColumns}
            data={detailsData}
          />
        </div>
      </div>

      {/* Add New Source Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Add New Source</h2>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Source Name</label>
                <InputField
                  value={formData.sourceName}
                  onChange={(e) => handleInputChange('sourceName', e.target.value)}
                  placeholder="Supply Chain Risk Articles"
                  radius="6px"
                  height="44px"
                  border="1px solid #E5E7EB"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Category</label>
                <InputField
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  placeholder="Internal Legal Documents"
                  radius="6px"
                  height="44px"
                  border="1px solid #E5E7EB"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Upload the document</label>
                <FileUpload
                  onFileSelect={(f) => handleFileSelect(f, false)}
                  selectedFile={formData.file}
                  onRemove={() => handleFileRemove(false)}
                  border={`1.5px dashed ${COLORS.PRIMARY}`}
                  radius="6px"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Enter URL</label>
                <div className={styles.inputWithButton}>
                  <div style={{ flex: 1 }}>
                    <InputField
                      value={formData.url}
                      onChange={(e) => handleInputChange('url', e.target.value)}
                      placeholder="https://.."
                      radius="6px"
                      height="44px"
                      border="1px solid #E5E7EB"
                    />
                  </div>
                  <button className={styles.addButton}>ADD</button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Enter API key</label>
                <div className={styles.inputWithButton}>
                  <div style={{ flex: 1 }}>
                    <InputField
                      type="password"
                      value={formData.apiKey}
                      onChange={(e) => handleInputChange('apiKey', e.target.value)}
                      placeholder="********"
                      radius="6px"
                      height="44px"
                      border="1px solid #E5E7EB"
                    />
                  </div>
                  <button className={styles.addButton}>ADD</button>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={handleCloseModal}>
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={handleCloseModal}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add More Modal */}
      {isAddMoreModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Add More</h2>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Upload the document</label>
                <FileUpload
                  onFileSelect={(f) => handleFileSelect(f, true)}
                  selectedFile={addMoreData.file}
                  onRemove={() => handleFileRemove(true)}
                  border={`1.5px dashed ${COLORS.PRIMARY}`}
                  radius="6px"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Enter URL</label>
                <div className={styles.inputWithButton}>
                  <div style={{ flex: 1 }}>
                    <InputField
                      value={addMoreData.url}
                      onChange={(e) => handleAddMoreChange('url', e.target.value)}
                      placeholder="https://.."
                      radius="6px"
                      height="44px"
                      border="1px solid #E5E7EB"
                    />
                  </div>
                  <button className={styles.addButton}>ADD</button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Enter API key</label>
                <div className={styles.inputWithButton}>
                  <div style={{ flex: 1 }}>
                    <InputField
                      type="password"
                      value={addMoreData.apiKey}
                      onChange={(e) => handleAddMoreChange('apiKey', e.target.value)}
                      placeholder="********"
                      radius="6px"
                      height="44px"
                      border="1px solid #E5E7EB"
                    />
                  </div>
                  <button className={styles.addButton}>ADD</button>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={handleCloseAddMoreModal}>
                Cancel
              </button>
              <button className={styles.saveBtn} onClick={handleCloseAddMoreModal}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default KnowledgeHub;
