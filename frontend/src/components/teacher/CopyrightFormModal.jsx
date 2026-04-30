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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-200">
        <div className="bg-orange-600 px-8 py-6 text-white sticky top-0 z-10 shadow-md flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{initialData ? "Edit Copyright" : "Add New Copyright"}</h2>
            <p className="text-orange-100 text-sm mt-1">Provide details of the copyright registration.</p>
          </div>
          <button onClick={onClose} className="text-orange-200 hover:text-white transition-colors">
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
                <label className="text-sm font-bold text-slate-700">Academic Year</label>
                <input required name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500" placeholder="E.g. 2023-2024" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Title of Copyright</label>
                <input required name="titleOfCopyright" value={formData.titleOfCopyright} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500" placeholder="Copyright Title" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Name of Applicant</label>
                <input required name="nameOfApplicant" value={formData.nameOfApplicant} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500" placeholder="E.g. PCCOE, John Doe" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Name of Author/s</label>
                <input required name="nameOfAuthors" value={formData.nameOfAuthors} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500" placeholder="Comma separated names" />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Registration Details</h3>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Dairy Number</label>
                <input name="dairyNumber" value={formData.dairyNumber} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500" placeholder="Dairy Number" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">RoC Number (After Registration)</label>
                <input name="rocNumber" value={formData.rocNumber} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500" placeholder="RoC Number" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500">
                  <option value="Filed">Filed</option>
                  <option value="Registered">Registered</option>
                </select>
              </div>
            </div>

            <div className="space-y-6 md:col-span-2">
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Important Dates & Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Date of Filing</label>
                  <input required type="date" name="dateOfFiling" value={formData.dateOfFiling} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Date of Registration</label>
                  <input type="date" name="dateOfRegistration" value={formData.dateOfRegistration} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-sm font-bold text-slate-700">Proof Document Link (Drive URL)</label>
                <input type="url" name="proofDocument" value={formData.proofDocument} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-500" placeholder="https://drive.google.com/..." />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white pb-4 border-t mt-8">
            <button type="button" onClick={onClose} className="px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold bg-slate-100 cursor-pointer hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit" className="px-10 py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all cursor-pointer">
              {initialData ? "Update Copyright" : "Save Copyright"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
