import React from "react";

export default function StudentDetailsModal({ isOpen, onClose, student }) {
  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Student Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-2xl uppercase border-2 border-white shadow-sm">
              {student.firstName?.[0]}{student.lastName?.[0]}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{student.firstName} {student.lastName}</h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{student.prnNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Email Address</span>
              <span className="font-semibold text-slate-900 break-all">{student.email || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Contact Number</span>
              <span className="font-semibold text-slate-900">{student.contactNumber || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Gender</span>
              <span className="font-semibold text-slate-900 capitalize">{student.gender || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Username</span>
              <span className="font-semibold text-slate-900">{student.username || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
