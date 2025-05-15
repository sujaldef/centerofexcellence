import { useState } from "react";
import BasicInformation from "./Components/BasicInformation";
import EventMedia from "./Components/EventMedia";
import EventDescription from "./Components/EventDescription";
import Schedule from "./Components/Schedule";
import SpeakersOrganizers from "./Components/SpeakersOrganizers";
import FAQ from "./Components/FAQ";
import RegistrationInfo from "./Components/RegistrationInfo";
import { toast, ToastContainer } from "react-toastify";
import SponsersAndOrganizers from "./Components/SponsersAndOrganizers";
const AddNewEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    date: "",
    type: "Physical",
    location: "",
    description: "",
  });
  const [eventImage, setEventImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [speakers, setSpeakers] = useState([
    { type: "Speaker", name: "", role: "", bio: "", link: "", image: "" },
  ]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [registrationData, setRegistrationData] = useState({
    requireResume: false,
    requireCoverLetter: false,
    requirePortfolio: false,
    customFields: [],
    instructions: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (idx, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleScheduleChange(idx, "image", reader.result);
        toast.success("Schedule image uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (idx) => {
    handleScheduleChange(idx, "image", "");
    toast.info("Schedule image removed");
  };

  const handleScheduleChange = (idx, field, value) => {
    setSchedules((prev) =>
      prev.map((entry, i) =>
        i === idx ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addSchedule = () => {
    const newSchedule = {
      title: "",
      startTime: "",
      endTime: "",
      date: "",
      location: "",
      description: "",
      image: "",
    };
    setSchedules((prev) => [...prev, newSchedule]);
    toast.info("Schedule entry added");
  };

  const deleteSchedule = (idx) => {
    setSchedules((prev) => prev.filter((_, i) => i !== idx));
    toast.info("Schedule entry removed");
  };

  const handleEventImageChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result);
        toast.success(`${setter === setEventImage ? "Event Image" : "Thumbnail"} uploaded!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeEventImage = (setter) => {
    setter(null);
    toast.info("Image removed");
  };

  const handleSpeakerImage = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSpeakerChange(idx, "image", reader.result);
        toast.success("Speaker image uploaded!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpeakerChange = (idx, field, value) => {
    const updated = [...speakers];
    if (field === "bio" && value.length > 200) return;
    updated[idx][field] = value;
    setSpeakers(updated);
  };

  const addSpeaker = (type) => {
    let newSpeaker;
    switch (type) {
      case "Speaker":
        newSpeaker = { type, name: "", role: "", bio: "", link: "", image: "" };
        break;
      case "Chief Guest":
        newSpeaker = {
          type,
          name: "",
          designation: "",
          intro: "",
          link: "",
          image: "",
        };
        break;
      case "Keynote":
        newSpeaker = {
          type,
          title: "",
          speakerName: "",
          description: "",
          image: "",
        };
        break;
      case "Announcements":
        newSpeaker = { type, title: "", message: "", date: "", image: "" };
        break;
      case "Workshop":
        newSpeaker = {
          type,
          title: "",
          facilitator: "",
          description: "",
          schedule: "",
          image: "",
        };
        break;
      case "Discussion":
        newSpeaker = {
          type,
          title: "",
          moderator: "",
          topic: "",
          panelists: "",
          image: "",
        };
        break;
      case "Custom":
        newSpeaker = {
          type,
          customType: "",
          title: "",
          description: "",
          image: "",
        };
        break;
      default:
        return;
    }
    setSpeakers((prev) => [...prev, newSpeaker]);
    toast.info("Speaker added");
  };

  const deleteSpeaker = (idx) => {
    setSpeakers(speakers.filter((_, i) => i !== idx));
    toast.info("Speaker removed");
  };

  const handleFaqChange = (idx, field, value) => {
    const updated = [...faqs];
    updated[idx][field] = value;
    setFaqs(updated);
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
    toast.info("FAQ added");
  };

  const deleteFaq = (idx) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
    toast.info("FAQ removed");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Event name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!registrationData.instructions && (registrationData.requireResume || registrationData.requireCoverLetter || registrationData.requirePortfolio || registrationData.customFields?.length > 0)) {
      newErrors.instructions = "Instructions are required when additional registration fields are specified";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveDraft = () => {
    if (validateForm()) {
      localStorage.setItem("eventDraft", JSON.stringify({ formData, eventImage, thumbnail, schedules, speakers, faqs, registrationData }));
      toast.success("Event saved as draft!");
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const publishEvent = () => {
    if (validateForm()) {
      console.log("Publishing event:", { formData, eventImage, thumbnail, schedules, speakers, faqs, registrationData });
      toast.success("Event published!");
    } else {
      toast.error("Please fill all required fields");
    }
  };

  // SVG for Save Icon
  const SaveIcon = () => (
    <svg
      className="w-4 h-4 mr-2 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );

  // SVG for Publish Icon
  const PublishIcon = () => (
    <svg
      className="w-4 h-4 mr-2 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );

  // SVG for Cancel Icon
  const CancelIcon = () => (
    <svg
      className="w-4 h-4 mr-2 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-dark text-white p-6 sm:p-8 space-y-12 font-sans">
      <ToastContainer />
      <div className="flex justify-center">
        <div className="w-full max-w-5xl bg-dark rounded-xl p-6 card flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-white tracking-tight">
            Add New Event
          </h2>
          <button
            onClick={saveDraft}
            className="btn-primary flex items-center px-4 py-2"
            title="Save as Draft"
          >
            <SaveIcon />
            Save Draft
          </button>
        </div>
      </div>

      <BasicInformation
        formData={formData}
        handleInputChange={handleInputChange}
        errors={errors}
      />
      <EventMedia
        eventImage={eventImage}
        thumbnail={thumbnail}
        handleImageChange={handleEventImageChange}
        removeImage={removeEventImage}
        setEventImage={setEventImage}
        setThumbnail={setThumbnail}
      />
      <EventDescription
        formData={formData}
        handleInputChange={handleInputChange}
        errors={errors}
      />
      <Schedule
        schedules={schedules}
        handleScheduleChange={handleScheduleChange}
        handleImageChange={handleImageChange}
        addSchedule={addSchedule}
        deleteSchedule={deleteSchedule}
        removeImage={removeImage}
      />
      <SpeakersOrganizers
        speakers={speakers}
        handleSpeakerChange={handleSpeakerChange}
        handleSpeakerImage={handleSpeakerImage}
        addSpeaker={addSpeaker}
        deleteSpeaker={deleteSpeaker}
      />
      <SponsersAndOrganizers
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
      <FAQ
        faqs={faqs}
        handleFaqChange={handleFaqChange}
        addFaq={addFaq}
        deleteFaq={deleteFaq}
      />
      <RegistrationInfo
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
        errors={errors}
      />

      <div className="w-full bg-dark p-4 flex justify-end gap-4">
        <button
          onClick={() => toast.info("Cancelled")}
          className="btn-secondary flex items-center px-6 py-2"
        >
          <CancelIcon />
          Cancel
        </button>
        <button
          onClick={publishEvent}
          className="btn-primary flex items-center px-6 py-2"
        >
          <PublishIcon />
          Publish Event
        </button>
      </div>
    </div>
  );
};

export default AddNewEvent;