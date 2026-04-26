import { useState } from "react";

export default function TeacherDetailsModal({ isOpen, onClose, teacher }) {
  if (!isOpen || !teacher) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-100">
        {/* Header of the details card*/}
        <div className="relative h-32 bg-gradient-to-r from-indigo-600 to-purple-700 flex items-end px-8 pb-4">
           <button
             onClick={onClose}
             className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
           >
             ×
           </button>
           <div className="flex items-center gap-6 translate-y-10">
              <div className="h-24 w-24 rounded-3xl bg-white p-1.5 shadow-xl">
                 <div className="h-full w-full rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl font-bold text-indigo-600 border border-indigo-300">
                    {`${teacher.firstName?.[0] || ""}${teacher.lastName?.[0] || ""}`.toUpperCase() || "T"}
                 </div>
              </div>
              <div className="pb-8">
                 <h2 className="text-2xl font-bold text-white">{[teacher.firstName, teacher.lastName].filter(Boolean).join(" ")}</h2>
                 <p className="text-indigo-100 text-sm font-medium">Employee ID: {teacher.employeeId || "N/A"}</p>
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="pt-16 p-8 overflow-y-auto flex-1 custom-scrollbar">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <section>
                 <h3 className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em] mb-4">Personal Information</h3>
                 <div className="space-y-4">
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Email Address</p>
                       <p className="text-indigo-700 font-semibold">{teacher.email}</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Employee ID</p>
                       <p className="text-indigo-700 font-semibold">{teacher.employeeId || "N/A"}</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Username</p>
                       <p className="text-indigo-700 font-semibold">{teacher.username}</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Contact Number</p>
                       <p className="text-indigo-700 font-semibold">{teacher.contactNumber || "Not Provided"}</p>
                    </div>
                      <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Alternate Contact Number</p>
                       <p className="text-indigo-700 font-semibold">{teacher.alternateContactNumber || "Not Provided"}</p>
                    </div>
                      <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Birth Date</p>
                       <p className="text-indigo-700 font-semibold">{teacher.birthDate || "Not Provided"}</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Gender</p>
                       <p className="text-indigo-700 font-semibold">{teacher.gender || "Not Provided"}</p>
                    </div>
                    
                 </div>
              </section>
               {/* Departmental Details  */}
              <section>
                 <h3 className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em] mb-4">Departmental Details</h3>
                 <div className="space-y-4">
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Department Name</p>
                       <p className="text-indigo-700 font-bold">{teacher.departmentName}</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Department Code</p>
                       <p className="  text-red-700  py-1 rounded-lg text-sm font-bold  ">
                          {teacher.departmentUid}
                       </p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Date of Joining</p>
                       <p className="  text-indigo-700  py-1 rounded-lg text-sm font-bold  ">
                          {teacher.joinDate || "Not Provided"}
                       </p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">College Name</p>
                       <p className="text-indigo-700 font-semibold">{teacher.collegeName}</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Qualification</p>
                       <p className="text-indigo-700 font-semibold">{teacher.qualification || "Not Provided"}</p>
                    </div>
                    <div>
                       <p className="text-xs text-slate-700 font-medium mb-0.5">Specialization</p>
                       <p className="text-indigo-700 font-semibold">{teacher.specialization || "Not Provided"}</p>
                    </div>
                 </div>
              </section>
           </div>

           <div className="mt-8 pt-8 border-t border-slate-400">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-[0.2em] mb-4">Assigned Designations</h3>
              <div className="flex flex-wrap gap-2">
                 {teacher.designations?.length > 0 ? (
                   teacher.designations.map((d, i) => (
                     <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-100 shadow-sm">
                        {d}
                     </span>
                   ))
                 ) : (
                   <p className="text-slate-500 italic text-sm">No special designations assigned.</p>
                 )}
              </div>
           </div>

           <div className="mt-8 pt-8 border-t border-slate-400">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-[0.2em] mb-4">Contributions Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                 {[
                   { label: "Activities", count: teacher.counts?.activities, color: "bg-blue-50 text-blue-700 border-blue-100" },
                   { label: "Research Papers", count: teacher.counts?.papers, color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
                   { label: "Books", count: teacher.counts?.books, color: "bg-purple-50 text-purple-700 border-purple-100" },
                   { label: "Grants", count: teacher.counts?.grants, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                   { label: "Achievements", count: teacher.counts?.achievements, color: "bg-amber-50 text-amber-700 border-amber-100" },
                   { label: "Consultancies", count: teacher.counts?.consultancies, color: "bg-teal-50 text-teal-700 border-teal-100" },
                   { label: "Committees", count: teacher.counts?.committees, color: "bg-orange-50 text-orange-700 border-orange-100" },
                   { label: "Editorial", count: teacher.counts?.editorial, color: "bg-rose-50 text-rose-700 border-rose-100" },
                 ].map((item, idx) => (
                   <div key={idx} className={`p-4 rounded-2xl border ${item.color} shadow-sm flex flex-col items-center justify-center text-center`} style={{ animationDelay: `${idx * 50}ms` }}>
                      <p className="text-2xl font-black">{item.count || 0}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider mt-1">{item.label}</p>
                   </div>
                 ))}
              </div>
              <div className="mt-4 p-4 bg-slate-900 text-white rounded-2xl flex justify-between items-center shadow-lg">
                 <span className="text-xs font-bold uppercase tracking-widest">Total Contributions</span>
                 <span className="text-2xl font-black">{teacher.totalContributions || 0}</span>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-400 p-6 flex justify-end shrink-0">
          <button onClick={onClose} className="btn-primary px-10 text-black">
            Close 
          </button>
        </div>
      </div>
    </div>
  );
}
