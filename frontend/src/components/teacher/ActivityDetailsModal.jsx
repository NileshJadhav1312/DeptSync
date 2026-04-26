import React from "react";

export default function ActivityDetailsModal({ isOpen, onClose, activity }) {
  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Activity Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Activity Name</span>
              <span className="font-semibold text-slate-900">{activity.activityName}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Academic Year</span>
              <span className="font-semibold text-slate-900">{activity.academicYear}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Semester</span>
              <span className="font-semibold text-slate-900">{activity.semester}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Type</span>
              <span className="font-semibold text-slate-900">
                {activity.activityType === "Other" && activity.otherActivityType ? activity.otherActivityType : activity.activityType}
              </span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Participation</span>
              <span className="font-semibold text-slate-900">{activity.participationType}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Mode</span>
              <span className="font-semibold text-slate-900">{activity.activityMode}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Level</span>
              <span className="font-semibold text-slate-900">{activity.activityLevel}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Dates</span>
              <span className="font-semibold text-slate-900">
                {new Date(activity.fromDate).toLocaleDateString()} - {new Date(activity.toDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Duration (Days)</span>
              <span className="font-semibold text-slate-900">{activity.durationInDays || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Total Participants</span>
              <span className="font-semibold text-slate-900">{activity.numberOfParticipants || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Funds (Rs)</span>
              <span className="font-semibold text-slate-900">{activity.fundsInRupees || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Fund Source</span>
              <span className="font-semibold text-slate-900">{activity.fundSourceName || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Certifying Institute</span>
              <span className="font-semibold text-slate-900">{activity.certifyingInstitute || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Key Focused Areas</span>
              <span className="font-semibold text-slate-900">{activity.keyFocusedAreas || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Target Audience</span>
              <span className="font-semibold text-slate-900">{activity.targetAudience || "N/A"}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
             <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Coordinators</span>
             <span className="font-semibold text-slate-900">{activity.coordinators?.join(", ") || "None"}</span>
          </div>

          <div className="pt-2">
             <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Resource Persons</span>
             <span className="font-semibold text-slate-900">{activity.resourcePersons?.join(", ") || "None"}</span>
          </div>

          <div className="pt-2">
             <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Description</span>
             <p className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm mt-1 whitespace-pre-wrap">{activity.description || "No description provided."}</p>
          </div>
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
