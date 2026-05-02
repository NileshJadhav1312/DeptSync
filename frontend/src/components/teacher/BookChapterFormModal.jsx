import React, { useState, useEffect } from "react";

export default function BookChapterFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    chapterTitle: "",
    authors: [""],
    pccoeAuthors: [""],
    industryCoAuthorInvolved: false,
    industryName: "",
    bookTitle: "",
    editors: [""],
    publisherName: "",
    publicationYear: new Date().getFullYear(),
    isbn: "",
    pageRange: "",
    researchArea: "",
    indexing: [""],
    awardsRecognition: { hasAwards: false, details: "" },
    openAccess: false,
    cashIncentive: { received: false, amount: 0, vchBillNo: "" },
    articleUrl: "",
    supportingDocuments: { hasDocuments: false, details: "" }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({
        chapterTitle: "",
        authors: [""],
        pccoeAuthors: [""],
        industryCoAuthorInvolved: false,
        industryName: "",
        bookTitle: "",
        editors: [""],
        publisherName: "",
        publicationYear: new Date().getFullYear(),
        isbn: "",
        pageRange: "",
        researchArea: "",
        indexing: [""],
        awardsRecognition: { hasAwards: false, details: "" },
        openAccess: false,
        cashIncentive: { received: false, amount: 0, vchBillNo: "" },
        articleUrl: "",
        supportingDocuments: { hasDocuments: false, details: "" }
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: type === "checkbox" ? checked : value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleArrayChange = (index, value, field) => {
    const newArr = [...formData[field]];
    newArr[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index, field) => {
    const newArr = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArr }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col my-4 max-h-[90vh] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Book Chapter" : "Add Book Chapter"}</h2>
            <p className="text-sm text-slate-500 mt-1">Provide comprehensive details about the specific chapter published in a book.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
          <form id="bookChapterForm" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); onClose(); }} className="space-y-10">
            {/* Section 1: Chapter & Authors */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Chapter & Author Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-4">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Title of the Chapter <span className="text-red-500">*</span></label>
                  <input required name="chapterTitle" value={formData.chapterTitle} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="Enter chapter title..." />
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500 block">Authors (All) <span className="text-red-500">*</span></label>
                    <button type="button" onClick={() => addArrayItem("authors")} className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                  </div>
                  {formData.authors.map((a, i) => (
                    <div key={i} className="flex gap-2">
                      <input required value={a} onChange={(e) => handleArrayChange(i, e.target.value, "authors")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" placeholder={`Author ${i + 1}...`} />
                      {formData.authors.length > 1 && (
                        <button type="button" onClick={() => removeArrayItem(i, "authors")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500 block">PCCOE Authors</label>
                    <button type="button" onClick={() => addArrayItem("pccoeAuthors")} className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                  </div>
                  {formData.pccoeAuthors.map((a, i) => (
                    <div key={i} className="flex gap-2">
                      <input required value={a} onChange={(e) => handleArrayChange(i, e.target.value, "pccoeAuthors")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" placeholder={`PCCOE Author ${i + 1}...`} />
                      {formData.pccoeAuthors.length > 1 && (
                        <button type="button" onClick={() => removeArrayItem(i, "pccoeAuthors")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Book Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Book & Publisher Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Book Title <span className="text-red-500">*</span></label>
                  <input required name="bookTitle" value={formData.bookTitle} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="Name of the book..." />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500 block">Editor(s) of the Book</label>
                    <button type="button" onClick={() => addArrayItem("editors")} className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                  </div>
                  {formData.editors.map((e, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={e} onChange={(e) => handleArrayChange(i, e.target.value, "editors")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" placeholder={`Editor ${i + 1}...`} />
                      {formData.editors.length > 1 && (
                        <button type="button" onClick={() => removeArrayItem(i, "editors")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Publisher Name <span className="text-red-500">*</span></label>
                  <input required name="publisherName" value={formData.publisherName} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" placeholder="Publisher..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Publication Year <span className="text-red-500">*</span></label>
                  <input required type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">ISBN Number</label>
                  <input name="isbn" value={formData.isbn} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" placeholder="ISBN..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Page Range</label>
                  <input name="pageRange" value={formData.pageRange} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" placeholder="e.g. 45-67" />
                </div>
              </div>
            </div>

            {/* Section 3: Recognition & Impact */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Recognition & Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 block">Indexing & Area</label>
                  <input name="researchArea" value={formData.researchArea} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium mb-4" placeholder="Research Area/Domain..." />
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500 block">Indexing Details</label>
                    <button type="button" onClick={() => addArrayItem("indexing")} className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                  </div>
                  {formData.indexing.map((idx, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={idx} onChange={(e) => handleArrayChange(i, e.target.value, "indexing")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" placeholder={`Indexing ${i + 1}...`} />
                      {formData.indexing.length > 1 && (
                        <button type="button" onClick={() => removeArrayItem(i, "indexing")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                    <input type="checkbox" name="openAccess" checked={formData.openAccess} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all" />
                    <span className="text-sm font-bold text-slate-700">Open Access Publication?</span>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" name="awardsRecognition.hasAwards" checked={formData.awardsRecognition.hasAwards} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all" />
                      <span className="text-sm font-bold text-slate-700">Awards/Recognition for Chapter?</span>
                    </div>
                    {formData.awardsRecognition.hasAwards && (
                      <textarea name="awardsRecognition.details" value={formData.awardsRecognition.details} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl h-24 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all" placeholder="Specify recognition details..." />
                    )}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" name="cashIncentive.received" checked={formData.cashIncentive.received} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all" />
                      <span className="text-sm font-bold text-slate-700">Received cash incentive from college?</span>
                    </div>
                    {formData.cashIncentive.received && (
                      <div className="flex gap-4">
                        <input type="number" name="cashIncentive.amount" value={formData.cashIncentive.amount} onChange={handleChange} className="px-4 py-2 bg-white border border-slate-200 rounded-xl w-32 font-bold text-emerald-600 focus:ring-2 focus:ring-emerald-500/10 outline-none" placeholder="Amount" />
                        <input name="cashIncentive.vchBillNo" value={formData.cashIncentive.vchBillNo} onChange={handleChange} className="px-4 py-2 bg-white border border-slate-200 rounded-xl w-40 font-medium focus:ring-2 focus:ring-emerald-500/10 outline-none" placeholder="Bill/Vch No." />
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 mb-2 block">Article/Book URL</label>
                    <input name="articleUrl" value={formData.articleUrl} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" placeholder="https://..." />
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" name="supportingDocuments.hasDocuments" checked={formData.supportingDocuments.hasDocuments} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 transition-all" />
                      <span className="text-sm font-bold text-slate-700">Supporting Documents Uploaded?</span>
                    </div>
                    {formData.supportingDocuments.hasDocuments && (
                      <textarea name="supportingDocuments.details" value={formData.supportingDocuments.details} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl h-24 text-sm font-medium focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all" placeholder="Specify docs (Acceptance letter, proof...)" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end gap-4 shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 shadow-sm rounded-2xl transition-all">
            Cancel
          </button>
          <button type="submit" form="bookChapterForm" className="px-8 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 rounded-2xl transition-all active:scale-95 min-w-[180px]">
            {initialData ? "Update Chapter" : "Save Chapter"}
          </button>
        </div>
      </div>
    </div>
  );
}
