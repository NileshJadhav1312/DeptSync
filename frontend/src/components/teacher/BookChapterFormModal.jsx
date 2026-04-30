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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95">
        <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div>
            <h2 className="text-2xl font-bold">{initialData ? "Edit Book Chapter" : "Add Book Chapter"}</h2>
            <p className="text-teal-100 text-sm mt-1">Details for the specific chapter published in a book</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); onClose(); }} className="p-8 overflow-y-auto space-y-8">
          {/* Section 1: Title & Authors */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center text-sm">01</span>
              Chapter Details
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Title of the Chapter</label>
                <input name="chapterTitle" value={formData.chapterTitle} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 font-medium" placeholder="Enter chapter title" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Authors (In order)</label>
                {formData.authors.map((a, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={a} onChange={(e) => handleArrayChange(i, e.target.value, "authors")} required className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500" placeholder="Author name" />
                    {i > 0 && <button type="button" onClick={() => removeArrayItem(i, "authors")} className="p-2 text-red-500">✕</button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem("authors")} className="text-xs font-bold text-teal-600">+ Add Author</button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">PCCOE Authors</label>
                {formData.pccoeAuthors.map((a, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={a} onChange={(e) => handleArrayChange(i, e.target.value, "pccoeAuthors")} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500" placeholder="PCCOE author name" />
                    {i > 0 && <button type="button" onClick={() => removeArrayItem(i, "pccoeAuthors")} className="p-2 text-red-500">✕</button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem("pccoeAuthors")} className="text-xs font-bold text-teal-600">+ Add PCCOE Author</button>
              </div>
            </div>
          </div>

          {/* Section 2: Book Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-sm">02</span>
              Source Book Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Book Title</label>
                <input name="bookTitle" value={formData.bookTitle} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 font-medium" placeholder="Name of the book" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Editor(s) of the Book</label>
                {formData.editors.map((e, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={e} onChange={(e) => handleArrayChange(i, e.target.value, "editors")} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500" placeholder="Editor name" />
                    {i > 0 && <button type="button" onClick={() => removeArrayItem(i, "editors")} className="p-2 text-red-500">✕</button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem("editors")} className="text-xs font-bold text-teal-600">+ Add Editor</button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Publisher & Year</label>
                <div className="flex gap-2">
                  <input name="publisherName" value={formData.publisherName} onChange={handleChange} required className="flex-1 px-4 py-3 rounded-xl border border-slate-200" placeholder="Publisher" />
                  <input name="publicationYear" type="number" value={formData.publicationYear} onChange={handleChange} required className="w-32 px-4 py-3 rounded-xl border border-slate-200" placeholder="Year" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">ISBN & Page Range</label>
                <div className="flex gap-2">
                  <input name="isbn" value={formData.isbn} onChange={handleChange} className="flex-1 px-4 py-3 rounded-xl border border-slate-200" placeholder="ISBN number" />
                  <input name="pageRange" value={formData.pageRange} onChange={handleChange} className="w-40 px-4 py-3 rounded-xl border border-slate-200" placeholder="E.g. 45-67" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Recognition & Incentives */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">03</span>
              Recognition & Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Indexing & Area</label>
                <div className="space-y-2">
                  <input name="researchArea" value={formData.researchArea} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="Research Area/Domain" />
                  {formData.indexing.map((idx, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={idx} onChange={(e) => handleArrayChange(i, e.target.value, "indexing")} className="flex-1 px-4 py-2 rounded-lg border border-slate-200" placeholder="Indexing (Scopus, etc.)" />
                      {i > 0 && <button type="button" onClick={() => removeArrayItem(i, "indexing")} className="p-2 text-red-500">✕</button>}
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("indexing")} className="text-xs font-bold text-blue-600">+ Add Indexing</button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <input type="checkbox" name="openAccess" checked={formData.openAccess} onChange={handleChange} className="w-5 h-5 rounded text-teal-600" />
                  <label className="text-sm font-bold text-slate-700 font-medium">Open Access?</label>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" name="awardsRecognition.hasAwards" checked={formData.awardsRecognition.hasAwards} onChange={handleChange} className="w-5 h-5 rounded text-teal-600" />
                    <label className="text-sm font-bold text-slate-700">Awards/Recognition for Chapter?</label>
                  </div>
                  {formData.awardsRecognition.hasAwards && (
                    <input name="awardsRecognition.details" value={formData.awardsRecognition.details} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200" placeholder="Specify recognition" />
                  )}
                </div>
              </div>
            </div>
            
             <div className="p-6 bg-teal-50/50 rounded-2xl border border-teal-100 space-y-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" name="cashIncentive.received" checked={formData.cashIncentive.received} onChange={handleChange} className="w-6 h-6 rounded text-teal-600" />
                  <label className="text-base font-bold text-slate-800">Received cash incentive from college?</label>
                </div>
                {formData.cashIncentive.received && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="number" name="cashIncentive.amount" value={formData.cashIncentive.amount} onChange={handleChange} className="px-4 py-3 rounded-xl border border-teal-200" placeholder="Amount (Rs.)" />
                    <input name="cashIncentive.vchBillNo" value={formData.cashIncentive.vchBillNo} onChange={handleChange} className="px-4 py-3 rounded-xl border border-teal-200" placeholder="Vch / Bill No." />
                  </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-2">Article/Book URL</label>
                <input name="articleUrl" value={formData.articleUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="Link to published chapter" />
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" name="supportingDocuments.hasDocuments" checked={formData.supportingDocuments.hasDocuments} onChange={handleChange} className="w-5 h-5 rounded text-teal-600" />
                    <label className="text-sm font-bold text-slate-700">Supporting Documents? (e.g. certificate, publisher agreement)</label>
                  </div>
                  {formData.supportingDocuments.hasDocuments && (
                    <input name="supportingDocuments.details" value={formData.supportingDocuments.details} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200" placeholder="List documents available" />
                  )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white pb-4 border-t mt-8">
            <button type="button" onClick={onClose} className="px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
            <button type="submit" className="px-10 py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 shadow-lg shadow-teal-200">
              {initialData ? "Update Chapter" : "Save Chapter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
