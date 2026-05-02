import React from "react";

export default function ApprovalsTable({ requests, onReview, title, subtitle, filter, setFilter }) {
  const filteredRequests = requests.filter(req => {
    if (!filter) return req.approvalStatus === 'Pending';
    return req.approvalStatus === filter;
  });



  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4 px-2">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">{subtitle}</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {['Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all ${
                filter === status 
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {status}
              <span className={`ml-2 px-1.5 py-0.5 rounded-full text-[8px] ${
                filter === status ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200 text-slate-500'
              }`}>
                {requests.filter(r => r.approvalStatus === status).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sr.NO</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Student</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Class</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title / Description</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Academic Year</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-slate-500 italic">
                  No {filter.toLowerCase()} requests found.
                </td>
              </tr>
            ) : (
              filteredRequests.map((req, index) => (
              <tr key={req._id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-6 py-5">
                  <p className="text-xs font-bold text-slate-900">{index + 1}</p>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    
                    <div>
                
                      <p className="text-sm font-bold text-slate-900">{req._studentName}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{req._prnNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <p className="text-xs font-bold text-slate-700">
                    {req._class}
                    {req.semester && <span className="ml-1 text-slate-400 font-normal">• Sem {req.semester}</span>}
                  </p>
                </td>
                <td className="px-6 py-5">
                  <p className="text-xs font-bold text-indigo-600">{req._email}</p>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tight ${
                    req._type === 'Achievement' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                    req._type === 'Project' ? 'bg-cyan-50 text-cyan-600 border border-cyan-100' :
                    'bg-indigo-50 text-indigo-600 border border-indigo-100'
                  }`}>
                    {req._type}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-slate-800 line-clamp-1" title={req._title}>{req._title}</p>
                </td>
                <td className="px-6 py-5">
                   <p className="text-xs font-bold text-slate-600">
                     {req.year || new Date(req._date).getFullYear()}
                   </p>
                   <p className="text-[10px] text-slate-400 mt-0.5">
                     {new Date(req._date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                   </p>
                </td>
                <td className="px-6 py-5 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    req.approvalStatus === 'Pending' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/50' :
                    req.approvalStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50' :
                    'bg-red-50 text-red-700 ring-1 ring-red-200/50'
                  }`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      req.approvalStatus === 'Pending' ? 'bg-amber-500 animate-pulse' :
                      req.approvalStatus === 'Approved' ? 'bg-emerald-500' :
                      'bg-red-500'
                    }`}></span>
                    {req.approvalStatus}
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button 
                    onClick={() => onReview(req, req._type)}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-100 transition-all active:scale-95"
                  >
                    Review
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
