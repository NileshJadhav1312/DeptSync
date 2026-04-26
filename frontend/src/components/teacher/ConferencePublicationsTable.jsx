import React, { useState } from "react";
import ConferenceDetailsModal from "./ConferenceDetailsModal";

export default function ConferencePublicationsTable({ conferences, onEdit, onDelete }) {
  const [selectedConference, setSelectedConference] = useState(null);

  if (!conferences || conferences.length === 0) {
    return (
      <div className="card p-12 text-center border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-3xl mt-6">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Conference Publications</h3>
        <p className="text-slate-500 mt-1">Start by adding your first conference paper.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl mt-6">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Conference Details</h3>
          <p className="text-sm text-slate-500 mt-1">Participated and published conference papers</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
          Total: {conferences.length}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5">Paper Title</th>
              <th className="px-6 py-5">Conference</th>
              <th className="px-6 py-5">Role/Level</th>
              <th className="px-6 py-5">Type/Publisher</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {conferences.map((conf) => (
              <tr key={conf._id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-6 py-5">
                  <span className="font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                    {conf.conferenceDate ? new Date(conf.conferenceDate).toLocaleDateString() : "N/A"}
                  </span>
                </td>
                <td className="px-6 py-5 max-w-xs">
                  <p className="font-bold text-slate-900 leading-snug">{conf.researchPaperTitle}</p>
                  <div className="flex gap-1 mt-1">
                    {conf.indexing?.slice(0, 2).map((idx, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-bold uppercase">{idx}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="font-semibold text-slate-700">{conf.conferenceName}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{conf.organizingInstitution}</p>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">{conf.role}</span>
                  <p className="text-[10px] text-slate-400 mt-1 font-bold">{conf.conferenceLevel}</p>
                </td>
                <td className="px-6 py-5">
                  <p className="font-medium text-slate-600">{conf.publicationType}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{conf.publisherName || "No Publisher"}</p>
                </td>
                <td className="px-6 py-5 text-center flex justify-center gap-1">
                  <button 
                    onClick={() => setSelectedConference(conf)}
                    className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(conf)} 
                      className="p-2 text-amber-600 hover:bg-amber-200 rounded-lg transition-colors tooltip" title="Edit Publication"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(conf)} 
                      className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete Publication"
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

      <ConferenceDetailsModal
        isOpen={!!selectedConference}
        onClose={() => setSelectedConference(null)}
        conference={selectedConference}
      />
    </div>
  );
}

