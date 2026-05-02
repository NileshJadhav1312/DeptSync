import React, { useState, useEffect } from "react";

export default function JournalPublicationFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    journalName: "",
    issnNumber: "",
    isbnNumber: "",
    publisherName: "",
    indexedIn: [],
    otherIndexing: "",
    quartile: "None",
    impactFactor: "",
    citeScore: "",
    publicationType: "Open Access",
    paperTitle: "",
    authors: [""],
    pccoeAuthors: [""],
    industryCoAuthor: "",
    researchArea: "",
    dateOfSubmission: "",
    dateOfAcceptance: "",
    dateOfPublication: "",
    year: new Date().getFullYear(),
    doi: "",
    volumeAndIssue: "",
    pageNumbers: "",
    awardsReceived: false,
    awardDetails: "",
    supportingDocuments: false,
    supportingDocumentDetails: "",
    cashIncentive: false,
    cashIncentiveAmount: "",
    vchBillNo: "",
    articleUrl: "",
    scopusLink: "",
    googleScholarLink: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const indexingOptions = ["Scopus", "WoS", "IEEE", "UGC Care", "Other"];

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData({
        ...initialData,
        dateOfSubmission: initialData.dateOfSubmission ? new Date(initialData.dateOfSubmission).toISOString().split("T")[0] : "",
        dateOfAcceptance: initialData.dateOfAcceptance ? new Date(initialData.dateOfAcceptance).toISOString().split("T")[0] : "",
        dateOfPublication: initialData.dateOfPublication ? new Date(initialData.dateOfPublication).toISOString().split("T")[0] : "",
      });
    } else if (isOpen && !initialData) {
      setFormData({
        journalName: "",
        issnNumber: "",
        isbnNumber: "",
        publisherName: "",
        indexedIn: [],
        otherIndexing: "",
        quartile: "None",
        impactFactor: "",
        citeScore: "",
        publicationType: "Open Access",
        paperTitle: "",
        authors: [""],
        pccoeAuthors: [""],
        industryCoAuthor: "",
        researchArea: "",
        dateOfSubmission: "",
        dateOfAcceptance: "",
        dateOfPublication: "",
        year: new Date().getFullYear(),
        doi: "",
        volumeAndIssue: "",
        pageNumbers: "",
        awardsReceived: false,
        awardDetails: "",
        supportingDocuments: false,
        supportingDocumentDetails: "",
        cashIncentive: false,
        cashIncentiveAmount: "",
        vchBillNo: "",
        articleUrl: "",
        scopusLink: "",
        googleScholarLink: "",
      });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxGroup = (value) => {
    setFormData((prev) => {
      const indexedIn = prev.indexedIn.includes(value)
        ? prev.indexedIn.filter((i) => i !== value)
        : [...prev.indexedIn, value];
      return { ...prev, indexedIn };
    });
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
      setError(err?.response?.data?.message || err.message || "Failed to save journal publication.");
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
            <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Journal Details" : ""}</h2>
            <h2 className="text-xl text-indigo-800 font-semibold">Add Journal Ddetails</h2>
            <p className="text-sm text-slate-500 mt-1">Provide comprehensive details about your journal publication.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
          {error && (
            <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm font-semibold flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <form id="journalPublicationForm" onSubmit={handleFormSubmit} className="space-y-10">
            {/* Section 1: Paper & Journal Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Paper & Journal Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Title of Paper <span className="text-red-500">*</span></label>
                  <input required name="paperTitle" value={formData.paperTitle} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="Enter paper title..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Publication Year <span className="text-red-500">*</span></label>
                  <input required type="number" name="year" value={formData.year} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Journal Name <span className="text-red-500">*</span></label>
                  <input required name="journalName" value={formData.journalName} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="e.g. Nature, IEEE Access..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Publisher Name</label>
                  <input name="publisherName" value={formData.publisherName} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="e.g. Elsevier, Springer..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">ISSN Number</label>
                  <input name="issnNumber" value={formData.issnNumber} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="XXXX-XXXX" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">ISBN Number</label>
                  <input name="isbnNumber" value={formData.isbnNumber} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Publication Type <span className="text-red-500">*</span></label>
                  <select name="publicationType" value={formData.publicationType} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium">
                    <option value="Open Access">Open Access</option>
                    <option value="Paid">Paid</option>
                    <option value="Free">Free</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Research Area/Domain</label>
                  <input name="researchArea" value={formData.researchArea} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium" placeholder="e.g. AI, Cloud Computing..." />
                </div>
              </div>
            </div>

            {/* Section 2: Indexing & Impact */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Indexing & Impact
              </h3>
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <label className="text-xs font-bold text-slate-500 mb-4 block">Indexed in</label>
                <div className="flex flex-wrap gap-4">
                  {indexingOptions.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={formData.indexedIn.includes(opt)} onChange={() => handleCheckboxGroup(opt)} className="hidden" />
                      <div className={`px-4 py-2 rounded-xl border-2 transition-all font-semibold text-sm ${formData.indexedIn.includes(opt) ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-white border-slate-200 text-slate-500 hover:border-emerald-300"}`}>
                        {opt}
                      </div>
                    </label>
                  ))}
                </div>
                {formData.indexedIn.includes("Other") && (
                  <input name="otherIndexing" value={formData.otherIndexing} onChange={handleChange} className="mt-4 w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" placeholder="Please specify other indexing details..." />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Quartile</label>
                  <select name="quartile" value={formData.quartile} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium">
                    <option value="None">None</option>
                    <option value="Q1">Q1</option>
                    <option value="Q2">Q2</option>
                    <option value="Q3">Q3</option>
                    <option value="Q4">Q4</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block ">Impact Factor</label>
                  <input type="number" step="0.01" name="impactFactor" value={formData.impactFactor} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Cite Score</label>
                  <input type="number" step="0.01" name="citeScore" value={formData.citeScore} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all font-medium" />
                </div>
              </div>
            </div>

            {/* Section 3: Authorship */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Authors (All)
                  </h3>
                  <button type="button" onClick={() => addArrayItem("authors")} className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                </div>
                {formData.authors.map((author, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input required value={author} onChange={(e) => handleArrayChange(idx, e.target.value, "authors")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all" placeholder={`Author ${idx + 1}...`} />
                    {formData.authors.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem(idx, "authors")} className="text-red-400 hover:text-red-600">✕</button>
                    )}
                  </div>
                
                
                ))}
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Industry Co-Author involved?</label>
                  <input name="industryCoAuthor" value={formData.industryCoAuthor} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none" placeholder="Name of Industry..." />
                </div>

              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    PCCOE Authors
                  </h3>
                  <button type="button" onClick={() => addArrayItem("pccoeAuthors")} className="text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                </div>
                {formData.pccoeAuthors.map((author, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input required value={author} onChange={(e) => handleArrayChange(idx, e.target.value, "pccoeAuthors")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/10 transition-all" placeholder={`PCCOE Author ${idx + 1}...`} />
                    {formData.pccoeAuthors.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem(idx, "pccoeAuthors")} className="text-red-400 hover:text-red-600">✕</button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Submission & IDs */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Timeline & Identifiers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Date of Submission</label>
                  <input type="date" name="dateOfSubmission" value={formData.dateOfSubmission} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Date of Acceptance</label>
                  <input type="date" name="dateOfAcceptance" value={formData.dateOfAcceptance} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Date of Publication</label>
                  <input type="date" name="dateOfPublication" value={formData.dateOfPublication} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500/10" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">DOI</label>
                  <input name="doi" value={formData.doi} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none" placeholder="10.XXXX/XXXX" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Volume & Issue</label>
                  <input name="volumeAndIssue" value={formData.volumeAndIssue} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none" placeholder="Vol 12, Issue 3" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Page Numbers</label>
                  <input name="pageNumbers" value={formData.pageNumbers} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none" placeholder="124-145" />
                </div>
                <div className="md:col-span-2 v2 ">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Article URL</label>
                  <input name="articleUrl" value={formData.articleUrl} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none" placeholder="https://..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Scopus Link</label>
                  <input name="scopusLink" value={formData.scopusLink || ""} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none" placeholder="https://www.scopus.com/record/..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Google Scholar Link</label>
                  <input name="googleScholarLink" value={formData.googleScholarLink || ""} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none" placeholder="https://scholar.google.com/..." />
                </div>
               
              </div>
            </div>

            {/* Section 5: Recognition & Incentives */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Incentives & Recognition
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="awardsReceived" checked={formData.awardsReceived} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Awards or Recognition Received?</span>
                  </label>
                  {formData.awardsReceived && (
                    <textarea name="awardDetails" value={formData.awardDetails} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl h-24 text-sm font-medium" placeholder="Mention awards details..." />
                  )}
                </div>

                <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" name="supportingDocuments" checked={formData.supportingDocuments} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">Supporting Documents Uploaded?</span>
                  </label>
                  {formData.supportingDocuments && (
                    <textarea name="supportingDocumentDetails" value={formData.supportingDocumentDetails} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl h-24 text-sm font-medium" placeholder="Specify docs (Acceptance letter, proof...)" />
                  )}
                </div>

                <div className="p-6 bg-slate-100 rounded-3xl border border-slate-200 space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" name="cashIncentive" checked={formData.cashIncentive} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                      <span className="text-sm font-bold text-slate-700">Received cash incentive from college?</span>
                    </label>
                    {formData.cashIncentive && (
                      <div className="flex gap-4">
                        <input type="number" name="cashIncentiveAmount" value={formData.cashIncentiveAmount} onChange={handleChange} className="px-4 py-2 bg-white border border-slate-200 rounded-xl w-32 font-bold text-gray-700" placeholder="Amount" />
                        <input name="vchBillNo" value={formData.vchBillNo} onChange={handleChange} className="px-4 py-2 bg-white border border-slate-200 rounded-xl w-40 text-gray-700" placeholder="Bill/Vch No." />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end gap-4 shrink-0">
          <button type="button" onClick={onClose} disabled={loading} className="px-6 py-3 text-sm font-bold text-white bg-red-500 hover:bg-red-600 border border-slate-500 shadow-sm rounded-2xl transition-all">
            Cancel
          </button>
          <button type="submit" form="journalPublicationForm" disabled={loading} className="px-8 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 rounded-2xl transition-all active:scale-95 disabled:opacity-50 min-w-[180px]">
            {loading ? "Processing..." : initialData ? "Update Journal" : "Save Journal"}
          </button>
        </div>
      </div>
    </div>
  );
}
