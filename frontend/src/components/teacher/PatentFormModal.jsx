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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-200">
        <div className="bg-indigo-600 px-8 py-6 text-white sticky top-0 z-10 shadow-md flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{initialData ? "Edit Patent" : "Add New Patent"}</h2>
            <p className="text-indigo-100 text-sm mt-1">Provide details of the patent or design.</p>
          </div>
          <button onClick={onClose} className="text-indigo-200 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 max-h-[75vh] overflow-y-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Basic Information</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Title of Patent / Design</label>
                <input required name="titleOfPatent" value={formData.titleOfPatent} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="Patent Title" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Type of Patent</label>
                <select name="typeOfPatent" value={formData.typeOfPatent} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
                  <option value="Utility">Utility</option>
                  <option value="Design">Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">National / International</label>
                <select name="nationalInternational" value={formData.nationalInternational} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
                  <option value="National">National</option>
                  <option value="International">International</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                  <input type="checkbox" name="isPccoeApplicant" checked={formData.isPccoeApplicant} onChange={handleChange} className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500" />
                  <span className="font-bold text-slate-700">Is PCCoE an Applicant?</span>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Inventors & Application Details</h3>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Name of Applicant</label>
                <input required name="nameOfApplicant" value={formData.nameOfApplicant} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="E.g. PCCOE, John Doe" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Name of Inventor/s</label>
                <input required name="nameOfInventors" value={formData.nameOfInventors} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="Comma separated names" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Application Number</label>
                <input required name="applicationNumber" value={formData.applicationNumber} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="E.g. 202121012345" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500">
                  <option value="Filed">Filed</option>
                  <option value="Published">Published</option>
                  <option value="Registered">Registered</option>
                  <option value="Granted">Granted</option>
                </select>
              </div>
            </div>

            <div className="space-y-6 md:col-span-2">
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Important Dates & Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Date of Filing</label>
                  <input required type="date" name="dateOfFiling" value={formData.dateOfFiling} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Date of Publication</label>
                  <input type="date" name="dateOfPublication" value={formData.dateOfPublication} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Date of Grant</label>
                  <input type="date" name="dateOfGrant" value={formData.dateOfGrant} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-sm font-bold text-slate-700">Proof Document Link (Drive URL)</label>
                <input type="url" name="proofDocument" value={formData.proofDocument} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="https://drive.google.com/..." />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white pb-4 border-t mt-8">
            <button type="button" onClick={onClose} className="px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit" className="px-10 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all cursor-pointer">
              {initialData ? "Update Patent" : "Save Patent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
