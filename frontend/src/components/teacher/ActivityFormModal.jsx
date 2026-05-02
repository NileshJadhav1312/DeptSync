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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-1 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col my-4 max-h-[90vh] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Activity Details" : "Add New Activity"}</h2>
            <p className="text-sm text-slate-500 mt-1">Provide comprehensive details about the academic or professional activity.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
          <form id="activityForm" onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Basic Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Activity Name (Project Title) <span className="text-red-500">*</span></label>
                  <input required name="activityName" value={formData.activityName} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="e.g. Workshop on Web Security" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Academic Year <span className="text-red-500">*</span></label>
                  <input required name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="e.g. 2023-24" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Semester <span className="text-red-500">*</span></label>
                  <select name="semester" value={formData.semester} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium">
                    <option value="even">Even</option>
                    <option value="odd">Odd</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Activity Type <span className="text-red-500">*</span></label>
                  <select name="activityType" value={formData.activityType} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium">
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
                    <label className="text-xs font-bold text-slate-500 mb-2 block">Specify Other Type <span className="text-red-500">*</span></label>
                    <input required name="otherActivityType" value={formData.otherActivityType} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="e.g. Hackathon" />
                  </div>
                )}
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Participation Type <span className="text-red-500">*</span></label>
                  <select name="participationType" value={formData.participationType} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium">
                    <option value="Organised">Organised</option>
                    <option value="Attended">Attended</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Mode <span className="text-red-500">*</span></label>
                  <select name="activityMode" value={formData.activityMode} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium">
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Schedule & Participants */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Schedule & Participants
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">From Date <span className="text-red-500">*</span></label>
                  <input type="date" required name="fromDate" value={formData.fromDate} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">To Date <span className="text-red-500">*</span></label>
                  <input type="date" required name="toDate" value={formData.toDate} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Duration (Days)</label>
                  <input type="number" name="durationInDays" value={formData.durationInDays} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" placeholder="Days" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Total Participants</label>
                  <input type="number" name="numberOfParticipants" value={formData.numberOfParticipants} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" placeholder="Total" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Level <span className="text-red-500">*</span></label>
                  <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium">
                    <option value="International">International</option>
                    <option value="National">National</option>
                    <option value="State">State</option>
                    <option value="University">University</option>
                    <option value="Institute">Institute</option>
                    <option value="Departmental">Departmental</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Funding & Organization */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Funding & Organization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Funds (In Rupees)</label>
                  <input type="number" name="fundsInRupees" value={formData.fundsInRupees} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Fund Source Name</label>
                  <input name="fundSourceName" value={formData.fundSourceName} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="Internal / External agency" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Certifying Institute</label>
                  <input name="certifyingInstitute" value={formData.certifyingInstitute} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="Organization name" />
                </div>
              </div>
            </div>

            {/* Section 4: People involved */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                People Involved
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Coordinators (Comma separated)</label>
                  <input name="coordinators" value={formData.coordinators} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="John Doe, Jane Smith" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Resource Persons (Comma separated)</label>
                  <input name="resourcePersons" value={formData.resourcePersons} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="Dr. Alice, Bob (Expert)" />
                </div>
              </div>
            </div>

            {/* Section 5: Details */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Additional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Key Focused Areas</label>
                  <input name="keyFocusedAreas" value={formData.keyFocusedAreas} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium" placeholder="e.g. AI, Web Development" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Target Audience</label>
                  <input name="targetAudience" value={formData.targetAudience} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium" placeholder="e.g. TE Students, Faculty" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Description / Summary</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl h-32 outline-none font-medium" placeholder="Brief outline of the activity..." />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end gap-4 shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 shadow-sm rounded-2xl transition-all">
            Cancel
          </button>
          <button type="submit" form="activityForm" className="px-8 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-2xl transition-all active:scale-95 min-w-[180px]">
            {initialData ? "Update Activity" : "Save Activity"}
          </button>
        </div>
      </div>
    </div>
  );
}
