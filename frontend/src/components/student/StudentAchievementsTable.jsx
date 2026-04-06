import React, { useState } from "react";
import StudentAchievementDetailsModal from "./StudentAchievementDetailsModal";

export default function StudentAchievementsTable({ achievements, onDelete }) {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  return (
    <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm mt-6">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Academic & Non-Academic Gains</h3>
          <p className="text-sm text-slate-500 mt-1">Review your submitted achievements and approval status</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
          Earned: {achievements.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Position</th>
              <th className="px-6 py-4 font-semibold">Verification</th>
              <th className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {achievements.length === 0 ? (
              <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-400 font-medium whitespace-normal">No achievements added yet. Start by clicking "Add Achievement".</td></tr>
            ) : (
              achievements.map((ach) => (
                <tr key={ach._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 truncate" title={ach.name}>{ach.name}</td>
                  <td className="px-6 py-4 font-medium text-slate-500">{new Date(ach.date).toLocaleDateString("en-GB")}</td>
                  <td className="px-6 py-4 font-medium">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-tight">{ach.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-indigo-600 select-all">{ach.position || "Partic."}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                      ach.approvalStatus === "Approved" ? "bg-green-100 text-green-700 border border-green-200" :
                      ach.approvalStatus === "Rejected" ? "bg-red-100 text-red-700 border border-red-200" :
                      "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}>
                      {ach.approvalStatus || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                       <button onClick={() => setSelectedAchievement(ach)} className="p-2 text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-indigo-100">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                       </button>
                       {onDelete && (
                         <button onClick={() => onDelete(ach)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <StudentAchievementDetailsModal
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        achievement={selectedAchievement}
      />
    </div>
  );
}
