import React, { useState, useEffect } from "react";
import { getTeacherProfile } from "../../services/profile";

export default function StudentDetailsModal({ isOpen, onClose, student }) {
  const [classTeacherName, setClassTeacherName] = useState("");

  useEffect(() => {
    if (isOpen && student) {
      if (student.classTeacher) {
        setClassTeacherName(student.classTeacher);
      } else if (student.classTeacherId) {
        getTeacherProfile(student.classTeacherId)
          .then(res => {
            if (res.teacher) {
              setClassTeacherName(`${res.teacher.firstName} ${res.teacher.lastName}`);
            }
          })
          .catch(err => console.error("Failed to fetch class teacher name:", err));
      } else {
        setClassTeacherName("Not Assigned");
      }
    } else {
      setClassTeacherName("");
    }
  }, [isOpen, student]);

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="relative h-32 bg-indigo-600 from-emerald-600 to-teal-700 flex items-end px-8 pb-4 border-b border-emerald-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-4xl leading-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            ×
          </button>
          <div className="flex items-center gap-6 translate-y-10">
            <div className="h-24 w-24 rounded-3xl bg-white p-1.5 shadow-xl">
              <div className="h-full w-full rounded-2xl bg-white flex items-center justify-center text-3xl font-black text-indigo-600 border border-indigo-300">
                {`${student.firstName?.[0] || ""}${student.lastName?.[0] || ""}`.toUpperCase() || "S"}
              </div>
            </div>
            <div className="pb-8">
              <h2 className="text-2xl font-bold text-white">{`${student.firstName} ${student.lastName}`}</h2>
              <p className="text-emerald-100 text-sm font-medium"> PRN: {student.prnNumber || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <section>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-[0.2em] mb-4">Identity Profile</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-slate-800 font-bold uppercase mb-1">Email Address</p>
                  <p className="text-indigo-600 font-black text-sm">{student.email}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-800 font-bold uppercase mb-1">Username</p>
                  <p className="text-indigo-600 font-black text-sm">{student.username}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-800 font-bold uppercase mb-1">PRN Number</p>
                  <p className="text-indigo-600 font-black text-sm">{student.prnNumber}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-800 font-bold uppercase mb-1">Gender</p>
                  <p className="text-indigo-600 font-black text-sm">{student.gender || "Not Provided"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-800 font-bold uppercase mb-1">Contact</p>
                  <p className="text-indigo-600 font-black text-sm">{student.contactNumber || "N/A"}</p>
                </div>
              </div>
            </section>

            {/* Academic Details */}
            <section>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-[0.2em] mb-4">Academic Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-slate-800  font-bold uppercase mb-1">Class</p>
                  <p className="text-indigo-600 font-black text-sm">{student.className || "Unassigned"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-800 font-bold uppercase mb-1">Department</p>
                  <p className="text-indigo-600 font-black text-sm">{student.departmentName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-800 font-bold uppercase mb-1">College</p>
                  <p className="text-indigo-600 font-black text-sm">{student.collegeName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-800 font-bold uppercase mb-1">Class Teacher</p>
                  <p className="text-indigo-600 font-black text-sm">{classTeacherName || "Fetching..."}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Contributions Breakdown */}
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                     {[
                        { label: "Activities", count: student.counts?.activities, color: "bg-blue-50 text-blue-700 border-blue-100" },
                        { label: "Grants", count: student.counts?.grants, color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                        { label: "Journals", count: student.counts?.journals, color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
                        { label: "Books", count: student.counts?.books, color: "bg-purple-50 text-purple-700 border-purple-100" },
                        { label: "Chapters", count: student.counts?.chapters, color: "bg-orange-50 text-orange-700 border-orange-100" },
                        { label: "Achievements", count: student.counts?.achievements, color: "bg-amber-50 text-amber-700 border-amber-100" },
                        { label: "Consultancies", count: student.counts?.consultancies, color: "bg-teal-50 text-teal-700 border-teal-100" },

                        { label: "Patents", count: student.counts?.patents, color: "bg-purple-50 text-purple-700 border-purple-100" },
                        { label: "Copyrights", count: student.counts?.copyrights, color: "bg-rose-50 text-rose-700 border-rose-100" },
                        { label: "Conferences", count: student.counts?.conferences, color: "bg-orange-50 text-orange-700 border-orange-100" },
                        { label: "Committees", count: student.counts?.committees, color: "bg-orange-50 text-orange-700 border-orange-100" },

                        { label: "Editorial", count: student.counts?.editorial, color: "bg-rose-50 text-rose-700 border-rose-100" },
                         
                     ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border ${item.color} shadow-sm flex flex-col items-center justify-center text-center`} style={{ animationDelay: `${idx * 50}ms` }}>
                           <p className="text-2xl font-black">{item.count || 0}</p>
                           <p className="text-[10px] font-bold uppercase tracking-wider mt-1">{item.label}</p>
                        </div>
                     ))}
                  </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-6 flex justify-end shrink-0 border-t border-slate-100">
          <button onClick={onClose} className="btn-primary px-12 font-bold text-sm tracking-wide translate-y-0 active:translate-y-0.5 transition-all text-black ">
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
