import React from 'react';
import PropTypes from 'prop-types';
import styles from './Table.module.css';

/**
 * Reusable Table component
 * @param {Array} columns - Array of column definitions
 * @param {Array} data - Array of data objects
 * @param {Function} onSort - Callback for sorting (columnKey, direction)
 * @param {Object} sortConfig - Current sort configuration { key, direction }
 */
const Table = ({ columns, data }) => {


  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                className={styles.th}
                style={{ width: column.width, textAlign: column.align || 'left' }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {columns.map((column, colIndex) => (
                <td 
                  key={`${rowIndex}-${colIndex}`} 
                  className={styles.td}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string.isRequired,
      render: PropTypes.func,
      sortable: PropTypes.bool,
      width: PropTypes.string,
      align: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
