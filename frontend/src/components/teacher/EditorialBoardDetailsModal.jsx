import React from "react";

export default function EditorialBoardDetailsModal({ isOpen, onClose, entry }) {
  if (!isOpen || !entry) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <h2 className="text-xl font-bold text-slate-900">Editorial Board Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Board / Journal Name</span>
              <span className="font-bold text-slate-900 text-base">{entry.boardName}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Role</span>
              <span className="font-semibold text-slate-900">{entry.role}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Level</span>
              <span className="font-semibold text-slate-900">{entry.level}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Academic Year</span>
              <span className="font-semibold text-slate-900">{entry.academicYear}</span>
            </div>
          </div>

          <div className="pt-2">
             <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Responsibilities</span>
             <p className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm mt-1 whitespace-pre-wrap">{entry.responsibilities || "No responsibilities listed."}</p>
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
