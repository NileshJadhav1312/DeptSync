import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import Card from "../../components/common/Card";
import { useAuth } from "../../context/AuthContext";
import { getStudentProfile } from "../../services/profile";
import { getActivities, createActivity, updateActivity, deleteActivity } from "../../services/activity";
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from "../../services/achievement";
import { getDepartmentClassrooms, joinDepartment, requestJoinClass } from "../../services/classroom";
import ActivitiesTable from "../../components/teacher/ActivitiesTable";
import ActivityFormModal from "../../components/teacher/ActivityFormModal";
import AchievementsTable from "../../components/common/AchievementsTable";
import AchievementFormModal from "../../components/common/AchievementFormModal";
import JournalPublicationsTable from "../../components/common/JournalPublicationsTable";
import JournalPublicationFormModal from "../../components/common/JournalPublicationFormModal";
import PatentsTable from "../../components/common/PatentsTable";
import PatentFormModal from "../../components/common/PatentFormModal";
import CopyrightsTable from "../../components/common/CopyrightsTable";
import CopyrightFormModal from "../../components/common/CopyrightFormModal";
import { GrantsTable, GrantFormModal } from "../../components/common/GrantsItems";
import { getConferencePublications, createConferencePublication, updateConferencePublication, deleteConferencePublication } from "../../services/research";
import ConferencePublicationsTable from "../../components/common/ConferencePublicationsTable";
import ConferencePublicationFormModal from "../../components/common/ConferencePublicationFormModal";
import { getProjects, createProject, updateProject, deleteProject, getJournalPublications, createJournalPublication, updateJournalPublication, deleteJournalPublication, getPatents, createPatent, updatePatent, deletePatent, getCopyrights, createCopyright, updateCopyright, deleteCopyright, getGrants, createGrant, updateGrant, deleteGrant, getConsultancies, createConsultancy, updateConsultancy, deleteConsultancy } from "../../services/research";
import ProjectsTable from "../../components/common/ProjectsTable";
import ProjectFormModal from "../../components/common/ProjectFormModal";
import { ConsultanciesTable, ConsultancyFormModal } from "../../components/teacher/ConsultancyItems";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { section } = useParams();
  const [profileData, setProfileData] = useState(null);

  const [activities, setActivities] = useState([]);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);

  const [achievements, setAchievements] = useState([]);
  const [isAchievementModalOpen, setIsAchievementModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);

  const [classrooms, setClassrooms] = useState([]);
  const [departmentUidInput, setDepartmentUidInput] = useState("");
  const [classroomCodeInput, setClassroomCodeInput] = useState("");

  const [conferencePublications, setConferencePublications] = useState([]);
  const [isConferenceModalOpen, setIsConferenceModalOpen] = useState(false);
  const [editingConference, setEditingConference] = useState(null);

  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [journals, setJournals] = useState([]);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);

  const [patents, setPatents] = useState([]);
  const [isPatentModalOpen, setIsPatentModalOpen] = useState(false);
  const [editingPatent, setEditingPatent] = useState(null);

  const [copyrights, setCopyrights] = useState([]);
  const [isCopyrightModalOpen, setIsCopyrightModalOpen] = useState(false);
  const [editingCopyright, setEditingCopyright] = useState(null);

  const [grants, setGrants] = useState([]);
  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [editingGrant, setEditingGrant] = useState(null);

  const [consultancies, setConsultancies] = useState([]);
  const [isConsultancyModalOpen, setIsConsultancyModalOpen] = useState(false);
  const [editingConsultancy, setEditingConsultancy] = useState(null);


  const isAchievements = section === "achievements";
  const isActivities = section === "activities";
  const isAcademics = section === "academics";
  const isConferences = section === "conferences";
  const isProjects = section === "projects";

  const isJournals = section === "journals";
  const isPatents = section === "patents";
  const isCopyrights = section === "copyrights";
  const isGrants = section === "grants";
  const isConsultancies = section === "consultancies";


  useEffect(() => {
    if (user?.id) {
      fetchProfile();
      fetchActivities();
      fetchAchievements();
      fetchConferencePublicationsList();
            fetchJournals();
      fetchPatents();
      fetchCopyrights();
      fetchGrants();
      fetchConsultancies();
    }
  }, [user?.id]);

  useEffect(() => {
    if (isAcademics && profileData?.departmentId) {
      fetchClassrooms(profileData.departmentId);
    }
  }, [isAcademics, profileData?.departmentId]);

  const fetchProfile = async () => {
    try {
      const response = await getStudentProfile(user.id);
      setProfileData(response.student);
    } catch (err) {
      console.error("Failed to load profile.", err);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.activities || []);
    } catch (err) {
      console.error("Failed to load activities.", err);
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await getAchievements();
      setAchievements(response.achievements || []);
    } catch (err) {
      console.error("Failed to load achievements.", err);
    }
  };

  const fetchClassrooms = async (deptId) => {
    try {
      const resp = await getDepartmentClassrooms(deptId);
      setClassrooms(resp.classrooms || []);
    } catch(err) {
      console.error("Failed to load classrooms.", err);
    }
  };

  const fetchConferencePublicationsList = async () => {
    try {
      const response = await getConferencePublications({ studentId: user.id });
      setConferencePublications(response.conferencePublications || []);
    } catch (err) {
      console.error("Failed to load conferences.", err);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await getProjects({ userId: user.id, role: "student" });
      setProjects(response.projects || []);
    } catch (err) {
      console.error("Failed to load projects.", err);
    }
  };

  const fetchJournals = async () => { try { const resp = await getJournalPublications({ studentId: user.id }); setJournals(resp.journalPublications || []); } catch (err) { console.error(err); } };
  const fetchPatents = async () => { try { const resp = await getPatents({ studentId: user.id }); setPatents(resp.patents || []); } catch (err) { console.error(err); } };
  const fetchCopyrights = async () => { try { const resp = await getCopyrights({ studentId: user.id }); setCopyrights(resp.copyrights || []); } catch (err) { console.error(err); } };
  const fetchGrants = async () => { try { const resp = await getGrants({ studentId: user.id }); setGrants(resp.grants || []); } catch (err) { console.error(err); } };
  const fetchConsultancies = async () => { try { const resp = await getConsultancies({ studentId: user.id }); setConsultancies(resp.consultancies || []); } catch (err) { console.error(err); } };


  const handleJoinDepartment = async (e) => {
    e.preventDefault();
    try {
      await joinDepartment({ studentId: user.id, departmentUid: departmentUidInput });
      alert("Joined department successfully!");
      fetchProfile();
    } catch(err) {
      alert(err.response?.data?.message || "Failed to join department.");
    }
  };

  const handleJoinClassByCode = async (e) => {
    e.preventDefault();
    try {
      await requestJoinClass({ studentId: user.id, classroomCode: classroomCodeInput });
      alert("Join request sent successfully!");
      fetchProfile();
      setClassroomCodeInput("");
    } catch(err) {
      alert(err.response?.data?.message || "Failed to send join request.");
    }
  };

  const handleCreateActivity = async (payload) => {
    try {
      if (editingActivity) {
        await updateActivity(editingActivity._id, payload);
      } else {
        await createActivity({
          ...payload,
          createdBy: user?.id || user?.username || user?.email,
          departmentId: profileData?.departmentId || null,
        });
      }
      setEditingActivity(null);
      await fetchActivities();
    } catch (err) {
      console.error("Failed to save activity.", err);
    }
  };

  const handleDeleteActivity = async (activity) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await deleteActivity(activity._id);
        await fetchActivities();
      } catch (err) {
        console.error("Failed to delete activity.", err);
      }
    }
  };

  const handleCreateAchievement = async (payload) => {
    try {
      if (editingAchievement) {
        await updateAchievement(editingAchievement._id, payload);
      } else {
        await createAchievement({
          ...payload,
          createdBy: user?.id || user?.username || user?.email,
          achievedByType: "Student",
          achievedBy: user?.id,
          createdById: user?.id,
          createdByModel: "Student",
          achievedByName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user?.name || user?.username || "Student",
          departmentId: profileData?.departmentId || null,
          departmentName: profileData?.departmentName || null,
          departmentUid: profileData?.departmentUid || null,
        });
      }
      setEditingAchievement(null);
      await fetchAchievements();
    } catch (err) {
      console.error("Failed to save achievement.", err);
    }
  };

  const handleDeleteAchievement = async (achievement) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await deleteAchievement(achievement._id);
        await fetchAchievements();
      } catch (err) {
        console.error("Failed to delete achievement.", err);
      }
    }
  };

  const openActivityEditModal = (activity) => {
    setEditingActivity(activity);
    setIsActivityModalOpen(true);
  };

  const openAchievementEditModal = (achievement) => {
    setEditingAchievement(achievement);
    setIsAchievementModalOpen(true);
  };

  const handleCreateConference = async (payload) => {
    try {
      const studentName = profileData ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name || "Student";
      const conferencePayload = {
        ...payload,
        studentId: user.id,
        studentName: studentName,
        createdById: user.id,
        createdByName: studentName,
        departmentId: profileData?.departmentId,
        departmentName: profileData?.departmentName,
        createdByModel: "Student",
      };
      
      if (editingConference) await updateConferencePublication(editingConference._id, conferencePayload);
      else await createConferencePublication(conferencePayload);
      setEditingConference(null);
      setIsConferenceModalOpen(false);
      fetchConferencePublicationsList();
    } catch (err) { console.error("Failed to save conference", err); }
  };

  const handleDeleteConference = async (item) => { 
    if (window.confirm("Are you sure you want to delete this conference?")) { 
      try {
        await deleteConferencePublication(item._id); 
        fetchConferencePublicationsList(); 
      } catch (err) { console.error("Failed to delete conference", err); }
    } 
  };

  const handleCreateProject = async (payload) => {
    try {
      const studentName = profileData ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name || "Student";
      const projectPayload = {
        ...payload,
        userId: user.id,
        studentName: studentName,
        createdById: user.id,
        createdByName: studentName,
        departmentId: profileData?.departmentId,
        departmentName: profileData?.departmentName,
        roleModel: "Student",
        createdByModel: "Student",
      };
      if (editingProject) await updateProject(editingProject._id, projectPayload);
      else await createProject(projectPayload);
      setEditingProject(null);
      setIsProjectModalOpen(false);
      fetchProjects();
    } catch (err) { console.error("Failed to save project", err); }
  };

  const handleDeleteProject = async (item) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(item._id);
        fetchProjects();
      } catch (err) { console.error("Failed to delete project", err); }
    }
  };

  const handleCreateJournal = async (payload) => {
    try {
      const jPayload = { ...payload, createdById: user.id, createdByName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name, studentId: user.id, studentName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name, departmentId: profileData?.departmentId, departmentName: profileData?.departmentName, createdByModel: "Student" };
      if (editingJournal) await updateJournalPublication(editingJournal._id, jPayload);
      else await createJournalPublication(jPayload);
      setEditingJournal(null); 
      setIsJournalModalOpen(false);
      fetchJournals();
    } catch (err) { console.error(err); }
  };
  const handleDeleteJournal = async (item) => { if (window.confirm("Delete journal?")) { try { await deleteJournalPublication(item._id); fetchJournals(); } catch (err) { console.error(err); } } };

  const handleCreatePatent = async (payload) => {
    try {
      const pPayload = { ...payload, createdById: user.id, createdByName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name, studentId: user.id, studentName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name, departmentId: profileData?.departmentId, departmentName: profileData?.departmentName, createdByModel: "Student" };
      if (editingPatent) await updatePatent(editingPatent._id, pPayload);
      else await createPatent(pPayload);
      setEditingPatent(null); 
      setIsPatentModalOpen(false);
      fetchPatents();
    } catch (err) { console.error(err); }
  };
  const handleDeletePatent = async (item) => { if (window.confirm("Delete patent?")) { try { await deletePatent(item._id); fetchPatents(); } catch (err) { console.error(err); } } };

  const handleCreateCopyright = async (payload) => {
    try {
      const cPayload = { ...payload, createdById: user.id, createdByName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name, studentId: user.id, studentName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name, departmentId: profileData?.departmentId, departmentName: profileData?.departmentName, createdByModel: "Student" };
      if (editingCopyright) await updateCopyright(editingCopyright._id, cPayload);
      else await createCopyright(cPayload);
      setEditingCopyright(null); 
      setIsCopyrightModalOpen(false);
      fetchCopyrights();
    } catch (err) { console.error(err); }
  };
  const handleDeleteCopyright = async (item) => { if (window.confirm("Delete copyright?")) { try { await deleteCopyright(item._id); fetchCopyrights(); } catch (err) { console.error(err); } } };

  const handleCreateGrant = async (payload) => {
    try {
      const gPayload = { ...payload, createdById: user.id, createdByName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name, studentId: user.id, studentName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name, departmentId: profileData?.departmentId, departmentName: profileData?.departmentName, createdByModel: "Student" };
      if (editingGrant) await updateGrant(editingGrant._id, gPayload);
      else await createGrant(gPayload);
      setEditingGrant(null); 
      setIsGrantModalOpen(false);
      fetchGrants();
    } catch (err) { console.error(err); }
  };
  const handleDeleteGrant = async (item) => { if (window.confirm("Delete grant?")) { try { await deleteGrant(item._id); fetchGrants(); } catch (err) { console.error(err); } } };

  const handleCreateConsultancy = async (payload) => {
    try {
      const studentName = profileData ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user.name || "Student";
      const cPayload = { 
        ...payload, 
        createdById: user.id, 
        createdByName: studentName, 
        studentId: user.id, 
        studentName: studentName, 
        departmentId: profileData?.departmentId, 
        departmentName: profileData?.departmentName, 
        createdByModel: "Student" 
      };
      if (editingConsultancy) await updateConsultancy(editingConsultancy._id, cPayload);
      else await createConsultancy(cPayload);
      setEditingConsultancy(null); 
      setIsConsultancyModalOpen(false);
      fetchConsultancies();
    } catch (err) { console.error(err); }
  };
  const handleDeleteConsultancy = async (item) => { if (window.confirm("Delete consultancy?")) { try { await deleteConsultancy(item._id); fetchConsultancies(); } catch (err) { console.error(err); } } };


  const myActivities = useMemo(() => {
    if (!user?.id) return activities;
    return activities.filter(a => a.createdBy === user?.id || a.createdBy?._id === user?.id);
  }, [activities, user]);

  const myAchievements = useMemo(() => {
    if (!user?.id) return achievements;
    return achievements.filter(a => a.createdBy === user?.id || a.createdBy?._id === user?.id || a.achievedBy === user?.id || a.achievedBy?._id === user?.id);
  }, [achievements, user]);

  const classNameStr = profileData?.className || "Not Assigned";
  const prnNumberStr = profileData?.prnNumber || "N/A";

  const stats = [
    { title: "Class Name", value: classNameStr, helper: `View your class` },
    { title: "PRN Number", value: prnNumberStr, helper: "Your university roll number" },
    { title: "Semester", value: profileData?.semester || "N/A", helper: "Current academic semester" },
    { title: "Achievements", value: myAchievements.length, helper: "Your tracked achievements", onClick: () => navigate("/student/achievements"), className: "cursor-pointer hover:shadow-lg hover:border-purple-300 transition-all" },
    { title: "Conferences", value: conferencePublications.length, helper: "Conference Papers", onClick: () => navigate("/student/conferences"), className: "cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all border-l-4 border-l-blue-500 shadow-sm" },
    { title: "Projects", value: projects.length, helper: "Academic Projects", onClick: () => navigate("/student/projects"), className: "cursor-pointer hover:shadow-lg hover:border-cyan-300 transition-all border-l-4 border-l-cyan-500 shadow-sm" },
    { title: "Journals", value: journals.length, helper: "Journal Papers", onClick: () => navigate("/student/journals"), className: "cursor-pointer hover:shadow-lg hover:border-emerald-300 transition-all border-l-4 border-l-emerald-500 shadow-sm" },
    { title: "Patents", value: patents.length, helper: "Filed Patents", onClick: () => navigate("/student/patents"), className: "cursor-pointer hover:shadow-lg hover:border-indigo-300 transition-all border-l-4 border-l-indigo-500 shadow-sm" },
    { title: "Copyrights", value: copyrights.length, helper: "Registered Copyrights", onClick: () => navigate("/student/copyrights"), className: "cursor-pointer hover:shadow-lg hover:border-orange-300 transition-all border-l-4 border-l-orange-500 shadow-sm" },
    { title: "Grants", value: grants.length, helper: "Research Grants", onClick: () => navigate("/student/grants"), className: "cursor-pointer hover:shadow-lg hover:border-green-300 transition-all border-l-4 border-l-green-500 shadow-sm" },
    { title: "Consultancies", value: consultancies.length, helper: "Professional Projects", onClick: () => navigate("/student/consultancies"), className: "cursor-pointer hover:shadow-lg hover:border-teal-300 transition-all border-l-4 border-l-teal-500 shadow-sm" }
  ];

  return (
    <DashboardLayout
      role="student"
      title={isAchievements ? "My Achievements" : isActivities ? "Extra-Curricular Activities" : isAcademics ? "Academics" : isConferences ? "Conference Publications" : isProjects ? "My Projects" : isJournals ? "Journal Publications" : isPatents ? "My Patents" : isCopyrights ? "My Copyrights" : isGrants ? "My Grants" : isConsultancies ? "Consultancy Projects" : "Student Dashboard"}
      subtitle={isAchievements ? "Add, modify or delete your achievements." : isActivities ? "Track your participations and events." : isAcademics ? "Manage your academics and class." : isConferences ? "Track your conference publications." : isProjects ? "Track your academic projects." : isJournals ? "Track your journal publications." : isPatents ? "Track your patents." : isCopyrights ? "Track your copyrights." : isGrants ? "Track your research grants." : isConsultancies ? "Track your consultancy projects." : "Track your academic details."}
      actions={isAchievements ? (
        <button
          className=" text-xs sm:text-sm px-3 sm:px-4 py-2 bg-white  text-black"
          onClick={() => { setEditingAchievement(null); setIsAchievementModalOpen(true) }}
        >
          Add Achievement
        </button>
      ) : isActivities ? (
        <button
          className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black"
          onClick={() => { setEditingActivity(null); setIsActivityModalOpen(true) }}
        >
          Add Activity
        </button>
      ) : isConferences ? (
        <button
          className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black"
          onClick={() => { setEditingConference(null); setIsConferenceModalOpen(true) }}
        >
          Add Conference Paper
        </button>
      ) : isProjects ? (
        <button
          className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black"
          onClick={() => { setEditingProject(null); setIsProjectModalOpen(true) }}
        >
          Add Project
        </button>
      ) : isJournals ? (
        <button className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black" onClick={() => { setEditingJournal(null); setIsJournalModalOpen(true) }}>Add Journal</button>
      ) : isPatents ? (
        <button className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black" onClick={() => { setEditingPatent(null); setIsPatentModalOpen(true) }}>Add Patent</button>
      ) : isCopyrights ? (
        <button className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black" onClick={() => { setEditingCopyright(null); setIsCopyrightModalOpen(true) }}>Add Copyright</button>
      ) : isGrants ? (
        <button className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black" onClick={() => { setEditingGrant(null); setIsGrantModalOpen(true) }}>Add Grant</button>
      ) : isConsultancies ? (
        <button className="bg-white text-xs sm:text-sm px-3 sm:px-4 py-2 text-black" onClick={() => { setEditingConsultancy(null); setIsConsultancyModalOpen(true) }}>Add Consultancy</button>
      ) : null}
      onLogout={() => {
        logout();
        navigate("/login");
      }}
    >
      <ActivityFormModal 
        isOpen={isActivityModalOpen} 
        onClose={() => setIsActivityModalOpen(false)} 
        onSubmit={handleCreateActivity}
        initialData={editingActivity}
      />
      <AchievementFormModal 
        isOpen={isAchievementModalOpen} 
        onClose={() => setIsAchievementModalOpen(false)} 
        onSubmit={handleCreateAchievement}
        initialData={editingAchievement}
      />
      <ConferencePublicationFormModal
        isOpen={isConferenceModalOpen}
        onClose={() => setIsConferenceModalOpen(false)}
        onSubmit={handleCreateConference}
        initialData={editingConference}
      />
      <ProjectFormModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleCreateProject}
        project={editingProject}
        role="student"
        userProfile={profileData}
      />

      <JournalPublicationFormModal isOpen={isJournalModalOpen} onClose={() => setIsJournalModalOpen(false)} onSubmit={handleCreateJournal} initialData={editingJournal} />
      <PatentFormModal isOpen={isPatentModalOpen} onClose={() => setIsPatentModalOpen(false)} onSubmit={handleCreatePatent} initialData={editingPatent} />
      <CopyrightFormModal isOpen={isCopyrightModalOpen} onClose={() => setIsCopyrightModalOpen(false)} onSubmit={handleCreateCopyright} initialData={editingCopyright} />
      <GrantFormModal isOpen={isGrantModalOpen} onClose={() => setIsGrantModalOpen(false)} onSubmit={handleCreateGrant} initialData={editingGrant} />
      <ConsultancyFormModal isOpen={isConsultancyModalOpen} onClose={() => setIsConsultancyModalOpen(false)} onSubmit={handleCreateConsultancy} initialData={editingConsultancy} />


      {isAcademics && (
        <div className="space-y-6">
          {!profileData?.departmentId ? (
            <div className="card p-8 bg-indigo-50 border-indigo-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Join a Department</h3>
              <p className="text-sm text-slate-600 mb-4">You have not joined any department yet. Enter the Unique ID (UID) provided by your department to join.</p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md" onSubmit={handleJoinDepartment}>
                <input required className="input flex-1" placeholder="Department UID" value={departmentUidInput} onChange={e => setDepartmentUidInput(e.target.value)} />
                <button type="submit" className="btn-primary whitespace-nowrap">Join Department</button>
              </form>
            </div>
          ) : (
            <div>
              <div className="card p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 border text-slate-900">
                 <h3 className="font-bold text-lg text-emerald-900 mb-1">Department: {profileData.departmentName} ({profileData.departmentUid})</h3>
                 <p className="text-sm text-emerald-700 font-medium">{profileData.collegeName}</p>
                 {profileData.className && (
                   <div className="mt-4 p-4 bg-white/80 rounded-lg border border-emerald-100 shadow-sm">
                     <h4 className="font-semibold text-slate-500 text-xs tracking-wider uppercase">Enrolled Class</h4>
                     <p className="text-indigo-700 font-bold text-xl mt-1">{profileData.className}</p>
                   </div>
                 )}
              </div>
              
              {!profileData.className && !profileData.pendingClassroomId && (
                <div className="card p-6 bg-indigo-50 border border-indigo-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Join a Classroom</h3>
                  <p className="text-sm text-slate-600 mb-4">Enter the classroom code provided by your teacher to request joining.</p>
                  <form className="flex flex-col sm:flex-row gap-4 max-w-md" onSubmit={handleJoinClassByCode}>
                    <input required className="input flex-1" placeholder="Classroom Code (e.g. A1B2C3)" value={classroomCodeInput} onChange={e => setClassroomCodeInput(e.target.value)} />
                    <button type="submit" className="btn-primary whitespace-nowrap bg-indigo-600 hover:bg-indigo-700">Send Request</button>
                  </form>
                </div>
              )}

              {!profileData.className && profileData.pendingClassroomId && (
                 <div className="card p-6 bg-orange-50 border border-orange-200">
                    <h3 className="text-lg font-bold text-orange-900 mb-2">Join Request Pending</h3>
                    <p className="text-sm text-orange-800">You have successfully requested to join a classroom. Please wait for your class teacher to approve the request.</p>
                 </div>
              )}

              <div className="mt-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Classrooms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {profileData.className && (
                          <div className="card p-6 border-2 border-emerald-500 bg-emerald-50 shadow-md">
                              <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-bold text-xl text-emerald-900">{profileData.className}</h4>
                                  <span className="px-3 py-1 bg-emerald-200 text-emerald-800 text-xs font-bold rounded-full">Current</span>
                              </div>
                              <p className="text-sm text-emerald-700">You are currently enrolled in this classroom.</p>
                          </div>
                      )}
                      
                      {profileData.pastClassrooms && profileData.pastClassrooms.map((pc, index) => (
                          <div key={index} className="card p-6 border-2 border-red-300 bg-red-50 opacity-80">
                              <div className="flex items-center justify-between mb-4">
                                  <h4 className="font-bold text-xl text-red-900">{pc.className}</h4>
                                  <span className="px-3 py-1 bg-red-200 text-red-800 text-xs font-bold rounded-full">Past</span>
                              </div>
                              <p className="text-sm text-red-700">Removed on: {new Date(pc.removedAt).toLocaleDateString()}</p>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!isAchievements && !isActivities && !isAcademics && !isConferences && !isProjects && !isJournals && !isPatents && !isCopyrights && !isGrants && !isConsultancies && (
        <>
          <div className="mb-6 rounded-2xl bg-indigo-50 p-6 border border-indigo-500">
            <h2 className="text-lg font-semibold text-slate-900">
              Welcome back, {profileData?.firstName || user?.name || "Student"}!
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Here you will find your class information and academic updates.
            </p>
          </div>

          {!profileData?.departmentId && (
            <div className="mb-6 rounded-2xl bg-orange-50 border border-orange-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
               <div>
                  <h3 className="text-lg font-bold text-orange-900">Action Required</h3>
                  <p className="text-sm text-orange-800 mt-1">You must join your appropriate department to be able to join an academic classroom.</p>
               </div>
               <button 
                  className="btn-primary whitespace-nowrap bg-orange-600 hover:bg-orange-700 shadow-sm"
                  onClick={() => navigate("/student/academics")}
               >
                 Join Department Now
               </button>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <Card key={stat.title} title={stat.title} value={stat.value} helper={stat.helper} onClick={stat.onClick} className={stat.className} />
            ))}
          </div>

           
        </>
      )}

      {isAchievements && (
        <AchievementsTable achievements={myAchievements} onEdit={openAchievementEditModal} onDelete={handleDeleteAchievement} />
      )}
      
      {isActivities && (
        <ActivitiesTable activities={myActivities} onEdit={openActivityEditModal} onDelete={handleDeleteActivity} />
      )}
      
      {isConferences && (
        <ConferencePublicationsTable 
          conferences={conferencePublications} 
          onEdit={(c) => { setEditingConference(c); setIsConferenceModalOpen(true); }} 
          onDelete={handleDeleteConference} 
        />
      )}
      {isProjects && (
        <ProjectsTable 
          projects={projects} 
          onEdit={(p) => { setEditingProject(p); setIsProjectModalOpen(true); }} 
          onDelete={handleDeleteProject} 
        />
      )}
      {isJournals && (
        <JournalPublicationsTable 
          publications={journals} 
          onEdit={(j) => { setEditingJournal(j); setIsJournalModalOpen(true); }} 
          onDelete={handleDeleteJournal} 
        />
      )}
      {isPatents && (
        <PatentsTable 
          patents={patents} 
          onEdit={(p) => { setEditingPatent(p); setIsPatentModalOpen(true); }} 
          onDelete={handleDeletePatent} 
        />
      )}
      {isCopyrights && (
        <CopyrightsTable 
          copyrights={copyrights} 
          onEdit={(c) => { setEditingCopyright(c); setIsCopyrightModalOpen(true); }} 
          onDelete={handleDeleteCopyright} 
        />
      )}
      {isGrants && (
        <GrantsTable 
          grants={grants} 
          onEdit={(g) => { setEditingGrant(g); setIsGrantModalOpen(true); }} 
          onDelete={handleDeleteGrant} 
        />
      )}
      {isConsultancies && (
        <ConsultanciesTable 
          items={consultancies} 
          onEdit={(c) => { setEditingConsultancy(c); setIsConsultancyModalOpen(true); }} 
          onDelete={handleDeleteConsultancy} 
        />
      )}
    </DashboardLayout>
  );
}



