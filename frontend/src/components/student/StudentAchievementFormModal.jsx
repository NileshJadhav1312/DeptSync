import React, { useState, useEffect } from "react";

export default function StudentAchievementFormModal({ isOpen, onClose, onSubmit, initialData }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl animate-in fade-in slide-in-from-bottom-2">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between font-bold">
          <h2 className="text-xl font-bold text-slate-900">{initialData ? "Modify Your Achievement" : "Add Your Gain"}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Gain Title (Event Name)</label>
              <input required name="name" value={formData.name} onChange={handleChange} className="input w-full" placeholder="e.g. Winner of Smart India Hackathon" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input type="date" required name="date" value={formData.date} onChange={handleChange} className="input w-full shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Academic Year</label>
              <input required name="academicYear" value={formData.academicYear} onChange={handleChange} className="input w-full shadow-sm" placeholder="e.g. 2023-24" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
              <select name="level" value={formData.level} onChange={handleChange} className="input w-full shadow-sm">
                <option value="International">International</option>
                <option value="National">National</option>
                <option value="State">State</option>
                <option value="University">University</option>
                <option value="Institute">Institute</option>
                <option value="Departmental">Departmental</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="input w-full shadow-sm">
                <option value="Academic">Academic</option>
                <option value="Research">Research</option>
                <option value="Sports">Sports</option>
                <option value="Cultural">Cultural</option>
                <option value="Technical">Technical</option>
                <option value="Social">Social</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Issuing Body</label>
              <input name="issuingOrganization" value={formData.issuingOrganization} onChange={handleChange} className="input w-full shadow-sm" placeholder="e.g. MHRD / ISRO / College" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pos. Captured / Rank</label>
              <input name="position" value={formData.position} onChange={handleChange} className="input w-full shadow-sm font-bold" placeholder="e.g. Winner / 1st Runner up" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Cert ID / Link (Optional)</label>
              <input name="certificateNumber" value={formData.certificateNumber} onChange={handleChange} className="input w-full shadow-sm" placeholder="Reference code or public URL" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 uppercase tracking-tight font-black text-xs">Achievement Breakdown</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="input w-full h-24 pt-3 shadow-inner" placeholder="Briefly explain your gain and how it contributes..." />
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-all">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-200 transition-all">
              {initialData ? "Update Record" : "Submit For Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
