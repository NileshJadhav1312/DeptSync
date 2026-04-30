import React, { useState, useEffect } from "react";
import GrantDetailsModal from "./GrantDetailsModal";

export function GrantsTable({ grants, onEdit, onDelete }) {
  const [selectedGrant, setSelectedGrant] = useState(null);

  if (grants.length === 0) return (
    <div className="card p-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 mt-6 rounded-3xl">
      <h3 className="text-lg font-bold text-slate-900">No Grants Found</h3>
      <p className="text-sm text-slate-500 mt-1">Add research grants to showcase your project funding.</p>
    </div>
  );

  return (
    <div className="card overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl mt-6">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Research Grants</h3>
          <p className="text-sm text-slate-500 mt-1">Project funding and sponsorship</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
          Total: {grants.length}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-200 font-bold">
            <tr>
              <th className="px-6 py-5">Project Title & Year</th>
              <th className="px-6 py-5">Agency</th>
              <th className="px-6 py-5">Amount</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 italic-last-row bg-white text-slate-700">
            {grants.map((grant) => (
              <tr key={grant._id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 leading-tight mb-1">{grant.projectTitle}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-tighter">{grant.academicYear}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-slate-700">{grant.fundingAgency}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-indigo-600">₹{grant.grantAchievedAmount?.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                    grant.status === 'completed' ? 'bg-green-100 text-green-700' : 
                    grant.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {grant.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-1">
                  <button 
                    onClick={() => setSelectedGrant(grant)}
                    className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {onEdit && (
                    <button 
                      onClick={() => onEdit(grant)} 
                      className="p-2 text-amber-600 hover:bg-amber-200 rounded-lg transition-colors tooltip" title="Edit Grant"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(grant)} 
                      className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete Grant"
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

      <GrantDetailsModal
        isOpen={!!selectedGrant}
        onClose={() => setSelectedGrant(null)}
        grant={selectedGrant}
      />
    </div>
  );
}


export function GrantFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({ academicYear: "", projectTitle: "", projectDescription: "", fundingAgency: "", grantAchievedAmount: 0, startDate: "", endDate: "", status: "pending", remarks: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (isOpen && initialData) setFormData({ ...initialData, startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : "", endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : "" });
    else if (isOpen && !initialData) setFormData({ academicYear: "", projectTitle: "", projectDescription: "", fundingAgency: "", grantAchievedAmount: 0, startDate: "", endDate: "", status: "pending", remarks: "" });
  }, [isOpen, initialData]);
  if (!isOpen) return null;
  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleFormSubmit = async (e) => { e.preventDefault(); setLoading(true); try { await onSubmit(formData); onClose(); } catch (err) { alert(err?.message || "Failed."); } finally { setLoading(false); } };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"><div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} /><div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
      <h2 className="text-2xl font-bold mb-6">{initialData ? "Edit Grant" : "Add Grant"}</h2>
      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required name="academicYear" value={formData.academicYear} onChange={handleChange} className="input" placeholder="Academic Year (e.g. 2024-25)" />
        <input required name="projectTitle" value={formData.projectTitle} onChange={handleChange} className="input" placeholder="Project Title" />
        <input name="fundingAgency" value={formData.fundingAgency} onChange={handleChange} className="input md:col-span-2" placeholder="Funding Agency" />
        <input type="number" name="grantAchievedAmount" value={formData.grantAchievedAmount} onChange={handleChange} className="input" placeholder="Grant Amount" />
        <select name="status" value={formData.status} onChange={handleChange} className="input"><option value="pending">Pending</option><option value="ongoing">Ongoing</option><option value="completed">Completed</option></select>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="input" /><input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="input" />
        <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} className="input md:col-span-2 h-24" placeholder="Brief Description" />
        <div className="flex justify-end gap-2 md:col-span-2 pt-4"><button type="button" onClick={onClose} className="btn-secondary">Cancel</button><button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving..." : "Save Grant"}</button></div>
      </form>
    </div></div>
  );
}
