import React, { useState } from "react";
import JournalDetailsModal from "./JournalDetailsModal";

export default function JournalPublicationsTable({ publications, onEdit, onDelete }) {
  const [selectedJournal, setSelectedJournal] = useState(null);

  if (!publications || publications.length === 0) {
    return (
      <div className="card p-12 text-center border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-3xl mt-6">
        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-600">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Journal Publications</h3>
        <p className="text-slate-500 mt-1 max-w-xs mx-auto">Start by adding your first journal publication to showcase your research impact.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl mt-6">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Journal Details</h3>
          <p className="text-sm text-slate-500 mt-1">Detailed scholarly publications</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
          Total: {publications.length}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            <tr>
              <th className="px-6 py-5">Year</th>
              <th className="px-6 py-5">Paper Title</th>
              <th className="px-6 py-5">Journal</th>
              <th className="px-6 py-5">Authors</th>
              <th className="px-6 py-5">Impact</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {publications.map((pub) => (
              <tr key={pub._id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-6 py-5">
                  <span className="font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">{pub.year}</span>
                </td>
                <td className="px-6 py-5 max-w-xs">
                  <p className="font-bold text-slate-900 leading-snug">{pub.paperTitle}</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">{pub.researchArea || "No Research Area"}</p>
                </td>
                <td className="px-6 py-5">
                  <p className="font-semibold text-slate-700">{pub.journalName}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{pub.publicationType}</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1">
                    {pub.authors?.slice(0, 2).map((a, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{a}</span>
                    ))}
                    {pub.authors?.length > 2 && <span className="text-[10px] text-slate-400 font-bold">+{pub.authors.length - 2} more</span>}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1">
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${pub.quartile && pub.quartile !== 'None' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'}`}>{pub.quartile || "NA"}</span>
                     <p className="text-[10px] font-bold text-emerald-600 mt-1">IF: {pub.impactFactor || 0}</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-center flex justify-center gap-1">
                  <button 
                    onClick={() => setSelectedJournal(pub)}
                    className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(pub)} 
                      className="p-2 text-amber-600 hover:bg-amber-200 rounded-lg transition-colors tooltip" title="Edit Publication"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(pub)} 
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

      <JournalDetailsModal
        isOpen={!!selectedJournal}
        onClose={() => setSelectedJournal(null)}
        journal={selectedJournal}
      />
    </div>
  );
}

