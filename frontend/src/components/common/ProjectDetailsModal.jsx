import React from "react";

export default function ProjectDetailsModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Project Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Project Title</span>
              <span className="font-semibold text-slate-900 text-base">{project.title}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Academic Year</span>
              <span className="font-semibold text-slate-900">{project.academicYear}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Project Guide</span>
              <span className="font-semibold text-slate-900">{project.guideName}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Project Type</span>
              <span className="font-semibold text-slate-900">{project.projectType}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Category</span>
              <span className="font-semibold text-slate-900">{project.category}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Fund/Grant</span>
              <span className="font-semibold text-slate-900">{project.fund || "N/A"}</span>
            </div>
            {project.role === "student" ? (
              <>
                <div>
                  <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Class & Semester</span>
                  <span className="font-semibold text-slate-900">{project.cclass} | Sem {project.semester}</span>
                </div>
                <div>
                  <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">PRN Number</span>
                  <span className="font-semibold text-slate-900">{project.identificationNumber}</span>
                </div>
              </>
            ) : (
              <div>
                <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Employee ID</span>
                <span className="font-semibold text-slate-900">{project.identificationNumber}</span>
              </div>
            )}
          </div>

          <div className="pt-2">
             <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Abstract / Description</span>
             <p className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm mt-1 whitespace-pre-wrap">{project.abstract || "No abstract provided."}</p>
          </div>

          {project.isGroupProject && project.members?.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
               <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-2">Group Members</span>
               <div className="grid grid-cols-2 gap-3">
                 {project.members.map((member, idx) => (
                   <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                     <p className="font-bold text-slate-900">{member.name}</p>
                     <p className="text-slate-500 mt-0.5">{member.identificationNumber}</p>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
