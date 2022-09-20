import React from 'react';
import PropTypes from 'prop-types';

function Select({ onChange, options }) {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {options.map((value) => (
        <option key={value}>
          {value}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
};

export default Select;
