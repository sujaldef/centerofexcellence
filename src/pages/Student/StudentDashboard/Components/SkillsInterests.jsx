import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FiPlus, FiX, FiCpu, FiHash } from 'react-icons/fi'; // Icons for context
import { updateUser } from '../../../../redux/slices/userSlice';

const SkillsInterests = ({ initialSkills = [], initialInterests = [], userId }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [interests, setInterests] = useState(initialInterests);
  
  // Single handler for adding items to keep code DRY
  const dispatch = useDispatch();

  const handleUpdate = async (type, newItems) => {
    if (!userId) return; // Add error handling toast here if needed
    
    try {
      const userData = type === 'Skill' ? { skills: newItems } : { interests: newItems };
      await dispatch(updateUser({ userId, userData })).unwrap();
    } catch (error) {
      console.error("Update failed", error);
      // Revert logic would go here in a full app
    }
  };

  return (
    <section className="px-6 mb-8 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TagSection 
          title="Technical Skills" 
          icon={FiCpu}
          items={skills} 
          setItems={setSkills} 
          onUpdate={(items) => handleUpdate('Skill', items)}
          placeholder="Add a skill (e.g. React)..."
        />
        <TagSection 
          title="Areas of Interest" 
          icon={FiHash}
          items={interests} 
          setItems={setInterests} 
          onUpdate={(items) => handleUpdate('Interest', items)}
          placeholder="Add an interest (e.g. AI)..."
        />
      </div>
    </section>
  );
};

// --- Sub-Component: Tag Manager ---

const TagSection = ({ title, icon: Icon, items, setItems, onUpdate, placeholder }) => {
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    const val = inputValue.trim();
    if (val && !items.includes(val)) {
      const newItems = [...items, val];
      setItems(newItems);
      onUpdate(newItems);
      setInputValue('');
    }
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    onUpdate(newItems);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="bg-[#0a0a1a] border border-white/10 rounded-xl p-6 flex flex-col h-full shadow-lg">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
        <div className="p-2 bg-white/5 rounded-lg text-purple-400">
          <Icon size={18} />
        </div>
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">{title}</h3>
        <span className="ml-auto text-xs text-gray-500 font-mono">{items.length} ITEMS</span>
      </div>

      {/* Tags Container */}
      <div className="flex flex-wrap gap-2 mb-4">
        {items.map((item, index) => (
          <span 
            key={`${item}-${index}`} 
            className="group flex items-center gap-2 pl-3 pr-2 py-1.5 bg-[#151520] border border-white/10 text-gray-300 text-sm rounded-md transition-all hover:border-purple-500/50 hover:text-white"
          >
            {item}
            <button
              onClick={() => removeItem(index)}
              className="p-0.5 rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
              aria-label={`Remove ${item}`}
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Input Area (Pinned to bottom logic if needed, but here flows naturally) */}
      <div className="mt-auto pt-2 relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-purple-500 transition-colors">
          <FiPlus size={16} />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addItem}
          placeholder={placeholder}
          className="w-full bg-[#0f0f16] text-gray-200 text-sm py-3 pl-10 pr-4 rounded-lg border border-white/5 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 focus:outline-none transition-all placeholder-gray-600"
        />
      </div>
    </div>
  );
};

SkillsInterests.propTypes = {
  initialSkills: PropTypes.arrayOf(PropTypes.string),
  initialInterests: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
};

export default SkillsInterests;