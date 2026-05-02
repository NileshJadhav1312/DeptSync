import React, { useState } from "react";

export default function CreateClassroomModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <h2 className="text-xl font-bold text-slate-900">Create New Classroom</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto scrollbar-thin">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Class Name
            </label>
            <input
              autoFocus
              required
              className="input w-full"
              placeholder="e.g. SY-CSE-A"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Classroom
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
