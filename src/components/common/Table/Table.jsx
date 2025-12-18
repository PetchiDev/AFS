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
const Table = ({ columns, data, onSort, sortConfig }) => {
  const handleSort = (column) => {
    if (!column.sortable || !onSort) return;

    let direction = 'asc';
    if (sortConfig && sortConfig.key === column.key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSort(column.key, direction);
  };

  const getSortIcon = (column) => {
    if (!column.sortable || !sortConfig || sortConfig.key !== column.key) {
      return null;
    }
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                className={styles.th}
                onClick={() => handleSort(column)}
                style={{ width: column.width, cursor: column.sortable ? 'pointer' : 'default', textAlign: column.align || 'left' }}
              >
                {column.title}
                {column.sortable && <span className={styles.sortIcon}>{getSortIcon(column)}</span>}
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
  onSort: PropTypes.func,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),
};

export default Table;
