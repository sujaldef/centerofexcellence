import React from 'react';

const SkillCheckbox = ({ value }) => {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        value={value}
        className="form-checkbox text-[var(--primary)]"
      />
      <span className="ml-2 text-[var(--light)]">{value}</span>
    </label>
  );
};

export default SkillCheckbox;