import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API } from '@/config/constants';
import styles from './Dropdown.module.css';

const fetchDropdownData = async (apiUrl, dataKey) => {
  const fullUrl = apiUrl.startsWith('http') ? apiUrl : `${API.BASE_URL}${apiUrl}`;
  const response = await axios.get(fullUrl);
  return dataKey ? response.data[dataKey] : response.data;
};

const Dropdown = ({
  options = null,
  apiUrl = null,
  dataKey = null,
  value = '',
  onChange = null,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  name = '',
  id = '',
  labelKey = 'label',
  valueKey = 'value',
  width = null,
  height = null,
  top = null,
  left = null,
  radius = null,
  borderWidth = null,
  border = null,
  className = '',
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef(null);

  const queryKey = apiUrl ? ['dropdown', apiUrl] : null;
  const { data: apiData, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => fetchDropdownData(apiUrl, dataKey),
    enabled: !!apiUrl,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10
  });

  const dropdownOptions = apiUrl ? (apiData || []) : (options || []);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    const optionValue = typeof option === 'object' ? option[valueKey] : option;
    const optionLabel = typeof option === 'object' ? option[labelKey] : option;

    setSelectedValue(optionValue);
    setIsOpen(false);

    if (onChange) {
      onChange({
        target: {
          name,
          value: optionValue,
          label: optionLabel,
          option
        }
      });
    }
  };

  const getSelectedLabel = () => {
    if (!selectedValue) return placeholder;

    const selectedOption = dropdownOptions.find(
      (option) => (typeof option === 'object' ? option[valueKey] : option) === selectedValue
    );

    if (selectedOption) {
      return typeof selectedOption === 'object' ? selectedOption[labelKey] : selectedOption;
    }

    return placeholder;
  };

  const inlineStyles = {};

  if (width) inlineStyles.width = width;
  if (height) inlineStyles.height = height;
  if (top !== null) inlineStyles.top = top;
  if (left !== null) inlineStyles.left = left;
  if (radius !== null) inlineStyles.borderRadius = radius;
  if (borderWidth !== null) inlineStyles.borderWidth = borderWidth;
  if (border) inlineStyles.border = border;

  const containerClasses = [
    styles.dropdownWrapper,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} ref={dropdownRef} style={inlineStyles}>
      <input type="hidden" name={name} value={selectedValue} />
      <div
        className={`${styles.dropdown} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
        onClick={handleToggle}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={placeholder}
      >
        <span className={styles.selectedValue}>
          {isLoading ? 'Loading...' : getSelectedLabel()}
        </span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

      {isOpen && !disabled && (
        <div className={styles.dropdownMenu}>
          {error ? (
            <div className={styles.errorMessage}>Error loading options</div>
          ) : isLoading ? (
            <div className={styles.loadingMessage}>Loading...</div>
          ) : dropdownOptions.length === 0 ? (
            <div className={styles.noOptionsMessage}>No options available</div>
          ) : (
            dropdownOptions.map((option, index) => {
              const optionValue = typeof option === 'object' ? option[valueKey] : option;
              const optionLabel = typeof option === 'object' ? option[labelKey] : option;
              const isSelected = selectedValue === optionValue;

              return (
                <div
                  key={index}
                  className={`${styles.dropdownItem} ${isSelected ? styles.selected : ''}`}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={isSelected}
                >
                  {optionLabel}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })
    ])
  ),
  apiUrl: PropTypes.string,
  dataKey: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  border: PropTypes.string,
  className: PropTypes.string
};

export default Dropdown;

