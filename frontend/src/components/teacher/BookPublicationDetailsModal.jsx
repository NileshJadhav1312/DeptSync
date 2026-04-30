import React from "react";

export default function BookPublicationDetailsModal({ isOpen, onClose, book }) {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <h2 className="text-xl font-bold text-slate-900">Book Publication Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Book Title</span>
              <span className="font-bold text-slate-900 text-base">{book.bookTitle}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Year</span>
              <span className="font-semibold text-slate-900">{book.publicationYear}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Edition</span>
              <span className="font-semibold text-slate-900">{book.edition || "1st Edition"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Publisher</span>
              <span className="font-semibold text-slate-900">{book.publisherName}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">ISBN</span>
              <span className="font-semibold text-slate-900">{book.isbn || "N/A"}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
             <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Authors/Editors</span>
             <div className="flex flex-wrap gap-2 mt-1">
                {book.authorsEditors?.map((ae, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{ae.name} ({ae.role})</span>
                )) || "None"}
             </div>
          </div>

          <div className="pt-2">
             <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Indexing</span>
             <div className="flex flex-wrap gap-2 mt-1">
                {book.indexing?.map((idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase ring-1 ring-indigo-100">{idx}</span>
                )) || "None"}
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
