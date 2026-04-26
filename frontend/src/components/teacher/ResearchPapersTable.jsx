import React, { useState } from "react";
import ResearchPaperDetailsModal from "./ResearchPaperDetailsModal";

export default function ResearchPapersTable({ papers, onEdit, onDelete }) {
  const [selectedPaper, setSelectedPaper] = useState(null);

  if (papers.length === 0) {
    return (
      <div className="card p-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 mt-6 rounded-3xl">
        <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Research Papers Found</h3>
        <p className="text-slate-500 mt-1 max-w-xs mx-auto">Start by adding your published or accepted research papers.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto card border-slate-200 mt-6 shadow-xl shadow-slate-200/50 rounded-3xl">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Research Paper Details</h3>
          <p className="text-sm text-slate-500 mt-1">Scholarly and professional recognitions</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
          Total: {papers.length}
        </div>
      </div>

      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200 font-bold tracking-widest">
          <tr>
            <th className="px-6 py-5 text-slate-900">Title & Year</th>
            <th className="px-6 py-5 text-slate-900">Type & Level</th>
            <th className="px-6 py-5 text-slate-900">Publisher/DOI</th>
            <th className="px-6 py-5 text-slate-900">Status</th>
            <th className="px-6 py-5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 italic-last-row bg-white text-slate-700">
          {papers.map((paper) => (
            <tr key={paper._id} className="hover:bg-indigo-50/30 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-900 leading-tight mb-1">{paper.title}</div>
                <div className="text-xs text-slate-500 font-medium">{paper.year} | {paper.authors?.join(", ")}</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold uppercase tracking-wider w-fit">{paper.publicationType}</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider w-fit">{paper.publicationLevel}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-xs font-semibold text-slate-700 truncate max-w-[150px]">{paper.publisherName || "N/A"}</div>
                {paper.doi && <div className="text-[10px] text-indigo-500 hover:underline cursor-pointer truncate max-w-[150px]">{paper.doi}</div>}
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                  paper.status === 'published' ? 'bg-green-100 text-green-700' :
                  paper.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {paper.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center flex justify-center gap-1">
                <button 
                  onClick={() => setSelectedPaper(paper)}
                  className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
                {onEdit && (
                   <button 
                    onClick={() => onEdit(paper)} 
                    className="p-2 text-amber-600 hover:bg-amber-200 rounded-lg transition-colors tooltip" title="Edit Paper"
                   >
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                     </svg>
                   </button>
                )}
                {onDelete && (
                   <button 
                    onClick={() => onDelete(paper)} 
                    className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete Paper"
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

      <ResearchPaperDetailsModal
        isOpen={!!selectedPaper}
        onClose={() => setSelectedPaper(null)}
        paper={selectedPaper}
      />
    </div>
  );
}
