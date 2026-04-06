import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import Card from "../../components/common/Card";
import { useAuth } from "../../context/AuthContext";
import { getDepartment, createTeacher, getDepartmentStudents, deleteTeacher, getTeachers } from "../../services/admin";
import { getActivities } from "../../services/activity";
import { getDepartmentAchievements } from "../../services/achievement";
import { getDepartmentClassrooms, createClassroom, acceptStudent } from "../../services/classroom";
import { getResearchPapers, getBookPublications, getGrants, getConsultancies } from "../../services/research";
import ActivitiesTable from "../../components/teacher/ActivitiesTable";
import TeacherDetailsModal from "../../components/admin/TeacherDetailsModal";

const emptyTeacher = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  designations: [],
};

const DESIGNATION_OPTIONS = [
  "Associate Professor", "HOD", "SWD Coordinator", "Assistant Professor", "Clerk", "Junior Professor", "NAAC Coordinator", "Research Coordinator", "Class Teacher", "other",
];

export default function DepartmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [department, setDepartment] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [researchPapers, setResearchPapers] = useState([]);
  const [bookPublications, setBookPublications] = useState([]);
  const [grants, setGrants] = useState([]);
  const [consultancies, setConsultancies] = useState([]);

  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [teacherForm, setTeacherForm] = useState(emptyTeacher);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAddClassroomOpen, setIsAddClassroomOpen] = useState(false);
  const [classroomForm, setClassroomForm] = useState({ name: "", classTeacherId: "" });
  const [expandedClassroom, setExpandedClassroom] = useState(null);

  useEffect(() => {
    fetchDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDepartment = async () => {
    setIsLoading(true);
    setError("");
    try {
      const [data, activitiesData, achievementsData, classroomsData, papersData, booksData, grantsData, consultanciesData, studentsData, teachersData] = await Promise.all([
         getDepartment(id), 
         getActivities(), 
         getDepartmentAchievements(id),
         getDepartmentClassrooms(id),
         getResearchPapers({ departmentId: id }),
         getBookPublications({ departmentId: id }),
         getGrants({ departmentId: id }),
         getConsultancies({ departmentId: id }),
         getDepartmentStudents(id),
         getTeachers()
      ]);
      const dept = data.department;
      setDepartment(dept);
      setStudents(studentsData.students || []);
      
      const filteredTeachers = (teachersData.teachers || []).filter(t => (t.departmentId?._id || t.departmentId) === id);
      setFaculty(filteredTeachers);

      setClassrooms(classroomsData.classrooms || []);
      setAchievements(achievementsData.achievements || []);
      setResearchPapers(papersData.researchPapers || []);
      setBookPublications(booksData.bookPublications || []);
      setGrants(grantsData.grants || []);
      setConsultancies(consultanciesData.consultancies || []);

      const teacherIds = dept.teachers?.map(t => t.teacherId?.toString() || t._id?.toString()) || [];
      const filteredActivities = (activitiesData.activities || []).filter(a => {
        const creatorId = a.createdBy?._id?.toString() || a.createdBy?.toString();
        return teacherIds.includes(creatorId);
      });
      setActivities(filteredActivities);

    } catch (err) {
      console.error("fetchDepartment error:", err);
      setError("Failed to load department details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, username, password, confirmPassword, designations } = teacherForm;
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      await createTeacher({
        departmentId: id,
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
        designations,
        createdBy: user?.id || user?.username,
      });
      setSuccess("Teacher added successfully.");
      setTeacherForm(emptyTeacher);
      setIsAddTeacherOpen(false);
      fetchDepartment();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add teacher.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddClassroom = async (e) => {
    e.preventDefault();
    if (!classroomForm.name || !classroomForm.classTeacherId) {
      setError("Class name and Class Teacher are required.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await createClassroom({
        name: classroomForm.name,
        departmentId: id,
        classTeacherId: classroomForm.classTeacherId
      });
      setSuccess("Classroom created successfully.");
      setClassroomForm({ name: "", classTeacherId: "" });
      setIsAddClassroomOpen(false);
      fetchDepartment();
      setTimeout(() => setSuccess(""), 3000);
    } catch(err) {
      setError(err?.response?.data?.message || "Failed to create classroom.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminAcceptStudent = async (studentId, classId) => {
    try {
      await acceptStudent({ studentId, classId });
      fetchDepartment();
    } catch(err) {
      alert("Failed to accept student.");
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
     if (!window.confirm("Are you sure you want to remove this faculty member?")) return;
     try {
       await deleteTeacher(teacherId);
       setSuccess("Teacher removed successfully.");
       fetchDepartment();
       setTimeout(() => setSuccess(""), 3000);
     } catch (err) {
       setError("Failed to delete teacher.");
     }
  };

  if (isLoading) {
    return (
      <DashboardLayout role="admin" title="Loading..." subtitle="Fetching department details">
        <div className="p-8 text-center text-slate-500">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!department) {
    return (
      <DashboardLayout role="admin" title="Not Found" subtitle="Department could not be loaded">
        <div className="p-8 text-center text-red-500">{error || "Department not found."}</div>
      </DashboardLayout>
    );
  }

  const stats = [
    { key: 'teachers', title: "Faculty", value: department.totalTeachers || 0, helper: "Members", color: "border-l-slate-400" },
    { key: 'students', title: "Students", value: students.length, helper: "Enrollment", color: "border-l-emerald-500" },
    { key: 'papers', title: "Research Papers", value: researchPapers.length, helper: "Publications", color: "border-l-indigo-600" },
    { key: 'books', title: "Books", value: bookPublications.length, helper: "Academic Works", color: "border-l-blue-500" },
    { key: 'grants', title: "Grants", value: grants.length, helper: "Allocated", color: "border-l-green-600" },
    { key: 'consultancies', title: "Consultancies", value: consultancies.length, helper: "Expert Roles", color: "border-l-teal-500" },
    { key: 'activities', title: "Activities", value: activities.length, helper: "Dept. Events", color: "border-l-orange-500" },
    { key: 'achievements', title: "Achievements", value: achievements.length, helper: "Recognitions", color: "border-l-purple-500" },
    { key: 'classrooms', title: "Classrooms", value: classrooms.length, helper: "Units", color: "border-l-rose-500" },
  ];

  const actions = (
    <div className="flex items-center gap-3">
      <button className="btn-secondary text-sm px-4 py-2" onClick={() => navigate("/admin/departments")}>Back</button>
      <button className="btn-primary text-sm px-4 py-2" onClick={() => setIsAddTeacherOpen(true)}>Add Teacher</button>
    </div>
  );

  return (
    <DashboardLayout role="admin" title={department.departmentName} subtitle={`${department.departmentCode} • ${department.collegeName}`} actions={actions} onLogout={() => { logout(); navigate("/login"); }}>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
           <div key={s.key} onClick={() => setActiveTab(activeTab === s.key ? null : s.key)} className={`card p-4 cursor-pointer transition-all border-l-4 ${s.color} hover:shadow-lg h-full flex flex-col justify-between ${activeTab === s.key ? 'ring-2 ring-offset-2 ring-indigo-500 shadow-xl scale-105 z-10' : 'bg-white opacity-90'}`}>
             <div>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{s.title}</p>
               <h3 className="text-2xl font-black text-slate-900 mt-1">{s.value}</h3>
             </div>
             <p className="text-[10px] text-slate-400 font-semibold mt-2">{s.helper}</p>
           </div>
        ))}
      </div>

      <div className="mt-8 transition-all duration-300">
        {activeTab === 'teachers' && (
           <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/30">
                <h3 className="text-lg font-bold text-slate-900">Faculty Registry</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                      <tr>
                         <th className="px-6 py-4">Name</th>
                         <th className="px-6 py-4">Designations</th>
                         <th className="px-6 py-4">Contact</th>
                         <th className="px-6 py-4 text-center">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {faculty.map(t => (
                        <tr key={t._id} className="hover:bg-slate-50/50">
                           <td className="px-6 py-4 font-bold text-slate-900">{t.firstName} {t.lastName}</td>
                           <td className="px-6 py-4">
                             <div className="flex flex-wrap gap-1">
                               {t.designations?.map(d => <span key={d} className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold">{d}</span>)}
                             </div>
                           </td>
                           <td className="px-6 py-4 text-slate-500">{t.email}</td>
                           <td className="px-6 py-4 text-center flex justify-center gap-2">
                              <button onClick={() => setSelectedTeacher(t)} className="p-2 text-indigo-600 hover:bg-white rounded-lg border border-indigo-100 shadow-sm">View</button>
                              <button onClick={() => handleDeleteTeacher(t._id)} className="p-2 text-red-600 hover:bg-white rounded-lg border border-red-100 shadow-sm">Delete</button>
                           </td>
                        </tr>
                      ))}
                      {faculty.length === 0 && <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium">No faculty found.</td></tr>}
                   </tbody>
                </table>
              </div>
           </div>
        )}

        {activeTab === 'students' && (
           <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <div className="p-5 border-b border-slate-200 bg-emerald-50/30">
                <h3 className="text-lg font-bold text-slate-900">Student Enrollment Registry</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                      <tr><th className="px-6 py-4 text-center">PRN</th><th className="px-6 py-4">Full Name</th><th className="px-6 py-4">Current Class</th><th className="px-6 py-4">Contact</th></tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {students.map(s => (
                        <tr key={s._id} className="hover:bg-slate-50/50">
                           <td className="px-6 py-4 text-center font-bold text-indigo-600">{s.prnNumber}</td>
                           <td className="px-6 py-4 font-bold text-slate-900">{s.firstName} {s.lastName}</td>
                           <td className="px-6 py-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-xs font-bold">{s.className || "Unassigned"}</span></td>
                           <td className="px-6 py-4 text-slate-500">{s.contactNumber}</td>
                        </tr>
                      ))}
                      {students.length === 0 && <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium">No students enrolled yet.</td></tr>}
                   </tbody>
                </table>
              </div>
           </div>
        )}

        {activeTab === 'papers' && (
           <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <div className="p-5 border-b border-slate-200 bg-indigo-50/30"><h3 className="text-lg font-bold text-slate-900">Research Articles</h3></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-indigo-50 text-indigo-700 font-bold border-b border-indigo-100">
                      <tr><th className="px-6 py-4">Year</th><th className="px-6 py-4">Title</th><th className="px-6 py-4">Author</th><th className="px-6 py-4">Publisher</th></tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {researchPapers.map(p => (
                        <tr key={p._id} className="hover:bg-slate-50/50">
                           <td className="px-6 py-4 font-bold">{p.year}</td>
                           <td className="px-6 py-4 max-w-md truncate font-medium text-slate-900" title={p.title}>{p.title}</td>
                           <td className="px-6 py-4 font-bold text-indigo-600">{p.teacherName}</td>
                           <td className="px-6 py-4 text-xs font-black uppercase text-slate-500">{p.publisherName}</td>
                        </tr>
                      ))}
                      {researchPapers.length === 0 && <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-400">No research papers found.</td></tr>}
                   </tbody>
                </table>
              </div>
           </div>
        )}

        {activeTab === 'books' && (
           <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <div className="p-5 border-b border-slate-200 bg-blue-50/30"><h3 className="text-lg font-bold text-slate-900">Academic Books</h3></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-blue-50 text-blue-700 font-bold border-b border-blue-100">
                      <tr><th className="px-6 py-4">Year</th><th className="px-6 py-4">Title</th><th className="px-6 py-4">Author</th><th className="px-6 py-4">Publisher</th></tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {bookPublications.map(b => (
                        <tr key={b._id} className="hover:bg-slate-50/50">
                           <td className="px-6 py-4 font-bold">{b.year}</td>
                           <td className="px-6 py-4 font-bold text-slate-900">{b.title}</td>
                           <td className="px-6 py-4 font-bold text-blue-600">{b.teacherName}</td>
                           <td className="px-6 py-4 italic text-slate-500">{b.publisher}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
           </div>
        )}

        {/* Similar updates for grants, consultancies, activities, achievements, classrooms... */}
        {activeTab === 'grants' && (
           <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
             <div className="p-5 border-b border-slate-200 bg-green-50/30"><h3 className="text-lg font-bold text-slate-900">Research Grants</h3></div>
             <div className="overflow-x-auto">
               <table className="w-full text-left text-sm whitespace-nowrap">
                 <thead className="bg-green-50 text-green-800 font-bold border-b border-green-100">
                   <tr><th className="px-6 py-4">Project</th><th className="px-6 py-4">Investigator</th><th className="px-6 py-4 text-center">Amount</th><th className="px-6 py-4">Agency</th><th className="px-6 py-4">Status</th></tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {grants.map(g => (
                     <tr key={g._id} className="hover:bg-slate-50/50">
                       <td className="px-6 py-4 font-bold text-slate-900 max-w-xs truncate">{g.projectTitle}</td>
                       <td className="px-6 py-4 font-bold text-green-600">{g.teacherName}</td>
                       <td className="px-6 py-4 text-center text-green-700 font-black">₹{g.amount}</td>
                       <td className="px-6 py-4 text-slate-500">{g.agency}</td>
                       <td className="px-6 py-4"><span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-600">{g.status}</span></td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        )}

        {activeTab === 'activities' && <div className="animate-in fade-in slide-in-from-bottom-4"><ActivitiesTable activities={activities} /></div>}
        
        {activeTab === 'achievements' && (
           <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
              <div className="p-5 border-b border-slate-200 bg-purple-50/30"><h3 className="text-lg font-bold text-slate-900">Awards Registry</h3></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-purple-50 text-purple-700 font-bold border-b border-purple-200">
                      <tr><th className="px-6 py-4">Role</th><th className="px-6 py-4">Recipient</th><th className="px-6 py-4">Title</th><th className="px-6 py-4">Category</th><th className="px-6 py-4 text-right">Date</th></tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {achievements.map(ach => (
                        <tr key={ach._id} className="hover:bg-slate-50/50">
                           <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${ach.achievedByType === 'Teacher' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>{ach.achievedByType}</span></td>
                           <td className="px-6 py-4 font-black">{ach.achievedByName}</td>
                           <td className="px-6 py-4 italic text-slate-700 underline decoration-indigo-200">{ach.name}</td>
                           <td className="px-6 py-4 text-xs font-bold">{ach.category}</td>
                           <td className="px-6 py-4 text-right text-slate-500">{new Date(ach.date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
           </div>
        )}

        {activeTab === 'classrooms' && (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div><h3 className="text-lg font-bold text-slate-900 font-serif">Academic Units</h3><p className="text-sm text-slate-500">Managing classroom divisions.</p></div>
                <button className="btn-primary" onClick={() => setIsAddClassroomOpen(true)}>Create Unit</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {classrooms.map(cls => (
                   <div key={cls._id} className={`card border-2 transition-all cursor-pointer ${expandedClassroom === cls._id ? 'border-emerald-500 ring-4 ring-emerald-50' : 'border-slate-200 hover:border-emerald-300'}`} onClick={() => setExpandedClassroom(expandedClassroom === cls._id ? null : cls._id)}>
                     <div className="p-6"><div className="flex justify-between items-start"><h3 className="text-2xl font-black italic">{cls.name}</h3><span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-1 rounded-md uppercase">{cls.enrolledStudents.length} Students</span></div><p className="text-[10px] text-slate-400 font-bold uppercase mt-4 underline">Unit Head ID: {cls.classTeacherId}</p></div>
                     {expandedClassroom === cls._id && (
                        <div className="px-6 pb-6 pt-2 border-t bg-slate-50/50">
                           {cls.pendingStudents.length > 0 && <div className="mb-4"><h4 className="font-bold text-xs uppercase text-orange-600 border-b pb-1 mb-2">Requests</h4><ul className="space-y-2">{cls.pendingStudents.map(st => <li key={st._id} className="bg-white p-2 border rounded-xl flex justify-between items-center text-sm font-bold shadow-sm"><span>{st.prnNumber} • {st.firstName}</span><button className="btn-primary text-[10px] py-1 px-3" onClick={(e) => { e.stopPropagation(); handleAdminAcceptStudent(st._id, cls._id); }}>Admit</button></li>)}</ul></div>}
                           <div><h4 className="font-bold text-xs uppercase text-emerald-700 border-b pb-1 mb-2">Enrolled</h4><ul className="space-y-1">{cls.enrolledStudents.map(st => <li key={st._id} className="text-xs font-bold text-slate-600 py-1 flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>{st.prnNumber} - {st.firstName} {st.lastName}</li>)}</ul></div>
                        </div>
                     )}
                   </div>
                ))}
              </div>
           </div>
        )}

      </div>

      {isAddTeacherOpen && (
        <section className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="card w-full max-w-2xl p-6 sm:p-8 border-2 border-indigo-500 shadow-2xl relative bg-white animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-8"><h3 className="text-xl font-black text-slate-900">Provision New Faculty</h3><button onClick={() => setIsAddTeacherOpen(false)} className="text-slate-400 text-2xl">✕</button></div>
            <form className="grid gap-6 sm:grid-cols-2" onSubmit={handleAddTeacher}>
              <input className="input h-12" placeholder="First Name" value={teacherForm.firstName} onChange={(e) => setTeacherForm(p => ({ ...p, firstName: e.target.value }))} required />
              <input className="input h-12" placeholder="Last Name" value={teacherForm.lastName} onChange={(e) => setTeacherForm(p => ({ ...p, lastName: e.target.value }))} required />
              <input className="input h-12" placeholder="Email" type="email" value={teacherForm.email} onChange={(e) => setTeacherForm(p => ({ ...p, email: e.target.value }))} required />
              <input className="input h-12" placeholder="Username" value={teacherForm.username} onChange={(e) => setTeacherForm(p => ({ ...p, username: e.target.value }))} required />
              <input className="input h-12" placeholder="Password" type="password" value={teacherForm.password} onChange={(e) => setTeacherForm(p => ({ ...p, password: e.target.value }))} required />
              <input className="input h-12" placeholder="Confirm" type="password" value={teacherForm.confirmPassword} onChange={(e) => setTeacherForm(p => ({ ...p, confirmPassword: e.target.value }))} required />
              <div className="sm:col-span-2"><label className="block text-xs font-black text-slate-700 mb-3 uppercase tracking-widest border-b pb-2">Roles</label><div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-h-40 overflow-y-auto">{DESIGNATION_OPTIONS.map(des => <label key={des} className={`flex font-bold items-center text-[10px] cursor-pointer p-2 rounded-xl transition-all border ${teacherForm.designations.includes(des) ? 'bg-indigo-600 text-white border-indigo-700' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}`}><input type="checkbox" className="hidden" checked={teacherForm.designations.includes(des)} onChange={(e) => { const newD = e.target.checked ? [...teacherForm.designations, des] : teacherForm.designations.filter(d => d !== des); setTeacherForm(p => ({ ...p, designations: newD })); }} /><span>{des}</span></label>)}</div></div>
              <div className="sm:col-span-2 flex justify-end gap-3"><button type="button" onClick={() => setIsAddTeacherOpen(false)} className="btn-secondary h-12 px-6 font-black uppercase text-xs">Cancel</button><button className="btn-primary h-12 px-8 font-black uppercase text-xs" type="submit" disabled={isSubmitting}>{isSubmitting ? "Processing..." : "Onboard"}</button></div>
            </form>
          </div>
        </section>
      )}

      {selectedTeacher && <TeacherDetailsModal teacher={selectedTeacher} isOpen={!!selectedTeacher} onClose={() => setSelectedTeacher(null)} />}
      {(error || success) && <div className="fixed bottom-4 right-4 z-[70] flex flex-col gap-2">{error && <div className="p-4 bg-red-100 text-red-700 rounded-xl shadow-xl border border-red-200">{error}</div>}{success && <div className="p-4 bg-emerald-100 text-emerald-700 rounded-xl shadow-xl border border-emerald-200">{success}</div>}</div>}
    </DashboardLayout>
  );
}
