import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, clearError } from "../../../redux/slices/eventSlice";
import BasicInformation from "./Components/BasicInformation";
import EventMedia from "./Components/EventMedia";
import EventDescription from "./Components/EventDescription";
import Schedule from "./Components/Schedule";
import SpeakersOrganizers from "./Components/SpeakersOrganizers";
import FAQ from "./Components/FAQ";
import RegistrationInfo from "./Components/RegistrationInfo";
import SponsersAndOrganizers from "./Components/SponsersAndOrganizers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewEvent = () => {
  const dispatch = useDispatch();
  const { loading, error, selectedEvent } = useSelector((state) => state.events);

  const [formData, setFormData] = useState({
    eventName: "",
    category: "",
    date: "",
    eventMode: "physical",
    location: "",
    description: "",
    tagline: "",
    tags: [],
    organizer: "",
    eventContact: { name: "", email: "", phone: "" },
    sponsors: [{ name: "", logo: null }],
    capacity: null,
  });
  const [eventImage, setEventImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [registrationData, setRegistrationData] = useState({
    requireResume: false,
    requireCoverLetter: false,
    requirePortfolio: false,
    requireBasicInfo: false,
    requiredBasicInfo: [],
    requireWebLink: false,
    requiredWebLinks: [],
    customQuestions: [],
    instructions: "",
    allowedFileTypes: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (selectedEvent && !loading) {
      toast.success("Event created successfully!");
      // Reset form after successful creation
      setFormData({
        eventName: "",
        category: "",
        date: "",
        eventMode: "physical",
        location: "",
        description: "",
        tagline: "",
        tags: [],
        organizer: "",
        eventContact: { name: "", email: "", phone: "" },
        sponsors: [{ name: "", logo: null }],
        capacity: null,
      });
      setEventImage(null);
      setThumbnail(null);
      setSchedules([]);
      setSpeakers([]);
      setFaqs([{ question: "", answer: "" }]);
      setRegistrationData({
        requireResume: false,
        requireCoverLetter: false,
        requirePortfolio: false,
        requireBasicInfo: false,
        requiredBasicInfo: [],
        requireWebLink: false,
        requiredWebLinks: [],
        customQuestions: [],
        instructions: "",
        allowedFileTypes: [],
      });
      setErrors({});
    }
  }, [error, selectedEvent, loading, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("eventContact.")) {
      const [, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        eventContact: { ...prev.eventContact, [field]: value },
      }));
    } else if (name === "sponsors") {
      setFormData((prev) => ({ ...prev, sponsors: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (idx, e) => {
    const file = e.target.files[0];
    if (file) {
      setSchedules((prev) =>
        prev.map((entry, i) =>
          i === idx ? { ...entry, image: file } : entry
        )
      );
      toast.success("Schedule image uploaded!");
    }
  };

  const removeImage = (idx) => {
    setSchedules((prev) =>
      prev.map((entry, i) =>
        i === idx ? { ...entry, image: null } : entry
      )
    );
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
      image: null,
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
      setter(file);
      toast.success(`${setter === setEventImage ? "Event Banner" : "Thumbnail"} uploaded!`);
    }
  };

  const removeEventImage = (setter) => {
    setter(null);
    toast.info("Image removed");
  };

  const handleSpeakerImage = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      setSpeakers((prev) =>
        prev.map((speaker, i) =>
          i === idx ? { ...speaker, image: file } : speaker
        )
      );
      toast.success("Speaker image uploaded!");
    }
  };

  const handleSpeakerChange = (idx, field, value) => {
    const updated = [...speakers];
    if (field === "description" && value.length > 500) return;
    updated[idx][field] = value;
    setSpeakers(updated);
  };

  const addSpeaker = (type) => {
    let newSpeaker;
    switch (type) {
      case "Speaker":
      case "Chief Guest":
        newSpeaker = { type, name: "", role: "", description: "", email: "", image: null };
        break;
      case "Keynote":
      case "Announcements":
        newSpeaker = { type, title: "", description: "", image: null };
        break;
      case "Workshop":
        newSpeaker = { type, title: "", facilitator: "", description: "", image: null };
        break;
      case "Discussion":
        newSpeaker = { type, title: "", moderator: "", panelists: "", description: "", image: null };
        break;
      case "Custom":
        newSpeaker = { type, customType: "", title: "", description: "", image: null };
        break;
      default:
        return;
    }
    setSpeakers((prev) => [...prev, newSpeaker]);
    toast.info(`${type} added`);
  };

  const deleteSpeaker = (idx) => {
    setSpeakers((prev) => prev.filter((_, i) => i !== idx));
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
    if (!formData.eventName) newErrors.eventName = "Event name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (formData.eventMode === "physical" && !formData.capacity) {
      newErrors.capacity = "Capacity is required for physical events";
    }
    if (!formData.organizer) newErrors.organizer = "Organizer name is required";
    if (!formData.eventContact.email) newErrors.eventContact = { email: "Contact email is required" };
    if (
      (registrationData.requireResume ||
        registrationData.requireCoverLetter ||
        registrationData.requirePortfolio ||
        registrationData.requireBasicInfo ||
        registrationData.requireWebLink ||
        registrationData.customQuestions?.length > 0) &&
      !registrationData.instructions
    ) {
      newErrors.instructions = "Instructions are required when additional registration fields are specified";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const prepareEventData = () => {
    const [year, month, day] = formData.date.split("-");
    return {
      eventName: formData.eventName,
      tagline: formData.tagline,
      category: formData.category,
      tags: formData.tags || [],
      date: day,
      month,
      year,
      location: formData.location,
      capacity: formData.eventMode === "physical" ? parseInt(formData.capacity) || null : null,
      eventMode: formData.eventMode,
      bannerImage: eventImage,
      thumbnailImage: thumbnail,
      description: formData.description,
      highlights: [
        ...schedules.map((schedule) => ({
          type: "Schedule",
          title: schedule.title,
          description: schedule.description,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          date: schedule.date,
          location: schedule.location,
          image: schedule.image,
        })),
        ...speakers.map((speaker) => ({
          type: speaker.type,
          title: speaker.title || null,
          description: speaker.description || null,
          name: speaker.name || null,
          role: speaker.role || null,
          email: speaker.email || null,
          image: speaker.image || null,
          facilitator: speaker.facilitator || null,
          moderator: speaker.moderator || null,
          panelists: speaker.panelists || null,
          customType: speaker.customType || null,
        })),
      ],
      faqs,
      sponsors: formData.sponsors.map((sponsor) => ({
        name: sponsor.name,
        logo: sponsor.logo,
      })),
      organizer: formData.organizer,
      eventContact: formData.eventContact,
      whoAreWe: null,
      status: "draft",
      totalRegistrations: 0,
      registeredUsers: [],
      requireResume: registrationData.requireResume,
      allowedFileTypes: registrationData.allowedFileTypes || [],
      requireBasicInfo: registrationData.requireBasicInfo,
      requiredBasicInfo: registrationData.requiredBasicInfo || [],
      requireWebLink: registrationData.requireWebLink,
      requiredWebLinks: registrationData.requiredWebLinks || [],
      requireCoverLetter: registrationData.requireCoverLetter,
      requirePortfolio: registrationData.requirePortfolio,
      customQuestions: registrationData.customQuestions,
      instructions: registrationData.instructions,
    };
  };

  const saveDraft = () => {
    if (validateForm()) {
      const eventData = prepareEventData();
      dispatch(createEvent({ ...eventData, status: "draft" }));
      localStorage.setItem(
        "eventDraft",
        JSON.stringify({ formData, eventImage, thumbnail, schedules, speakers, faqs, registrationData })
      );
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const publishEvent = () => {
    if (validateForm()) {
      const eventData = prepareEventData();
      dispatch(createEvent({ ...eventData, status: "published" }));
    } else {
      toast.error("Please fill all required fields");
    }
  };

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
            disabled={loading}
          >
            <SaveIcon />
            {loading ? "Saving..." : "Save Draft"}
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
          disabled={loading}
        >
          <CancelIcon />
          Cancel
        </button>
        <button
          onClick={publishEvent}
          className="btn-primary flex items-center px-6 py-2"
          disabled={loading}
        >
          <PublishIcon />
          {loading ? "Publishing..." : "Publish Event"}
        </button>
      </div>
    </div>
  );
};

export default AddNewEvent;