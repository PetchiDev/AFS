import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputField.module.css';

const InputField = ({
  type = 'text',
  placeholder = '',
  value = '',
  onChange = null,
  disabled = false,
  required = false,
  name = '',
  id = '',
  width = null,
  height = null,
  top = null,
  left = null,
  radius = null,
  border = null,
  color = null,
  ...rest
}) => {
  const inlineStyles = {};

  if (width) inlineStyles.width = width;
  if (height) inlineStyles.height = height;
  if (top !== null) inlineStyles.top = top;
  if (left !== null) inlineStyles.left = left;
  if (radius !== null) inlineStyles.borderRadius = radius;
  if (border) inlineStyles.border = border;
  if (color) inlineStyles.color = color;

  return (
    <input
      type={type}
      className={styles.inputField}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
      {...rest}
    />
  );
};

InputField.propTypes = {
  type: PropTypes.oneOf([
    'text',
    'email',
    'password',
    'number',
    'tel',
    'url',
    'search',
    'date',
    'time',
    'datetime-local'
  ]),
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  radius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  border: PropTypes.string,
  color: PropTypes.string
};

export default InputField;

