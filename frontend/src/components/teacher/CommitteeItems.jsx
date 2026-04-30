import React, { useState, useEffect } from "react";
import CommitteeDetailsModal from "./CommitteeDetailsModal";

export function CommitteesTable({ items, onEdit, onDelete }) {
  const [selectedCommittee, setSelectedCommittee] = useState(null);

  if (items.length === 0) return (
    <div className="card p-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 mt-6 rounded-3xl">
      <h3 className="text-lg font-bold text-slate-900">No Committee Entries Found</h3>
      <p className="text-sm text-slate-500 mt-1">Add your committee memberships and roles.</p>
    </div>
  );

  return (
    <div className="card overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl mt-6">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Committee Memberships</h3>
          <p className="text-sm text-slate-500 mt-1">Roles and contributions in various bodies</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
          Total: {items.length}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-200 font-bold">
            <tr>
              <th className="px-6 py-5">Committee & Role</th>
              <th className="px-6 py-5">Level</th>
              <th className="px-6 py-5">Year</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 italic-last-row bg-white text-slate-700">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 leading-tight mb-1">{item.committeeName}</div>
                  <div className="text-xs text-slate-500 font-medium">{item.position}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">{item.level}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-slate-700">{item.year}</div>
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-1">
                  <button 
                    onClick={() => setSelectedCommittee(item)}
                    className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(item)} 
                      className="p-2 text-amber-600 hover:bg-amber-200 rounded-lg transition-colors tooltip" title="Edit Entry"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(item)} 
                      className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete Entry"
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

      <CommitteeDetailsModal
        isOpen={!!selectedCommittee}
        onClose={() => setSelectedCommittee(null)}
        committee={selectedCommittee}
      />
    </div>
  );
}


export function CommitteeFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({ year: new Date().getFullYear(), committeeName: "", level: "Local", organization: { name: "", type: "University" }, position: "Member", committeeType: "Academic" });
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (isOpen && initialData) setFormData(initialData); else if (isOpen && !initialData) setFormData({ year: new Date().getFullYear(), committeeName: "", level: "Local", organization: { name: "", type: "University" }, position: "Member", committeeType: "Academic" }); }, [isOpen, initialData]);
  if (!isOpen) return null;
  const hC = (e) => { const { name, value } = e.target; if (name.includes(".")) { const [p, c] = name.split("."); setFormData(p_ => ({ ...p_, [p]: { ...p_[p], [c]: value } })); } else { setFormData(p_ => ({ ...p_, [name]: value })); } };
  const hS = async (e) => { e.preventDefault(); setLoading(true); try { await onSubmit(formData); onClose(); } catch (err) { alert(err.message); } finally { setLoading(false); } };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <h2 className="text-2xl font-bold mb-6">Committee Membership</h2>
        <form onSubmit={hS} className="space-y-4 shadow-none">
          <input required name="committeeName" value={formData.committeeName} onChange={hC} className="input" placeholder="Committee Name" /> 
          <input required name="organization.name" value={formData.organization.name} onChange={hC} className="input" placeholder="Organization Name" />
          <div className="grid grid-cols-2 gap-4">
            <select name="level" value={formData.level} onChange={hC} className="input">
              <option value="Local">Local</option>
              <option value="National">National</option>
              <option value="International">International</option>
            </select>
            <select name="position" value={formData.position} onChange={hC} className="input">
              <option value="Chairperson">Chairperson</option>
              <option value="Member">Member</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Secretary">Secretary</option>
              <option value="Advisor">Advisor</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input required name="year" type="number" value={formData.year} onChange={hC} className="input" placeholder="Year" />
            <select name="committeeType" value={formData.committeeType} onChange={hC} className="input">
              <option value="Academic">Academic</option>
              <option value="Research">Research</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary">Save Entry</button>
          </div></form></div></div>
  );
}
