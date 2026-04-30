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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div>
            <h2 className="text-2xl font-bold">{initialData ? "Edit Book Publication" : "Add Book Publication"}</h2>
            <p className="text-blue-100 text-sm mt-1">Details for the complete book published</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); onClose(); }} className="p-8 overflow-y-auto space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">01</span>
              Book Identification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-slate-700">Title of the Book</label>
                <input name="bookTitle" value={formData.bookTitle} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium" placeholder="Enter full book title" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">ISBN</label>
                <input name="isbn" value={formData.isbn} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="ISBN Number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Edition</label>
                <input name="edition" value={formData.edition} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="E.g. 2nd Edition" />
              </div>
               <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Publisher Name</label>
                <input name="publisherName" value={formData.publisherName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 font-medium" placeholder="Publisher Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Publication Year</label>
                <input name="publicationYear" type="number" value={formData.publicationYear} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="Year" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">02</span>
              Authors/Editors Registry
            </h3>
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 flex justify-between items-center">
                Authors/Editors (Specific Roles)
                <button type="button" onClick={() => addArrayItem("authorsEditors", { name: "", role: "Author", order: formData.authorsEditors.length + 1 })} className="text-xs text-indigo-600 font-bold">+ Add Row</button>
              </label>
              {formData.authorsEditors.map((ae, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 animate-in slide-in-from-left-2">
                  <div className="col-span-5"><input value={ae.name} onChange={(e) => handleArrayChange(i, e.target.value, "authorsEditors", "name")} required className="w-full px-4 py-2 rounded-lg border border-slate-200" placeholder="Name" /></div>
                  <div className="col-span-4"><select value={ae.role} onChange={(e) => handleArrayChange(i, e.target.value, "authorsEditors", "role")} className="w-full px-4 py-2 rounded-lg border border-slate-200 font-medium bg-slate-50">{["Author", "Editor", "Co-Author"].map(r => <option key={r} value={r}>{r}</option>)}</select></div>
                  <div className="col-span-2"><input type="number" value={ae.order} onChange={(e) => handleArrayChange(i, e.target.value, "authorsEditors", "order")} className="w-full px-4 py-2 rounded-lg border border-slate-200 font-bold" placeholder="Order" /></div>
                  <div className="col-span-1 flex items-center justify-center">{i > 0 && <button type="button" onClick={() => removeArrayItem(i, "authorsEditors")} className="text-red-500">✕</button>}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">All Authors (In Order)</label>
                {formData.allAuthors.map((a, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={a} onChange={(e) => handleArrayChange(i, e.target.value, "allAuthors")} className="flex-1 px-4 py-2 rounded-lg border border-slate-200" placeholder="Author name" />
                    {i > 0 && <button type="button" onClick={() => removeArrayItem(i, "allAuthors")} className="p-2 text-red-500">✕</button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem("allAuthors")} className="text-xs font-bold text-indigo-600">+ Add Author</button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">PCCOE Authors</label>
                {formData.pccoeAuthors.map((a, i) => (
                  <div key={i} className="flex gap-2">
                    <input value={a} onChange={(e) => handleArrayChange(i, e.target.value, "pccoeAuthors")} className="flex-1 px-4 py-2 rounded-lg border border-slate-200" placeholder="PCCOE author name" />
                    {i > 0 && <button type="button" onClick={() => removeArrayItem(i, "pccoeAuthors")} className="p-2 text-red-500">✕</button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem("pccoeAuthors")} className="text-xs font-bold text-indigo-600">+ Add PCCOE Author</button>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
               <div className="flex items-center gap-3">
                  <input type="checkbox" name="industryCoAuthorInvolved" checked={formData.industryCoAuthorInvolved} onChange={handleChange} className="w-5 h-5 rounded text-indigo-600" />
                  <label className="text-sm font-bold text-slate-700 font-medium">Industry Co-author involved?</label>
                </div>
                {formData.industryCoAuthorInvolved && (
                  <input name="industryName" value={formData.industryName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 mt-2" placeholder="Industry Name" />
                )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-sm">03</span>
              Research & Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Indexing & Stats</label>
                <div className="space-y-2">
                  <input name="researchArea" value={formData.researchArea} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="Research Area/Domain" />
                  {formData.indexing.map((idx, i) => (
                    <div key={i} className="flex gap-2">
                      <input value={idx} onChange={(e) => handleArrayChange(i, e.target.value, "indexing")} className="flex-1 px-4 py-2 rounded-lg border border-slate-200" placeholder="Indexing (Scopus, etc.)" />
                      {i > 0 && <button type="button" onClick={() => removeArrayItem(i, "indexing")} className="p-2 text-red-500">✕</button>}
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem("indexing")} className="text-xs font-bold text-emerald-600">+ Add Indexing</button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
                  <input type="checkbox" name="openAccess" checked={formData.openAccess} onChange={handleChange} className="w-5 h-5 rounded text-indigo-600" />
                  <label className="text-sm font-bold text-slate-700">Open Access?</label>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-500 pl-2">Number of Pages</label>
                  <input type="number" name="numberOfPages" value={formData.numberOfPages} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200" />
                </div>
              </div>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3 font-bold text-slate-700"><input type="checkbox" name="awardsRecognition.hasAwards" checked={formData.awardsRecognition.hasAwards} onChange={handleChange} className="w-5 h-5 rounded text-indigo-600" /><span>Awards/Recognition Received?</span></div>
                  {formData.awardsRecognition.hasAwards && (
                    <input name="awardsRecognition.details" value={formData.awardsRecognition.details} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200" placeholder="Specify awards" />
                  )}
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3 font-bold text-slate-700 h-fit">
                  <input type="checkbox" name="royaltyReceived" checked={formData.royaltyReceived} onChange={handleChange} className="w-5 h-5 rounded text-indigo-600" /><span>Royalty Received?</span>
                </div>
            </div>
            
            <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" name="cashIncentive.received" checked={formData.cashIncentive.received} onChange={handleChange} className="w-6 h-6 rounded text-blue-600" />
                  <label className="text-base font-bold text-slate-800">Received cash incentive amount from college?</label>
                </div>
                {formData.cashIncentive.received && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="number" name="cashIncentive.amount" value={formData.cashIncentive.amount} onChange={handleChange} className="px-4 py-3 rounded-xl border border-blue-200" placeholder="Amount (Rs.)" />
                    <input name="cashIncentive.vchBillNo" value={formData.cashIncentive.vchBillNo} onChange={handleChange} className="px-4 py-3 rounded-xl border border-blue-200" placeholder="Vch / Bill No." />
                  </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-2">Publication Link</label>
                <input name="linkToPublished" value={formData.linkToPublished} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200" placeholder="Link to Published Book/Chapter" />
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">

  <label className="flex items-start gap-3 cursor-pointer">
    <input
      type="checkbox"
      name="supportingDocuments.hasDocuments"
      checked={formData.supportingDocuments.hasDocuments}
      onChange={handleChange}
      className="mt-1 w-5 h-5 accent-indigo-600 cursor-pointer"
    />

    <div>
      <span className="font-semibold text-slate-800">
        Supporting Documents
      </span>
      <p className="text-sm text-slate-500">
        Provide details if you have any documents
      </p>
    </div>
  </label>

  {formData.supportingDocuments.hasDocuments && (
    <input
      name="supportingDocuments.details"
      value={formData.supportingDocuments.details}
      onChange={handleChange}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
      placeholder="E.g. Certificate, Agreement, ID proof..."
    />
  )}

</div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white pb-4 border-t mt-4">
            <button type="button" onClick={onClose} className="px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold bg-reg-100 cursor-pointer hover:bg-reg-300">Cancel</button>
            <button type="submit" className="px-10 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200">
              {initialData ? "Update Publication" : "Save Publication"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
