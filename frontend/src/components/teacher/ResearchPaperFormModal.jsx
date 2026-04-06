import React, { useState, useEffect } from "react";

export default function ResearchPaperFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    title: "",
    description: "",
    authors: [""],
    publicationLevel: "national",
    publicationType: "journal",
    areaOfResearch: ["science"],
    publisherName: "",
    googleScholarLink: "",
    scopusLink: "",
    webOfScienceLink: "",
    citations: 0,
    publicationDate: "",
    month: "",
    impactFactor: 0,
    doi: "",
    issnIsbn: "",
    keywords: [""],
    affiliation: "",
    status: "published",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        ...initialData,
        publicationDate: initialData.publicationDate ? new Date(initialData.publicationDate).toISOString().split("T")[0] : "",
      });
    } else if (isOpen && !initialData) {
      setFormData({
        year: new Date().getFullYear(),
        title: "",
        description: "",
        authors: [""],
        publicationLevel: "national",
        publicationType: "journal",
        areaOfResearch: ["science"],
        publisherName: "",
        googleScholarLink: "",
        scopusLink: "",
        webOfScienceLink: "",
        citations: 0,
        publicationDate: "",
        month: "",
        impactFactor: 0,
        doi: "",
        issnIsbn: "",
        keywords: [""],
        affiliation: "",
        status: "published",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to save research paper.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col my-8">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Research Paper" : "Publish New Research"}</h2>
            <p className="text-sm text-slate-500 mt-1">Fill in the details of your research publication.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-4 text-red-700 animate-in fade-in slide-in-from-top-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-sm font-semibold py-2.5">{error}</p>
            </div>
          )}

          <form id="researchPaperForm" onSubmit={handleFormSubmit} className="space-y-8">
            {/* Title Section */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                Basic Information
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <div className="md:col-span-3">
                    <label className="text-xs font-semibold text-slate-500 mb-2 block">Paper Title</label>
                    <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900" placeholder="Molecular approach to AI ethics..." />
                 </div>
                 <div>
                    <label className="text-xs font-semibold text-slate-500 mb-2 block">Publication Year</label>
                    <input required type="number" name="year" value={formData.year} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900" />
                 </div>
              </div>
            </div>

            {/* Type and Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Type</label>
                <select name="publicationType" value={formData.publicationType} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium">
                   <option value="journal">Journal</option>
                   <option value="conference">Conference</option>
                   <option value="workshop">Workshop</option>
                   <option value="book chapter">Book Chapter</option>
                   <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Level</label>
                <select name="publicationLevel" value={formData.publicationLevel} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium">
                   <option value="international">International</option>
                   <option value="national">National</option>
                   <option value="state">State</option>
                   <option value="local">Local</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium">
                   <option value="published">Published</option>
                   <option value="accepted">Accepted</option>
                   <option value="under-review">Under Review</option>
                </select>
              </div>
            </div>

            {/* Authors Section */}
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Authors List</label>
                <button type="button" onClick={() => addArrayItem("authors")} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm transition-all active:scale-95">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Add Author
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.authors.map((author, index) => (
                  <div key={index} className="flex gap-2">
                    <input required value={author} onChange={(e) => handleArrayChange(index, e.target.value, "authors")} className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/10 outline-none" placeholder={`Author ${index + 1}`} />
                    {formData.authors.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem(index, "authors")} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Links and IDs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">External Identifiers</label>
                  <div className="space-y-4">
                    <input name="doi" value={formData.doi} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium text-sm" placeholder="DOI (e.g. 10.1000/123)" />
                    <input name="issnIsbn" value={formData.issnIsbn} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium text-sm" placeholder="ISSN / ISBN" />
                  </div>
               </div>
               <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">Scholarly Links</label>
                  <div className="space-y-4">
                    <input name="googleScholarLink" value={formData.googleScholarLink} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium text-sm" placeholder="Google Scholar Link" />
                    <input name="scopusLink" value={formData.scopusLink} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium text-sm" placeholder="Scopus Link" />
                  </div>
               </div>
            </div>

            {/* Impact Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-indigo-50/30 rounded-3xl border border-indigo-100/50">
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-1">Citations</label>
                  <input type="number" name="citations" value={formData.citations} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-indigo-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/5" />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-1">Impact Factor</label>
                  <input type="number" step="0.01" name="impactFactor" value={formData.impactFactor} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-indigo-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/5" />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest px-1">Pub. Month</label>
                  <input name="month" value={formData.month} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-indigo-100 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/5" placeholder="May" />
               </div>
            </div>

          </form>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end gap-4 shrink-0">
          <button type="button" onClick={onClose} disabled={loading} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-300 shadow-sm rounded-2xl transition-all disabled:opacity-50">
            Keep Editing
          </button>
          <button type="submit" form="researchPaperForm" disabled={loading} className="px-8 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-2xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center min-w-[180px]">
            {loading ? (
              <>
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 Processing...
              </>
            ) : initialData ? "Confirm Changes" : "Save Publication"}
          </button>
        </div>
      </div>
    </div>
  );
}
