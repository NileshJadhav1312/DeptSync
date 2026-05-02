import React, { useState, useEffect } from "react";

const PROJECT_TYPES = ["major", "mini", "research", "consultancy", "other"];
const PROJECT_CATEGORIES = ["inhouse", "internship", "live", "sponsored", "other"];

export default function ProjectFormModal({ isOpen, onClose, onSubmit, project, role, userProfile }) {
  const [formData, setFormData] = useState({
    academicYear: "",
    title: "",
    guideName: "",
    name: "",
    cclass: "",
    semester: "",
    abstract: "",
    fund: "",
    projectType: "major",
    category: "inhouse",
    supportingDocuments: "",
    identificationNumber: "",
    isGroupProject: false,
    members: [],
  });

  const [newMember, setNewMember] = useState({ name: "", identificationNumber: "" });

  useEffect(() => {
    if (project) {
      setFormData({
        academicYear: project.academicYear || "",
        title: project.title || "",
        guideName: project.guideName || "",
        name: project.name || "",
        cclass: project.cclass || "",
        semester: project.semester || "",
        abstract: project.abstract || "",
        fund: project.fund || "",
        projectType: project.projectType || "major",
        category: project.category || "inhouse",
        supportingDocuments: project.supportingDocuments || "",
        identificationNumber: project.identificationNumber || "",
        isGroupProject: project.isGroupProject || false,
        members: project.members || [],
      });
    } else if (userProfile) {
      setFormData(prev => ({
        ...prev,
        name: `${userProfile.firstName} ${userProfile.lastName || ""}`.trim(),
        identificationNumber: userProfile.prnNumber || userProfile.employeeId || "",
        cclass: userProfile.className || "",
        semester: userProfile.semester || "",
      }));
    }
  }, [project, userProfile, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addMember = () => {
    if (newMember.name && newMember.identificationNumber) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, newMember]
      }));
      setNewMember({ name: "", identificationNumber: "" });
    }
  };

  const removeMember = (index) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, role: role || "student" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col my-4 max-h-[90vh] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{project ? "Edit Project Details" : "Add Project Details"}</h2>
            <p className="text-sm text-slate-500 mt-1">Provide comprehensive details about the project.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 scrollbar-thin">
          <form id="projectForm" onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Project Title <span className="text-red-500">*</span></label>
                  <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" placeholder="Enter project title..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Academic Year <span className="text-red-500">*</span></label>
                  <input required name="academicYear" value={formData.academicYear} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="2023-24" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Project Guide <span className="text-red-500">*</span></label>
                  <input required name="guideName" value={formData.guideName} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="Enter guide name..." />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Project Type <span className="text-red-500">*</span></label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    {PROJECT_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Category <span className="text-red-500">*</span></label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium">
                    {PROJECT_CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Personal & Academic Info */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Additional Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Fund/Agency Name</label>
                  <input name="fund" value={formData.fund} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="e.g. MSBTE, University..." />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Document Link</label>
                  <input type="url" name="supportingDocuments" value={formData.supportingDocuments} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="https://..." />
                </div>
                {role === "student" && (
                  <>
                    <div>
                      <label className="text-xs font-bold text-slate-500 mb-2 block">Class Name</label>
                      <input name="cclass" value={formData.cclass} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="e.g. TYCO" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 mb-2 block">Semester</label>
                      <input name="semester" value={formData.semester} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none transition-all font-medium" placeholder="e.g. 6" />
                    </div>
                  </>
                )}
                <div className="md:col-span-4">
                  <label className="text-xs font-bold text-slate-500 mb-2 block">Abstract / Description</label>
                  <textarea name="abstract" value={formData.abstract} onChange={handleChange} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl h-32 text-sm font-medium outline-none transition-all" placeholder="Brief summary of the project..." />
                </div>
              </div>
            </div>

            {/* Section 3: Group Project Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-5 bg-blue-50 border border-blue-100 rounded-3xl">
                <input type="checkbox" name="isGroupProject" id="isGroupProject" checked={formData.isGroupProject} onChange={handleChange} className="w-6 h-6 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all" />
                <label htmlFor="isGroupProject" className="text-sm font-bold text-blue-900 cursor-pointer select-none">
                  This is a Group Project
                </label>
              </div>

              {formData.isGroupProject && (
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-6 animate-in slide-in-from-top-4">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Group Members</label>
                  <div className="flex flex-wrap gap-4">
                    <input type="text" placeholder="Member Name" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} className="flex-1 min-w-[200px] px-5 py-2.5 bg-white border border-slate-200 rounded-xl outline-none font-medium" />
                    <input type="text" placeholder="PRN / ID" value={newMember.identificationNumber} onChange={(e) => setNewMember({ ...newMember, identificationNumber: e.target.value })} className="w-40 px-5 py-2.5 bg-white border border-slate-200 rounded-xl outline-none font-medium" />
                    <button type="button" onClick={addMember} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">Add Member</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.members.map((m, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 bg-white border border-slate-200 rounded-2xl group hover:shadow-md transition-all">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{m.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{m.identificationNumber}</p>
                        </div>
                        <button type="button" onClick={() => removeMember(idx)} className="text-red-400 hover:text-red-600 p-1 transition-colors">✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        <div className="p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end gap-4 shrink-0">
          <button type="button" onClick={onClose} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 bg-white border border-slate-200 shadow-sm rounded-2xl transition-all">
            Cancel
          </button>
          <button type="submit" form="projectForm" className="px-8 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 rounded-2xl transition-all active:scale-95 min-w-[180px]">
            {project ? "Update Project" : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
