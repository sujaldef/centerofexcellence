import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SkillsInterests = ({ initialSkills = [], initialInterests = [] }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [interests, setInterests] = useState(initialInterests);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [addingSkill, setAddingSkill] = useState(false);
  const [addingInterest, setAddingInterest] = useState(false);

  const handleAddItem = (type, value, setItems, setInput, setAdding) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    setItems((prev) => [...prev, trimmedValue]);
    setInput('');
    setAdding(false);
  };

  const handleRemoveItem = (index, setItems) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
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
    <div className="flex-1">
      <h3 className="text-sm font-medium text-gray-300 mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center bg-sub-dark px-3 py-1 rounded-full text-white border border-[var(--border-accent)]"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemoveItem(index, setItems)}
              className="ml-2 text-white hover:text-red-400 transition duration-200 text-sm"
              aria-label={`Remove ${item}`}
            >
              ×
            </button>
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
          className="mt-2 w-full bg-sub-dark border border-[var(--border-accent)] text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition duration-200"
          placeholder={`Enter a new ${type.toLowerCase()}`}
          autoFocus
          aria-label={`Enter new ${type.toLowerCase()}`}
        />
      ) : (
        <button
          type="button"
          onClick={() => setAdding(true)}
          className="mt-2 text-[var(--primary-color)] hover:text-[#8E24AA] transition duration-200 text-sm"
          aria-label={`Add new ${type.toLowerCase()}`}
        >
          + Add {type}
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {renderSection('Skills', skills, setSkills, addingSkill, setAddingSkill, newSkill, setNewSkill, 'Skill')}
      {renderSection('Interests', interests, setInterests, addingInterest, setAddingInterest, newInterest, setNewInterest, 'Interest')}
    </div>
  );
};

SkillsInterests.propTypes = {
  initialSkills: PropTypes.arrayOf(PropTypes.string),
  initialInterests: PropTypes.arrayOf(PropTypes.string),
};

export default SkillsInterests;
