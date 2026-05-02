import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function PatentFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    isPccoeApplicant: true,
    typeOfPatent: "Utility",
    nationalInternational: "National",
    titleOfPatent: "",
    nameOfApplicant: "",
    nameOfInventors: "",
    applicationNumber: "",
    dateOfFiling: "",
    dateOfPublication: "",
    dateOfGrant: "",
    status: "Filed",
    proofDocument: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        isPccoeApplicant: initialData.isPccoeApplicant ?? true,
        typeOfPatent: initialData.typeOfPatent || "Utility",
        nationalInternational: initialData.nationalInternational || "National",
        titleOfPatent: initialData.titleOfPatent || "",
        nameOfApplicant: initialData.nameOfApplicant || "",
        nameOfInventors: initialData.nameOfInventors || "",
        applicationNumber: initialData.applicationNumber || "",
        dateOfFiling: initialData.dateOfFiling ? new Date(initialData.dateOfFiling).toISOString().split('T')[0] : "",
        dateOfPublication: initialData.dateOfPublication ? new Date(initialData.dateOfPublication).toISOString().split('T')[0] : "",
        dateOfGrant: initialData.dateOfGrant ? new Date(initialData.dateOfGrant).toISOString().split('T')[0] : "",
        status: initialData.status || "Filed",
        proofDocument: initialData.proofDocument || ""
      });
    } else {
      setFormData({
        isPccoeApplicant: true,
        typeOfPatent: "Utility",
        nationalInternational: "National",
        titleOfPatent: "",
        nameOfApplicant: "",
        nameOfInventors: "",
        applicationNumber: "",
        dateOfFiling: "",
        dateOfPublication: "",
        dateOfGrant: "",
        status: "Filed",
        proofDocument: ""
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col my-4 max-h-[90vh] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Patent" : "Add New Patent"}</h2>
            <p className="text-sm text-slate-500 mt-1">Provide comprehensive details about the patent or design registration.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
          <form id="patentForm" onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-4">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Title of Patent / Design <span className="text-red-500">*</span></label>
                  <input required name="titleOfPatent" value={formData.titleOfPatent} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="Patent Title..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Type of Patent <span className="text-red-500">*</span></label>
                  <select name="typeOfPatent" value={formData.typeOfPatent} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    <option value="Utility">Utility</option>
                    <option value="Design">Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">National / International <span className="text-red-500">*</span></label>
                  <select name="nationalInternational" value={formData.nationalInternational} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    <option value="National">National</option>
                    <option value="International">International</option>
                  </select>
                </div>
                <div className="md:col-span-2 flex items-end">
                  <label className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white hover:shadow-md transition-all w-full">
                    <input type="checkbox" name="isPccoeApplicant" checked={formData.isPccoeApplicant} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all" />
                    <span className="text-sm font-bold text-slate-700">Is PCCoE an Applicant?</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Section 2: Inventors & Application Details */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Inventors & Application
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Name of Applicant <span className="text-red-500">*</span></label>
                  <input required name="nameOfApplicant" value={formData.nameOfApplicant} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="E.g. PCCOE..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Name of Inventor/s <span className="text-red-500">*</span></label>
                  <input required name="nameOfInventors" value={formData.nameOfInventors} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="Inventor names..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Application Number <span className="text-red-500">*</span></label>
                  <input required name="applicationNumber" value={formData.applicationNumber} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="E.g. 2021..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Status <span className="text-red-500">*</span></label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    <option value="Filed">Filed</option>
                    <option value="Published">Published</option>
                    <option value="Registered">Registered</option>
                    <option value="Granted">Granted</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Important Dates & Documents */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Dates & Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Date of Filing <span className="text-red-500">*</span></label>
                  <input required type="date" name="dateOfFiling" value={formData.dateOfFiling} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Date of Publication</label>
                  <input type="date" name="dateOfPublication" value={formData.dateOfPublication} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Date of Grant</label>
                  <input type="date" name="dateOfGrant" value={formData.dateOfGrant} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" />
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Proof Document Link (Drive URL)</label>
                  <input type="url" name="proofDocument" value={formData.proofDocument} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" placeholder="https://drive.google.com/..." />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end gap-4 shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 shadow-sm rounded-2xl transition-all">
            Cancel
          </button>
          <button type="submit" form="patentForm" className="px-8 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-2xl transition-all active:scale-95 min-w-[180px]">
            {initialData ? "Update Patent" : "Save Patent"}
          </button>
        </div>
      </div>
    </div>
  );
}
