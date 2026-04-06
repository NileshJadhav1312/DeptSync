import React, { useState, useEffect } from "react";

export function GrantsTable({ grants, onEdit, onDelete }) {
  if (grants.length === 0) return <div className="card p-12 text-center bg-slate-50 border-2 border-dashed border-slate-200"><h3 className="text-lg font-bold text-slate-900">No Grants Found</h3></div>;
  return (
    <div className="overflow-x-auto card border-slate-200">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
          <tr><th className="px-6 py-4 font-semibold">Project Title & Year</th><th className="px-6 py-4 font-semibold">Agency</th><th className="px-6 py-4 font-semibold">Amount</th><th className="px-6 py-4 font-semibold">Status</th><th className="px-6 py-4 font-semibold text-right">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100 italic-last-row">
          {grants.map((grant) => (
            <tr key={grant._id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4"><div className="font-bold text-slate-900 leading-tight mb-1">{grant.projectTitle}</div><div className="text-xs text-slate-500">{grant.academicYear}</div></td>
              <td className="px-6 py-4"><div className="text-sm font-semibold text-slate-700">{grant.fundingAgency}</div></td>
              <td className="px-6 py-4"><div className="text-sm font-bold text-indigo-600">₹{grant.grantAchievedAmount?.toLocaleString()}</div></td>
              <td className="px-6 py-4"><span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${grant.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{grant.status}</span></td>
              <td className="px-6 py-4 text-right"><div className="flex justify-end gap-2"><button onClick={() => onEdit(grant)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21036H3v-3.572L16.732 3.732z" /></svg></button><button onClick={() => onDelete(grant)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button></div></td>
            </tr>
          ))}
        </tbody>
      </table>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"><div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} /><div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col p-8 overflow-y-auto max-h-[90vh]">
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
