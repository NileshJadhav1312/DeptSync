import React from "react";

export default function PatentDetailsModal({ isOpen, onClose, patent }) {
  if (!isOpen || !patent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Patent Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Patent Title</span>
              <span className="font-semibold text-slate-900 text-base">{patent.titleOfPatent}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Application Number</span>
              <span className="font-semibold text-slate-900">{patent.applicationNumber}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Patent Type</span>
              <span className="font-semibold text-slate-900">{patent.typeOfPatent}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Scope</span>
              <span className="font-semibold text-slate-900">{patent.nationalInternational}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Applicant Name</span>
              <span className="font-semibold text-slate-900">{patent.nameOfApplicant}</span>
            </div>
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Inventors</span>
              <span className="font-semibold text-slate-900">{patent.nameOfInventors}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Status</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mt-1 w-fit border ${
                  patent.status === 'Granted' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  patent.status === 'Registered' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                  patent.status === 'Published' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                  'bg-yellow-50 text-yellow-700 border-yellow-100'
                }`}>
                  {patent.status}
                </span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">PCCOE Applicant?</span>
              <span className="font-semibold text-slate-900">{patent.isPccoeApplicant ? "Yes" : "No"}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-sm">
            <div>
                <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Filing Date</span>
                <span className="font-semibold text-slate-900">{patent.dateOfFiling ? new Date(patent.dateOfFiling).toLocaleDateString() : "N/A"}</span>
            </div>
            <div>
                <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Publication Date</span>
                <span className="font-semibold text-slate-900">{patent.dateOfPublication ? new Date(patent.dateOfPublication).toLocaleDateString() : "N/A"}</span>
            </div>
            <div>
                <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Grant Date</span>
                <span className="font-semibold text-slate-900">{patent.dateOfGrant ? new Date(patent.dateOfGrant).toLocaleDateString() : "N/A"}</span>
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
