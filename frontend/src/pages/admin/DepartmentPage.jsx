import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import Card from "../../components/common/Card";
import { useAuth } from "../../context/AuthContext";
import { getDepartment, createTeacher, getDepartmentStudents, deleteTeacher, getTeachers } from "../../services/admin";
import { getActivities } from "../../services/activity";
import { getDepartmentAchievements } from "../../services/achievement";
import { getDepartmentClassrooms, createClassroom, acceptStudent } from "../../services/classroom";
import { getResearchPapers, getBookPublications, getGrants, getConsultancies, getJournalPublications, getConferencePublications, getBookChapters } from "../../services/research";
import ActivitiesTable from "../../components/teacher/ActivitiesTable";
import TeacherDetailsModal from "../../components/admin/TeacherDetailsModal";
import StudentDetailsModal from "../../components/admin/StudentDetailsModal";

const emptyTeacher = {
  firstName: "",
  lastName: "",
  email: "",
  employeeId: "",
  username: "",
  password: "",
  confirmPassword: "",
  designations: [],
};
const DESIGNATION_OPTIONS = [
  "Associate Professor", "HOD", "SDW Coordinator", "Assistant Professor", "Clerk", "Junior Professor", "NAAC Coordinator", "Research Coordinator", "Class Teacher", "other", "Faculty development ",
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
  const [journalPublications, setJournalPublications] = useState([]);
  const [conferencePublications, setConferencePublications] = useState([]);
  const [bookChapters, setBookChapters] = useState([]);

  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [teacherForm, setTeacherForm] = useState(emptyTeacher);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
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
      const [data, activitiesData, achievementsData, classroomsData, papersData, booksData, grantsData, consultanciesData, journalsData, conferenceData, chaptersData, studentsData, teachersData] = await Promise.all([
        getDepartment(id),
        getActivities({ departmentId: id }),
        getDepartmentAchievements(id),
        getDepartmentClassrooms(id),
        getResearchPapers({ departmentId: id }),
        getBookPublications({ departmentId: id }),
        getGrants({ departmentId: id }),
        getConsultancies({ departmentId: id }),
        getJournalPublications({ departmentId: id }),
        getConferencePublications({ departmentId: id }),
        getBookChapters({ departmentId: id }),
        getDepartmentStudents(id),
        getTeachers({ departmentId: id })
      ]);
      const dept = data.department;
      setDepartment(dept);
      setStudents(studentsData.students || []);

      setFaculty(teachersData.teachers || []);

      setClassrooms(classroomsData.classrooms || []);
      setAchievements(achievementsData.achievements || []);
      setResearchPapers(papersData.researchPapers || []);
      setBookPublications(booksData.bookPublications || []);
      setGrants(grantsData.grants || []);
      setConsultancies(consultanciesData.consultancies || []);
      setJournalPublications(journalsData.journalPublications || []);
      setConferencePublications(conferenceData.conferencePublications || []);
      setBookChapters(chaptersData.bookChapters || []);
      setActivities(activitiesData.activities || []);

    } catch (err) {
      console.error("fetchDepartment error:", err);
      setError("Failed to load department details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, username, employeeId, password, confirmPassword, designations } = teacherForm;
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
        employeeId,
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
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create classroom.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminAcceptStudent = async (studentId, classId) => {
    try {
      await acceptStudent({ studentId, classId });
      fetchDepartment();
    } catch (err) {
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
    { key: 'journals', title: "Journal Details", value: journalPublications.length, helper: "Detailed Publications", color: "border-l-emerald-500" },
    { key: 'conferences', title: "Conferences", value: conferencePublications.length, helper: "Conference Papers", color: "border-l-blue-400" },
    { key: 'chapters', title: "Chapters", value: bookChapters.length, helper: "Book Chapters", color: "border-l-teal-400" },
    { key: 'classrooms', title: "Classrooms", value: classrooms.length, helper: "Units", color: "border-l-rose-500" },
  ];
  // the buttons on admin department page to rreacher and go back to previous page
  const actions = (
    <div className="flex items-center gap-3">
      <button className="btn-secondary text-sm px-4 py-2" onClick={() => navigate("/admin/departments")}>Back</button>
      <button className="btn-secondary text-sm px-4 py-2" onClick={() => setIsAddTeacherOpen(true)}>Add Teacher</button>
    </div>
  );

  return (
    <DashboardLayout role="admin" title={department.departmentName} subtitle={`${department.departmentUid} • ${department.collegeName}`} actions={actions} onLogout={() => { logout(); navigate("/login"); }}>
      {(error || success) && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-4">
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl shadow-md flex items-center gap-3">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-bold">{error}</span>
              <button onClick={() => setError("")} className="ml-auto text-red-400 hover:text-red-700">✕</button>
            </div>
          )}
          {success && (
            <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-r-xl shadow-md flex items-center gap-3">
              <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold">{success}</span>
              <button onClick={() => setSuccess("")} className="ml-auto text-emerald-400 hover:text-emerald-700">✕</button>
            </div>
          )}
        </div>
      )}
      {/* the stats the cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.key} onClick={() => setActiveTab(activeTab === s.key ? null : s.key)} className={`card p-4 cursor-pointer transition-all border-l-5 ${s.color} hover:shadow-xl h-full flex flex-col justify-between ${activeTab === s.key ? 'bg-white/80 backdrop-blur-md ring-1 ring-indigo-400/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)] scale-[1.04] z-10 transition-all duration-300 ease-out' : 'bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-md opacity-80 transition-all duration-300'}`}>
            <div>
              <p className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-2">{s.title}</p>
              <h3 className="text-2xl font-black text-slate-800 leading-none">{s.value}</h3>
            </div>
            <p className="text-[10px] text-slate-800 font-semibold mt-4">
              {s.helper}
            </p>
          </div>
        ))}
      </div>

     <div className="mt-8 transition-all duration-300 overflow-y-scroll overflow-x-hidden h-[600px] scrollbar-thin">
        {/* Faculty Registry details */}
        {activeTab === 'teachers' && (
          <div className="card w-full overflow-hidden  bg-white rounded-2xl border border-slate-400 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="p-5 border-b border-slate-400 flex justify-between items-center bg-slate-50/30">
              <h3 className="text-lg font-bold text-red-500">Faculty Registry</h3>
            </div>
            <div className="overflow-auto max-h-[600px] scrollbar-thin">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-400 sticky top-0 z-20">
                  <tr>
                    <th className="px-6 py-4 text-center">Sr. No</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Designations</th>
                    <th className="px-6 py-4">Contributions</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Join Date</th>
                    <th className="px-6 py-4">Gender</th>


                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {faculty.map((t, index) => (
                    <tr key={t._id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 text-center">{index + 1}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{t.firstName} {t.lastName}</td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {t.designations?.map(d => <span key={d} className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-bold">{d}</span>)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded-full text-xs">
                          {t.totalContributions || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{t.email}</td>
                      <td className="px-6 py-4">{t.birthdate ? new Date(t.birthdate).toLocaleDateString() : "N/A"}</td>
                      <td className="px-6 py-4">{t.gender || "N/A"}</td>

                      <td className="px-6 py-4 text-slate-500">{t.contactNumber || "N/A"}</td>
                      <td className="px-6 py-4 text-center flex justify-center gap-1">
                        <button onClick={() => setSelectedTeacher(t)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                        <button onClick={() => handleDeleteTeacher(t._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete Teacher">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {faculty.length === 0 && <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium">No faculty found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Student Registry details */}
        {activeTab === 'students' && (
          <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="p-5 border-b border-slate-200 bg-emerald-50/30">
              <h3 className="text-lg font-bold text-slate-900">Student Enrollment Registry</h3>
            </div>
            <div className="overflow-auto max-h-[600px] scrollbar-thin">
              <table className="w-full min-w-[900px] text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 sticky top-0 z-20">
                  <tr>
                    <th className="px-6 py-4">Sr. No</th>
                    <th className="px-6 py-4 text-center">PRN</th>
                    <th className="px-6 py-4">Full Name</th>
                    <th className="px-6 py-4">Gender</th>
                    <th className="px-6 py-4">Current Class</th>
                    <th className="px-6 py-4">Contributions</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.map((s, index) => (
                    <tr key={s._id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 text-center">{index + 1}</td>
                      <td className="px-6 py-4 text-center font-bold text-indigo-600">{s.prnNumber}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{s.firstName} {s.lastName}</td>
                      <td className="px-6 py-4">{s.gender || "N/A"}</td>
                      <td className="px-6 py-4"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md text-xs font-bold">{s.className || "Unassigned"}</span></td>
                      <td className="px-6 py-4">
                        <span className="bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded-full text-xs">
                          {s.totalContributions || 0}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{s.contactNumber}</td>
                      <td className="px-6 py-4 text-slate-500">{s.email}</td>
                      <td className="px-6 py-4 text-center flex justify-center gap-1">
                        <button onClick={() => setSelectedStudent(s)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </button>
                      </td>
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
            <div className="overflow-auto max-h-[600px] scrollbar-thin">
              <table className="w-full min-w-[900px] text-left text-sm whitespace-nowrap">
                <thead className="bg-indigo-50 text-indigo-700 font-bold border-b border-indigo-100 sticky top-0 z-20">
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
            <div className="overflow-auto max-h-[600px] scrollbar-thin">
              <table className="w-full min-w-[850px] text-left text-sm whitespace-nowrap">
                <thead className="bg-blue-50 text-blue-700 font-bold border-b border-blue-100 sticky top-0 z-20">
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
            <div className="overflow-auto max-h-[600px] scrollbar-thin">
              <table className="w-full min-w-[1000px] text-left text-sm whitespace-nowrap">
                <thead className="bg-green-50 text-green-800 font-bold border-b border-green-100 sticky top-0 z-20">
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

        {activeTab === 'activities' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 overflow-x-auto">
            <div className="min-w-[900px]">
              <ActivitiesTable activities={activities} />
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="p-5 border-b border-slate-200 bg-purple-50/30"><h3 className="text-lg font-bold text-slate-900">Awards Registry</h3></div>
            <div className="overflow-auto max-h-[600px] scrollbar-thin">
              <table className="w-full min-w-[950px] text-left text-sm whitespace-nowrap">
                <thead className="bg-purple-50 text-purple-700 font-bold border-b border-purple-200 sticky top-0 z-20">
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

        {activeTab === 'journals' && (
          <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="p-5 border-b border-slate-200 bg-emerald-50/30"><h3 className="text-lg font-bold text-slate-900">Journal Publication Details</h3></div>
            <div className="overflow-auto max-h-[600px] scrollbar-thin">
              <table className="w-full min-w-[1000px] text-left text-sm whitespace-nowrap">
                <thead className="bg-emerald-50 text-emerald-800 font-bold border-b border-emerald-100 sticky top-0 z-20">
                  <tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Journal</th><th className="px-6 py-4">Author</th><th className="px-6 py-4">Type</th><th className="px-6 py-4">Indexing</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {journalPublications.map(j => (
                    <tr key={j._id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-bold text-slate-900 max-w-xs truncate" title={j.paperTitle}>{j.paperTitle}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{j.journalName}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600">{j.teacherName}</td>
                      <td className="px-6 py-4 text-xs font-black uppercase text-slate-500">{j.publicationType}</td>
                      <td className="px-6 py-4"><div className="flex gap-1">{j.indexedIn?.map(idx => <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">{idx}</span>)}</div></td>
                    </tr>
                  ))}
                  {journalPublications.length === 0 && <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">No journal publications found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'conferences' && (
          <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="p-5 border-b border-slate-200 bg-blue-50/30"><h3 className="text-lg font-bold text-slate-900">Conference Papers</h3></div>
            <div className="overflow-auto max-h-[600px] scrollbar-thin">
              <table className="w-full min-w-[1000px] text-left text-sm whitespace-nowrap">
                <thead className="bg-blue-50 text-blue-800 font-bold border-b border-blue-100 sticky top-0 z-20">
                  <tr><th className="px-6 py-4">Date</th><th className="px-6 py-4">Paper Title</th><th className="px-6 py-4">Author</th><th className="px-6 py-4">Conference</th><th className="px-6 py-4">Type</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {conferencePublications.map(c => (
                    <tr key={c._id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 text-slate-500">{new Date(c.conferenceDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 max-w-xs truncate" title={c.researchPaperTitle}>{c.researchPaperTitle}</td>
                      <td className="px-6 py-4 font-bold text-blue-600">{c.teacherName}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{c.conferenceName}</td>
                      <td className="px-6 py-4 text-xs font-black uppercase text-slate-400">{c.publicationType}</td>
                    </tr>
                  ))}
                  {conferencePublications.length === 0 && <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">No conference papers found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'chapters' && (
          <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="p-5 border-b border-slate-200 bg-teal-50/30"><h3 className="text-lg font-bold text-slate-900">Book Chapters</h3></div>
            <div className="overflow-auto max-h-[600px] scrollbar-thin">
              <table className="w-full min-w-[1000px] text-left text-sm whitespace-nowrap">
                <thead className="bg-teal-50 text-teal-800 font-bold border-b border-teal-100 sticky top-0 z-20">
                  <tr><th className="px-6 py-4">Year</th><th className="px-6 py-4">Chapter Title</th><th className="px-6 py-4">Author</th><th className="px-6 py-4">Book Source</th><th className="px-6 py-4">Publisher</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookChapters.map(ch => (
                    <tr key={ch._id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 text-slate-500">{ch.publicationYear}</td>
                      <td className="px-6 py-4 font-bold text-slate-900 max-w-xs truncate" title={ch.chapterTitle}>{ch.chapterTitle}</td>
                      <td className="px-6 py-4 font-bold text-teal-600">{ch.teacherName}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{ch.bookTitle}</td>
                      <td className="px-6 py-4 text-xs font-black uppercase text-slate-400">{ch.publisherName}</td>
                    </tr>
                  ))}
                  {bookChapters.length === 0 && <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-400">No book chapters found.</td></tr>}
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
                  <div className="p-6"><div className="flex justify-between items-start"><h3 className="text-2xl font-black italic">{cls.name}</h3><span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-1 rounded-md uppercase">{cls.enrolledStudents.length} Students</span></div><p className="text-[10px] text-slate-400 font-bold uppercase mt-4 underline">Unit Head: {cls.classTeacherId?.firstName ? `${cls.classTeacherId.firstName} ${cls.classTeacherId.lastName}` : (cls.classTeacherId || "Not Assigned")}</p></div>
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
            <div className="flex items-center justify-between mb-4"><h3 className="text-md font-black text-slate-900">Add teacher to the department {department.name}</h3><button onClick={() => setIsAddTeacherOpen(false)} className="text-slate-400 text-2xl">✕</button></div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl shadow-sm flex items-center gap-3 animate-in fade-in">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-bold uppercase tracking-tight">{error}</span>
                <button onClick={() => setError("")} className="ml-auto text-red-400 hover:text-red-700 font-bold">✕</button>
              </div>
            )}

            <form className="grid gap-6 sm:grid-cols-2" onSubmit={handleAddTeacher}>
              <input className="input h-12" placeholder="First Name" value={teacherForm.firstName} onChange={(e) => setTeacherForm(p => ({ ...p, firstName: e.target.value }))} required />
              <input className="input h-12" placeholder="Last Name" value={teacherForm.lastName} onChange={(e) => setTeacherForm(p => ({ ...p, lastName: e.target.value }))} required />
              <input className="input h-12" placeholder="Email" type="email" value={teacherForm.email} onChange={(e) => setTeacherForm(p => ({ ...p, email: e.target.value }))} required />
              <input className="input h-12" placeholder="Employee ID" value={teacherForm.employeeId} onChange={(e) => setTeacherForm(p => ({ ...p, employeeId: e.target.value }))} required />
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
      {selectedStudent && <StudentDetailsModal student={selectedStudent} isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)} />}
    </DashboardLayout>
  );
}
