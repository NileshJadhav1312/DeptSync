import React, { useState, useEffect } from "react";
import Table from "../common/Table";

export function CopyrightsTable({ copyrights, onEdit, onDelete }) {
  const columns = [
    { header: "Sr. No.", accessor: (row, idx) => idx + 1 },
    { header: "Department", accessor: "departmentName" },
    { header: "Academic Year", accessor: "academicYear" },
    { header: "Title", accessor: "titleOfCopyright" },
    { header: "Applicant", accessor: "nameOfApplicant" },
    { header: "Author/s", accessor: "nameOfAuthors" },
    { header: "Filing Date", accessor: (row) => row.dateOfFiling ? new Date(row.dateOfFiling).toLocaleDateString() : "-" },
    { header: "Registration Date", accessor: (row) => row.dateOfRegistration ? new Date(row.dateOfRegistration).toLocaleDateString() : "-" },
    { header: "Dairy Number", accessor: "dairyNumber" },
    { header: "RoC Number", accessor: "rocNumber" },
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

  return <Table columns={columns} data={copyrights} />;
}

export function CopyrightFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    academicYear: "",
    titleOfCopyright: "",
    nameOfApplicant: "",
    nameOfAuthors: "",
    dateOfFiling: "",
    dateOfRegistration: "",
    dairyNumber: "",
    rocNumber: "",
    status: "Filed",
    proofDocument: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dateOfFiling: initialData.dateOfFiling ? new Date(initialData.dateOfFiling).toISOString().split("T")[0] : "",
        dateOfRegistration: initialData.dateOfRegistration ? new Date(initialData.dateOfRegistration).toISOString().split("T")[0] : ""
      });
    } else {
      setFormData({
        academicYear: "",
        titleOfCopyright: "",
        nameOfApplicant: "",
        nameOfAuthors: "",
        dateOfFiling: "",
        dateOfRegistration: "",
        dairyNumber: "",
        rocNumber: "",
        status: "Filed",
        proofDocument: ""
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">{initialData ? "Edit Copyright" : "Add Copyright"}</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Title of Copyright</label>
              <input required name="titleOfCopyright" value={formData.titleOfCopyright} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Academic Year</label>
              <input required name="academicYear" placeholder="e.g. 2023-24" value={formData.academicYear} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name of Applicant</label>
              <input required name="nameOfApplicant" value={formData.nameOfApplicant} onChange={handleChange} className="input w-full" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Name of Author/s</label>
              <input required name="nameOfAuthors" value={formData.nameOfAuthors} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input w-full">
                <option value="Filed">Filed</option>
                <option value="Registered">Registered</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Filing</label>
              <input required type="date" name="dateOfFiling" value={formData.dateOfFiling} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Date of Registration</label>
              <input type="date" name="dateOfRegistration" value={formData.dateOfRegistration} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dairy Number</label>
              <input name="dairyNumber" value={formData.dairyNumber} onChange={handleChange} className="input w-full" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">RoC Number (Post Registration)</label>
              <input name="rocNumber" value={formData.rocNumber} onChange={handleChange} className="input w-full" />
            </div>

            <div className="col-span-2">
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
            <button type="submit" className="btn-primary">{initialData ? "Update Copyright" : "Save Copyright"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
