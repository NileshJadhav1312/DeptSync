import React, { useState, useEffect } from "react";

export default function BookPublicationFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    bookTitle: "",
    authorsEditors: [{ name: "", role: "Author", order: 1 }],
    publisherName: "",
    publicationYear: new Date().getFullYear(),
    isbn: "",
    edition: "",
    allAuthors: [""],
    pccoeAuthors: [""],
    industryCoAuthorInvolved: false,
    industryName: "",
    researchArea: "",
    indexing: [""],
    openAccess: false,
    numberOfPages: 0,
    awardsRecognition: { hasAwards: false, details: "" },
    royaltyReceived: false,
    cashIncentive: { received: false, amount: 0, vchBillNo: "" },
    linkToPublished: "",
    supportingDocuments: { hasDocuments: false, details: "" }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({
        bookTitle: "",
        authorsEditors: [{ name: "", role: "Author", order: 1 }],
        publisherName: "",
        publicationYear: new Date().getFullYear(),
        isbn: "",
        edition: "",
        allAuthors: [""],
        pccoeAuthors: [""],
        industryCoAuthorInvolved: false,
        industryName: "",
        researchArea: "",
        indexing: [""],
        openAccess: false,
        numberOfPages: 0,
        awardsRecognition: { hasAwards: false, details: "" },
        royaltyReceived: false,
        cashIncentive: { received: false, amount: 0, vchBillNo: "" },
        linkToPublished: "",
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

  const handleArrayChange = (index, value, field, subfield = null) => {
    const newArr = [...formData[field]];
    if (subfield) {
      newArr[index] = { ...newArr[index], [subfield]: value };
    } else {
      newArr[index] = value;
    }
    setFormData(prev => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (field, defaultValue = "") => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], defaultValue] }));
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
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Book Publication" : "Add Book Publication"}</h2>
            <p className="text-sm text-slate-500 mt-1">Provide comprehensive details about the complete book published.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
          <form id="bookPublicationForm" onSubmit={(e) => { e.preventDefault(); onSubmit(formData); onClose(); }} className="space-y-10">
            {/* Section 1: Book Identification */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Book Identification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-4">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Title of the Book <span className="text-red-500">*</span></label>
                  <input required name="bookTitle" value={formData.bookTitle} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" placeholder="Enter full book title..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">ISBN Number</label>
                  <input name="isbn" value={formData.isbn} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" placeholder="ISBN..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Edition</label>
                  <input name="edition" value={formData.edition} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" placeholder="E.g. 2nd Edition" />
                </div>
                <div className="md:col-span-1">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Publication Year <span className="text-red-500">*</span></label>
                  <input required type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" />
                </div>
                <div className="md:col-span-1">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Publisher Name <span className="text-red-500">*</span></label>
                  <input required name="publisherName" value={formData.publisherName} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" placeholder="Publisher..." />
                </div>
              </div>
            </div>

            {/* Section 2: Authors/Editors */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Authors & Editors
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500">Authors/Editors (Specific Roles)</label>
                  <button type="button" onClick={() => addArrayItem("authorsEditors", { name: "", role: "Author", order: formData.authorsEditors.length + 1 })} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all">+ Add Row</button>
                </div>
                {formData.authorsEditors.map((ae, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 items-center animate-in slide-in-from-left-2">
                    <div className="col-span-5">
                      <input value={ae.name} onChange={(e) => handleArrayChange(i, e.target.value, "authorsEditors", "name")} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" placeholder="Name" />
                    </div>
                    <div className="col-span-4">
                      <select value={ae.role} onChange={(e) => handleArrayChange(i, e.target.value, "authorsEditors", "role")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium">
                        {["Author", "Editor", "Co-Author"].map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <input type="number" value={ae.order} onChange={(e) => handleArrayChange(i, e.target.value, "authorsEditors", "order")} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-bold" placeholder="Order" />
                    </div>
                    <div className="col-span-1">
                      {i > 0 && <button type="button" onClick={() => removeArrayItem(i, "authorsEditors")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500">All Authors (In Order)</label>
                    <button type="button" onClick={() => addArrayItem("allAuthors")} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                  </div>
                  {formData.allAuthors.map((a, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={a} onChange={(e) => handleArrayChange(i, e.target.value, "allAuthors")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" placeholder="Author name" />
                      {i > 0 && <button type="button" onClick={() => removeArrayItem(i, "allAuthors")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500">PCCOE Authors</label>
                    <button type="button" onClick={() => addArrayItem("pccoeAuthors")} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                  </div>
                  {formData.pccoeAuthors.map((a, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={a} onChange={(e) => handleArrayChange(i, e.target.value, "pccoeAuthors")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" placeholder="PCCOE author name" />
                      {i > 0 && <button type="button" onClick={() => removeArrayItem(i, "pccoeAuthors")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <input type="checkbox" name="industryCoAuthorInvolved" checked={formData.industryCoAuthorInvolved} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                  <span className="text-sm font-bold text-slate-700">Industry Co-author involved?</span>
                </div>
                {formData.industryCoAuthorInvolved && (
                  <input name="industryName" value={formData.industryName} onChange={handleChange} className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium mt-4" placeholder="Industry Name..." />
                )}
              </div>
            </div>

            {/* Section 3: Research & Impact */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Research & Impact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 block">Indexing & Area</label>
                  <input name="researchArea" value={formData.researchArea} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium mb-4" placeholder="Research Area/Domain..." />
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500">Indexing Details</label>
                    <button type="button" onClick={() => addArrayItem("indexing")} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                  </div>
                  {formData.indexing.map((idx, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={idx} onChange={(e) => handleArrayChange(i, e.target.value, "indexing")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" placeholder={`Indexing ${i + 1}...`} />
                      {formData.indexing.length > 1 && (
                        <button type="button" onClick={() => removeArrayItem(i, "indexing")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4">
                    <input type="checkbox" name="openAccess" checked={formData.openAccess} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                    <span className="text-sm font-bold text-slate-700">Open Access Publication?</span>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 mb-2 block">Number of Pages</label>
                    <input type="number" name="numberOfPages" value={formData.numberOfPages} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" />
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" name="awardsRecognition.hasAwards" checked={formData.awardsRecognition.hasAwards} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                    <span className="text-sm font-bold text-slate-700">Awards/Recognition Received?</span>
                  </div>
                  {formData.awardsRecognition.hasAwards && (
                    <textarea name="awardsRecognition.details" value={formData.awardsRecognition.details} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl h-24 text-sm font-medium focus:ring-2 focus:ring-blue-500/10 outline-none transition-all" placeholder="Specify awards details..." />
                  )}
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4 h-fit">
                  <input type="checkbox" name="royaltyReceived" checked={formData.royaltyReceived} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                  <span className="text-sm font-bold text-slate-700">Royalty Received?</span>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" name="cashIncentive.received" checked={formData.cashIncentive.received} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                      <span className="text-sm font-bold text-slate-700">Received cash incentive from college?</span>
                    </div>
                    {formData.cashIncentive.received && (
                      <div className="flex gap-4">
                        <input type="number" name="cashIncentive.amount" value={formData.cashIncentive.amount} onChange={handleChange} className="px-4 py-2 bg-white border border-slate-200 rounded-xl w-32 font-bold text-blue-600 focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="Amount" />
                        <input name="cashIncentive.vchBillNo" value={formData.cashIncentive.vchBillNo} onChange={handleChange} className="px-4 py-2 bg-white border border-slate-200 rounded-xl w-40 font-medium focus:ring-2 focus:ring-blue-500/10 outline-none" placeholder="Bill/Vch No." />
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 mb-2 block">Publication Link</label>
                    <input name="linkToPublished" value={formData.linkToPublished} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-medium" placeholder="https://..." />
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" name="supportingDocuments.hasDocuments" checked={formData.supportingDocuments.hasDocuments} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                      <span className="text-sm font-bold text-slate-700">Supporting Documents Uploaded?</span>
                    </div>
                    {formData.supportingDocuments.hasDocuments && (
                      <textarea name="supportingDocuments.details" value={formData.supportingDocuments.details} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl h-24 text-sm font-medium focus:ring-2 focus:ring-blue-500/10 outline-none transition-all" placeholder="Specify docs (Acceptance letter, proof...)" />
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
          <button type="submit" form="bookPublicationForm" className="px-8 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 rounded-2xl transition-all active:scale-95 min-w-[180px]">
            {initialData ? "Update Publication" : "Save Publication"}
          </button>
        </div>
      </div>
    </div>
  );
}
