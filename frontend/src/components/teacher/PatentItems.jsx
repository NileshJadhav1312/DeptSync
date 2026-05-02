import React, { useState, useEffect } from "react";
import Table from "../common/Table";

export function PatentsTable({ patents, onEdit, onDelete }) {
  const columns = [
    { header: "Sr. No.", accessor: (row, idx) => idx + 1 },
    { header: "Title", accessor: "titleOfPatent" },
    { header: "Type", accessor: "typeOfPatent" },
    { header: "National/Intl.", accessor: "nationalInternational" },
    { header: "PCCoE Applicant?", accessor: (row) => row.isPccoeApplicant ? "Y" : "N" },
    { header: "Applicant", accessor: "nameOfApplicant" },
    { header: "Inventors", accessor: "nameOfInventors" },
    { header: "App. No.", accessor: "applicationNumber" },
    { header: "Date of Filing", accessor: (row) => row.dateOfFiling ? new Date(row.dateOfFiling).toLocaleDateString() : "-" },
    { header: "Status", accessor: "status" },
    { header: "Document", accessor: (row) => row.proofDocument ? <a href={row.proofDocument} target="_blank" rel="noreferrer" className="text-blue-500 underline text-xs">View</a> : "-" },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-2">
          <button className="btn-secondary text-[10px] px-2 py-1" onClick={() => onEdit(row)}>Edit</button>
          <button className="text-red-500 hover:bg-red-50 text-[10px] uppercase font-bold px-2 py-1 rounded" onClick={() => onDelete(row._id)}>Delete</button>
        </div>
      )
    }
  ];

  return <Table columns={columns} data={patents} />;
}

export function PatentFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    titleOfPatent: "",
    typeOfPatent: "Utility",
    nationalInternational: "National",
    isPccoeApplicant: true,
    nameOfApplicant: "",
    nameOfInventors: "",
    applicationNumber: "",
    dateOfFiling: "",
    dateOfPublication: "",
    dateOfGrant: "",
    status: "Filed",
    proofDocument: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dateOfFiling: initialData.dateOfFiling ? new Date(initialData.dateOfFiling).toISOString().split("T")[0] : "",
        dateOfPublication: initialData.dateOfPublication ? new Date(initialData.dateOfPublication).toISOString().split("T")[0] : "",
        dateOfGrant: initialData.dateOfGrant ? new Date(initialData.dateOfGrant).toISOString().split("T")[0] : ""
      });
    } else {
      setFormData({
        titleOfPatent: "",
        typeOfPatent: "Utility",
        nationalInternational: "National",
        isPccoeApplicant: true,
        nameOfApplicant: "",
        nameOfInventors: "",
        applicationNumber: "",
        dateOfFiling: "",
        dateOfPublication: "",
        dateOfGrant: "",
        status: "Filed",
        proofDocument: ""
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">{initialData ? "Edit Patent" : "Add Patent"}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 flex-1 overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Title of Patent/Design</label>
              <input required name="titleOfPatent" value={formData.titleOfPatent} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Type of Patent</label>
              <select name="typeOfPatent" value={formData.typeOfPatent} onChange={handleChange} className="input w-full">
                <option value="Utility">Utility</option>
                <option value="Design">Design</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">National/International</label>
              <select name="nationalInternational" value={formData.nationalInternational} onChange={handleChange} className="input w-full">
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
            </div>

            <div className="col-span-2 flex items-center gap-2 my-2">
              <input type="checkbox" name="isPccoeApplicant" checked={formData.isPccoeApplicant} onChange={handleChange} className="w-4 h-4" />
              <label className="text-sm font-medium">Is PCCoE an Applicant? (Y/N)</label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name of Applicant</label>
              <input required name="nameOfApplicant" value={formData.nameOfApplicant} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name of Inventor/s</label>
              <input required name="nameOfInventors" value={formData.nameOfInventors} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Application Number</label>
              <input required name="applicationNumber" value={formData.applicationNumber} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input w-full">
                <option value="Filed">Filed</option>
                <option value="Published">Published</option>
                <option value="Registered">Registered</option>
                <option value="Granted">Granted</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Filing</label>
              <input required type="date" name="dateOfFiling" value={formData.dateOfFiling} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Publication</label>
              <input type="date" name="dateOfPublication" value={formData.dateOfPublication} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Grant</label>
              <input type="date" name="dateOfGrant" value={formData.dateOfGrant} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Proof Document (PDF)</label>
              <input 
                 type="file" 
                 accept=".pdf,.doc,.docx"
                 className="input w-full" 
                 onChange={(e) => {
                   if (e.target.files.length > 0) {
                     setFormData(prev => ({ ...prev, proofDocument: URL.createObjectURL(e.target.files[0]) }));
                   }
                 }} 
              />
              <p className="text-xs text-slate-500 mt-1">Upload certificates/application receipts.</p>
            </div>

          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">{initialData ? "Update Patent" : "Save Patent"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
