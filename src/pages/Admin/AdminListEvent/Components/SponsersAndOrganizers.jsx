import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaImage, FaTimes } from 'react-icons/fa';

const SponsersAndOrganizers = ({ formData, handleInputChange, errors }) => {
  const [sponsorInputs, setSponsorInputs] = useState(
    formData.sponsors && formData.sponsors.length > 0
      ? formData.sponsors
      : [{ name: '', logo: null }]
  );

  const UsersIcon = () => (
    <svg
      className="text-[var(--border-accent)] w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const MailIcon = () => (
    <svg
      className="text-[var(--border-accent)] w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      className="text-[var(--border-accent)] w-5 h-5 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  const handleSponsorChange = (index, field, value) => {
    const updatedSponsors = [...sponsorInputs];
    updatedSponsors[index] = { ...updatedSponsors[index], [field]: value };
    setSponsorInputs(updatedSponsors);
    handleInputChange({ target: { name: 'sponsors', value: updatedSponsors } });
  };

  const handleSponsorLogoChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      handleSponsorChange(index, 'logo', file);
      toast.success(`Sponsor ${index + 1} logo uploaded!`);
    }
  };

  const removeSponsorLogo = (index) => {
    handleSponsorChange(index, 'logo', null);
    toast.info(`Sponsor ${index + 1} logo removed`);
  };

  const addSponsor = () => {
    const newSponsors = [...sponsorInputs, { name: '', logo: null }];
    setSponsorInputs(newSponsors);
    handleInputChange({ target: { name: 'sponsors', value: newSponsors } });
    toast.success('New sponsor field added!');
  };

  const removeSponsor = (index) => {
    if (sponsorInputs.length === 1) {
      toast.error('At least one sponsor field is required!');
      return;
    }
    const updatedSponsors = sponsorInputs.filter((_, i) => i !== index);
    setSponsorInputs(updatedSponsors);
    handleInputChange({ target: { name: 'sponsors', value: updatedSponsors } });
    toast.success('Sponsor field removed!');
  };

  return (
    <section className="bg-dark rounded-xl p-6 card mx-auto max-w-7xl">
      <h3 className="text-lg font-semibold text-white mb-6">Sponsors and Organizers</h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium text-white mb-4">Sponsors</h4>
          {sponsorInputs.map((sponsor, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
                <UsersIcon />
                <input
                  name={`sponsor-name-${index}`}
                  value={sponsor.name}
                  onChange={(e) => handleSponsorChange(index, 'name', e.target.value)}
                  className="w-full p-3 bg-transparent text-white placeholder-gray transition-all duration-200"
                  placeholder="Enter sponsor name"
                  aria-label={`Sponsor ${index + 1} name`}
                />
              </div>
              <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
                <FaImage className="text-[var(--border-accent)] w-5 h-5 mr-2" />
                {sponsor.logo ? (
                  <div className="flex items-center gap-2">
                    <span className="text-white truncate">{sponsor.logo.name}</span>
                    <button
                      onClick={() => removeSponsorLogo(index)}
                      className="btn-danger p-1.5 rounded-full"
                    >
                      <FaTimes size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer inline-flex items-center gap-2 text-sm text-[var(--border-accent)]">
                    Upload Logo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSponsorLogoChange(index, e)}
                      className="hidden"
                      aria-label={`Upload logo for sponsor ${index + 1}`}
                    />
                  </label>
                )}
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => removeSponsor(index)}
                  className="px-3 py-1 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200"
                  aria-label={`Remove sponsor ${index + 1}`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSponsor}
            className="mt-2 px-3 py-1 bg-[var(--border-accent)] text-white rounded-xl hover:bg-[var(--border-accent)]/80 transition-all duration-200"
            aria-label="Add new sponsor"
          >
            + Add Sponsor
          </button>
          {errors.sponsors && (
            <p className="text-red-500 text-sm animate-fadeIn mt-2">{errors.sponsors}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
            <UsersIcon />
            <input
              name="organizer"
              value={formData.organizer || ''}
              onChange={handleInputChange}
              className="w-full p-3 bg-transparent text-white placeholder-gray transition-all duration-200"
              placeholder="Enter organizer name"
              aria-label="Organizer name"
            />
          </div>
        </div>
        {errors.organizer && (
          <p className="text-red-500 text-sm animate-fadeIn">{errors.organizer}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
            <MailIcon />
            <input
              name="eventContact.email"
              value={formData.eventContact?.email || ''}
              onChange={handleInputChange}
              className="w-full p-3 bg-transparent text-white placeholder-gray transition-all duration-200"
              placeholder="Enter contact email"
              aria-label="Organizer contact email"
            />
          </div>
          <div className="relative bg-sub-dark rounded-xl border border-[var(--border-accent)]/50 flex items-center px-4 py-2">
            <PhoneIcon />
            <input
              name="eventContact.phone"
              value={formData.eventContact?.phone || ''}
              onChange={handleInputChange}
              className="w-full p-3 bg-transparent text-white placeholder-gray transition-all duration-200"
              placeholder="Enter contact phone number"
              aria-label="Organizer contact phone number"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-1">
          {errors.eventContact?.email && (
            <p className="text-red-500 text-sm animate-fadeIn">{errors.eventContact.email}</p>
          )}
          {errors.eventContact?.phone && (
            <p className="text-red-500 text-sm animate-fadeIn">{errors.eventContact.phone}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SponsersAndOrganizers;