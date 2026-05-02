import React, { useState, useEffect } from "react";

export default function ConferencePublicationFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    role: "Presenter",
    researchPaperTitle: "",
    authors: [""],
    correspondingAuthor: "",
    pccoeAuthors: [""],
    industryCoAuthorInvolved: false,
    industryName: "",
    conferenceName: "",
    organizingInstitution: "",
    conferenceTheme: "",
    conferenceDate: "",
    location: "",
    conferenceLevel: "International",
    publicationType: "Proceedings",
    publisherName: "",
    isbn: "",
    issn: "",
    indexing: [""],
    doi: "",
    pageNumbers: "",
    researchDomain: "",
    awardsRecognition: { hasAwards: false, details: "" },
    certificateReceived: false,
    cashIncentive: { received: false, amount: 0, vchBillNo: "" },
    articleUrl: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        conferenceDate: initialData.conferenceDate ? new Date(initialData.conferenceDate).toISOString().split('T')[0] : ""
      });
    } else {
      setFormData({
        role: "Presenter",
        researchPaperTitle: "",
        authors: [""],
        correspondingAuthor: "",
        pccoeAuthors: [""],
        industryCoAuthorInvolved: false,
        industryName: "",
        conferenceName: "",
        organizingInstitution: "",
        conferenceTheme: "",
        conferenceDate: "",
        location: "",
        conferenceLevel: "International",
        publicationType: "Proceedings",
        publisherName: "",
        isbn: "",
        issn: "",
        indexing: [""],
        doi: "",
        pageNumbers: "",
        researchDomain: "",
        awardsRecognition: { hasAwards: false, details: "" },
        certificateReceived: false,
        cashIncentive: { received: false, amount: 0, vchBillNo: "" },
        articleUrl: ""
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col my-4 max-h-[90vh] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{initialData ? "Edit Conference Publication" : "Add Conference Publication"}</h2>
            <p className="text-sm text-slate-500 mt-1">Provide comprehensive details about the conference paper publication.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
          <form id="conferenceForm" onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Role in Conference <span className="text-red-500">*</span></label>
                  <select name="role" value={formData.role} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium">
                    {["Attendee", "Presenter", "Session Chair", "Panelist", "Organizer"].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Title of Research Paper <span className="text-red-500">*</span></label>
                  <input name="researchPaperTitle" value={formData.researchPaperTitle} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" placeholder="Enter paper title..." />
                </div>
              </div>
            </div>

            {/* Section 2: Authorship */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Authorship Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500">Authors (All in order) <span className="text-red-500">*</span></label>
                    <button type="button" onClick={() => addArrayItem("authors")} className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                  </div>
                  {formData.authors.map((author, index) => (
                    <div key={index} className="flex gap-2">
                      <input value={author} onChange={(e) => handleArrayChange(index, e.target.value, "authors")} required className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" placeholder={`Author ${index + 1}...`} />
                      {index > 0 && <button type="button" onClick={() => removeArrayItem(index, "authors")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>}
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Corresponding Author</label>
                  <input name="correspondingAuthor" value={formData.correspondingAuthor} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" placeholder="Name of corresponding author..." />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500">PCCOE Authors</label>
                    <button type="button" onClick={() => addArrayItem("pccoeAuthors")} className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                  </div>
                  {formData.pccoeAuthors.map((author, index) => (
                    <div key={index} className="flex gap-2">
                      <input value={author} onChange={(e) => handleArrayChange(index, e.target.value, "pccoeAuthors")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" placeholder={`PCCOE Author ${index + 1}...`} />
                      {index > 0 && <button type="button" onClick={() => removeArrayItem(index, "pccoeAuthors")} className="text-red-400 hover:text-red-600 transition-colors">✕</button>}
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" name="industryCoAuthorInvolved" checked={formData.industryCoAuthorInvolved} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all" />
                    <span className="text-sm font-bold text-slate-700">Industry Co-author involved?</span>
                  </div>
                  {formData.industryCoAuthorInvolved && (
                    <input name="industryName" value={formData.industryName} onChange={handleChange} className="w-full px-5 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium mt-4" placeholder="Industry Name..." />
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Conference Information */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Conference Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Conference Name <span className="text-red-500">*</span></label>
                  <input name="conferenceName" value={formData.conferenceName} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" placeholder="Conference name..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Organizing Institution/Body <span className="text-red-500">*</span></label>
                  <input name="organizingInstitution" value={formData.organizingInstitution} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium" placeholder="E.g. IEEE, ACM..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Conference Theme/Focus Area</label>
                  <input name="conferenceTheme" value={formData.conferenceTheme} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="E.g. AI/ML, Cloud Computing..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Date of Conference <span className="text-red-500">*</span></label>
                  <input name="conferenceDate" type="date" value={formData.conferenceDate} onChange={handleChange} required className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="City, Country..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Conference Level <span className="text-red-500">*</span></label>
                  <select name="conferenceLevel" value={formData.conferenceLevel} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    {["National", "International"].map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Publication Specifications */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Publication Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Publication Type <span className="text-red-500">*</span></label>
                  <select name="publicationType" value={formData.publicationType} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    {["Proceedings", "Indexed Journal", "Book Chapter"].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Publisher Name</label>
                  <input name="publisherName" value={formData.publisherName} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium" placeholder="Publisher name..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">ISBN</label>
                  <input name="isbn" value={formData.isbn} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium" placeholder="ISBN..." />
                </div>
                <div className="md:col-span-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-500">Indexing</label>
                    <button type="button" onClick={() => addArrayItem("indexing")} className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1 rounded-lg transition-all">+ Add</button>
                  </div>
                  {formData.indexing.map((idx, index) => (
                    <div key={index} className="flex gap-2">
                      <input value={idx} onChange={(e) => handleArrayChange(index, e.target.value, "indexing")} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium" placeholder={`Indexing ${index + 1}...`} />
                      {index > 0 && <button type="button" onClick={() => removeArrayItem(index, "indexing")} className="text-red-400 hover:text-red-600">✕</button>}
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">ISSN</label>
                  <input name="issn" value={formData.issn} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium" placeholder="ISSN..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">DOI</label>
                  <input name="doi" value={formData.doi} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium" placeholder="DOI..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Page Numbers</label>
                  <input name="pageNumbers" value={formData.pageNumbers} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium" placeholder="e.g. 124-145" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Article URL</label>
                  <input name="articleUrl" value={formData.articleUrl} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium" placeholder="https://..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Research Domain</label>
                  <input name="researchDomain" value={formData.researchDomain} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium" placeholder="E.g. AI, Cyber Security..." />
                </div>
              </div>
            </div>

            {/* Section 5: Recognition & Incentives */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Recognition & Incentives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" name="awardsRecognition.hasAwards" checked={formData.awardsRecognition.hasAwards} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all" />
                    <span className="text-sm font-bold text-slate-700">Any Awards/Special Recognition?</span>
                  </div>
                  {formData.awardsRecognition.hasAwards && (
                    <textarea name="awardsRecognition.details" value={formData.awardsRecognition.details} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl h-24 text-sm font-medium outline-none transition-all" placeholder="Specify recognition details..." />
                  )}
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-4 h-fit">
                  <input type="checkbox" name="certificateReceived" checked={formData.certificateReceived} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all" />
                  <span className="text-sm font-bold text-slate-700">Certificate Received?</span>
                </div>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4 md:col-span-2">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" name="cashIncentive.received" checked={formData.cashIncentive.received} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all" />
                      <span className="text-sm font-bold text-slate-700">Received cash incentive from college?</span>
                    </div>
                    {formData.cashIncentive.received && (
                      <div className="flex gap-4">
                        <input type="number" name="cashIncentive.amount" value={formData.cashIncentive.amount} onChange={handleChange} className="px-4 py-2 bg-white border border-slate-200 rounded-xl w-32 font-bold text-indigo-600 outline-none" placeholder="Amount" />
                        <input name="cashIncentive.vchBillNo" value={formData.cashIncentive.vchBillNo} onChange={handleChange} className="px-4 py-2 bg-white border border-slate-200 rounded-xl w-40 font-medium outline-none" placeholder="Bill/Vch No." />
                      </div>
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
          <button type="submit" form="conferenceForm" className="px-8 py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-2xl transition-all active:scale-95 min-w-[180px]">
            {initialData ? "Update Publication" : "Save Publication"}
          </button>
        </div>
      </div>
    </div>
  );
}
