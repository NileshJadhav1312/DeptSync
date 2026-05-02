import React from "react";

export default function CopyrightDetailsModal({ isOpen, onClose, copyright }) {
  if (!isOpen || !copyright) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Copyright Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Copyright Title</span>
              <span className="font-semibold text-slate-900 text-base">{copyright.titleOfCopyright}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Academic Year</span>
              <span className="font-semibold text-slate-900">{copyright.academicYear}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Status</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mt-1 w-fit border ${
                  copyright.status === 'Registered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                }`}>
                  {copyright.status}
                </span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Applicant Name</span>
              <span className="font-semibold text-slate-900">{copyright.nameOfApplicant}</span>
            </div>
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Authors</span>
              <span className="font-semibold text-slate-900">{copyright.nameOfAuthors}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Diary Number</span>
              <span className="font-semibold text-slate-900">{copyright.dairyNumber || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">RoC Number</span>
              <span className="font-semibold text-slate-900">{copyright.rocNumber || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Filing Date</span>
              <span className="font-semibold text-slate-900">{copyright.dateOfFiling ? new Date(copyright.dateOfFiling).toLocaleDateString() : "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Registration Date</span>
              <span className="font-semibold text-slate-900">{copyright.dateOfRegistration ? new Date(copyright.dateOfRegistration).toLocaleDateString() : "N/A"}</span>
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
