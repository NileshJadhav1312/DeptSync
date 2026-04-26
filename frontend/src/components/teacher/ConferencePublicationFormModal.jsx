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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
          <div>
            <h2 className="text-2xl font-bold">{initialData ? "Edit Conference Publication" : "Add Conference Publication"}</h2>
            <p className="text-indigo-100 text-sm mt-1">Fill in the details of the conference paper</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8">
          {/* Section 1: Role & Title */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-sm">01</span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Role in Conference</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 font-medium">
                  {["Attendee", "Presenter", "Session Chair", "Panelist", "Organizer"].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Title of Research Paper</label>
                <input name="researchPaperTitle" value={formData.researchPaperTitle} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium" placeholder="Enter paper title" />
              </div>
            </div>
          </div>

          {/* Section 2: Authors */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-sm">02</span>
              Authorship Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Authors (All in order)</label>
                {formData.authors.map((author, index) => (
                  <div key={index} className="flex gap-2">
                    <input value={author} onChange={(e) => handleArrayChange(index, e.target.value, "authors")} required className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="Author name" />
                    {index > 0 && <button type="button" onClick={() => removeArrayItem(index, "authors")} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">✕</button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem("authors")} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">+ Add Author</button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Corresponding Author</label>
                <input name="correspondingAuthor" value={formData.correspondingAuthor} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium" placeholder="Name of corresponding author" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Contributing authors from PCCOE</label>
                {formData.pccoeAuthors.map((author, index) => (
                  <div key={index} className="flex gap-2">
                    <input value={author} onChange={(e) => handleArrayChange(index, e.target.value, "pccoeAuthors")} className="flex-1 px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="PCCOE Author name" />
                    {index > 0 && <button type="button" onClick={() => removeArrayItem(index, "pccoeAuthors")} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">✕</button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem("pccoeAuthors")} className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">+ Add PCCOE Author</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <input type="checkbox" name="industryCoAuthorInvolved" checked={formData.industryCoAuthorInvolved} onChange={handleChange} className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500" />
                  <label className="text-sm font-bold text-slate-700 cursor-pointer">Industry Co-author involved?</label>
                </div>
                {formData.industryCoAuthorInvolved && (
                  <div className="space-y-2 animate-in slide-in-from-top-2">
                    <label className="text-sm font-bold text-slate-700">Industry Name</label>
                    <input name="industryName" value={formData.industryName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium" placeholder="Enter company name" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Conference Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center text-sm">03</span>
              Conference Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Conference Name</label>
                <input name="conferenceName" value={formData.conferenceName} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium" placeholder="Enter conference name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Organizing Institution/Body</label>
                <input name="organizingInstitution" value={formData.organizingInstitution} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium" placeholder="E.g. IEEE, ACM, University of Mumbai" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Conference Theme/Focus Area</label>
                <input name="conferenceTheme" value={formData.conferenceTheme} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium" placeholder="E.g. AI/ML, Heat Transfer" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Date of Conference</label>
                <input name="conferenceDate" type="date" value={formData.conferenceDate} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Location</label>
                <input name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium" placeholder="City, Country, or Online" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Conference Level</label>
                <select name="conferenceLevel" value={formData.conferenceLevel} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 font-medium">
                  {["National", "International"].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Publication Specs */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">04</span>
              Publication Specifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Publication Type</label>
                <select name="publicationType" value={formData.publicationType} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all bg-slate-50 font-medium">
                  {["Proceedings", "Indexed Journal", "Book Chapter"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Publisher Name</label>
                <input name="publisherName" value={formData.publisherName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all font-medium" placeholder="E.g. Springer, IEEE Xplore" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Indexing of Proceedings</label>
                {formData.indexing.map((idx, index) => (
                  <div key={index} className="flex gap-2">
                    <input value={idx} onChange={(e) => handleArrayChange(index, e.target.value, "indexing")} className="flex-1 px-4 py-2 rounded-lg border border-slate-200" placeholder="E.g. Scopus, WoS" />
                    {index > 0 && <button type="button" onClick={() => removeArrayItem(index, "indexing")} className="p-2 text-red-500">✕</button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem("indexing")} className="text-xs font-bold text-indigo-600">+ Add Indexing</button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">ISBN</label>
                <input name="isbn" value={formData.isbn} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="ISBN" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">ISSN</label>
                <input name="issn" value={formData.issn} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="ISSN" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">DOI</label>
                <input name="doi" value={formData.doi} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="Digital Object Identifier" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Article URL</label>
                <input name="articleUrl" value={formData.articleUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="URL of Published Article" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Research Domain</label>
                <input name="researchDomain" value={formData.researchDomain} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="Research Domain" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Page Numbers</label>
                <input name="pageNumbers" value={formData.pageNumbers} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" placeholder="Page Numbers" />
              </div>
            </div>
          </div>

          {/* Section 5: Recognition & Incentives */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-sm">05</span>
              Recognition & Incentives
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" name="awardsRecognition.hasAwards" checked={formData.awardsRecognition.hasAwards} onChange={handleChange} className="w-5 h-5 rounded text-indigo-600" />
                  <label className="text-sm font-bold text-slate-700">Any Awards/Special Recognition?</label>
                </div>
                {formData.awardsRecognition.hasAwards && (
                  <input name="awardsRecognition.details" value={formData.awardsRecognition.details} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-slate-200" placeholder="Specify recognition" />
                )}
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3 h-fit">
                <input type="checkbox" name="certificateReceived" checked={formData.certificateReceived} onChange={handleChange} className="w-5 h-5 rounded text-indigo-600" />
                <label className="text-sm font-bold text-slate-700">Certificate Received?</label>
              </div>
            </div>
            
             <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" name="cashIncentive.received" checked={formData.cashIncentive.received} onChange={handleChange} className="w-6 h-6 rounded text-emerald-600" />
                  <label className="text-base font-bold text-slate-800">Received cash incentive from college?</label>
                </div>
                {formData.cashIncentive.received && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in zoom-in-95">
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Amount (Rs.)</label>
                      <input type="number" name="cashIncentive.amount" value={formData.cashIncentive.amount} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500" placeholder="Enter amount" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Vch / Bill No.</label>
                      <input name="cashIncentive.vchBillNo" value={formData.cashIncentive.vchBillNo} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500" placeholder="Enter reference number" />
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 sticky bottom-0 bg-white pb-4 border-t mt-8">
            <button type="button" onClick={onClose} className="px-8 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all">Cancel</button>
            <button type="submit" className="px-10 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all">
              {initialData ? "Update Publication" : "Save Publication"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
