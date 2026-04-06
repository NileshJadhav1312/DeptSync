import React from "react";

export default function BookPublicationsTable({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="card p-12 text-center bg-slate-50 border-2 border-dashed border-slate-200">
        <h3 className="text-lg font-bold text-slate-900">No Book Publications Found</h3>
        <p className="text-slate-500 mt-1">Add your academic or research books here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto card border-slate-200">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-semibold">Title</th>
            <th className="px-6 py-4 font-semibold">Publisher & Date</th>
            <th className="px-6 py-4 font-semibold">ISBN/ISSN</th>
            <th className="px-6 py-4 font-semibold">Level</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 italic-last-row">
          {books.map((book) => (
            <tr key={book._id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <div className="font-bold text-slate-900 leading-tight mb-1">{book.title}</div>
                <div className="text-xs text-slate-500">{book.authors?.map(a => a.name).join(", ")}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm font-semibold text-slate-700">{book.publisher?.name}</div>
                <div className="text-[10px] text-slate-500">{book.publicationDate ? new Date(book.publicationDate).toLocaleDateString() : 'N/A'}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-xs font-mono">{book.isbn || 'No ISBN'}</div>
                <div className="text-xs font-mono text-slate-400">{book.issn || ''}</div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">{book.level}</span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(book)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                  <button onClick={() => onDelete(book)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
