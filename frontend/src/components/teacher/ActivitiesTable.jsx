import React, { useState } from "react";
import ActivityDetailsModal from "./ActivityDetailsModal";

export default function ActivitiesTable({ activities, onEdit, onDelete }) {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm mt-6">
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Activities Overview</h3>
          <p className="text-sm text-slate-500 mt-1">Organised and attended departmental activities</p>
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
          Total: {activities.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Activity Name</th>
              <th className="px-6 py-4 font-semibold">Academic Year</th>
              <th className="px-6 py-4 font-semibold">Sem</th>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 font-semibold">Mode</th>
              <th className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {activities.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-slate-400 font-medium">
                  No activities found. Click "Add Activity" to create one.
                </td>
              </tr>
            ) : (
              activities.map((act) => (
                <tr key={act._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 max-w-xs truncate" title={act.activityName}>
                    {act.activityName}
                  </td>
                  <td className="px-6 py-4">{act.academicYear}</td>
                  <td className="px-6 py-4">{act.semester}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {act.activityType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      act.activityMode === 'Organised' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {act.activityMode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2 flex justify-center items-center">
                    <button
                      onClick={() => setSelectedActivity(act)}
                      className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors tooltip"
                      title="View Details"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    {onEdit && (
                       <button
                         onClick={() => onEdit(act)}
                         className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-slate-100 transition-colors tooltip"
                         title="Edit Activity"
                       >
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                         </svg>
                       </button>
                    )}
                    {onDelete && (
                       <button
                         onClick={() => onDelete(act)}
                         className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors tooltip"
                         title="Delete Activity"
                       >
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                         </svg>
                       </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ActivityDetailsModal
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        activity={selectedActivity}
      />
    </div>
  );
}
