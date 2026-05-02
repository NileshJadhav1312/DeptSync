import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import Card from "../../components/common/Card";
import { useAuth } from "../../context/AuthContext";
import { createDepartment, createTeacher, getDepartments, getTeachers, updateTeacher, deleteTeacher } from "../../services/admin";
import { getActivities, deleteActivity } from "../../services/activity";
import { getAllClassrooms } from "../../services/classroom";
import CreateDepartmentModal from "../../components/admin/CreateDepartmentModal";
import EditTeacherModal from "../../components/admin/EditTeacherModal";
import TeacherDetailsModal from "../../components/admin/TeacherDetailsModal";
import AddTeacherModal from "../../components/admin/AddTeacherModal";
import ActivityDetailsModal from "../../components/teacher/ActivityDetailsModal";
import ProjectsTable from "../../components/common/ProjectsTable";
import { 
  getProjects, 
  getPatents, 
  getCopyrights, 
  getJournalPublications, 
  getConferencePublications, 
  getGrants,
  getBookPublications,
  getBookChapters
} from "../../services/research";


const emptyTeacher = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { section } = useParams();

  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [journals, setJournals] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [patents, setPatents] = useState([]);
  const [copyrights, setCopyrights] = useState([]);
  const [grants, setGrants] = useState([]);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [isDepModalOpen, setIsDepModalOpen] = useState(false);
  const [isEditTeacherModalOpen, setIsEditTeacherModalOpen] = useState(false);
  const [isAddTeacherModalOpen, setIsAddTeacherModalOpen] = useState(false);
  const [isViewTeacherModalOpen, setIsViewTeacherModalOpen] = useState(false);
  const [isViewActivityModalOpen, setIsViewActivityModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isTeacherUpdating, setIsTeacherUpdating] = useState(false);
  const [isTeacherAdding, setIsTeacherAdding] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const currentSection = section || "dashboard";
  const isDashboard = currentSection === "dashboard";
  const isDepartments = currentSection === "departments";
  const isTeachers = currentSection === "teachers";
  const isActivities = currentSection === "activities";
  const isStudents = currentSection === "students";
  const isProjects = currentSection === "projects";
  const isReports = currentSection === "reports";

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    try {
      const [
        deptData, 
        teacherData, 
        activityData, 
        classroomData, 
        projectData,
        journalData,
        confData,
        patentData,
        copyrightData,
        grantData,
        bookData,
        chapterData
      ] = await Promise.all([
        getDepartments(),
        getTeachers(),
        getActivities(),
        getAllClassrooms(),
        getProjects({ approvalStatus: 'Approved' }),
        getJournalPublications({ approvalStatus: 'Approved' }),
        getConferencePublications({ approvalStatus: 'Approved' }),
        getPatents({ approvalStatus: 'Approved' }),
        getCopyrights({ approvalStatus: 'Approved' }),
        getGrants({ approvalStatus: 'Approved' }),
        getBookPublications(),
        getBookChapters()
      ]);

      const ensureArray = (val, key) => {
        if (!val) return [];
        if (Array.isArray(val)) return val;
        if (typeof val !== 'object') return [];
        
        // Priority 1: Exact key match
        if (Array.isArray(val[key])) return val[key];
        
        // Priority 2: Standard 'data' wrapper
        if (Array.isArray(val.data)) return val.data;
        
        // Priority 3: Search for ANY array property
        const firstArray = Object.values(val).find(v => Array.isArray(v));
        if (firstArray) return firstArray;

        return [];
      };

      setDepartments(ensureArray(deptData, 'departments'));
      setTeachers(ensureArray(teacherData, 'teachers'));
      setActivities(ensureArray(activityData, 'activities'));
      setClassrooms(ensureArray(classroomData, 'classrooms'));
      setAllProjects(ensureArray(projectData, 'projects'));
      setJournals(ensureArray(journalData, 'journalPublications'));
      setConferences(ensureArray(confData, 'conferencePublications'));
      setPatents(ensureArray(patentData, 'patents'));
      setCopyrights(ensureArray(copyrightData, 'copyrights'));
      setGrants(ensureArray(grantData, 'grants'));
      setBooks(ensureArray(bookData, 'bookPublications'));
      setChapters(ensureArray(chapterData, 'bookChapters'));
    } catch (err) {
      console.error("Admin refreshData error:", err);
      setError(err?.response?.data?.message || "Unable to load admin data.");
    }
  };

  const handleCreateDepartment = async (payload) => {
    try {
      await createDepartment({
        ...payload,
        createdBy: user?.id || user?.username || user?.email,
        createdByName: user?.name || "Admin",
      });
      await refreshData();
    } catch (err) {
      throw err;
    }
  };

  const handleCreateTeacher = async (payload) => {
    setIsTeacherAdding(true);
    try {
      await createTeacher({
        ...payload,
        createdBy: user?.id || user?.username,
      });
      setSuccess("Teacher added successfully!");
      await refreshData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add teacher.");
      setTimeout(() => setError(""), 3000);
      throw err;
    } finally {
      setIsTeacherAdding(false);
    }
  };

  const handleUpdateTeacher = async (id, payload) => {
    setIsTeacherUpdating(true);
    try {
      await updateTeacher(id, payload);
      setSuccess("Teacher updated successfully!");
      await refreshData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update teacher.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsTeacherUpdating(false);
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher? This action cannot be undone.")) return;
    try {
      await deleteTeacher(id);
      setSuccess("Teacher deleted successfully!");
      await refreshData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete teacher.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleViewActivity = (activity) => {
    setSelectedActivity(activity);
    setIsViewActivityModalOpen(true);
  };

  const handleDeleteActivity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity? This action cannot be undone.")) return;
    try {
      await deleteActivity(id);
      setSuccess("Activity deleted successfully!");
      await refreshData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete activity.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditTeacherModalOpen(true);
  };

  const openViewModal = (teacher) => {
    setSelectedTeacher(teacher);
    setIsViewTeacherModalOpen(true);
  };

  const stats = useMemo(() => {
    const teachersCountFromDepartments = departments.reduce((sum, d) => sum + (d.totalTeachers || 0), 0);
    const studentCount = classrooms.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0);
    
    return [
      { title: "Departments", value: departments.length, helper: "Academic Units", onClick: () => navigate("/admin/departments"), className: "border-l-indigo-500" },
      { title: "Teachers", value: teachers.length || teachersCountFromDepartments, helper: "Faculty Members", onClick: () => navigate("/admin/teachers"), className: "border-l-purple-500" },
      { title: "Students", value: studentCount, helper: "Enrolled Students", onClick: () => navigate("/admin/students"), className: "border-l-emerald-500" },
    ];
  }, [departments, teachers.length, classrooms, navigate]);

  const sectionTitle = {
    dashboard: "Admin Dashboard",
    departments: "Departments",
    teachers: "Teachers",
    activities: "Activities",
    projects: "Projects",
    students: "Students",
    reports: "Reports",
  }[currentSection] || "Admin Dashboard";

  const sectionSubtitle = {
    dashboard: "Overview of departments, teachers, and activity.",
    departments: "Create departments and manage academic units.",
    teachers: "View all teachers and add new accounts.",
    activities: "View and manage all departmental activities.",
    projects: "View all approved student projects.",
    students: "View all students across all classrooms.",
    reports: "Quick insights from your current academic data.",
  }[currentSection] || "Manage departments and teachers.";

  const actions = (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {isDepartments && (
        <button
          className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-2"
          onClick={() => setIsDepModalOpen(true)}
        >
          Create Department
        </button>
      )}
      {(isTeachers || isDashboard) && (
        <button
          className="btn-primary text-xs sm:text-sm px-3 sm:px-4 py-2"
          onClick={() => setIsAddTeacherModalOpen(true)}
        >
          Add Teacher
        </button>
      )}
    </div>
  );

  return (
    <DashboardLayout
      role="admin"
      title={sectionTitle}
      subtitle={sectionSubtitle}
      actions={actions}
      onLogout={() => {
        logout();
        navigate("/login");
      }}
    >
      <CreateDepartmentModal
        isOpen={isDepModalOpen}
        onClose={() => setIsDepModalOpen(false)}
        onSubmit={handleCreateDepartment}
      />

      <EditTeacherModal
        isOpen={isEditTeacherModalOpen}
        onClose={() => setIsEditTeacherModalOpen(false)}
        onSubmit={handleUpdateTeacher}
        teacher={selectedTeacher}
        loading={isTeacherUpdating}
      />

      <TeacherDetailsModal
        isOpen={isViewTeacherModalOpen}
        onClose={() => setIsViewTeacherModalOpen(false)}
        teacher={selectedTeacher}
      />

      <AddTeacherModal
        isOpen={isAddTeacherModalOpen}
        onClose={() => setIsAddTeacherModalOpen(false)}
        onSubmit={handleCreateTeacher}
        departments={departments}
        loading={isTeacherAdding}
      />

      <ActivityDetailsModal
        isOpen={isViewActivityModalOpen}
        onClose={() => setIsViewActivityModalOpen(false)}
        activity={selectedActivity}
      />

      {(isDashboard || isReports) && (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          {stats.map((stat) => <Card key={stat.title} {...stat} className={stat.className} />)}
        </div>
      )}

      {isDashboard && (
        <section className="grid gap-4 sm:gap-6 xl:grid-cols-[1.3fr_0.9fr] mb-6 sm:mb-8">
          <div className="card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Overview</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">Manage everything in one place</h3>
                <p className="mt-3 text-sm text-slate-600">
                  Use Departments to create units and Teachers to review all faculty cards or add new accounts.
                </p>
              </div>
              <div className="hidden sm:flex h-16 w-16 shrink-0 rounded-2xl bg-indigo-100 items-center justify-center text-indigo-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M6 11h4m-4 4h12M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                </svg>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
                onClick={() => navigate("/admin/departments")}
              >
                <p className="text-sm font-semibold text-slate-900">Open Departments</p>
                <p className="mt-1 text-sm text-slate-500">Create departments and review department cards.</p>
              </button>
              <button
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
                onClick={() => navigate("/admin/teachers")}
              >
                <p className="text-sm font-semibold text-slate-900">Open Teachers</p>
                <p className="mt-1 text-sm text-slate-500">See teacher cards and add new teachers.</p>
              </button>
            </div>
          </div>

          <div className="card p-5 sm:p-6">
            <h3 className="text-lg font-bold text-slate-900">Quick Snapshot</h3>
            <div className="mt-4 space-y-3">
              {departments.slice(0, 4).map((dept) => (
                <div key={dept._id} className="rounded-2xl border border-slate-200 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{dept.departmentName}</p>
                      <p className="text-xs text-slate-500">
                        {dept.departmentUid} • {dept.collegeName}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600 uppercase">
                        {dept.totalTeachers || 0} Faculty
                      </span>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-700 uppercase">
                        {dept.studentCount || 0} Students
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {departments.length === 0 && (
                <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
                  No departments created yet. Open Departments to add your first one.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {isDepartments && (
        <section className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Departments</h3>
              <p className="text-sm text-slate-500 mt-1">Manage academic departments and assign teachers</p>
            </div>
            <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {departments.length} department{departments.length !== 1 ? "s" : ""}
            </div>
          </div>

          {departments.length === 0 ? (
            <div className="card p-8 text-center">
              <h4 className="text-lg font-semibold text-slate-900 mb-2">No departments yet</h4>
              <p className="text-slate-500 mb-4">Create your first department to get started.</p>
              <button
                className="btn-primary"
                onClick={() => setIsDepModalOpen(true)}
              >
                Create Department
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((dept) => (
                <article
                  key={dept._id}
                  className={`card p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-indigo-300 hover:bg-slate-50`}
                  onClick={() => {
                    navigate(`/admin/departments/${dept._id}`);
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 text-base sm:text-lg">{dept.departmentName}</h4>
                      <p className="text-sm text-slate-500 mt-1">{dept.collegeName}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">{dept.departmentUid}</span>
                    <div className="flex items-center gap-3 text-slate-500 font-medium">
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <span>{dept.totalTeachers || 0} T</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{dept.studentCount || 0} S</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {isTeachers && (
        <section className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Teachers Registry</h3>
              <p className="text-sm text-slate-500 mt-1">Manage and update accounts for all faculty members.</p>
            </div>
            <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {teachers.length} teacher{teachers.length !== 1 ? "s" : ""}
            </div>
          </div>

          {teachers.length === 0 ? (
            <div className="card p-8 text-center">
              <h4 className="text-lg font-semibold text-slate-900 mb-2">No teachers found</h4>
              <p className="text-slate-500">Go to a department page to add new teachers.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {teachers.map((teacher) => (
                <article key={teacher._id} className="card p-6 flex flex-col group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-100">
                  <div className="flex items-start justify-between mb-2">
                    {/* Teacher Avatar */}
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-100">
                        {`${teacher.firstName?.[0] || "T"}${teacher.lastName?.[0] || ""}`.toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          {[teacher.firstName, teacher.lastName].filter(Boolean).join(" ") || teacher.username}
                        </h4>
                        <p className="text-xs text-indigo-600 font-medium">{teacher.email}</p>
                      </div>
                    </div>
                    {/* Action Buttons */}
                    <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100   transition-opacity flex gap-1 shadow-sm">
                      <button
                        onClick={() => openViewModal(teacher)}
                        className="p-1.5 hover:bg-white text-emerald-600 rounded-md transition-all "
                        title="View Details"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => openEditModal(teacher)}
                        className="p-1.5 hover:bg-white  text-indigo-600 rounded-md transition-all "
                        title="Edit Teacher"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher._id)}
                        className="p-1.5 hover:bg-white  text-red-600 rounded-md transition-all  "
                        title="Delete Teacher"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {/* Professional Information of Teacher */}
                  <div className="space-y-4 flex-1 mb-3">
                    <div className="flex items-center justify-between py-2 border-b border-slate-20 uppercase tracking-wider text-[10px] font-bold text-slate-800">
                      <span>Quick Information</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Username</span>
                      <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">{teacher.username || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee ID</span>
                      <span className="text-xs font-bold text-slate-700">{teacher.employeeId || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</span>
                      <span className="text-xs font-bold text-indigo-700">{teacher.departmentName || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</span>
                      <span className="text-xs font-bold text-slate-700">+91 {teacher.contactNumber || "Not Provided"}</span>
                    </div>

                  </div>
                  {/* Designations assigned */}
                  <div className="pt-4 border-t border-gray-400 flex flex-wrap gap-1.5">
                    {teacher.designations?.length > 0 ? (
                      teacher.designations.map((d, i) => (
                        <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-tight rounded-md border border-indigo-100">
                          {d}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] italic text-slate-400">No designations assigned</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {isActivities && (
        <section className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Activities Management</h3>
              <p className="text-sm text-slate-500 mt-1">View and manage all departmental activities.</p>
            </div>
            <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {activities.length} activit{activities.length !== 1 ? "ies" : "y"}
            </div>
          </div>

          {activities.length === 0 ? (
            <div className="card p-8 text-center">
              <h4 className="text-lg font-semibold text-slate-900 mb-2">No activities found</h4>
              <p className="text-slate-500">Activities will appear here when teachers add them.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm border border-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Activity Name</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Academic Year</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Level</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {activities.map((activity) => (
                    <tr key={activity._id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{activity.activityName}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{activity.activityType}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{activity.academicYear}</td>
                      <td className="px-4 py-3 text-sm text-slate-500">{activity.activityLevel}</td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewActivity(activity)}
                            className="text-indigo-600 hover:text-indigo-900 font-medium"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(activity._id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {isProjects && (
        <section className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Approved Projects</h3>
              <p className="text-sm text-slate-500 mt-1">Review all projects that have been approved by coordinators.</p>
            </div>
            <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {allProjects.filter(p => p.approvalStatus === "Approved").length} project{allProjects.filter(p => p.approvalStatus === "Approved").length !== 1 ? "s" : ""}
            </div>
          </div>
          <ProjectsTable
            projects={allProjects.filter(p => p.approvalStatus === "Approved")}
            onEdit={null}
            onDelete={null}
          />
        </section>
      )}

      {isStudents && (
        <section className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Students Management</h3>
              <p className="text-sm text-slate-500 mt-1">View all students across all classrooms.</p>
            </div>
            <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {classrooms.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0)} student{classrooms.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0) !== 1 ? "s" : ""}
            </div>
          </div>

          {classrooms.length === 0 ? (
            <div className="card p-8 text-center">
              <h4 className="text-lg font-semibold text-slate-900 mb-2">No classrooms found</h4>
              <p className="text-slate-500">Create classrooms first to see students.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {classrooms.map((classroom) => (
                <div key={classroom._id} className="card p-6">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">{classroom.name}</h4>
                  {classroom.enrolledStudents?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse bg-white rounded-lg shadow-sm border border-slate-200">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">PRN</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Email</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {classroom.enrolledStudents.map((student) => (
                            <tr key={student._id} className="hover:bg-slate-50">
                              <td className="px-4 py-3 text-sm font-medium text-slate-900">{student.firstName} {student.lastName}</td>
                              <td className="px-4 py-3 text-sm text-slate-500">{student.prnNumber}</td>
                              <td className="px-4 py-3 text-sm text-slate-500">{student.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-slate-500">No enrolled students in this classroom.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {isReports && (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="card p-5 sm:p-6">
            <p className="text-sm text-slate-500">Most populated department</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              {departments[0]?.departmentName || "No data yet"}
            </h3>
            <p className="mt-2 text-sm text-slate-600">Open Departments for full details.</p>
          </div>
          <div className="card p-5 sm:p-6">
            <p className="text-sm text-slate-500">Teacher coverage</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">{teachers.length} active accounts</h3>
            <p className="mt-2 text-sm text-slate-600">Use Teachers to inspect faculty cards and add more accounts.</p>
          </div>
          <div className="card p-5 sm:p-6">
            <p className="text-sm text-slate-500">Department setup</p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              {departments.length > 0 ? "Configured" : "Pending setup"}
            </h3>
            <p className="mt-2 text-sm text-slate-600">Create departments first for clean teacher assignment.</p>
          </div>
        </section>
      )}

      {(error || success) && (
        <div className="fixed bottom-4 right-4 z-[100] max-w-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-2 shadow-lg animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800 font-medium">{success}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

