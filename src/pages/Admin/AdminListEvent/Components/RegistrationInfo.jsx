import React, { useState } from 'react';
import { FaUserPlus, FaFileUpload, FaCheckCircle, FaQuestionCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const REGISTRATION_LABELS = {
  REQUIRE_RESUME: 'Require Resume Upload',
  REQUIRE_BASIC_INFO: 'Require Basic Info',
  REQUIRE_WEB_LINK: 'Require Web Link',
  REQUIRE_COVER_LETTER: 'Require Cover Letter',
  REQUIRE_PORTFOLIO: 'Require Portfolio Link',
};

const RegistrationInfo = ({ registrationData, setRegistrationData, errors }) => {
  const [customQuestion, setCustomQuestion] = useState('');
  const [customQuestionType, setCustomQuestionType] = useState('');
  const [mcqOptions, setMcqOptions] = useState(['', '', '', '']);
  const [numOptions, setNumOptions] = useState(4);
  const [answerType, setAnswerType] = useState('Text');
  const [showCustomQuestionInput, setShowCustomQuestionInput] = useState(false);
  const [showQuestionTypePrompt, setShowQuestionTypePrompt] = useState(false);
  const [showResumePopup, setShowResumePopup] = useState(false);
  const [showBasicInfoPopup, setShowBasicInfoPopup] = useState(false);
  const [showWebLinkPopup, setShowWebLinkPopup] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editQuestionText, setEditQuestionText] = useState('');
  const [editQuestionType, setEditQuestionType] = useState('');
  const [editMcqOptions, setEditMcqOptions] = useState(['', '', '', '']);
  const [editNumOptions, setEditNumOptions] = useState(4);
  const [editAnswerType, setEditAnswerType] = useState('Text');

  const questionTypes = ['MCQ', 'Yes/No', 'Question/Answer'];
  const answerTypes = ['Text', 'Integer', 'String'];
  const fileTypes = ['PDF', 'TXT', 'DOC', 'DOCX'];
  const basicInfoFields = ['Name', 'Email', 'Phone', 'Address'];
  const webLinkTypes = ['LinkedIn', 'GitHub', 'Portfolio', 'Other'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCustomQuestionSubmit = () => {
    if (customQuestion.trim() && !registrationData.customQuestions?.some(q => q.question === customQuestion.trim())) {
      const newQuestion = {
        question: customQuestion.trim(),
        type: customQuestionType,
        options: customQuestionType === 'MCQ' ? mcqOptions.slice(0, numOptions).filter(opt => opt.trim()) : customQuestionType === 'Yes/No' ? ['Yes', 'No'] : [],
        answerType: customQuestionType === 'Question/Answer' ? answerType : null,
      };
      setRegistrationData((prev) => ({
        ...prev,
        customQuestions: [...(prev.customQuestions || []), newQuestion],
      }));
      setCustomQuestion('');
      setCustomQuestionType('');
      setMcqOptions(['', '', '', '']);
      setNumOptions(4);
      setAnswerType('Text');
      setShowCustomQuestionInput(false);
      setShowQuestionTypePrompt(false);
      toast.success('Custom question added!');
    } else if (registrationData.customQuestions?.some(q => q.question === customQuestion.trim())) {
      toast.error('Question already exists!');
    }
  };

  const handleEditQuestionStart = (question) => {
    setEditingQuestion(question.question);
    setEditQuestionText(question.question);
    setEditQuestionType(question.type);
    setEditMcqOptions(question.options.length ? [...question.options, ...Array(4 - question.options.length).fill('')] : ['', '', '', '']);
    setEditNumOptions(question.options.length || 4);
    setEditAnswerType(question.answerType || 'Text');
  };

  const handleEditQuestionSubmit = () => {
    if (editQuestionText.trim() && !registrationData.customQuestions?.some(q => q.question === editQuestionText.trim() && q.question !== editingQuestion)) {
      const updatedQuestions = registrationData.customQuestions.map((q) =>
        q.question === editingQuestion
          ? {
              question: editQuestionText.trim(),
              type: editQuestionType,
              options: editQuestionType === 'MCQ' ? editMcqOptions.slice(0, editNumOptions).filter(opt => opt.trim()) : editQuestionType === 'Yes/No' ? ['Yes', 'No'] : [],
              answerType: editQuestionType === 'Question/Answer' ? editAnswerType : null,
            }
          : q
      );
      setRegistrationData((prev) => ({
        ...prev,
        customQuestions: updatedQuestions,
      }));
      setEditingQuestion(null);
      setEditQuestionText('');
      setEditQuestionType('');
      setEditMcqOptions(['', '', '', '']);
      setEditNumOptions(4);
      setEditAnswerType('Text');
      toast.success('Custom question updated!');
    } else if (registrationData.customQuestions?.some(q => q.question === editQuestionText.trim() && q.question !== editingQuestion)) {
      toast.error('Question already exists!');
    }
  };

  const handleEditQuestionCancel = () => {
    setEditingQuestion(null);
    setEditQuestionText('');
    setEditQuestionType('');
    setEditMcqOptions(['', '', '', '']);
    setEditNumOptions(4);
    setEditAnswerType('Text');
  };

  const removeCustomQuestion = (questionText) => {
    const updatedQuestions = registrationData.customQuestions.filter((q) => q.question !== questionText);
    setRegistrationData((prev) => ({
      ...prev,
      customQuestions: updatedQuestions,
    }));
    toast.info('Custom question removed');
  };

  const handleFileTypeChange = (type) => {
    setRegistrationData((prev) => ({
      ...prev,
      allowedFileTypes: prev.allowedFileTypes?.includes(type)
        ? prev.allowedFileTypes.filter(t => t !== type)
        : [...(prev.allowedFileTypes || []), type],
    }));
  };

  const handleBasicInfoChange = (field) => {
    setRegistrationData((prev) => ({
      ...prev,
      requiredBasicInfo: prev.requiredBasicInfo?.includes(field)
        ? prev.requiredBasicInfo.filter(f => f !== field)
        : [...(prev.requiredBasicInfo || []), field],
    }));
  };

  const handleWebLinkTypeChange = (type) => {
    setRegistrationData((prev) => ({
      ...prev,
      requiredWebLinks: prev.requiredWebLinks?.includes(type)
        ? prev.requiredWebLinks.filter(t => t !== type)
        : [...(prev.requiredWebLinks || []), type],
    }));
  };

  const updateMcqOption = (index, value) => {
    const updatedOptions = [...mcqOptions];
    updatedOptions[index] = value;
    setMcqOptions(updatedOptions);
  };

  const updateEditMcqOption = (index, value) => {
    const updatedOptions = [...editMcqOptions];
    updatedOptions[index] = value;
    setEditMcqOptions(updatedOptions);
  };

  const RegistrationIcon = () => (
    <svg
      className="text-[var(--border-accent)] w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  );

  const ResumePopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-sub-dark)] p-6 rounded-xl border border-[var(--border-accent)]/50 max-w-md w-full shadow-lg">
        <h4 className="text-xl text-white font-medium mb-4">Select Allowed File Types</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {fileTypes.map((type) => (
            <label key={type} className="flex items-center text-gray cursor-pointer">
              <input
                type="checkbox"
                checked={registrationData.allowedFileTypes?.includes(type) || false}
                onChange={() => handleFileTypeChange(type)}
                className="mr-2 accent-[var(--border-accent)] focus:ring-[var(--border-accent)]"
              />
              {type}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowResumePopup(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const BasicInfoPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-sub-dark)] p-6 rounded-xl border border-[var(--border-accent)]/50 max-w-md w-full shadow-lg">
        <h4 className="text-xl text-white font-medium mb-4">Select Required Basic Info</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {basicInfoFields.map((field) => (
            <label key={field} className="flex items-center text-gray cursor-pointer">
              <input
                type="checkbox"
                checked={registrationData.requiredBasicInfo?.includes(field) || false}
                onChange={() => handleBasicInfoChange(field)}
                className="mr-2 accent-[var(--border-accent)] focus:ring-[var(--border-accent)]"
              />
              {field}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowBasicInfoPopup(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const WebLinkPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[var(--bg-sub-dark)] p-6 rounded-xl border border-[var(--border-accent)]/50 max-w-md w-full shadow-lg">
        <h4 className="text-xl text-white font-medium mb-4">Select Required Web Links</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {webLinkTypes.map((type) => (
            <label key={type} className="flex items-center text-gray cursor-pointer">
              <input
                type="checkbox"
                checked={registrationData.requiredWebLinks?.includes(type) || false}
                onChange={() => handleWebLinkTypeChange(type)}
                className="mr-2 accent-[var(--border-accent)] focus:ring-[var(--border-accent)]"
              />
              {type}
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowWebLinkPopup(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-dark rounded-xl p-6 card mx-auto max-w-7xl">
      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <FaUserPlus className="text-[var(--border-accent)] mr-2" /> Registration Information
      </h3>

      <div className="space-y-6">
        {/* Registration Requirements */}
        <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 p-4">
          <div className="flex items-center gap-3 mb-4">
            <FaQuestionCircle className="text-[var(--border-accent)] w-5 h-5" />
            <h4 className="text-xl text-white font-medium">Registration Requirements</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center text-gray cursor-pointer">
              <input
                type="checkbox"
                name="requireResume"
                checked={registrationData.requireResume || false}
                onChange={(e) => {
                  handleInputChange(e);
                  if (e.target.checked) setShowResumePopup(true);
                }}
                className="mr-2 accent-[var(--border-accent)] focus:ring-[var(--border-accent)]"
                aria-label={REGISTRATION_LABELS.REQUIRE_RESUME}
              />
              {REGISTRATION_LABELS.REQUIRE_RESUME}
            </label>
            <label className="flex items-center text-gray cursor-pointer">
              <input
                type="checkbox"
                name="requireBasicInfo"
                checked={registrationData.requiredBasicInfo?.length > 0 || false}
                onChange={(e) => {
                  if (e.target.checked) setShowBasicInfoPopup(true);
                  else setRegistrationData((prev) => ({ ...prev, requiredBasicInfo: [] }));
                }}
                className="mr-2 accent-[var(--border-accent)] focus:ring-[var(--border-accent)]"
                aria-label={REGISTRATION_LABELS.REQUIRE_BASIC_INFO}
              />
              {REGISTRATION_LABELS.REQUIRE_BASIC_INFO}
            </label>
            <label className="flex items-center text-gray cursor-pointer">
              <input
                type="checkbox"
                name="requireWebLink"
                checked={registrationData.requiredWebLinks?.length > 0 || false}
                onChange={(e) => {
                  if (e.target.checked) setShowWebLinkPopup(true);
                  else setRegistrationData((prev) => ({ ...prev, requiredWebLinks: [] }));
                }}
                className="mr-2 accent-[var(--border-accent)] focus:ring-[var(--border-accent)]"
                aria-label={REGISTRATION_LABELS.REQUIRE_WEB_LINK}
              />
              {REGISTRATION_LABELS.REQUIRE_WEB_LINK}
            </label>
            <label className="flex items-center text-gray cursor-pointer">
              <input
                type="checkbox"
                name="requireCoverLetter"
                checked={registrationData.requireCoverLetter || false}
                onChange={handleInputChange}
                className="mr-2 accent-[var(--border-accent)] focus:ring-[var(--border-accent)]"
                aria-label={REGISTRATION_LABELS.REQUIRE_COVER_LETTER}
              />
              {REGISTRATION_LABELS.REQUIRE_COVER_LETTER}
            </label>
            <label className="flex items-center text-gray cursor-pointer">
              <input
                type="checkbox"
                name="requirePortfolio"
                checked={registrationData.requirePortfolio || false}
                onChange={handleInputChange}
                className="mr-2 accent-[var(--border-accent)] focus:ring-[var(--border-accent)]"
                aria-label={REGISTRATION_LABELS.REQUIRE_PORTFOLIO}
              />
              {REGISTRATION_LABELS.REQUIRE_PORTFOLIO}
            </label>
          </div>
        </div>

        {/* Custom Registration Questions */}
        <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 p-4 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <RegistrationIcon />
            <h4 className="text-xl text-white font-medium">Custom Registration Questions</h4>
          </div>
          <button
            type="button"
            onClick={() => setShowQuestionTypePrompt(true)}
            className="mb-4 px-3 py-1 rounded-full text-sm bg-gray-700 text-gray-300 hover:bg-[var(--border-accent)]/80 transition-all duration-200"
            aria-label="Add custom question"
          >
            + Add Custom Question
          </button>
          {registrationData.customQuestions?.length > 0 && (
            <div className="space-y-4">
              {registrationData.customQuestions.map((question) => (
                <div
                  key={question.question}
                  className="p-4 bg-[var(--bg-sub-dark)] rounded-lg border border-[var(--border-accent)]/20"
                >
                  {editingQuestion === question.question ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editQuestionText}
                        onChange={(e) => setEditQuestionText(e.target.value)}
                        className="w-full p-3 bg-sub-dark text-white placeholder-gray-400 border border-[var(--border-accent)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200"
                        placeholder="Edit question"
                        aria-label="Edit custom question"
                      />
                      {editQuestionType === 'MCQ' && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-gray-300 text-sm">Number of Options:</label>
                            <select
                              value={editNumOptions}
                              onChange={(e) => setEditNumOptions(parseInt(e.target.value))}
                              className="p-2 bg-sub-dark text-white border border-[var(--border-accent)]/50 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200"
                            >
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {editMcqOptions.slice(0, editNumOptions).map((option, index) => (
                              <input
                                key={index}
                                type="text"
                                value={option}
                                onChange={(e) => updateEditMcqOption(index, e.target.value)}
                                className="w-full p-3 bg-sub-dark text-white placeholder-gray-400 border border-[var(--border-accent)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200"
                                placeholder={`Option ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {editQuestionType === 'Yes/No' && (
                        <div className="text-gray-300 text-sm">Options: Yes, No (predefined)</div>
                      )}
                      {editQuestionType === 'Question/Answer' && (
                        <div className="flex items-center gap-2">
                          <label className="text-gray-300 text-sm">Answer Type:</label>
                          <select
                            value={editAnswerType}
                            onChange={(e) => setEditAnswerType(e.target.value)}
                            className="p-3 bg-sub-dark text-white border border-[var(--border-accent)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200"
                          >
                            {answerTypes.map((type) => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={handleEditQuestionSubmit}
                          className="px-4 py-2 bg-[var(--border-accent)] text-white rounded-xl hover:bg-[var(--border-accent)]/80 transition-all duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleEditQuestionCancel}
                          className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h5 className="text-white text-sm font-medium">{question.question}</h5>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditQuestionStart(question)}
                            className="p-1.5 text-[var(--border-accent)] hover:bg-[var(--border-accent)]/20 rounded-full transition-all duration-200"
                            aria-label={`Edit ${question.question}`}
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeCustomQuestion(question.question)}
                            className="p-1.5 text-red-500 hover:bg-red-500/20 rounded-full transition-all duration-200"
                            aria-label={`Remove ${question.question}`}
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">Type: {question.type}</p>
                      {question.options.length > 0 && (
                        <p className="text-gray-300 text-sm">
                          Options: {question.options.join(', ')}
                        </p>
                      )}
                      {question.answerType && (
                        <p className="text-gray-300 text-sm">Answer Type: {question.answerType}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {showQuestionTypePrompt && !showCustomQuestionInput && (
            <div className="mt-4">
              <select
                value={customQuestionType}
                onChange={(e) => {
                  setCustomQuestionType(e.target.value);
                  setShowQuestionTypePrompt(false);
                  setShowCustomQuestionInput(true);
                }}
                className="w-full p-3 bg-sub-dark text-white border border-[var(--border-accent)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200 shadow-sm"
              >
                <option value="">Select Question Type</option>
                {questionTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button
                onClick={() => setShowQuestionTypePrompt(false)}
                className="mt-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          )}
          {showCustomQuestionInput && (
            <div className="mt-4 space-y-4 p-4 bg-[var(--bg-sub-dark)] rounded-xl border border-[var(--border-accent)]/50 shadow-md">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="w-full p-3 bg-sub-dark text-white placeholder-gray-400 border border-[var(--border-accent)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200"
                  placeholder="Enter question (e.g., What is your experience level?)"
                  aria-label="Custom question input"
                />
              </div>
              {customQuestionType === 'MCQ' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-300 text-sm">Number of Options:</label>
                    <select
                      value={numOptions}
                      onChange={(e) => setNumOptions(parseInt(e.target.value))}
                      className="p-2 bg-sub-dark text-white border border-[var(--border-accent)]/50 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200"
                    >
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {mcqOptions.slice(0, numOptions).map((option, index) => (
                      <div key={index} className="p-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateMcqOption(index, e.target.value)}
                          className="w-full p-3 bg-sub-dark text-white placeholder-gray-400 border border-[var(--border-accent)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200"
                          placeholder={`Option ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {customQuestionType === 'Yes/No' && (
                <div className="text-gray-300 text-sm">Options: Yes, No (predefined)</div>
              )}
              {customQuestionType === 'Question/Answer' && (
                <div className="flex items-center gap-2">
                  <label className="text-gray-300 text-sm">Answer Type:</label>
                  <select
                    value={answerType}
                    onChange={(e) => setAnswerType(e.target.value)}
                    className="p-3 bg-sub-dark text-white border border-[var(--border-accent)]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] transition duration-200"
                  >
                    {answerTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomQuestionInput(false);
                    setShowQuestionTypePrompt(false);
                    setCustomQuestion('');
                    setCustomQuestionType('');
                    setMcqOptions(['', '', '', '']);
                    setNumOptions(4);
                    setAnswerType('Text');
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCustomQuestionSubmit}
                  className="px-4 py-2 bg-[var(--border-accent)] text-white rounded-xl hover:bg-[var(--border-accent)]/80 transition-all duration-200"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Instructions */}
        <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 p-4">
          <div className="flex items-center gap-3 mb-4">
            <FaFileUpload className="text-[var(--border-accent)] w-5 h-5" />
            <h4 className="text-xl text-white font-medium">Additional Instructions</h4>
          </div>
          <textarea
            name="instructions"
            value={registrationData.instructions || ''}
            onChange={handleInputChange}
            maxLength={500}
            className="w-full bg-sub-dark p-3 rounded-xl text-white placeholder-gray border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] h-32 resize-y transition duration-200"
            placeholder="Provide any additional instructions for registrants..."
            aria-label="Registration instructions"
          />
          <div className="flex justify-between mt-2 text-sm text-gray">
            {errors.instructions ? (
              <p className="text-red-500">{errors.instructions}</p>
            ) : (
              <span>Additional guidance for registrants.</span>
            )}
            <span>{(registrationData.instructions || '').length}/500</span>
          </div>
        </div>
      </div>

      {showResumePopup && <ResumePopup />}
      {showBasicInfoPopup && <BasicInfoPopup />}
      {showWebLinkPopup && <WebLinkPopup />}
    </section>
  );
};

export default RegistrationInfo;