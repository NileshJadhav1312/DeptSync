import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function CopyrightFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    academicYear: "",
    titleOfCopyright: "",
    nameOfApplicant: "",
    nameOfAuthors: "",
    dateOfFiling: "",
    dateOfRegistration: "",
    dairyNumber: "",
    rocNumber: "",
    status: "Filed",
    proofDocument: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        academicYear: initialData.academicYear || "",
        titleOfCopyright: initialData.titleOfCopyright || "",
        nameOfApplicant: initialData.nameOfApplicant || "",
        nameOfAuthors: initialData.nameOfAuthors || "",
        dateOfFiling: initialData.dateOfFiling ? new Date(initialData.dateOfFiling).toISOString().split('T')[0] : "",
        dateOfRegistration: initialData.dateOfRegistration ? new Date(initialData.dateOfRegistration).toISOString().split('T')[0] : "",
        dairyNumber: initialData.dairyNumber || "",
        rocNumber: initialData.rocNumber || "",
        status: initialData.status || "Filed",
        proofDocument: initialData.proofDocument || ""
      });
    } else {
      setFormData({
        academicYear: "",
        titleOfCopyright: "",
        nameOfApplicant: "",
        nameOfAuthors: "",
        dateOfFiling: "",
        dateOfRegistration: "",
        dairyNumber: "",
        rocNumber: "",
        status: "Filed",
        proofDocument: ""
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col my-4 max-h-[90vh] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-orange-50 to-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Copyright" : "Add New Copyright"}</h2>
            <p className="text-sm text-slate-500 mt-1">Provide detailed information about the copyright registration.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
          <form id="copyrightForm" onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Academic Year <span className="text-red-500">*</span></label>
                  <input required name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-medium" placeholder="2023-24" />
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Title of Copyright <span className="text-red-500">*</span></label>
                  <input required name="titleOfCopyright" value={formData.titleOfCopyright} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all font-medium" placeholder="Title..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Name of Applicant <span className="text-red-500">*</span></label>
                  <input required name="nameOfApplicant" value={formData.nameOfApplicant} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/10 transition-all font-medium" placeholder="E.g. PCCOE..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Name of Author/s <span className="text-red-500">*</span></label>
                  <input required name="nameOfAuthors" value={formData.nameOfAuthors} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/10 transition-all font-medium" placeholder="Author names..." />
                </div>
              </div>
            </div>

            {/* Section 2: Registration Details */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Registration Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Dairy Number</label>
                  <input name="dairyNumber" value={formData.dairyNumber} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="Dairy No..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">RoC Number</label>
                  <input name="rocNumber" value={formData.rocNumber} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="RoC No..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Status <span className="text-red-500">*</span></label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    <option value="Filed">Filed</option>
                    <option value="Registered">Registered</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Dates & Documents */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-orange-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                Dates & Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Date of Filing <span className="text-red-500">*</span></label>
                  <input required type="date" name="dateOfFiling" value={formData.dateOfFiling} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Date of Registration</label>
                  <input type="date" name="dateOfRegistration" value={formData.dateOfRegistration} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Proof Document Link (Drive URL)</label>
                  <input type="url" name="proofDocument" value={formData.proofDocument} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/10 transition-all font-medium" placeholder="https://drive.google.com/..." />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end gap-4 shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 shadow-sm rounded-2xl transition-all">
            Cancel
          </button>
          <button type="submit" form="copyrightForm" className="px-8 py-3 text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-200 rounded-2xl transition-all active:scale-95 min-w-[180px]">
            {initialData ? "Update Copyright" : "Save Copyright"}
          </button>
        </div>
      </div>
    </div>
  );
}
