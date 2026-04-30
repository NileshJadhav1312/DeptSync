import React from "react";

export default function GrantDetailsModal({ isOpen, onClose, grant }) {
  if (!isOpen || !grant) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <h2 className="text-xl font-bold text-slate-900">Research Grant Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Project Title</span>
              <span className="font-bold text-slate-900 text-base">{grant.projectTitle}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Academic Year</span>
              <span className="font-semibold text-slate-900">{grant.academicYear}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Funding Agency</span>
              <span className="font-semibold text-slate-900">{grant.fundingAgency}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Amount Achieved</span>
              <span className="font-bold text-emerald-600">₹{grant.grantAchievedAmount?.toLocaleString()}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Status</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide mt-1 w-fit ${
                  grant.status === 'completed' ? 'bg-green-100 text-green-700' :
                  grant.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {grant.status}
                </span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Duration</span>
              <span className="font-semibold text-slate-900">
                {grant.startDate ? new Date(grant.startDate).toLocaleDateString() : "N/A"} - {grant.endDate ? new Date(grant.endDate).toLocaleDateString() : "Present"}
              </span>
            </div>
          </div>

          <div className="pt-2">
             <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Description</span>
             <p className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm mt-1 whitespace-pre-wrap">{grant.projectDescription || "No description provided."}</p>
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
