import React from "react";

export default function ConsultancyDetailsModal({ isOpen, onClose, consultancy }) {
  if (!isOpen || !consultancy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Consultancy Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Title</span>
              <span className="font-semibold text-slate-900 text-base">{consultancy.title}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Organization</span>
              <span className="font-semibold text-slate-900">{consultancy.organization?.name}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Organization Type</span>
              <span className="font-semibold text-slate-900">{consultancy.organization?.type}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Revenue Generated</span>
              <span className="font-bold text-green-600">{consultancy.currency} {consultancy.revenueGenerated?.toLocaleString()}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Type</span>
              <span className="font-semibold text-slate-900">{consultancy.consultancyType}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Payment Status</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mt-1 w-fit border ${
                  consultancy.paymentStatus === 'Paid' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                }`}>
                  {consultancy.paymentStatus}
                </span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Year</span>
              <span className="font-semibold text-slate-900">{consultancy.year}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Approval Status</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mt-1 w-fit border ${
                  consultancy.approvalStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                  consultancy.approvalStatus === 'Rejected' ? 'bg-red-50 text-red-700 border-red-100' : 
                  'bg-slate-50 text-slate-500 border-slate-100'
                }`}>
                  {consultancy.approvalStatus || "Pending"}
                </span>
            </div>
            <div className="col-span-2 pt-4 border-t border-slate-50">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Created By</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{consultancy.createdByName || consultancy.teacherName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${consultancy.createdByModel === 'Student' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                  {consultancy.createdByModel || 'Teacher'}
                </span>
              </div>
            </div>
            {consultancy.coordinatorComment && (
              <div className="col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Coordinator Comment</span>
                <p className="text-slate-700 italic">"{consultancy.coordinatorComment}"</p>
              </div>
            )}
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
