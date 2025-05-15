import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SkillsInterests = ({ initialSkills = ['Machine Learning', 'Web Development', 'UI/UX Design'], initialInterests = ['Programming', 'Design', 'AI/ML'] }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [interests, setInterests] = useState(initialInterests);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [addingSkill, setAddingSkill] = useState(false);
  const [addingInterest, setAddingInterest] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddItem = (type, value, setItems, setInput, setAdding) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      setError(`${type} cannot be empty`);
      return;
    }
    if (type === 'Skill' && skills.includes(trimmedValue)) {
      setError('Skill already exists');
      return;
    }
    if (type === 'Interest' && interests.includes(trimmedValue)) {
      setError('Interest already exists');
      return;
    }
    setItems((prev) => [...prev, trimmedValue]);
    setInput('');
    setAdding(false);
    setSuccess(`${type} added successfully!`);
    setError('');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleRemoveItem = (index, setItems) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setSuccess('Item removed successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleKeyDown = (e, type, value, setItems, setInput, setAdding) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddItem(type, value, setItems, setInput, setAdding);
    } else if (e.key === 'Escape') {
      setInput('');
      setAdding(false);
    }
  };

  const renderSection = (title, items, setItems, adding, setAdding, newItem, setNewItem, type) => (
    <div className="flex-1 min-w-[300px]">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="tooltip-wrapper flex items-center bg-sub-dark px-3 py-1 rounded-full text-gray border border-[var(--border-accent)] card"
            role="button"
            aria-label={`Remove ${item}`}
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemoveItem(index, setItems)}
              className="ml-2 text-gray hover:text-red-400 transition duration-200 text-sm"
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
            <span className="tooltip">Click to remove {item}</span>
          </span>
        ))}
      </div>
      {adding ? (
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onBlur={() => handleAddItem(type, newItem, setItems, setNewItem, setAdding)}
          onKeyDown={(e) => handleKeyDown(e, type, newItem, setItems, setNewItem, setAdding)}
          className="mt-2 w-full bg-sub-dark border border-[var(--border-accent)] text-white px-3 py-1 rounded-md outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder-gray"
          placeholder={`Enter a new ${type.toLowerCase()}`}
          autoFocus
          aria-label={`Enter new ${type.toLowerCase()}`}
        />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-2 text-[var(--primary-color)] hover:text-[var(--primary-hover)] transition duration-200 text-sm"
          aria-label={`Add new ${type.toLowerCase()}`}
        >
          + Add {type}
        </button>
      )}
    </div>
  );

  return (
    <section className="p-6 bg-dark text-white" aria-label="Skills and Interests">
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg text-sm" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-900/50 text-green-300 rounded-lg text-sm" role="alert">
          {success}
        </div>
      )}
      <div className="flex flex-wrap gap-6">
        {renderSection('Your Skills', skills, setSkills, addingSkill, setAddingSkill, newSkill, setNewSkill, 'Skill')}
        {renderSection('Your Interests', interests, setInterests, addingInterest, setAddingInterest, newInterest, setNewInterest, 'Interest')}
      </div>
    </section>
  );
};

SkillsInterests.propTypes = {
  initialSkills: PropTypes.arrayOf(PropTypes.string),
  initialInterests: PropTypes.arrayOf(PropTypes.string),
};

SkillsInterests.defaultProps = {
  initialSkills: ['Machine Learning', 'Web Development', 'UI/UX Design'],
  initialInterests: ['Programming', 'Design', 'AI/ML'],
};

export default SkillsInterests;