import React, { useEffect } from "react";
import { FiImage, FiXCircle, FiPlus, FiTrash2 } from "react-icons/fi";

const Schedule = ({
  schedules,
  handleScheduleChange,
  addSchedule,
  deleteSchedule,
  handleImageChange,
  removeImage,
}) => {
  // Initialize with a default schedule entry if none exist
  useEffect(() => {
    if (schedules.length === 0) {
      addSchedule();
    }
  }, [schedules.length, addSchedule]);

  const handleAddSchedule = () => {
    addSchedule();
  };

  return (
    <section className="bg-dark p-6 rounded-xl card mx-auto max-w-7xl">
      <h3 className="text-lg font-semibold text-white mb-6">Schedule</h3>
      <div className="space-y-6">
        {schedules.map((entry, idx) => (
          <div
            key={idx}
            className="relative bg-sub-dark rounded-xl p-6 border border-[var(--border-accent)]/50"
          >
            <div className="text-center text-lg font-bold py-2 rounded-t-xl bg-[var(--border-accent)]/20 text-white">
              Session
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex gap-4 items-center">
                <input
                  value={entry.title || ""}
                  onChange={(e) =>
                    handleScheduleChange(idx, "title", e.target.value)
                  }
                  className="flex-1 bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
                  placeholder="Session Title"
                />
                <input
                  type="time"
                  value={entry.startTime || ""}
                  onChange={(e) =>
                    handleScheduleChange(idx, "startTime", e.target.value)
                  }
                  className="w-1/5 bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
                  placeholder="Start Time"
                />
                <input
                  type="time"
                  value={entry.endTime || ""}
                  onChange={(e) =>
                    handleScheduleChange(idx, "endTime", e.target.value)
                  }
                  className="w-1/5 bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
                  placeholder="End Time"
                />
                <input
                  type="date"
                  value={entry.date || ""}
                  onChange={(e) =>
                    handleScheduleChange(idx, "date", e.target.value)
                  }
                  className="w-1/5 bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
                  placeholder="Date"
                />
                <button
                  onClick={() => deleteSchedule(idx)}
                  className="btn-danger p-2.5 rounded-full"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-4 items-center">
                <input
                  value={entry.location || ""}
                  onChange={(e) =>
                    handleScheduleChange(idx, "location", e.target.value)
                  }
                  className="flex-1 bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
                  placeholder="Location"
                />
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(idx, e)}
                    className="hidden"
                    aria-label={`Upload image for schedule entry ${idx + 1}`}
                  />
                  <span className="btn-primary flex items-center gap-2">
                    <FiImage className="w-5 h-5 text-[var(--border-accent)]" />
                    Upload Image
                  </span>
                </label>
                {entry.image && (
                  <button
                    onClick={() => removeImage(idx)}
                    className="btn-danger p-2.5 rounded-full"
                    aria-label={`Remove image for schedule entry ${idx + 1}`}
                  >
                    <FiXCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div className="relative">
                <textarea
                  value={entry.description || ""}
                  onChange={(e) =>
                    handleScheduleChange(idx, "description", e.target.value)
                  }
                  maxLength={200}
                  className="w-full bg-sub-dark p-3 rounded-xl border border-[var(--border-accent)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--border-accent)] text-white transition duration-200"
                  placeholder="Short Session Description"
                  rows={3}
                />
                <span className="absolute right-2 bottom-2 text-xs text-gray">
                  {(entry.description || "").length}/200
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-4">
          <button
            onClick={handleAddSchedule}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" /> Add Timeline Entry
          </button>
        </div>
      </div>
    </section>
  );
};

export default Schedule;