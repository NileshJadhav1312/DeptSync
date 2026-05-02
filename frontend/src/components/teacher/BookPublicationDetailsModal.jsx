import React from "react";

function Section({ title, children }) {
  return (
    <div className="pt-4 border-t border-slate-100 first:pt-0 first:border-t-0">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">{children}</div>
    </div>
  );
}

function Field({ label, value, full }) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-0.5">{label}</span>
      <span className="font-semibold text-slate-800">{value ?? <span className="text-slate-300 italic font-normal">N/A</span>}</span>
    </div>
  );
}

function Badge({ label, color = "slate" }) {
  const colors = {
    slate: "bg-slate-100 text-slate-600 border-slate-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    red: "bg-red-50 text-red-600 border-red-100",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase ${colors[color]}`}>
      {label}
    </span>
  );
}

export default function BookPublicationDetailsModal({ isOpen, onClose, book }) {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between shrink-0 bg-blue-50/40 rounded-t-2xl">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Book Publication</p>
            <h2 className="text-xl font-black text-slate-900 leading-tight">{book.bookTitle}</h2>
            <p className="text-xs text-slate-500 mt-1">{book.publisherName} · {book.publicationYear}</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition ml-4 shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">

          {/* Book Identification */}
          <Section title="Book Identification">
            <Field label="ISBN" value={book.isbn} />
            <Field label="Edition" value={book.edition} />
            <Field label="Publication Year" value={book.publicationYear} />
            <Field label="Number of Pages" value={book.numberOfPages} />
            <Field label="Research Area / Domain" value={book.researchArea} full />
            {book.linkToPublished && (
              <div className="col-span-2">
                <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-0.5">Published Link</span>
                <a href={book.linkToPublished} target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold underline underline-offset-2 break-all text-sm">
                  {book.linkToPublished}
                </a>
              </div>
            )}
          </Section>

          {/* Authors & Editors */}
          <Section title="Authors & Editors (With Roles)">
            {book.authorsEditors?.length > 0 ? (
              <div className="col-span-2 flex flex-wrap gap-2">
                {book.authorsEditors.map((ae, i) => (
                  <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-[11px] font-bold">
                    {ae.name}
                    {ae.role && <span className="ml-1 text-indigo-400">({ae.role})</span>}
                  </span>
                ))}
              </div>
            ) : <div className="col-span-2 text-slate-300 italic text-sm">No authors listed.</div>}
          </Section>

          {/* All Authors */}
          {book.allAuthors?.length > 0 && (
            <Section title="All Authors (In Order)">
              <div className="col-span-2 flex flex-wrap gap-2">
                {book.allAuthors.map((a, i) => (
                  <Badge key={i} label={a} color="slate" />
                ))}
              </div>
            </Section>
          )}

          {/* PCCOE Authors */}
          {book.pccoeAuthors?.length > 0 && (
            <Section title="PCCOE Authors">
              <div className="col-span-2 flex flex-wrap gap-2">
                {book.pccoeAuthors.map((a, i) => (
                  <Badge key={i} label={a} color="indigo" />
                ))}
              </div>
            </Section>
          )}

          {/* Research & Impact */}
          <Section title="Research & Impact">
            <div className="col-span-2">
              <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-1">Indexing</span>
              {book.indexing?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {book.indexing.map((idx, i) => <Badge key={i} label={idx} color="indigo" />)}
                </div>
              ) : <span className="text-slate-300 italic text-sm">None</span>}
            </div>
            <div className="col-span-2 flex flex-wrap gap-3 mt-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${book.openAccess ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                {book.openAccess ? "✓" : "✗"} Open Access
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${book.industryCoAuthorInvolved ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                {book.industryCoAuthorInvolved ? "✓" : "✗"} Industry Co-Author
              </span>
              {book.industryCoAuthorInvolved && book.industryName && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border bg-amber-50 text-amber-700 border-amber-200">
                  {book.industryName}
                </span>
              )}
            </div>
          </Section>

          {/* Awards & Recognition */}
          <Section title="Awards & Recognition">
            <div className="col-span-2 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${book.awardsRecognition?.hasAwards ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                {book.awardsRecognition?.hasAwards ? "🏆 Award Received" : "No Award"}
              </span>
            </div>
            {book.awardsRecognition?.hasAwards && book.awardsRecognition?.details && (
              <div className="col-span-2">
                <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-0.5">Details</span>
                <p className="text-sm text-slate-700 font-medium">{book.awardsRecognition.details}</p>
              </div>
            )}
          </Section>

          {/* Royalty & Incentive */}
          <Section title="Royalty & Cash Incentive">
            <div className="col-span-2 flex flex-wrap gap-3">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${book.royaltyReceived ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                {book.royaltyReceived ? "✓ Royalty Received" : "✗ No Royalty"}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${book.cashIncentive?.received ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                {book.cashIncentive?.received ? "✓ Cash Incentive" : "✗ No Incentive"}
              </span>
            </div>
            {book.cashIncentive?.received && (
              <>
                <Field label="Incentive Amount" value={book.cashIncentive.amount ? `₹${book.cashIncentive.amount}` : null} />
                <Field label="Voucher / Bill No." value={book.cashIncentive.vchBillNo} />
              </>
            )}
          </Section>

          {/* Submitted By */}
          <Section title="Submitted By">
            <Field label="Teacher" value={book.teacherName} />
            <Field label="Department" value={book.departmentName} />
          </Section>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
