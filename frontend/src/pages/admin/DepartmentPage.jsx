import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import Card from "../../components/common/Card";
import { useAuth } from "../../context/AuthContext";
import { getDepartment, createTeacher, getDepartmentStudents, deleteTeacher, getTeachers } from "../../services/admin";
import { getActivities } from "../../services/activity";

import { getDepartmentAchievements } from "../../services/achievement";
import { getDepartmentClassrooms, createClassroom, acceptStudent } from "../../services/classroom";
import { getBookPublications, deleteBookPublication, getGrants, deleteGrant, getConsultancies, deleteConsultancy, getJournalPublications, deleteJournalPublication, getConferencePublications, deleteConferencePublication, getBookChapters, deleteBookChapter, getPatents, deletePatent, getCopyrights, deleteCopyright, getProjects, deleteProject, getCommittees, deleteCommittee, getEditorialBoards, deleteEditorialBoard } from "../../services/research";
import { deleteActivity } from "../../services/activity";
import { deleteAchievement } from "../../services/achievement";

import ActivitiesTable from "../../components/teacher/ActivitiesTable";
import TeacherDetailsModal from "../../components/admin/TeacherDetailsModal";
import StudentDetailsModal from "../../components/admin/StudentDetailsModal";
import BookPublicationDetailsModal from "../../components/teacher/BookPublicationDetailsModal";
import BookChapterDetailsModal from "../../components/teacher/BookChapterDetailsModal";
import ConsultancyDetailsModal from "../../components/teacher/ConsultancyDetailsModal";
import CommitteeDetailsModal from "../../components/teacher/CommitteeDetailsModal";
import EditorialBoardDetailsModal from "../../components/teacher/EditorialBoardDetailsModal";
import ActivityDetailsModal from "../../components/teacher/ActivityDetailsModal";
import AchievementDetailsModal from "../../components/common/AchievementDetailsModal";
import ConferenceDetailsModal from "../../components/common/ConferenceDetailsModal";
import CopyrightDetailsModal from "../../components/common/CopyrightDetailsModal";
import GrantDetailsModal from "../../components/common/GrantDetailsModal";
import JournalDetailsModal from "../../components/common/JournalDetailsModal";
import PatentDetailsModal from "../../components/common/PatentDetailsModal";
import ProjectDetailsModal from "../../components/common/ProjectDetailsModal";

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
  "Associate Professor", "HOD", "SDW Coordinator", "Assistant Professor", "Clerk", "Junior Professor", "NAAC Coordinator", "Research Coordinator", "Project Coordinator", "Class Teacher", "other", "Faculty development ",
];

export default function DepartmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [department, setDepartment] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [students, setStudents] = useState([]);
  const [activities, setActivities] = useState([]);
  const [patents, setPatents] = useState([]);
  const [copyrights, setCopyrights] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [bookPublications, setBookPublications] = useState([]);
  const [grants, setGrants] = useState([]);
  const [consultancies, setConsultancies] = useState([]);
  const [journalPublications, setJournalPublications] = useState([]);
  const [conferencePublications, setConferencePublications] = useState([]);
  const [bookChapters, setBookChapters] = useState([]);
  const [committees, setCommittees] = useState([]);
  const [editorialBoards, setEditorialBoards] = useState([]);

  const [activeTab, setActiveTab] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [teacherForm, setTeacherForm] = useState(emptyTeacher);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [selectedConsultancy, setSelectedConsultancy] = useState(null);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [selectedConference, setSelectedConference] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [selectedCopyright, setSelectedCopyright] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [selectedEditorial, setSelectedEditorial] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

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
      const [
        data,
        activitiesData,
        achievementsData,
        classroomsData,
        booksData,
        grantsData,
        consultanciesData,
        journalsData,
        conferenceData,
        chaptersData,
        patentsData,
        copyrightsData,
        projectsData,
        studentsData,
        teachersData,
        committeesData,
        editorialData
      ] = await Promise.all([
        getDepartment(id),
        getActivities({ departmentId: id }),
        getDepartmentAchievements(id, { approvalStatus: 'Approved' }),
        getDepartmentClassrooms(id),
        getBookPublications({ departmentId: id }),
        getGrants({ departmentId: id, approvalStatus: 'Approved' }),
        getConsultancies({ departmentId: id, approvalStatus: 'Approved' }),
        getJournalPublications({ departmentId: id, approvalStatus: 'Approved' }),
        getConferencePublications({ departmentId: id, approvalStatus: 'Approved' }),
        getBookChapters({ departmentId: id }),
        getPatents({ departmentId: id, approvalStatus: 'Approved' }),
        getCopyrights({ departmentId: id, approvalStatus: 'Approved' }),
        getProjects({ departmentId: id, approvalStatus: 'Approved' }),
        getDepartmentStudents(id),
        getTeachers({ departmentId: id }),
        getCommittees({ departmentId: id }),
        getEditorialBoards({ departmentId: id })
      ]);
      const dept = data.department || data;
      setDepartment(dept);

      const ensureArray = (val, key) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        if (typeof val !== 'object') return [];

        // Priority 1: Exact key match (e.g. teachersData.teachers)
        if (Array.isArray(val[key])) return val[key];

        // Priority 2: Standard 'data' wrapper (e.g. teachersData.data)
        if (Array.isArray(val.data)) return val.data;

        // Priority 3: Search for ANY array property (best effort)
        const firstArray = Object.values(val).find(v => Array.isArray(v));
        if (firstArray) return firstArray;

        return [];
      };

      setStudents(ensureArray(studentsData, 'students'));
      setFaculty(ensureArray(teachersData, 'teachers'));
      setClassrooms(ensureArray(classroomsData, 'classrooms'));
      setAchievements(ensureArray(achievementsData, 'achievements'));
      setBookPublications(ensureArray(booksData, 'bookPublications'));
      setGrants(ensureArray(grantsData, 'grants'));
      setConsultancies(ensureArray(consultanciesData, 'consultancies'));
      setJournalPublications(ensureArray(journalsData, 'journalPublications'));
      setConferencePublications(ensureArray(conferenceData, 'conferencePublications'));
      setBookChapters(ensureArray(chaptersData, 'bookChapters'));
      setActivities(ensureArray(activitiesData, 'activities'));
      setPatents(ensureArray(patentsData, 'patents'));
      setCopyrights(ensureArray(copyrightsData, 'copyrights'));
      setProjects(ensureArray(projectsData, 'projects'));
      setCommittees(ensureArray(committeesData, 'committees'));
      setEditorialBoards(ensureArray(editorialData, 'editorialBoards'));

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

  const createDeleteHandler = (deleteFn, itemName) => async (id) => {
    if (!window.confirm(`Are you sure you want to remove this ${itemName}?`)) return;
    try {
      await deleteFn(id);
      setSuccess(`${itemName} removed successfully.`);
      fetchDepartment();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(`Failed to delete ${itemName}.`);
    }
  };

  const handleDeleteBook = createDeleteHandler(deleteBookPublication, "Book Publication");
  const handleDeleteGrant = createDeleteHandler(deleteGrant, "Grant");
  const handleDeleteConsultancy = createDeleteHandler(deleteConsultancy, "Consultancy");
  const handleDeleteJournal = createDeleteHandler(deleteJournalPublication, "Journal");
  const handleDeleteConference = createDeleteHandler(deleteConferencePublication, "Conference");
  const handleDeleteChapter = createDeleteHandler(deleteBookChapter, "Book Chapter");
  const handleDeletePatent = createDeleteHandler(deletePatent, "Patent");
  const handleDeleteCopyright = createDeleteHandler(deleteCopyright, "Copyright");
  const handleDeleteProject = createDeleteHandler(deleteProject, "Project");
  const handleDeleteCommittee = createDeleteHandler(deleteCommittee, "Committee");
  const handleDeleteEditorial = createDeleteHandler(deleteEditorialBoard, "Editorial Board");
  const handleDeleteAchievement = createDeleteHandler(deleteAchievement, "Achievement");
  const handleDeleteActivity = createDeleteHandler(deleteActivity, "Activity");

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
    { key: 'activities', title: "Activities", value: activities.length, helper: "Dept. Events", color: "border-l-orange-500" },
    { key: 'achievements', title: "Achievements", value: achievements.length, helper: "Recognitions", color: "border-l-purple-500" },
    { key: 'books', title: "Books", value: bookPublications.length, helper: "Academic Works", color: "border-l-blue-500" },
    { key: 'grants', title: "Grants", value: grants.length, helper: "Allocated", color: "border-l-green-600" },
    { key: 'consultancies', title: "Consultancies", value: consultancies.length, helper: "Expert Roles", color: "border-l-teal-500" },
    { key: 'committees', title: "Committees", value: committees.length, helper: "Academic Bodies", color: "border-l-indigo-500" },
    { key: 'editorial', title: "Editorial Boards", value: editorialBoards.length, helper: "Journal Boards", color: "border-l-pink-500" },
    { key: 'journals', title: "Journals", value: journalPublications.length, helper: "Publications", color: "border-l-emerald-600" },
    { key: 'conferences', title: "Conferences", value: conferencePublications.length, helper: "Papers", color: "border-l-blue-400" },
    { key: 'chapters', title: "Chapters", value: bookChapters.length, helper: "Book Chapters", color: "border-l-teal-400" },
    { key: 'patents', title: "Patents", value: patents.length, helper: "Intellectual Property", color: "border-l-yellow-500" },
    { key: 'copyrights', title: "Copyrights", value: copyrights.length, helper: "Registered Works", color: "border-l-orange-600" },
    { key: 'projects', title: "Projects", value: projects.length, helper: "Student Projects", color: "border-l-cyan-500" },
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

      {activeTab && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-slate-50 rounded-3xl w-full max-w-7xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-white shrink-0">
              <h2 className="text-2xl font-black text-slate-800 capitalize flex items-center gap-3">
                <span className="bg-indigo-100 text-indigo-700 p-2 rounded-xl">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
                {stats.find(s => s.key === activeTab)?.title || activeTab} Details
              </h2>
              <button onClick={() => setActiveTab(null)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 text-3xl leading-none w-12 h-12 flex items-center justify-center rounded-xl transition-all">×</button>
            </div>

            <div className="overflow-y-auto flex-1 custom-scrollbar p-6">
              {/* Faculty Registry details */}
              {activeTab === 'teachers' && (
                <div className="card w-full overflow-hidden  bg-white rounded-2xl border border-slate-400 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 border-b border-slate-400 flex justify-between items-center bg-slate-50/30">
                    <h3 className="text-lg font-bold text-red-500">Faculty Registry</h3>
                  </div>
                  <div className="overflow-auto max-h-[600px] scrollbar-thin">
                    <table className="w-full text-left text-sm whitespace-nowrap overflow-x-auto">
                      <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-400 sticky top-0 z-20">
                        <tr>
                          <th className="px-2 py-4 text-center">Sr. No</th>
                          <th className="px-2 py-4">Name</th>
                          <th className="px-2 py-4">Emp. ID</th>
                          <th className="px-2 py-4">Designations</th>
                          <th className="px-2 py-4">Cont</th>
                          <th className="px-2 py-4">Email</th>

                          <th className="px-2 py-4">Gender</th>


                          <th className="px-2 py-4">Contact</th>
                          <th className="px-2 py-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {faculty.map((t, index) => (
                          <tr key={t._id} className="hover:bg-slate-50/50">
                            <td className="px-2 py-4 text-center">{index + 1}</td>
                            <td className="px-2 py-4 font-bold text-slate-900">{t.firstName} {t.lastName}</td>
                            <td className="px-2 py-4 font-bold">{t.employeeId}</td>

                            <td className="px-2 py-4">
                              <div className="grid grid-cols-2 gap-1">
                                {t.designations?.map(d => <span key={d} className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-bold text-center truncate" title={d}>{d}</span>)}
                              </div>
                            </td>
                            <td className="px-2 py-4">
                              <span className="bg-amber-100 text-amber-700 font-bold px-2 py-1 rounded-full text-xs">
                                {t.totalContributions || 0}
                              </span>
                            </td>
                            <td className="px-2 py-4 text-slate-500">{t.email}</td>

                            <td className="px-2 py-4">{t.gender || "N/A"}</td>

                            <td className="px-2 py-4 text-slate-500">{t.contactNumber || "N/A"}</td>
                            <td className="px-2 py-4 text-center flex justify-center gap-1">
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

                          <th className="px-6 py-4">Full Name</th>
                          <th className="px-6 py-4 text-center">PRN</th>
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

                            <td className="px-6 py-4 font-bold text-slate-900">{s.firstName} {s.lastName}</td>
                            <td className="px-6 py-4 text-center font-bold text-indigo-600">{s.prnNumber}</td>
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

              {/* Book Publication details */}
              {activeTab === 'books' && (
                <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 border-b border-slate-200 bg-blue-50/30"><h3 className="text-lg font-bold text-slate-900">Academic Books</h3></div>
                  <div className="overflow-auto max-h-[600px] scrollbar-thin">
                    <table className="w-full min-w-[850px] text-left text-sm whitespace-nowrap">
                      <thead className="bg-blue-50 text-blue-700 font-bold border-b border-blue-100 sticky top-0 z-20">
                        <tr>
                          <th className="px-2 py-4 font-semibold">Sr.No</th>
                          <th className="px-2 py-4 font-semibold">Title</th>
                          <th className="px-2 py-4 font-semibold">Authors/Editors</th>
                          <th className="px-2 py-4 font-semibold">Publisher</th>
                          <th className="px-2 py-4 font-semibold">Awards</th>
                          <th className="px-2 py-4 font-semibold">Year</th>
                          <th className="px-2 py-4 font-semibold text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bookPublications.map((b, index) => (
                          <tr key={b._id} className="hover:bg-slate-50/50">
                            <td className="px-2 py-4 font-semibold">{index + 1}</td>
                            <td className="px-2 py-4 font-bold text-slate-900">{b.bookTitle}<br />
                              <span className="text-[10px] text-slate-800 font-normal">ISBN: {b.isbn || 'N/A'}</span>
                              <br /><span className="text-[10px] text-slate-800 font-normal">Edition: {b.edition || 'N/A'}</span>
                            </td>
                            <td className="px-2 py-4 text-sm">
                              {(() => {
                                const list = b.authorsEditors || b.authorsAndEditors || [];
                                const visible = list.slice(0, 2);
                                const extra = list.length - visible.length;
                                return (
                                  <div className="flex flex-col gap-0.5">
                                    {visible.map((a, i) => (
                                      <span key={i} className="text-slate-800 font-semibold text-xs">
                                        {a.name}{a.role ? <span className="text-slate-400 font-normal"> ({a.role})</span> : ''}
                                      </span>
                                    ))}
                                    {extra > 0 && (
                                      <span className="text-[10px] font-bold text-indigo-500">+{extra} more</span>
                                    )}
                                    {list.length === 0 && (
                                      <div className="flex flex-col">
                                        <span className="text-slate-800 font-semibold text-xs">{b.teacherName || b.createdByName}</span>
                                        <span className="text-[9px] text-slate-400 font-mono">ID: {b.teacherId?.employeeId || 'N/A'}</span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}
                            </td>
                            <td className="px-2 py-4 italic text-slate-500">{b.publisherName}</td>
                            <td className="px-2 py-4 italic text-slate-500">{b.awardsRecognition.details}</td>
                            <td className="px-2 py-4 font-bold">{b.publicationYear}</td>
                            <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedBook(b)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteBook(b._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
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
                          <tr>
                            <th className="px-2 py-4">Sr. No.</th>
                            <th className="px-2 py-4">Name</th>
                            <th className="px-2 py-4">Role</th>
                            <th className="px-2 py-4">Project title</th>
                            <th className="px-2 py-4">Funding Agency</th>
                            <th className="px-2 py-4">Amount</th>
                            <th className="px-2 py-4">Status</th>
                            <th className="px-2 py-4 text-center">Year</th>
                            <th className="px-2 py-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {grants.map((g, index) => (
                            <tr key={g._id} className="hover:bg-slate-50/50">
                              <td className="px-2 py-4 text-slate-500 font-medium">{index + 1}</td>
                              <td className="px-2 py-4">
                                <div className="font-bold text-slate-900">{g.createdByName || g.teacherName || g.studentName || 'N/A'}</div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  ID: {g.teacherId?.employeeId || g.studentId?.prnNumber || 'N/A'}
                                </div>
                              </td>
                              <td className="px-2 py-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${g.createdByModel === 'Teacher' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                  {g.createdByModel || 'Teacher'}
                                </span>
                              </td>
                              <td className="px-2 py-4 font-bold text-slate-900 max-w-xs truncate" title={g.projectTitle}>{g.projectTitle}</td>
                              <td className="px-2 py-4 text-slate-500">{g.fundingAgency || 'N/A'}</td>
                              <td className="px-2 py-4 text-green-700 font-black">₹{g.grantAchievedAmount ?? g.amount ?? 0}</td>
                              <td className="px-2 py-4">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${g.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : g.status === 'ongoing' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                                  {g.status || 'pending'}
                                </span>
                              </td>
                              <td className="px-2 py-4 text-center font-bold text-slate-700">{g.academicYear || 'N/A'}</td>
                              <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedGrant(g)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteGrant(g._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'consultancies' && (
                <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 border-b border-slate-200 bg-teal-50/30">
                    <h3 className="text-lg font-bold text-slate-900">Consultancy Registry</h3>
                  </div>
                  <div className="overflow-auto max-h-[600px] scrollbar-thin">
                    <table className="w-full min-w-[1000px] text-left text-sm whitespace-nowrap">
                      <thead className="bg-teal-50 text-teal-800 font-bold border-b border-teal-100 sticky top-0 z-20">
                        <tr>
                          <th className="px-2 py-4">Sr. No.</th>
                          <th className="px-2 py-4">Consultant</th>
                          <th className="px-2 py-4">Title</th>
                          <th className="px-2 py-4">Organization</th>
                          <th className="px-2 py-4">Type</th>
                          <th className="px-2 py-4 ">Revenue</th>

                          <th className="px-2 py-4">Duration</th>
                          <th className="px-2 py-4">Status</th>
                          <th className="px-2 py-4">Year</th>
                          <th className="px-2 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {consultancies.map((c, index) => (
                          <tr key={c._id} className="hover:bg-slate-50/50">
                            <td className="px-2 py-4 text-slate-500">{index + 1}</td>
                            <td className="px-2 py-4">
                              <div className="font-bold text-teal-600">{c.teacherName || c.createdByName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">ID: {c.teacherId?.employeeId || c.studentId?.prnNumber || 'N/A'}</div>
                            </td>
                            <td className="px-2 py-4 font-bold text-slate-900 max-w-xs truncate" title={c.title}>{c.title}</td>
                            <td className="px-2 py-4 text-slate-600">{c.organization?.name || 'N/A'}</td>
                            <td className="px-2 py-4 text-teal-700 font-black">{c.organization.type || 'N/A'}</td>
                            <td className="px-2 py-4 text-teal-700 font-black">₹{c.revenueGenerated}</td>
                            <td className="px-2 py-4 text-teal-700 font-black">{c.durationInMonths || 'N/A'} </td>
                            <td className="px-2 py-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${c.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : c.paymentStatus === 'Partially Paid' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                                {c.paymentStatus}
                              </span>
                            </td>
                            <td className="px-2 py-4 text-center font-bold text-slate-700">{c.year}</td>
                            <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedConsultancy(c)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteConsultancy(c._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                        {consultancies.length === 0 && <tr><td colSpan="8" className="px-6 py-12 text-center text-slate-400">No consultancies found.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'activities' && (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                  <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm mt-6">
                    <div className="overflow-auto max-h-[600px] scrollbar-thin">
                      <table className="w-full min-w-[900px] text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-200 text-blue-700 border-b border-slate-400 sticky top-0 z-20">
                          <tr>
                            <th className="px-2 py-4 font-semibold">Sr.No</th>
                            <th className="px-2 py-4 font-semibold">Activity Name</th>
                            <th className="px-2 py-4 font-semibold">Co-ordinator</th>
                            <th className="px-2 py-4 font-semibold">Academic Year | Sem</th>
                            <th className="px-2 py-4 font-semibold">Type</th>
                            <th className="px-2 py-4 font-semibold">Level</th>
                            <th className="px-2 py-4 font-semibold">Duration</th>
                            <th className="px-2 py-4 font-semibold">Participation</th>
                            <th className="px-2 py-4 font-semibold">Mode</th>
                            <th className="px-2 py-4 font-semibold text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 border-b border-slate-300">
                          {activities.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">
                                No activities found. Click "Add Activity" to create one.
                              </td>
                            </tr>
                          ) : (
                            activities.map((act, index) => (
                              <tr key={act._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-2 py-4">{index + 1}</td>
                                <td className="px-2 py-4 font-medium text-slate-700 max-w-xs truncate" title={act.activityName}>
                                  {act.activityName}
                                </td>
                                <td className="px-2 py-4">{act.coordinators.join(", ")}</td>
                                <td className="px-2 py-4">{act.academicYear}|sem({act.semester})</td>
                                <td className="px-2 py-4">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                    {act.activityType === "Other" && act.otherActivityType ? act.otherActivityType : act.activityType}
                                  </span>

                                </td>
                                <td className="px-2 py-4">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${act.activityLevel === 'International'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : act.activityLevel === 'National' ? 'bg-amber-50 text-amber-700 border-amber-200'
                                      : act.activityLevel === 'State' ? 'bg-blue-50 text-blue-700 border-blue-200'
                                        : act.activityLevel === 'University' ? 'bg-purple-50 text-purple-700 border-purple-200'
                                          : act.activityLevel === 'Institute' ? 'bg-pink-50 text-pink-700 border-pink-200'
                                            : act.activityLevel === 'Department' ? 'bg-teal-50 text-teal-700 border-teal-200'
                                              : act.activityLevel === 'Departmental' ? 'bg-orange-50 text-orange-700 border-orange-200'
                                                : ''
                                    }`}>
                                    {act.activityLevel}
                                  </span>
                                </td>
                                <td className="px-2 py-4 font-medium text-slate-700 max-w-xs truncate" >
                                  {act.durationInDays} Days
                                </td>
                                <td className="px-2 py-4">
                                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${act.participationType === 'Organised'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                    }`}>
                                    {act.participationType}
                                  </span>
                                </td>
                                <td className="px-2 py-4 text-slate-600 font-medium">
                                  {act.activityMode}
                                </td>
                                <td className="px-2 py-4 text-center space-x-2 flex justify-center items-center">
                                  <button
                                    onClick={() => setSelectedActivity(act)}
                                    className="inline-flex items-center justify-center p-2 rounded-lg  text-indigo-600 hover:bg-indigo-200 transition-colors tooltip"
                                    title="View Details"
                                  >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                  </button>

                                </td>
                              </tr>
                            ))
                          )}
                          {patents.length === 0 && <tr><td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">No patents found.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              )}

              {activeTab === 'patents' && (
                <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 border-b border-slate-200 bg-yellow-50/30"><h3 className="text-lg font-bold text-slate-900">Patents Registry</h3></div>
                  <div className="overflow-auto max-h-[600px] scrollbar-thin">
                    <table className="w-full min-w-[900px] text-left text-sm whitespace-nowrap">
                        <thead className="bg-yellow-50 text-yellow-800 font-bold border-b border-yellow-100 sticky top-0 z-20">
                          <tr>
                            <th className="px-2 py-4">Sr. No.</th>
                            <th className="px-2 py-4">Application No</th>
                            <th className="px-2 py-4">Title</th>
                            <th className="px-2 py-4">Inventor</th>
                            <th className="px-2 py-4">Status</th>
                            <th className="px-2 py-4 text-center">Approval</th>
                            <th className="px-2 py-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {patents.map((p, index) => (
                            <tr key={p._id} className="hover:bg-slate-50/50">
                              <td className="px-2 py-4 text-slate-500 font-medium">{index + 1}</td>
                              <td className="px-2 py-4 font-bold">{p.applicationNumber}</td>
                              <td className="px-2 py-4 font-bold text-slate-900">{p.titleOfPatent}</td>
                              <td className="px-2 py-4">
                                <div className="font-bold text-indigo-600">{p.createdByName}</div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  ID: {p.teacherId?.employeeId || p.studentId?.prnNumber || 'N/A'}
                                </div>
                              </td>
                              <td className="px-2 py-4">
                                <span className="px-2 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase border border-slate-200">
                                  {p.patentStatus}
                                </span>
                              </td>
                              <td className="px-2 py-4 text-center">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase border ${
                                  p.approvalStatus === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                  p.approvalStatus === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                  'bg-amber-50 text-amber-600 border-amber-100'
                                }`}>
                                  {p.approvalStatus || 'Pending'}
                                </span>
                              </td>
                              <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedPatent(p)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeletePatent(p._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'copyrights' && (
                <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 border-b border-slate-200 bg-orange-50/30"><h3 className="text-lg font-bold text-slate-900">Copyrights Registry</h3></div>
                  <div className="overflow-auto max-h-[600px] scrollbar-thin">
                    <table className="w-full min-w-[900px] text-left text-sm whitespace-nowrap">
                        <thead className="bg-orange-50 text-orange-800 font-bold border-b border-orange-100 sticky top-0 z-20">
                          <tr>
                            <th className="px-2 py-4">Sr. No.</th>
                            <th className="px-2 py-4">Dairy No</th>
                            <th className="px-2 py-4">Work Title</th>
                            <th className="px-2 py-4">Author</th>
                            <th className="px-2 py-4">Status</th>
                            <th className="px-2 py-4 text-center">Approval</th>
                            <th className="px-2 py-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {copyrights.map((c, index) => (
                            <tr key={c._id} className="hover:bg-slate-50/50">
                              <td className="px-2 py-4 text-slate-500 font-medium">{index + 1}</td>
                              <td className="px-2 py-4 font-bold">{c.dairyNumber}</td>
                              <td className="px-2 py-4 font-bold text-slate-900">{c.workTitle}</td>
                              <td className="px-2 py-4">
                                <div className="font-bold text-indigo-600">{c.createdByName}</div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  ID: {c.teacherId?.employeeId || c.studentId?.prnNumber || 'N/A'}
                                </div>
                              </td>
                              <td className="px-2 py-4">
                                <span className="px-2 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase border border-slate-200">
                                  {c.copyrightStatus}
                                </span>
                              </td>
                              <td className="px-2 py-4 text-center">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase border ${
                                  c.approvalStatus === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                  c.approvalStatus === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                  'bg-amber-50 text-amber-600 border-amber-100'
                                }`}>
                                  {c.approvalStatus || 'Pending'}
                                </span>
                              </td>
                              <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedCopyright(c)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteCopyright(c._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                          ))}
                          {copyrights.length === 0 && <tr><td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">No copyrights found.</td></tr>}
                        </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 border-b border-slate-200 bg-cyan-50/30"><h3 className="text-lg font-bold text-slate-900">Projects Registry</h3></div>
                  <div className="overflow-auto max-h-[600px] scrollbar-thin">
                    <table className="w-full min-w-[900px] text-left text-sm whitespace-nowrap">
                        <thead className="bg-cyan-50 text-cyan-800 font-bold border-b border-cyan-100 sticky top-0 z-20">
                          <tr>
                            <th className="px-2 py-4">Sr. No.</th>
                            <th className="px-2 py-4">Title</th>
                            <th className="px-2 py-4">Guide / Lead</th>
                            <th className="px-2 py-4">Agency</th>
                            <th className="px-2 py-4 font-black">Amount</th>
                            <th className="px-2 py-4 text-center">Approval</th>
                            <th className="px-2 py-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {projects.map((p, index) => (
                            <tr key={p._id} className="hover:bg-slate-50/50">
                              <td className="px-2 py-4 text-slate-500 font-medium">{index + 1}</td>
                              <td className="px-2 py-4 font-bold text-slate-900">{p.title}</td>
                              <td className="px-2 py-4">
                                <div className="font-bold text-indigo-600">{p.createdByName}</div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  ID: {p.teacherId?.employeeId || p.studentId?.prnNumber || 'N/A'}
                                </div>
                              </td>
                              <td className="px-2 py-4 text-slate-500">{p.fundingAgency || 'Self'}</td>
                              <td className="px-2 py-4 font-black">₹{p.amount || 0}</td>
                              <td className="px-2 py-4 text-center">
                                <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase border ${
                                  p.approvalStatus === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                  p.approvalStatus === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                                  'bg-amber-50 text-amber-600 border-amber-100'
                                }`}>
                                  {p.approvalStatus || 'Pending'}
                                </span>
                              </td>
                              <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedProject(p)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteProject(p._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                          ))}
                          {projects.length === 0 && <tr><td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">No projects found.</td></tr>}
                        </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 border-b border-slate-200 bg-purple-50/30"><h3 className="text-lg font-bold text-slate-900">Awards Registry</h3></div>
                  <div className="overflow-auto max-h-[600px] scrollbar-thin">
                    <table className="w-full min-w-[950px] text-left text-sm whitespace-nowrap">
                      <thead className="bg-purple-50 text-purple-700 font-bold border-b border-purple-200 sticky top-0 z-20">
                        <tr>
                          <th className="px-2 py-4">Sr. No.</th>
                          <th className="px-2 py-4">Recipient</th>
                          <th className="px-2 py-4">Role</th>
                          <th className="px-2 py-4">Title</th>
                          <th className="px-2 py-4">Category</th>
                          <th className="px-2 py-4">Level</th>
                          <th className="px-2 py-4">Position</th>
                          <th className="px-2 py-4 text-right">Date</th>
                          <th className="px-2 py-4 text-center">Actions</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {achievements.map((ach, index) => (
                          <tr key={ach._id} className="hover:bg-slate-50/50">
                            <td className="px-2 py-4 font-black">{index + 1}</td>
                            <td className="px-2 py-4">
                              <div className="font-black text-slate-900">{ach.achievedByName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                ID: {ach.achievedBy?.employeeId || ach.achievedBy?.prnNumber || 'N/A'}
                              </div>
                            </td>
                            <td className="px-2 py-4"><span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${ach.achievedByType === 'Teacher' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>{ach.achievedByType}</span></td>
                            <td className="px-2 py-4 italic text-slate-700 underline decoration-indigo-200">{ach.name}</td>
                            <td className="px-2 py-4 text-xs font-bold">{ach.category}</td>
                            <td className="px-2 py-4 text-xs font-bold">{ach.level}</td>
                            <td className="px-2 py-4 text-xs font-bold">{ach.position}</td>
                            <td className="px-2 py-4 text-right text-slate-500">{new Date(ach.date).toLocaleDateString()}</td>
                            <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedAchievement(ach)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteAchievement(ach._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'committees' && (
                <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 border-b border-slate-200 bg-indigo-50/30"><h3 className="text-lg font-bold text-slate-900">Academic Committees</h3></div>
                  <div className="overflow-auto max-h-[600px] scrollbar-thin">
                    <table className="w-full min-w-[900px] text-left text-sm whitespace-nowrap">
                      <thead className="bg-indigo-50 text-indigo-800 font-bold border-b border-indigo-100 sticky top-0 z-20">
                        <tr>
                          <th className="px-2 py-4">Sr. No.</th>
                          <th className="px-2 py-4">Teacher Name</th>
                          <th className="px-2 py-4">Committee Name</th>
                          <th className="px-2 py-4">Type</th>
                          <th className="px-2 py-4">Organization</th>
                          <th className="px-2 py-4">role</th>
                          <th className="px-2 py-4">Level</th>
                          <th className="px-2 py-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {committees.map((c, index) => (
                          <tr key={c._id} className="hover:bg-slate-50/50">
                            <td className="px-2 py-4 text-slate-500 font-medium">{index + 1}</td>
                            <td className="px-2 py-4">
                              <div className="font-bold text-indigo-600">{c.teacherName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">
                                ID: {c.teacherId?.employeeId || 'N/A'}
                              </div>
                            </td>
                            <td className="px-2 py-4 font-bold text-slate-900">{c.committeeName}</td>
                            <td className="px-2 py-4 text-slate-600">{c.committeeType}</td>
                            <td className="px-2 py-4 text-slate-600">{c.organization?.name || 'N/A'}</td>
                            <td className="px-2 py-4 font-medium text-slate-700">{c.position || c.role}</td>
                            <td className="px-2 py-4">
                              <span className="px-2 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase text-slate-600 border border-slate-200">
                                {c.level}
                              </span>
                            </td>
                            <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedCommittee(c)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteCommittee(c._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'editorial' && (
                <div className="card w-full overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-5 border-b border-slate-200 bg-pink-50/30"><h3 className="text-lg font-bold text-slate-900">Editorial Boards</h3></div>
                  <div className="overflow-auto max-h-[600px] scrollbar-thin">
                    <table className="w-full min-w-[900px] text-left text-sm whitespace-nowrap">
                        <thead className="bg-pink-50 text-pink-800 font-bold border-b border-pink-100 sticky top-0 z-20">
                          <tr>
                            <th className="px-2 py-4">Sr. No.</th>
                            <th className="px-2 py-4">Academic Year</th>
                            <th className="px-2 py-4">Teacher Name</th>
                            <th className="px-2 py-4">Board Name</th>
                            <th className="px-2 py-4">Role</th>
                            <th className="px-2 py-4">Level</th>
                            <th className="px-2 py-4">Responsibilities</th>
                            <th className="px-2 py-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {editorialBoards.map((e, index) => (
                            <tr key={e._id} className="hover:bg-slate-50/50">
                              <td className="px-2 py-4 text-slate-500 font-medium">{index + 1}</td>
                              <td className="px-2 py-4 text-slate-600 font-medium">{e.academicYear}</td>
                              <td className="px-2 py-4">
                                <div className="font-bold text-pink-600">{e.teacherName}</div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  ID: {e.teacherId?.employeeId || 'N/A'}
                                </div>
                              </td>
                              <td className="px-2 py-4 font-bold text-slate-900">{e.boardName}</td>
                              <td className="px-2 py-4 font-medium text-slate-700">{e.role}</td>
                              <td className="px-2 py-4">
                                <span className="px-2 py-1 rounded-full bg-slate-100 text-[10px] font-black uppercase text-slate-600 border border-slate-200">
                                  {e.level}
                                </span>
                              </td>
                              <td className="px-2 py-4 text-slate-500 italic text-xs max-w-xs truncate" title={e.responsibilities}>
                                {e.responsibilities || 'N/A'}
                              </td>
                              <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedEditorial(e)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteEditorial(e._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
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
                          <tr>
                            <th className="px-2 py-4">Sr. No.</th>
                            <th className="px-2 py-4">Name</th>
                            <th className="px-2 py-4">Role </th>
                            <th className="px-2 py-4 text-center">Year</th>
                            <th className="px-2 py-4">Authors</th>
                            <th className="px-2 py-4">Paper Title</th>
                            <th className="px-2 py-4">Research Area</th>
                            <th className="px-2 py-4">Journal</th>
                            <th className="px-2 py-4">Impact</th>
               
                            <th className="px-2 py-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {journalPublications.map((j, index) => (
                            <tr key={j._id} className="hover:bg-slate-50/50">
                              <td className="px-2 py-4 text-slate-500 font-medium">{index + 1}</td>
                              <td className="px-2 py-4 font-bold text-emerald-600">{j.teacherName || j.createdByName}</td>
                              <td className="px-2 py-4">
                                <div className="text-[11px] font-bold text-slate-600 uppercase">
                                  {j.teacherId ? 'Teacher' : 'Student'}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  ID: {j.teacherId?.employeeId || j.studentId?.prnNumber || 'N/A'}
                                </div>
                              </td>
                              <td className="px-2 py-4 font-bold text-slate-700 text-center">{j.year}</td>
                              <td className="px-2 py-4 text-slate-600 italic text-[11px] max-w-[150px] truncate" title={j.authors?.join(", ")}>
                                {j.authors?.join(", ") || 'N/A'}
                              </td>
                              <td className="px-2 py-4 font-bold text-slate-900 max-w-xs truncate" title={j.paperTitle}>{j.paperTitle}</td>
                              <td className="px-2 py-4 font-medium text-slate-700">{j.researchArea || 'N/A'}</td>
                              <td className="px-2 py-4 font-medium text-slate-700">{j.journalName}</td>
                              <td className="px-2 py-4">
                                <div className="flex flex-col gap-1">
                                  <div className="flex gap-1 flex-wrap">
                                    {j.indexedIn?.map(idx => (
                                      <span key={idx} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-black uppercase border border-indigo-100">{idx}</span>
                                    ))}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${j.quartile === 'Q1' ? 'bg-emerald-100 text-emerald-700' : j.quartile === 'Q2' ? 'bg-blue-100 text-blue-700' : j.quartile === 'Q3' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                      {j.quartile || 'None'}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-700">IF: {j.impactFactor || '0'}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-2 py-4 text-center flex justify-center gap-1">
                                <button onClick={() => setSelectedJournal(j)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </button>
                                <button onClick={() => handleDeleteJournal(j._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete">
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </td>
                            </tr>
                          ))}
                          {journalPublications.length === 0 && <tr><td colSpan="10" className="px-6 py-12 text-center text-slate-400">No journal publications found.</td></tr>}
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
                          <tr>
                            <th className="px-2 py-4">Sr</th>
                               <th className="px-2 py-4">Author</th>
                           <th className="px-2 py-4">Stu/Tea</th>
                            <th className="px-2 py-4">Date</th>
                            <th className="px-2 py-4">Paper Title</th>
                            <th className="px-2 py-4">Conference</th>
                            <th className="px-2 py-4">Role</th>
                            <th className="px-2 py-4">Level</th>
                       
                            <th className="px-2 py-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {conferencePublications.map((c, index) => (
                            <tr key={c._id} className="hover:bg-slate-50/50">
                              <td className="px-2 py-4 text-slate-500 font-medium">{index + 1}</td>
                               <td className="px-2 py-4">
                                <div className="font-bold text-blue-600">{c.teacherName || c.createdByName}</div>
                                   </td>
                                   <td className="px-2 py-4">
                                <div className="text-[11px] font-bold text-slate-600 uppercase">
                                  {c.teacherId ? 'Teacher' : 'Student'}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  ID: {c.teacherId?.employeeId || c.studentId?.prnNumber || 'N/A'}
                                </div>
                              </td>
                              <td className="px-2 py-4 text-slate-500">{new Date(c.conferenceDate).toLocaleDateString()}</td>
                              <td className="px-2 py-4 font-bold text-slate-900 max-w-xs truncate" title={c.researchPaperTitle}>{c.researchPaperTitle}</td>
                             
                              <td className="px-2 py-4 font-medium text-slate-700">{c.conferenceName}</td>
                              <td className="px-2 py-4 text-slate-500 font-medium">{c.role}</td>
                              <td className="px-2 py-4 text-[10px] font-black uppercase text-slate-400">{c.publicationType}</td>
                               
                              <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedConference(c)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteConference(c._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                          {conferencePublications.length === 0 && <tr><td colSpan="8" className="px-6 py-12 text-center text-slate-400 font-medium">No conference papers found.</td></tr>}
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
                          <tr>
                            <th className="px-2 py-4">Sr. No.</th>
                            <th className="px-2 py-4">Year</th>
                            <th className="px-2 py-4">Chapter Title</th>
                            <th className="px-2 py-4">Author</th>
                            <th className="px-2 py-4">Book Source</th>
                            <th className="px-2 py-4">Publisher</th>
                            <th className="px-2 py-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {bookChapters.map((ch, index) => (
                            <tr key={ch._id} className="hover:bg-slate-50/50">
                              <td className="px-2 py-4 text-slate-500 font-medium">{index + 1}</td>
                              <td className="px-2 py-4 text-slate-500">{ch.publicationYear}</td>
                              <td className="px-2 py-4 font-bold text-slate-900 max-w-xs truncate" title={ch.chapterTitle}>{ch.chapterTitle}</td>
                              <td className="px-2 py-4">
                                <div className="font-bold text-teal-600">{ch.teacherName || ch.createdByName}</div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  ID: {ch.teacherId?.employeeId || 'N/A'}
                                </div>
                              </td>
                              <td className="px-2 py-4 font-medium text-slate-700">{ch.bookTitle}</td>
                              <td className="px-2 py-4 text-[10px] font-black uppercase text-slate-400">{ch.publisherName}</td>
                              <td className="px-2 py-4 text-center flex justify-center gap-1">
                              <button onClick={() => setSelectedChapter(ch)} className="p-2 text-indigo-600 hover:bg-indigo-200 rounded-lg transition-colors tooltip" title="View Details">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteChapter(ch._id)} className="p-2 text-red-600 hover:bg-red-200 rounded-lg transition-colors tooltip" title="Delete">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </td>
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
          </div>
        </div>
      )}

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
      )
      }

      {selectedTeacher && <TeacherDetailsModal teacher={selectedTeacher} isOpen={!!selectedTeacher} onClose={() => setSelectedTeacher(null)} />}
      {selectedStudent && <StudentDetailsModal student={selectedStudent} isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)} />}

      {selectedBook && <BookPublicationDetailsModal book={selectedBook} isOpen={!!selectedBook} onClose={() => setSelectedBook(null)} />}
      {selectedGrant && <GrantDetailsModal grant={selectedGrant} isOpen={!!selectedGrant} onClose={() => setSelectedGrant(null)} />}
      {selectedConsultancy && <ConsultancyDetailsModal consultancy={selectedConsultancy} isOpen={!!selectedConsultancy} onClose={() => setSelectedConsultancy(null)} />}
      {selectedJournal && <JournalDetailsModal journal={selectedJournal} isOpen={!!selectedJournal} onClose={() => setSelectedJournal(null)} />}
      {selectedConference && <ConferenceDetailsModal conference={selectedConference} isOpen={!!selectedConference} onClose={() => setSelectedConference(null)} />}
      {selectedChapter && <BookChapterDetailsModal chapter={selectedChapter} isOpen={!!selectedChapter} onClose={() => setSelectedChapter(null)} />}
      {selectedPatent && <PatentDetailsModal patent={selectedPatent} isOpen={!!selectedPatent} onClose={() => setSelectedPatent(null)} />}
      {selectedCopyright && <CopyrightDetailsModal copyright={selectedCopyright} isOpen={!!selectedCopyright} onClose={() => setSelectedCopyright(null)} />}
      {selectedProject && <ProjectDetailsModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />}
      {selectedCommittee && <CommitteeDetailsModal committee={selectedCommittee} isOpen={!!selectedCommittee} onClose={() => setSelectedCommittee(null)} />}
      {selectedEditorial && <EditorialBoardDetailsModal entry={selectedEditorial} isOpen={!!selectedEditorial} onClose={() => setSelectedEditorial(null)} />}
      {selectedAchievement && <AchievementDetailsModal achievement={selectedAchievement} isOpen={!!selectedAchievement} onClose={() => setSelectedAchievement(null)} />}
      {selectedActivity && <ActivityDetailsModal activity={selectedActivity} isOpen={!!selectedActivity} onClose={() => setSelectedActivity(null)} />}
    </DashboardLayout >
  );
}





