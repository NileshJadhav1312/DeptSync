import React, { useState, useEffect } from "react";

export default function TeacherAchievementFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    academicYear: "",
    level: "National",
    category: "Academic",
    issuingOrganization: "",
    certificateNumber: "",
    position: "Participant",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        date: initialData.date ? initialData.date.split("T")[0] : "",
      });
    } else {
      setFormData({
        name: "",
        date: "",
        academicYear: "",
        level: "National",
        category: "Academic",
        issuingOrganization: "",
        certificateNumber: "",
        position: "Participant",
        description: "",
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
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col my-4 max-h-[90vh] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50 to-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Achievement" : "Add Achievement"}</h2>
            <p className="text-sm text-slate-500 mt-1">Provide details of your academic or professional achievement.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
          <form id="achievementForm" onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Achievement Title <span className="text-red-500">*</span></label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all font-medium" placeholder="e.g. Best Teacher Award 2024..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Academic Year <span className="text-red-500">*</span></label>
                  <input required name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="2023-24" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Date <span className="text-red-500">*</span></label>
                  <input type="date" required name="date" value={formData.date} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Level <span className="text-red-500">*</span></label>
                  <select name="level" value={formData.level} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    <option value="International">International</option>
                    <option value="National">National</option>
                    <option value="State">State</option>
                    <option value="University">University</option>
                    <option value="Institute">Institute</option>
                    <option value="Departmental">Departmental</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Category <span className="text-red-500">*</span></label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    <option value="Academic">Academic</option>
                    <option value="Research">Research</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Technical">Technical</option>
                    <option value="Social">Social</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Organization & Rank */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-purple-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Organization & Rank
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Issuing Organization</label>
                  <input name="issuingOrganization" value={formData.issuingOrganization} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="e.g. IEEE / College Name" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Position / Rank</label>
                  <input name="position" value={formData.position} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="e.g. 1st Place / Participant" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Certificate Number</label>
                  <input name="certificateNumber" value={formData.certificateNumber} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="CERT-12345" />
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Short Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl h-32 text-sm font-medium outline-none transition-all" placeholder="Briefly describe the achievement..." />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end gap-4 shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 shadow-sm rounded-2xl transition-all">
            Cancel
          </button>
          <button type="submit" form="achievementForm" className="px-8 py-3 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-200 rounded-2xl transition-all active:scale-95 min-w-[180px]">
            {initialData ? "Update Achievement" : "Save Achievement"}
          </button>
        </div>
      </div>
    </div>
  );
}
