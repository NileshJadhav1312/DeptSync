import React, { useState, useEffect } from "react";

const DESIGNATION_OPTIONS = [
  "Associate Professor", "HOD", "SDW Coordinator", "Assistant Professor", "Clerk", "Junior Professor", "NAAC Coordinator", "Research Coordinator", "Project Coordinator", "Class Teacher", "other", "Faculty development ",
];

export default function AddTeacherModal({ isOpen, onClose, onSubmit, departments, loading }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    username: "",
    password: "",
    confirmPassword: "",
    departmentId: "",
    designations: [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        employeeId: "",
        username: "",
        password: "",
        confirmPassword: "",
        departmentId: "",
        designations: [],
      });
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const toggleDesignation = (des) => {
    const newDes = formData.designations.includes(des)
      ? formData.designations.filter(d => d !== des)
      : [...formData.designations, des];
    setFormData(p => ({ ...p, designations: newDes }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!formData.departmentId) {
      setError("Please select a department.");
      return;
    }
    setError("");
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add teacher.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Onboard New Teacher</h2>
            <p className="text-sm text-slate-500">Create a new faculty account and assign department.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl">✕</button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl flex items-center gap-3">
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}

          <form id="addTeacherForm" onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">First Name</label>
              <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Last Name</label>
              <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Email Address</label>
              <input required name="email" type="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Employee ID</label>
              <input required name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Username</label>
              <input required name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Password</label>
              <input required name="password" type="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Confirm Password</label>
              <input required name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" />
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Department</label>
              <select required name="departmentId" value={formData.departmentId} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium">
                <option value="">Select Department</option>
                {departments.map(d => (
                  <option key={d._id} value={d._id}>{d.departmentName}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">Designations</label>
              <div className="grid grid-cols-2 gap-2">
                {DESIGNATION_OPTIONS.map(des => (
                  <label key={des} className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${formData.designations.includes(des) ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200'}`}>
                    <input type="checkbox" className="hidden" checked={formData.designations.includes(des)} onChange={() => toggleDesignation(des)} />
                    {des}
                  </label>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">Cancel</button>
          <button type="submit" form="addTeacherForm" disabled={loading} className="px-8 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
            {loading ? "Onboarding..." : "Onboard Teacher"}
          </button>
        </div>
      </div>
    </div>
  );
}
