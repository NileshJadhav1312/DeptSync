import React, { useState } from 'react';
import PatentDetailsModal from './PatentDetailsModal';

export default function PatentsTable({ patents, onEdit, onDelete }) {
  const [selectedPatent, setSelectedPatent] = useState(null);

  if (!patents || patents.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 mt-6">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
        </div>
        <h3 className="text-sm font-bold text-slate-900 mb-1">No Patents Found</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          You haven't added any patents yet. Click the "Add Patent" button to create your first record.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 bg-white">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Intellectual Property - Patents</h3>
          <p className="text-sm text-slate-500 mt-1">Patents filed and granted</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
          Total: {patents.length}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-200 font-bold">
            <tr>
              <th className="px-6 py-5">Sr. No.</th>
              <th className="px-6 py-5">Patent Info</th>
              <th className="px-6 py-5">Classification</th>
              <th className="px-6 py-5">Applicant & Inventors</th>
              <th className="px-6 py-5">Important Dates</th>
              <th className="px-6 py-5 text-center">Status</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {patents.map((patent, index) => (
              <tr key={patent._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 font-bold text-slate-400">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-900 leading-snug">{patent.titleOfPatent}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px]">
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">App No: {patent.applicationNumber}</span>
                    {patent.isPccoeApplicant && (
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">PCCoE</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 text-[10px]">
                    <span className="font-bold text-slate-700 uppercase tracking-tight">{patent.typeOfPatent}</span>
                    <span className="font-medium text-slate-500">{patent.nationalInternational}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 text-[10px]">
                    <span className="font-medium text-slate-800 truncate max-w-[120px]">{patent.nameOfApplicant}</span>
                    <span className="font-medium text-slate-500 truncate max-w-[120px]" title={patent.nameOfInventors}>{patent.nameOfInventors}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-0.5 text-[10px]">
                    {patent.dateOfFiling && <div className="flex justify-between gap-2 text-slate-500">Filed: <span className="font-bold text-slate-800">{new Date(patent.dateOfFiling).toLocaleDateString()}</span></div>}
                    {patent.dateOfGrant && <div className="flex justify-between gap-2 text-slate-500 text-emerald-600 italic">Grant: <span className="font-bold">{new Date(patent.dateOfGrant).toLocaleDateString()}</span></div>}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter
                    ${patent.status === 'Granted' ? 'bg-emerald-100 text-emerald-800' : 
                      patent.status === 'Registered' ? 'bg-blue-100 text-blue-800' :
                      patent.status === 'Published' ? 'bg-purple-100 text-purple-800' :
                      'bg-amber-100 text-amber-800'}`}>
                    {patent.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-1">
                  <button 
                    onClick={() => setSelectedPatent(patent)}
                    className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(patent)} 
                      className="p-2 text-amber-600 hover:bg-amber-200 rounded-lg transition-colors tooltip" title="Edit Patent"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(patent._id)} 
                      className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete Patent"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PatentDetailsModal
        isOpen={!!selectedPatent}
        onClose={() => setSelectedPatent(null)}
        patent={selectedPatent}
      />
    </div>
  );
}

