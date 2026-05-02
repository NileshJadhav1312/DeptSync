import React from "react";

export default function JournalDetailsModal({ isOpen, onClose, journal }) {
  if (!isOpen || !journal) return null;

  const indexing = [
    ...(journal.indexedIn || []),
    ...(journal.otherIndexing ? [journal.otherIndexing] : []),
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-400 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Journal Publication Details</h2>
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
              <span className="font-semibold text-slate-900 text-base">{journal.paperTitle}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Year</span>
              <span className="font-semibold text-slate-900">{journal.year}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Publication Type</span>
              <span className="font-semibold text-slate-900">{journal.publicationType}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Journal Name</span>
              <span className="font-semibold text-slate-900">{journal.journalName}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Publisher</span>
              <span className="font-semibold text-slate-900">{journal.publisherName || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Research Area</span>
              <span className="font-semibold text-slate-900">{journal.researchArea || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Quartile</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mt-1 w-fit border ${
                  journal.quartile && journal.quartile !== "None"
                    ? "bg-amber-50 text-amber-700 border-amber-100"
                    : "bg-slate-100 text-slate-500 border-slate-200"
                }`}
              >
                {journal.quartile || "N/A"}
              </span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Impact Factor</span>
              <span className="font-semibold text-slate-900">{journal.impactFactor || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Cite Score</span>
              <span className="font-semibold text-slate-900">{journal.citeScore || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">ISSN</span>
              <span className="font-semibold text-slate-900 break-all">{journal.issnNumber || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">ISBN</span>
              <span className="font-semibold text-slate-900 break-all">{journal.isbnNumber || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Volume & Issue</span>
              <span className="font-semibold text-slate-900">{journal.volumeAndIssue || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Page Numbers</span>
              <span className="font-semibold text-slate-900">{journal.pageNumbers || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">DOI</span>
              <span className="font-semibold text-slate-900 break-all">{journal.doi || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Article URL</span>
              {journal.articleUrl ? (
                <a href={journal.articleUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline break-all text-sm">{journal.articleUrl}</a>
              ) : <span className="font-semibold text-slate-900">N/A</span>}
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Scopus Link</span>
              {journal.scopusLink ? (
                <a href={journal.scopusLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline break-all text-sm">View on Scopus ↗</a>
              ) : <span className="font-semibold text-slate-900">N/A</span>}
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Google Scholar Link</span>
              {journal.googleScholarLink ? (
                <a href={journal.googleScholarLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline break-all text-sm">View on Google Scholar ↗</a>
              ) : <span className="font-semibold text-slate-900">N/A</span>}
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Submitted On</span>
              <span className="font-semibold text-slate-900">
                {journal.dateOfSubmission ? new Date(journal.dateOfSubmission).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Accepted On</span>
              <span className="font-semibold text-slate-900">
                {journal.dateOfAcceptance ? new Date(journal.dateOfAcceptance).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Published On</span>
              <span className="font-semibold text-slate-900">
                {journal.dateOfPublication ? new Date(journal.dateOfPublication).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Authors</span>
            <span className="font-semibold text-slate-900">{journal.authors?.join(", ") || "None"}</span>
          </div>

          <div className="pt-2">
            <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Indexing</span>
            {indexing.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {indexing.map((idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase border border-slate-200">
                    {idx}
                  </span>
                ))}
              </div>
            ) : (
              <span className="font-semibold text-slate-900">None</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Awards / Recognition</span>
              <span className="font-semibold text-slate-900">
                {journal.awardsReceived ? journal.awardDetails || "Yes" : "No"}
              </span>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Cash Incentive</span>
              <span className="font-semibold text-slate-900">
                {journal.cashIncentive
                  ? `${journal.cashIncentiveAmount || "Amount not specified"}${journal.vchBillNo ? ` | Bill: ${journal.vchBillNo}` : ""}`
                  : "No"}
              </span>
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
