import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEventById, registerForEvent } from '../../../../redux/slices/eventSlice'; // Adjusted path
import { toast } from 'react-toastify';
import { FaFileUpload, FaLink, FaQuestionCircle } from 'react-icons/fa';

const RegistrationForm = ({ eventId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedEvent, loading, error } = useSelector((state) => state.events);
  const user = useSelector((state) => state.user?.user); // Changed from userSlice to user, added fallback

  const [registrationData, setRegistrationData] = useState({
    resume: null,
    basicInfo: {},
    webLinks: {},
    portfolio: '',
    customAnswers: [],
  });

  useEffect(() => {
    if (!eventId || !/^[0-9a-fA-F]{24}$/.test(eventId)) {
      toast.error('Invalid event ID');
      navigate('/events');
      return;
    }
    dispatch(fetchEventById(eventId));
  }, [dispatch, eventId, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleInputChange = (e, field, subField, index) => {
    const { value } = e.target;
    if (field === 'basicInfo' || field === 'webLinks') {
      setRegistrationData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [subField]: value },
      }));
    } else if (field === 'customAnswers') {
      setRegistrationData((prev) => {
        const updatedAnswers = [...prev.customAnswers];
        updatedAnswers[index] = { index, answer: value };
        return { ...prev, customAnswers: updatedAnswers };
      });
    } else {
      setRegistrationData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleFileChange = (e) => {
    setRegistrationData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) {
      toast.error('Please log in to register');
      navigate('/login');
      return;
    }

    try {
      const registrationPayload = {
        event_id: eventId,
        user_id: user._id,
        answers: registrationData.customAnswers.filter((answer) => answer.answer),
      };
      await dispatch(
        registerForEvent({
          eventId,
          userId: user._id,
          registrationData: {
            resume: registrationData.resume,
            basicInfo: registrationData.basicInfo,
            webLinks: registrationData.webLinks,
            portfolio: registrationData.portfolio,
            customAnswers: registrationData.customAnswers.reduce((acc, answer) => {
              if (selectedEvent.customQuestions[answer.index]) {
                acc[selectedEvent.customQuestions[answer.index].question] = answer.answer;
              }
              return acc;
            }, {}),
          },
        })
      ).unwrap();

      toast.success('Successfully registered for the event!');
      navigate(`/event/${eventId}`);
    } catch (err) {
      toast.error(err.message || 'Failed to register');
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!selectedEvent) {
    return <div className="text-center text-white">Event not found</div>;
  }

  return (
    <div className="md:w-3/5 bg-black text-white p-10 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <h2 className="text-4xl font-bold text-left text-white mb-4">
          Register for {selectedEvent.eventName}
        </h2>
        <p className="text-center text-white">
          Please fill in your details to register for the event
        </p>

        {/* Resume Upload */}
        {selectedEvent.requireResume && (
          <div>
            <label className="text-sm font-medium text-white flex items-center gap-2">
              <FaFileUpload /> Resume ({selectedEvent.allowedFileTypes.join(', ')})
            </label>
            <input
              type="file"
              accept={selectedEvent.allowedFileTypes.map((ext) => `.${ext.toLowerCase()}`).join(',')}
              onChange={handleFileChange}
              className="mt-1 w-full p-2 bg-[#222222] rounded-md text-white"
              required
            />
          </div>
        )}

        {/* Basic Info */}
        {selectedEvent.requireBasicInfo && selectedEvent.requiredBasicInfo.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-white">Basic Information</label>
            {selectedEvent.requiredBasicInfo.map((field) => (
              <div key={field} className="mt-2">
                <input
                  type={field.toLowerCase() === 'email' ? 'email' : 'text'}
                  value={registrationData.basicInfo[field.toLowerCase()] || ''}
                  onChange={(e) => handleInputChange(e, 'basicInfo', field.toLowerCase())}
                  placeholder={`Enter ${field}`}
                  className="w-full p-2 bg-[#222222] rounded-md text-white"
                  required
                />
              </div>
            ))}
          </div>
        )}

        {/* Web Links */}
        {selectedEvent.requireWebLink && selectedEvent.requiredWebLinks.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-white">Web Links</label>
            {selectedEvent.requiredWebLinks.map((linkType) => (
              <div key={linkType} className="mt-2">
                <input
                  type="url"
                  value={registrationData.webLinks[linkType.toLowerCase()] || ''}
                  onChange={(e) => handleInputChange(e, 'webLinks', linkType.toLowerCase())}
                  placeholder={`Enter ${linkType} URL`}
                  className="w-full p-2 bg-[#222222] rounded-md text-white"
                  required
                />
              </div>
            ))}
          </div>
        )}

        {/* Portfolio */}
        {selectedEvent.requirePortfolio && (
          <div>
            <label className="text-sm font-medium text-white flex items-center gap-2">
              <FaLink /> Portfolio Link
            </label>
            <input
              type="url"
              value={registrationData.portfolio}
              onChange={(e) => handleInputChange(e, 'portfolio')}
              placeholder="Enter portfolio URL"
              className="mt-1 w-full p-2 bg-[#222222] rounded-md text-white"
              required
            />
          </div>
        )}

        {/* Custom Questions */}
        {selectedEvent.customQuestions.length > 0 && (
          <div>
            <label className="text-sm font-medium text-white flex items-center gap-2">
              <FaQuestionCircle /> Custom Questions
            </label>
            {selectedEvent.customQuestions.map((question, index) => (
              <div key={question.question} className="mt-2">
                <label className="text-white">{question.question}</label>
                {question.type === 'MCQ' && (
                  <select
                    value={registrationData.customAnswers[index]?.answer || ''}
                    onChange={(e) => handleInputChange(e, 'customAnswers', question.question, index)}
                    className="w-full p-2 bg-[#222222] rounded-md text-white"
                    required
                  >
                    <option value="">Select an option</option>
                    {question.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
                {question.type === 'Yes/No' && (
                  <select
                    value={registrationData.customAnswers[index]?.answer || ''}
                    onChange={(e) => handleInputChange(e, 'customAnswers', question.question, index)}
                    className="w-full p-2 bg-[#222222] rounded-md text-white"
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                )}
                {question.type === 'Question/Answer' && (
                  <input
                    type={question.answerType === 'Integer' ? 'number' : 'text'}
                    value={registrationData.customAnswers[index]?.answer || ''}
                    onChange={(e) => handleInputChange(e, 'customAnswers', question.question, index)}
                    placeholder="Enter your answer"
                    className="w-full p-2 bg-[#222222] rounded-md text-white"
                    required
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        {selectedEvent.instructions && (
          <div>
            <label className="block text-sm font-medium text-white">Instructions</label>
            <p className="text-gray-300">{selectedEvent.instructions}</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 btn-primary text-white"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Submit Registration'}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;