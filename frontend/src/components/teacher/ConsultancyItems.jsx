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
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    title: "",
    organization: { name: "", type: "Private" },
    revenueGenerated: 0,
    currency: "INR",
    paymentStatus: "Pending",
    consultancyType: "Technical"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    } else if (isOpen && !initialData) {
      setFormData({
        year: new Date().getFullYear(),
        title: "",
        organization: { name: "", type: "Private" },
        revenueGenerated: 0,
        currency: "INR",
        paymentStatus: "Pending",
        consultancyType: "Technical"
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [p, c] = name.split(".");
      setFormData(prev => ({ ...prev, [p]: { ...prev[p], [c]: value } }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const hSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col my-4 max-h-[90vh] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Consultancy" : "Add Consultancy"}</h2>
            <p className="text-sm text-slate-500 mt-1">Provide details of the consultancy project.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
          <form id="consultancyForm" onSubmit={hSubmit} className="space-y-10">
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Consultancy Title <span className="text-red-500">*</span></label>
                  <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="Project Title..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Year <span className="text-red-500">*</span></label>
                  <input required type="number" name="year" value={formData.year} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Organization Name <span className="text-red-500">*</span></label>
                  <input required name="organization.name" value={formData.organization.name} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="Client Name..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Organization Type <span className="text-red-500">*</span></label>
                  <select name="organization.type" value={formData.organization.type} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    <option value="Private">Private</option>
                    <option value="Government">Government</option>
                    <option value="Non-Profit">Non-Profit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Consultancy Type <span className="text-red-500">*</span></label>
                  <select name="consultancyType" value={formData.consultancyType} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    <option value="Technical">Technical</option>
                    <option value="Research">Research</option>
                    <option value="Management">Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Revenue & Status */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Financial Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Revenue Generated <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">{formData.currency}</span>
                    <input type="number" required name="revenueGenerated" value={formData.revenueGenerated} onChange={handleChange} className="w-full pl-14 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="0.00" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Payment Status <span className="text-red-500">*</span></label>
                  <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end gap-4 shrink-0">
          <button type="button" onClick={onClose} disabled={loading} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 shadow-sm rounded-2xl transition-all">
            Cancel
          </button>
          <button type="submit" form="consultancyForm" disabled={loading} className="px-8 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 rounded-2xl transition-all active:scale-95 min-w-[180px]">
            {loading ? "Processing..." : initialData ? "Update Consultancy" : "Save Consultancy"}
          </button>
        </div>
      </div>
    </div>
  );
}
