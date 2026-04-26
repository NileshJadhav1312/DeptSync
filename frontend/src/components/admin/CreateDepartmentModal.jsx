import React, { useState } from "react";

export default function CreateDepartmentModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentUid: "",
    collegeName: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ departmentName: "", departmentUid: "", collegeName: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Create New Department</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department Name</label>
            <input 
              required 
              name="departmentName" 
              value={formData.departmentName} 
              onChange={handleChange} 
              className="input w-full" 
              placeholder="e.g. Computer Science and Engineering" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">College Name</label>
            <input 
              required 
              name="collegeName" 
              value={formData.collegeName} 
              onChange={handleChange} 
              className="input w-full" 
              placeholder="e.g. Engineering College" 
            />
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
