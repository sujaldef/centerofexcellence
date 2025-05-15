import React, { useState } from 'react';

const FooterButtons = ({ handleClick }) => {
  const [isLoading, setIsLoading] = useState({ preview: false, draft: false, publish: false });

  // SVG for Save Icon
  const SaveIcon = () => (
    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );

  // SVG for Preview Icon
  const PreviewIcon = () => (
    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  // SVG for Publish Icon
  const PublishIcon = () => (
    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );

  const onClick = (action) => {
    setIsLoading((prev) => ({ ...prev, [action.toLowerCase().replace(' ', '')]: true }));
    setTimeout(() => {
      handleClick(action);
      console.log(`${action} successful`);
      setIsLoading((prev) => ({ ...prev, [action.toLowerCase().replace(' ', '')]: false }));
    }, 1000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark border-t border-[var(--border-accent)]/50 p-4 flex justify-end gap-4 shadow-xl">
      <button
        onClick={() => onClick('Save Draft')}
        className="btn-secondary"
        disabled={isLoading.draft}
      >
        <SaveIcon />
        {isLoading.draft ? 'Saving...' : 'Save Draft'}
      </button>
      <button
        onClick={() => onClick('Preview Event')}
        className="btn-secondary"
        disabled={isLoading.preview}
      >
        <PreviewIcon />
        {isLoading.preview ? 'Loading...' : 'Preview Event'}
      </button>
      <button
        onClick={() => onClick('Publish Changes')}
        className="btn-primary"
        disabled={isLoading.publish}
      >
        <PublishIcon />
        {isLoading.publish ? 'Publishing...' : 'Publish Changes'}
      </button>
    </div>
  );
};

export default FooterButtons;