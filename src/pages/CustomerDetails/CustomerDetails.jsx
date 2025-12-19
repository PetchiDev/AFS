import React, { useState } from 'react';
import Table from '@/components/common/Table';
import { CUSTOMER_DETAILS_CONSTANTS, MOCK_CUSTOMERS_DATA } from '@/config/constants';
import styles from './CustomerDetails.module.css';

// Delete Icon Component
const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Confirm Delete Modal Component
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, customerName }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalBody}>
          <h3 className={styles.modalTitle}>{CUSTOMER_DETAILS_CONSTANTS.MODAL.CONFIRM_MESSAGE}</h3>
          {customerName && (
            <p className={styles.modalCustomerName}>{customerName}?</p>
          )}
        </div>
        <div className={styles.modalFooter}>
          <button 
            className={styles.cancelBtn} 
            onClick={onClose}
            type="button"
          >
            {CUSTOMER_DETAILS_CONSTANTS.MODAL.CANCEL_BUTTON}
          </button>
          <button 
            className={styles.okBtn} 
            onClick={onConfirm}
            type="button"
          >
            {CUSTOMER_DETAILS_CONSTANTS.MODAL.OK_BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomerDetails = () => {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      setCustomers(prevCustomers => 
        prevCustomers.filter(customer => customer.id !== customerToDelete.id)
      );
    }
    setIsModalOpen(false);
    setCustomerToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCustomerToDelete(null);
  };

  const { TABLE_HEADERS, ACTIONS } = CUSTOMER_DETAILS_CONSTANTS;

  const columns = [
    { 
      key: 'sno', 
      title: TABLE_HEADERS.SNO, 
      width: '80px' 
    },
    { 
      key: 'customerName', 
      title: TABLE_HEADERS.CUSTOMER_NAME 
    },
    { 
      key: 'phoneNumber', 
      title: TABLE_HEADERS.PHONE_NUMBER 
    },
    { 
      key: 'createdOn', 
      title: TABLE_HEADERS.CREATED_ON 
    },
    {
      key: 'action',
      title: TABLE_HEADERS.ACTION,
      align: 'right',
      render: (row) => (
        <div className={styles.actionCell}>
          <button 
            className={styles.deleteBtn}
            onClick={() => handleDeleteClick(row)}
            type="button"
          >
            <DeleteIcon />
            {ACTIONS.DELETE}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{CUSTOMER_DETAILS_CONSTANTS.TITLE}</h1>
          <p className={styles.subtitle}>{CUSTOMER_DETAILS_CONSTANTS.SUBTITLE}</p>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <Table 
          columns={columns} 
          data={customers} 
        />
      </div>

      {customers.length === 0 && (
        <div className={styles.emptyState}>
          No customers found.
        </div>
      )}

      <ConfirmDeleteModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        customerName={customerToDelete?.customerName}
      />
    </div>
  );
};

export default CustomerDetails;
