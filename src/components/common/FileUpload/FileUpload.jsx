import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FILE_UPLOAD } from '@/config/constants';
import styles from './FileUpload.module.css';

const FileUpload = ({
  onFileSelect = null,
  onFileChange = null,
  accept = FILE_UPLOAD.ALLOWED_DOCUMENT_EXTENSIONS.join(','),
  multiple = false,
  maxSize = FILE_UPLOAD.MAX_FILE_SIZE,
  allowedTypes = FILE_UPLOAD.ALLOWED_DOCUMENT_TYPES,
  uploadText = FILE_UPLOAD.UPLOAD_TEXT,
  supportedFormatsText = FILE_UPLOAD.SUPPORTED_FORMATS_TEXT,
  disabled = false,
  width = null,
  height = null,
  radius = null,
  border = null,
  className = '',
  ...rest
}) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    if (file.size > maxSize) {
      setError(`File size exceeds ${(maxSize / 1048576).toFixed(0)}MB limit`);
      return false;
    }

    const fileType = file.type;
    const isValidType = allowedTypes.some((type) => fileType === type);

    if (!isValidType) {
      setError(`File type not supported. Allowed: ${supportedFormatsText}`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileSelect = (files) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => validateFile(file));

    if (validFiles.length > 0) {
      if (onFileSelect) {
        onFileSelect(multiple ? validFiles : validFiles[0]);
      }
      if (onFileChange) {
        onFileChange(multiple ? validFiles : validFiles[0]);
      }
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (event) => {
    const files = event.target.files;
    handleFileSelect(files);
    event.target.value = '';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = event.dataTransfer.files;
    handleFileSelect(files);
  };

  const inlineStyles = {};

  if (width) inlineStyles.width = width;
  if (height) inlineStyles.height = height;
  if (radius !== null) inlineStyles.borderRadius = radius;
  if (border) inlineStyles.border = border;

  const containerClasses = [
    styles.fileUploadContainer,
    isDragging && styles.dragging,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.wrapper}>
      <div
        className={containerClasses}
        style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        {...rest}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleInputChange}
          className={styles.fileInput}
          aria-label={uploadText}
        />
        <div className={styles.uploadContent}>
          <div className={styles.uploadIcon}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 18C4.23858 18 2 15.7614 2 13C2 10.2386 4.23858 8 7 8C7.33962 8 7.67476 8.02858 8 8.08296M14 6C14.3144 6 14.6258 6.02367 14.9311 6.06914C17.2818 6.31019 19 8.28293 19 10.7C19 13.1171 17.2818 15.0898 14.9311 15.3309C14.6258 15.3763 14.3144 15.4 14 15.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12V21M12 12L9 15M12 12L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className={styles.uploadText}>{uploadText}</p>
          <p className={styles.supportedFormats}>{supportedFormatsText}</p>
        </div>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

FileUpload.propTypes = {
  onFileSelect: PropTypes.func,
  onFileChange: PropTypes.func,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  uploadText: PropTypes.string,
  supportedFormatsText: PropTypes.string,
  disabled: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  border: PropTypes.string,
  className: PropTypes.string
};

export default FileUpload;

