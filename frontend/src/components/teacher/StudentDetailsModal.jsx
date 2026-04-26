import React from "react";

export default function StudentDetailsModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-50/50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-slate-800">Student Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl uppercase">
              {student.firstName?.[0]}{student.lastName?.[0]}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{student.firstName} {student.lastName}</h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{student.prnNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <p className="text-slate-500 font-medium mb-0.5">Email</p>
              <p className="font-semibold text-slate-800 truncate">{student.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium mb-0.5">Contact</p>
              <p className="font-semibold text-slate-800">{student.contactNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium mb-0.5">Gender</p>
              <p className="font-semibold text-slate-800 capitalize">{student.gender || "N/A"}</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium mb-0.5">Username</p>
              <p className="font-semibold text-slate-800">{student.username || "N/A"}</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="btn-secondary px-6" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
