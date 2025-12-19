import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/common/Modal';
import InputField from '@/components/common/InputField';
import Dropdown from '@/components/common/Dropdown';
import FileUpload from '@/components/common/FileUpload';
import { ADD_ATTORNEY, COLORS } from '@/config/constants';
import styles from './AddAttorneyModal.module.css';

const AddAttorneyModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    practiceArea: '',
    expertise: [],
    pastMatters: '0',
    phoneNumber: '',
    emailId: '',
    location: '',
    profilePicture: null
  });

  const [currentExpertise, setCurrentExpertise] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (e) => {
    setFormData(prev => ({ ...prev, practiceArea: e.target.value }));
  };

  const handleFileSelect = (file) => {
    setFormData(prev => ({ ...prev, profilePicture: file }));
  };

  const handleFileRemove = () => {
    setFormData(prev => ({ ...prev, profilePicture: null }));
  };

  const handleAddExpertise = () => {
    if (currentExpertise.trim()) {
      setFormData(prev => ({
        ...prev,
        expertise: [...prev.expertise, currentExpertise.trim()]
      }));
      setCurrentExpertise('');
    }
  };

  const handleRemoveExpertise = (index) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{ADD_ATTORNEY.TITLE}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>{ADD_ATTORNEY.PROFILE_PICTURE}</label>
            <FileUpload
              onFileSelect={handleFileSelect}
              onRemove={handleFileRemove}
              selectedFile={formData.profilePicture}
              uploadText={ADD_ATTORNEY.PROFILE_PICTURE_HINT}
              border={`1.5px dashed ${COLORS.PRIMARY}`}
              radius="8px"
              height="120px"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{ADD_ATTORNEY.FULL_NAME}</label>
            <InputField
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={ADD_ATTORNEY.FULL_NAME_PLACEHOLDER}
              radius="8px"
              height="44px"
              border="1px solid #E2E8F0"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{ADD_ATTORNEY.PRACTICE_AREA}</label>
            <Dropdown
              value={formData.practiceArea}
              onChange={handleDropdownChange}
              placeholder={ADD_ATTORNEY.PRACTICE_AREA_PLACEHOLDER}
              radius="8px"
              height="44px"
              border="1px solid #E2E8F0"
              options={[
                { label: 'Corporate', value: 'Corporate' },
                { label: 'Litigation', value: 'Litigation' },
                { label: 'Employment', value: 'Employment' },
                { label: 'IP', value: 'IP' },
                { label: 'Compliance', value: 'Compliance' }
              ]}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{ADD_ATTORNEY.EXPERTISE}</label>
            <div className={styles.expertiseAction}>
              <div className={styles.expertiseInput}>
                <InputField
                  value={currentExpertise}
                  onChange={(e) => setCurrentExpertise(e.target.value)}
                  placeholder={ADD_ATTORNEY.EXPERTISE_PLACEHOLDER}
                  radius="8px"
                  height="44px"
                  border="1px solid #E2E8F0"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddExpertise())}
                />
              </div>
              <button
                type="button"
                className={styles.addButton}
                onClick={handleAddExpertise}
              >
                {ADD_ATTORNEY.ADD_EXPERTISE}
              </button>
            </div>
            {formData.expertise.length > 0 && (
              <div className={styles.expertiseTags}>
                {formData.expertise.map((item, index) => (
                  <span key={index} className={styles.tag}>
                    {item}
                    <button
                      type="button"
                      className={styles.removeTag}
                      onClick={() => handleRemoveExpertise(index)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{ADD_ATTORNEY.PAST_MATTERS}</label>
            <InputField
              name="pastMatters"
              type="number"
              value={formData.pastMatters}
              onChange={handleInputChange}
              placeholder={ADD_ATTORNEY.PAST_MATTERS_PLACEHOLDER}
              radius="8px"
              height="44px"
              border="1px solid #E2E8F0"
              required
            />
          </div>

          <div className={styles.row}>
            <div className={`${styles.col} ${styles.formGroup}`}>
              <label className={styles.label}>{ADD_ATTORNEY.PHONE_NUMBER}</label>
              <InputField
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder={ADD_ATTORNEY.PHONE_NUMBER_PLACEHOLDER}
                radius="8px"
                height="44px"
                border="1px solid #E2E8F0"
                required
              />
            </div>
            <div className={`${styles.col} ${styles.formGroup}`}>
              <label className={styles.label}>{ADD_ATTORNEY.EMAIL_ID}</label>
              <InputField
                name="emailId"
                type="email"
                value={formData.emailId}
                onChange={handleInputChange}
                placeholder={ADD_ATTORNEY.EMAIL_ID_PLACEHOLDER}
                radius="8px"
                height="44px"
                border="1px solid #E2E8F0"
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>{ADD_ATTORNEY.LOCATION}</label>
            <InputField
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder={ADD_ATTORNEY.LOCATION_PLACEHOLDER}
              radius="8px"
              height="44px"
              border="1px solid #E2E8F0"
              required
            />
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={onClose}
            >
              {ADD_ATTORNEY.CANCEL}
            </button>
            <button
              type="submit"
              className={styles.addBtn}
            >
              {ADD_ATTORNEY.ADD}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

AddAttorneyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default AddAttorneyModal;
