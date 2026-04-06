import React from "react";

export default function AchievementDetailsModal({ isOpen, onClose, achievement }) {
  if (!isOpen || !achievement) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="relative p-8 bg-indigo-600 overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div className="space-y-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white backdrop-blur-sm mb-2">
                {achievement.category} Achievement
              </span>
              <h2 className="text-2xl font-black text-white leading-tight">
                {achievement.name}
              </h2>
            </div>
            <button onClick={onClose} className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all active:scale-90">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoCard icon={<CalendarIcon/>} label="Date" value={achievement.date ? new Date(achievement.date).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"} />
            <InfoCard icon={<YearIcon/>} label="Academic Year" value={achievement.academicYear} />
            <InfoCard icon={<LevelIcon/>} label="Level" value={achievement.level} />
            <InfoCard icon={<RoleIcon/>} label="Role" value={achievement.achievedByType} color="text-indigo-600 bg-indigo-50" />
            <InfoCard icon={<OrgIcon/>} label="Organization" value={achievement.issuingOrganization || "N/A"} />
            <InfoCard icon={<CertIcon/>} label="Cert No." value={achievement.certificateNumber || "N/A"} />
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
               <span className="w-4 h-[1px] bg-slate-200"></span>
               Detailed Description
            </h3>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                {achievement.description || "No description provided."}
              </p>
            </div>
          </div>

          {achievement.achievedByType === "Student" && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <span className="w-4 h-[1px] bg-slate-200"></span>
                 Verification Status
              </h3>
              <div className={`p-6 rounded-2xl border flex flex-col gap-4 ${
                achievement.approvalStatus === 'Approved' ? 'bg-green-50/50 border-green-100' :
                achievement.approvalStatus === 'Rejected' ? 'bg-red-50/50 border-red-100' :
                'bg-amber-50/50 border-amber-100'
              }`}>
                 <p className="text-xs font-bold text-slate-500">{achievement.approvalStatus || 'Pending'}</p>
                 {achievement.coordinatorComment && <p className="text-sm italic pl-4 border-l-2 border-slate-200">{achievement.coordinatorComment}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-8 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all">
            Close Panel
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
