import React from "react";

export default function AchievementDetailsModal({ isOpen, onClose, achievement }) {
  if (!isOpen || !achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Achievement Details</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div className="col-span-2">
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Achievement Name</span>
              <span className="font-semibold text-slate-900 text-base">{achievement.name}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Date</span>
              <span className="font-semibold text-slate-900">{achievement.date ? new Date(achievement.date).toLocaleDateString() : "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Academic Year</span>
              <span className="font-semibold text-slate-900">{achievement.academicYear}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Level</span>
              <span className="font-semibold text-slate-900">{achievement.level}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Category</span>
              <span className="font-semibold text-slate-900">{achievement.category}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Achieved By</span>
              <span className="font-semibold text-slate-900">{achievement.achievedByType}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Organization</span>
              <span className="font-semibold text-slate-900">{achievement.issuingOrganization || "N/A"}</span>
            </div>
            <div>
              <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs">Certificate Number</span>
              <span className="font-semibold text-slate-900">{achievement.certificateNumber || "N/A"}</span>
            </div>
          </div>

          <div className="pt-2">
             <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Description</span>
             <p className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm mt-1 whitespace-pre-wrap">{achievement.description || "No description provided."}</p>
          </div>

          {achievement.achievedByType === "Student" && (
            <div className="pt-4 border-t border-slate-100">
               <span className="block font-medium text-slate-500 uppercase tracking-wide text-xs mb-1">Verification Status</span>
               <div className={`p-3 rounded-lg border text-sm ${
                 achievement.approvalStatus === 'Approved' ? 'bg-green-50 border-green-100 text-green-700' :
                 achievement.approvalStatus === 'Rejected' ? 'bg-red-50 border-red-100 text-red-700' :
                 'bg-amber-50 border-amber-100 text-amber-700'
               }`}>
                  <p className="font-bold">{achievement.approvalStatus || 'Pending'}</p>
                  {achievement.coordinatorComment && <p className="mt-1 italic">{achievement.coordinatorComment}</p>}
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

const InfoCard = ({ icon, label, value, color }) => (
  <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50">
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 flex items-center justify-center rounded-lg ${color || 'text-indigo-500 bg-indigo-50'}`}>{icon}</div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-sm font-bold text-slate-700 truncate px-1">{value}</p>
  </div>
);

const CalendarIcon = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const YearIcon = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LevelIcon = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const RoleIcon = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const OrgIcon = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
const CertIcon = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.006 3.42 3.42 0 014.438 0c.77.672 1.8 1.056 2.868 1.006a3.42 3.42 0 013.138 3.138c.05 1.066.434 2.097 1.106 2.868a3.42 3.42 0 010 4.438c-.672.77-1.056 1.8-1.006 2.868a3.42 3.42 0 01-3.138 3.138c-1.066.05-2.097.434-2.868 1.106a3.42 3.42 0 01-4.438 0c-.77-.672-1.8-1.056-2.868-1.006a3.42 3.42 0 01-3.138-3.138c-.05-1.066-.434-2.097-1.106-2.868a3.42 3.42 0 010-4.438c.672-.77 1.056-1.8 1.006-2.868a3.42 3.42 0 013.138-3.138z" /></svg>;
