import React, { useState, useEffect } from "react";
import ConsultancyDetailsModal from "./ConsultancyDetailsModal";

export function ConsultanciesTable({ items, onEdit, onDelete }) {
  const [selectedConsultancy, setSelectedConsultancy] = useState(null);

  if (items.length === 0) return (
    <div className="card p-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 mt-6 rounded-3xl">
      <h3 className="text-lg font-bold text-slate-900">No Consultancies Found</h3>
      <p className="text-sm text-slate-500 mt-1">Add consultancy projects to showcase your professional expertise.</p>
    </div>
  );

  return (
    <div className="card overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl mt-6">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Consultancy Projects</h3>
          <p className="text-sm text-slate-500 mt-1">Professional and industry collaborations</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
          Total: {items.length}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-200 font-bold">
            <tr>
              <th className="px-6 py-5">Title & Client</th>
              <th className="px-6 py-5">Revenue</th>
              <th className="px-6 py-5">Type</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 italic-last-row bg-white text-slate-700">
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 leading-tight mb-1">{item.title}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-tighter">{item.organization?.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-emerald-600">{item.currency} {item.revenueGenerated?.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">{item.consultancyType}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${item.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{item.paymentStatus}</span>
                </td>
                <td className="px-6 py-4 text-center flex justify-center gap-1">
                  <button 
                    onClick={() => setSelectedConsultancy(item)}
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
                      className="p-2 text-amber-600 hover:bg-amber-200 rounded-lg transition-colors tooltip" title="Edit Consultancy"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      onClick={() => onDelete(item)} 
                      className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete Consultancy"
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

      <ConsultancyDetailsModal
        isOpen={!!selectedConsultancy}
        onClose={() => setSelectedConsultancy(null)}
        consultancy={selectedConsultancy}
      />
    </div>
  );
}


export function ConsultancyFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({ year: new Date().getFullYear(), title: "", organization: { name: "", type: "Private" }, revenueGenerated: 0, currency: "INR", paymentStatus: "Pending", consultancyType: "Technical" });
  const [loading, setLoading] = useState(false);
  useEffect(() => { if (isOpen && initialData) setFormData(initialData); else if (isOpen && !initialData) setFormData({ year: new Date().getFullYear(), title: "", organization: { name: "", type: "Private" }, revenueGenerated: 0, currency: "INR", paymentStatus: "Pending", consultancyType: "Technical" }); }, [isOpen, initialData]);
  if (!isOpen) return null;
  const handleChange = (e) => { const { name, value } = e.target; if (name.includes(".")) { const [p, c] = name.split("."); setFormData(prev => ({ ...prev, [p]: { ...prev[p], [c]: value } })); } else { setFormData(prev => ({ ...prev, [name]: value })); } };
  const hSubmit = async (e) => { e.preventDefault(); setLoading(true); try { await onSubmit(formData); onClose(); } catch (err) { alert(err.message); } finally { setLoading(false); } };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"><div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} /><div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto"><h2 className="text-2xl font-bold mb-6">Consultancy Details</h2><form onSubmit={hSubmit} className="space-y-4"><input required name="title" value={formData.title} onChange={handleChange} className="input" placeholder="Consultancy Title" /><input required name="organization.name" value={formData.organization.name} onChange={handleChange} className="input" placeholder="Client / Organization" /><div className="grid grid-cols-2 gap-4"><input type="number" required name="revenueGenerated" value={formData.revenueGenerated} onChange={handleChange} className="input" placeholder="Revenue" /><select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="input"><option value="Pending">Pending</option><option value="Paid">Paid</option></select></div><div className="flex justify-end gap-2 pt-4"><button type="button" onClick={onClose} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Save Consultancy</button></div></form></div></div>
  );
}
