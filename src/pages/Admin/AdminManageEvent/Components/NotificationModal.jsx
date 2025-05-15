import React, { useState } from 'react';
import { BsTextLeft, BsImage } from 'react-icons/bs';

const NotificationModal = ({ isNotificationModalOpen, setIsNotificationModalOpen, handlePostNotification }) => {
  const [notificationType, setNotificationType] = useState('text');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [posterFile, setPosterFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPosterFile(file);
      setError('');
    } else {
      setError('Please upload a valid image file.');
    }
  };

  const onPost = () => {
    if (notificationType === 'text' && !notificationMessage.trim()) {
      setError('Please enter a notification message.');
      return;
    }
    if (notificationType === 'poster' && !posterFile && !notificationMessage.trim()) {
      setError('Please upload a poster or enter a message.');
      return;
    }

    handlePostNotification({
      message: notificationMessage,
      poster: posterFile,
      type: notificationType,
    });
    setNotificationMessage('');
    setPosterFile(null);
    setIsNotificationModalOpen(false);
    setError('');
    console.log('Notification posted');
  };

  return (
    <>
      {isNotificationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-dark p-6 rounded-xl shadow-xl max-w-3xl w-full card">
            <h2 className="text-2xl font-semibold text-white mb-6">Post New Notification</h2>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray mb-2">Notification Type</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="notificationType"
                    value="text"
                    checked={notificationType === 'text'}
                    onChange={() => setNotificationType('text')}
                    className="form-radio text-[var(--border-accent)] focus:ring-[var(--border-accent)]"
                  />
                  <BsTextLeft className="text-gray" />
                  <span className="text-gray">Textual</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="notificationType"
                    value="poster"
                    checked={notificationType === 'poster'}
                    onChange={() => setNotificationType('poster')}
                    className="form-radio text-[var(--border-accent)] focus:ring-[var(--border-accent)]"
                  />
                  <BsImage className="text-gray" />
                  <span className="text-gray">Poster</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {notificationType === 'poster' && (
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray mb-2">Upload Poster</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-3 rounded-lg bg-sub-dark text-white border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[var(--border-accent)] file:text-white file:hover:bg-[var(--primary-color)]"
                  />
                  {posterFile && (
                    <p className="text-gray text-sm mt-2">Selected: {posterFile.name}</p>
                  )}
                </div>
              )}

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray mb-2">
                  {notificationType === 'text' ? 'Message' : 'Accompanying Text (Optional)'}
                </label>
                <textarea
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder={notificationType === 'text' ? 'Enter your notification message...' : 'Enter text to accompany the poster...'}
                  className="w-full p-3 rounded-lg bg-sub-dark text-white border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] resize-none"
                  rows="4"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setIsNotificationModalOpen(false);
                  setNotificationMessage('');
                  setPosterFile(null);
                  setError('');
                  console.log('Notification modal closed');
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={onPost}
                className="btn-primary"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;