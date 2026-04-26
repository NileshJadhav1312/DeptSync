import React, { useState } from "react";
import TeacherAchievementDetailsModal from "./TeacherAchievementDetailsModal";

export default function TeacherAchievementsTable({ achievements, onEdit, onDelete }) {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  return (
    <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm mt-6">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Your Achievements</h3>
          <p className="text-sm text-slate-500 mt-1">Scholarly and professional recognitions</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
          Total: {achievements.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Achievement Name</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Academic Year</th>
              <th className="px-6 py-4 font-semibold">Level</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Position</th>
              <th className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {achievements.length === 0 ? (
              <tr><td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">No records found.</td></tr>
            ) : (
              achievements.map((ach) => (
                <tr key={ach._id} className="hover:bg-slate-50/50 transition-colors text-slate-700">
                  <td className="px-6 py-4 font-medium text-slate-900 truncate" title={ach.name}>{ach.name}</td>
                  <td className="px-6 py-4">{ach.date ? new Date(ach.date).toLocaleDateString("en-GB") : "-"}</td>
                  <td className="px-6 py-4">{ach.academicYear}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                      {ach.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">{ach.category}</td>
                  <td className="px-6 py-4 font-semibold">{ach.position || "-"}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-1">
                    <button onClick={() => setSelectedAchievement(ach)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                    {onEdit && (
                       <button onClick={() => onEdit(ach)} className="p-2 text-amber-600 hover:bg-amber-200 rounded-lg transition-colors tooltip" title="Edit Achievement">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                       </button>
                    )}
                    {onDelete && (
                       <button onClick={() => onDelete(ach)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete Achievement">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                       </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <TeacherAchievementDetailsModal
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        achievement={selectedAchievement}
      />
    </div>
  );
}
