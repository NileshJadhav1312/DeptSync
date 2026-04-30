import React, { useState, useEffect } from "react";

export default function ActivityFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    activityName: "",
    academicYear: "",
    semester: "odd",
    activityType: "Workshop",
    activityLevel: "Departmental",
    participationType: "Organised",
    activityMode: "Offline",
    fromDate: "",
    toDate: "",
    durationInDays: "",
    numberOfParticipants: "",
    fundsInRupees: "0",
    fundSourceName: "",
    certifyingInstitute: "",
    coordinators: "",
    resourcePersons: "",
    description: "",
    keyFocusedAreas: "",
    targetAudience: "",
    otherActivityType: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        fromDate: initialData.fromDate?.split("T")[0] || "",
        toDate: initialData.toDate?.split("T")[0] || "",
        coordinators: Array.isArray(initialData.coordinators) ? initialData.coordinators.join(", ") : "",
        resourcePersons: Array.isArray(initialData.resourcePersons) ? initialData.resourcePersons.join(", ") : "",
      });
    } else {
      setFormData({
        activityName: "",
        academicYear: "",
        semester: "odd",
        activityType: "Workshop",
        activityLevel: "Departmental",
        participationType: "Organised",
        activityMode: "Offline",
        fromDate: "",
        toDate: "",
        durationInDays: "",
        numberOfParticipants: "",
        fundsInRupees: "0",
        fundSourceName: "",
        certifyingInstitute: "",
        coordinators: "",
        resourcePersons: "",
        description: "",
        keyFocusedAreas: "",
        targetAudience: "",
        otherActivityType: "",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      coordinators: formData.coordinators.split(",").map(s => s.trim()).filter(Boolean),
      resourcePersons: formData.resourcePersons.split(",").map(s => s.trim()).filter(Boolean),
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <h2 className="text-xl font-bold text-slate-900">{initialData ? "Edit Activity" : "Add New Activity"}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Activity Name (Project Title)</label>
              <input required name="activityName" value={formData.activityName} onChange={handleChange} className="input w-full" placeholder="e.g. Workshop on Web Security" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Academic Year</label>
              <input required name="academicYear" value={formData.academicYear} onChange={handleChange} className="input w-full" placeholder="e.g. 2023-24" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Semester</label>
              <select name="semester" value={formData.semester} onChange={handleChange} className="input w-full">
                <option value="even">Even</option>
                <option value="odd">Odd</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Activity Type</label>
              <select name="activityType" value={formData.activityType} onChange={handleChange} className="input w-full">
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Webinar">Webinar</option>
                <option value="Conference">Conference</option>
                <option value="Project Exhibition">Project Exhibition</option>
                <option value="Competition">Competition</option>
                <option value="Guest Lecture">Guest Lecture</option>
                <option value="FDP">FDP</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {formData.activityType === "Other" && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Specify Other Activity Type</label>
                <input required name="otherActivityType" value={formData.otherActivityType} onChange={handleChange} className="input w-full" placeholder="e.g. Hackathon" />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Participation Type</label>
              <select name="participationType" value={formData.participationType} onChange={handleChange} className="input w-full">
                <option value="Organised">Organised</option>
                <option value="Attended">Attended</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Mode</label>
              <select name="activityMode" value={formData.activityMode} onChange={handleChange} className="input w-full">
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">From Date</label>
              <input type="date" required name="fromDate" value={formData.fromDate} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">To Date</label>
              <input type="date" required name="toDate" value={formData.toDate} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Duration (Days)</label>
              <input type="number" name="durationInDays" value={formData.durationInDays} onChange={handleChange} className="input w-full" placeholder="Days" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Participants</label>
              <input type="number" name="numberOfParticipants" value={formData.numberOfParticipants} onChange={handleChange} className="input w-full" placeholder="Total" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
              <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="input w-full">
                <option value="International">International</option>
                <option value="National">National</option>
                <option value="State">State</option>
                <option value="University">University</option>
                <option value="Institute">Institute</option>
                <option value="Departmental">Departmental</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Funds In Rupees</label>
              <input type="number" name="fundsInRupees" value={formData.fundsInRupees} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fund Source Name</label>
              <input name="fundSourceName" value={formData.fundSourceName} onChange={handleChange} className="input w-full" placeholder="Internal / External agency" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Certifying Institute</label>
              <input name="certifyingInstitute" value={formData.certifyingInstitute} onChange={handleChange} className="input w-full" placeholder="Organization name" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Key Focused Areas</label>
              <input name="keyFocusedAreas" value={formData.keyFocusedAreas} onChange={handleChange} className="input w-full" placeholder="e.g. AI, Web Development" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Audience</label>
              <input name="targetAudience" value={formData.targetAudience} onChange={handleChange} className="input w-full" placeholder="e.g. TE Students, Faculty" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Coordinators (Comma separated)</label>
              <input name="coordinators" value={formData.coordinators} onChange={handleChange} className="input w-full" placeholder="John Doe, Jane Smith" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Resource Persons (Comma separated)</label>
              <input name="resourcePersons" value={formData.resourcePersons} onChange={handleChange} className="input w-full" placeholder="Dr. Alice, Bob (Expert)" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description / Summary</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="input w-full h-24" placeholder="Brief outline of the activity..." />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 transition">
              {initialData ? "Update Activity" : "Save Activity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
