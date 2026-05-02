import {
  useEffect, useMemo, useState
} from "react";
import {
  useNavigate, useParams, useLocation
} from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import SectionCard from "../../components/common/SectionCard";
import TextInput from "../../components/common/TextInput";
import {
  useAuth
} from "../../context/AuthContext";
import {
  getTeacherProfile
} from "../../services/profile";
import {
  getActivities, createActivity, updateActivity, deleteActivity
} from "../../services/activity";
import {
  getAchievements, createAchievement, updateAchievement, deleteAchievement, getDepartmentAchievements, reviewAchievement
} from "../../services/achievement";
import {
  getTeacherClassrooms, createClassroom, acceptStudent, rejectStudent, removeStudent, deleteClassroom
} from "../../services/classroom";
import CreateClassroomModal from "../../components/teacher/CreateClassroomModal";
import StudentDetailsModal from "../../components/teacher/StudentDetailsModal";
import ActivityFormModal from "../../components/teacher/ActivityFormModal";
import ActivitiesTable from "../../components/teacher/ActivitiesTable";
import ApprovalsTable from "../../components/teacher/ApprovalsTable";
import AchievementFormModal from "../../components/common/AchievementFormModal";
import AchievementsTable from "../../components/common/AchievementsTable";

// New Research Components
import {
  reviewJournalPublication, reviewPatent, reviewCopyright, reviewGrant, reviewProject,
  getBookPublications, createBookPublication, updateBookPublication, deleteBookPublication,
  getGrants, createGrant, updateGrant, deleteGrant,
  getConsultancies, createConsultancy, updateConsultancy, deleteConsultancy,
  getCommittees, createCommittee, updateCommittee, deleteCommittee,
  getEditorialBoards, createEditorialBoard, updateEditorialBoard, deleteEditorialBoard,
  getJournalPublications, createJournalPublication, updateJournalPublication, deleteJournalPublication,
  getConferencePublications, createConferencePublication, updateConferencePublication, deleteConferencePublication,
  getBookChapters, createBookChapter, updateBookChapter, deleteBookChapter,
  getPatents, createPatent, updatePatent, deletePatent,
  getCopyrights, createCopyright, updateCopyright, deleteCopyright, reviewConferencePublication, reviewConsultancy
} from "../../services/research";

import BookPublicationsTable from "../../components/teacher/BookPublicationsTable";
import BookPublicationFormModal from "../../components/teacher/BookPublicationFormModal";
import {
  GrantsTable, GrantFormModal
} from "../../components/common/GrantsItems";
import {
  ConsultanciesTable, ConsultancyFormModal
} from "../../components/teacher/ConsultancyItems";
import {
  CommitteesTable, CommitteeFormModal
} from "../../components/teacher/CommitteeItems";
import {
  EditorialBoardsTable, EditorialBoardFormModal
} from "../../components/teacher/EditorialBoardItems";
import JournalPublicationsTable from "../../components/common/JournalPublicationsTable";
import JournalPublicationFormModal from "../../components/common/JournalPublicationFormModal";
import ConferencePublicationsTable from "../../components/common/ConferencePublicationsTable";
import ConferencePublicationFormModal from "../../components/common/ConferencePublicationFormModal";
import BookChaptersTable from "../../components/teacher/BookChaptersTable";
import BookChapterFormModal from "../../components/teacher/BookChapterFormModal";
import PatentsTable from "../../components/common/PatentsTable";
import PatentFormModal from "../../components/common/PatentFormModal";
import CopyrightsTable from "../../components/common/CopyrightsTable";
import CopyrightFormModal from "../../components/common/CopyrightFormModal";
import ProjectsTable from "../../components/common/ProjectsTable";
import ProjectFormModal from "../../components/common/ProjectFormModal";
import {
  getProjects, createProject, updateProject, deleteProject
} from "../../services/research";

export default function TeacherDashboard() {
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
  const [isClassroomModalOpen, setIsClassroomModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [selectedClassroomForPending, setSelectedClassroomForPending] = useState(null);
  const [classroomView, setClassroomView] = useState('students'); // 'pending' or 'students'

  const [departmentAchievements, setDepartmentAchievements] = useState([]);
  const [departmentConferences, setDepartmentConferences] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewingItem, setReviewingItem] = useState(null);
  const [reviewingType, setReviewingType] = useState(null);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState("Approved");

  // Research Modules States
  const [bookPublications, setBookPublications] = useState([]);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [grants, setGrants] = useState([]);
  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [editingGrant, setEditingGrant] = useState(null);

  const [consultancies, setConsultancies] = useState([]);
  const [isConsultancyModalOpen, setIsConsultancyModalOpen] = useState(false);
  const [editingConsultancy, setEditingConsultancy] = useState(null);

  const [committees, setCommittees] = useState([]);
  const [isCommitteeModalOpen, setIsCommitteeModalOpen] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState(null);

  const [editorialBoards, setEditorialBoards] = useState([]);
  const [researchJournals, setResearchJournals] = useState([]);
  const [researchPatents, setResearchPatents] = useState([]);
  const [researchCopyrights, setResearchCopyrights] = useState([]);
  const [researchGrants, setResearchGrants] = useState([]);
  const [researchConsultancies, setResearchConsultancies] = useState([]);
  const [researchConferences, setResearchConferences] = useState([]);
  const [projectProjects, setProjectProjects] = useState([]);
  const [isEditorialModalOpen, setIsEditorialModalOpen] = useState(false);
  const [editingEditorial, setEditingEditorial] = useState(null);

  const [journalPublications, setJournalPublications] = useState([]);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);

  const [conferencePublications, setConferencePublications] = useState([]);
  const [isConferenceModalOpen, setIsConferenceModalOpen] = useState(false);
  const [editingConference, setEditingConference] = useState(null);

  const [bookChapters, setBookChapters] = useState([]);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState(null);

  const isActivities = section === "activities";
  const isAchievements = section === "achievements";
  const isClassroom = section === "classroom";
  const isSDWApprovals = section === "sdw-approvals";
  const isResearchApprovals = section === "research-approvals";
  const isProjectApprovals = section === "project-approvals";
  const isResearchCoordinator = profileData?.designations?.includes("Research Coordinator");
  const isProjectCoordinator = profileData?.designations?.includes("Project Coordinator");

  const isBookPublications = section === "book-publications";
  const isGrants = section === "grants";
  const isConsultancies = section === "consultancies";
  const isCommittees = section === "committees";
  const isEditorialBoards = section === "editorial-boards";
  const isJournalPublications = section === "journal-publications";
  const isConferencePublications = section === "conferences";
  const isBookChapters = section === "book-chapters";
  const isPatents = section === "patents";
  const isCopyrights = section === "copyrights";
  const isProjects = section === "projects";

  const isClassTeacher = profileData?.designations?.includes("Class Teacher");
  const isSDWCoordinator = profileData?.designations?.includes("SDW Coordinator");

  const [patents, setPatents] = useState([]);
  const [isPatentModalOpen, setIsPatentModalOpen] = useState(false);
  const [editingPatent, setEditingPatent] = useState(null);

  const [copyrights, setCopyrights] = useState([]);
  const [isCopyrightModalOpen, setIsCopyrightModalOpen] = useState(false);
  const [editingCopyright, setEditingCopyright] = useState(null);

  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const location = useLocation();
  const navState = location.state || {};
  const [sdwFilter, setSdwFilter] = useState("Pending");
  const [researchFilter, setResearchFilter] = useState("Pending");
  const [projectFilter, setProjectFilter] = useState("Pending");



  const sortedClassrooms = useMemo(() => {
    return [...classrooms].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [classrooms]);


  useEffect(() => {
    if (user?.id) {
      fetchProfile();
      fetchActivities();
      fetchAchievements();
      fetchClassrooms();

      fetchAllResearchData();
    }
  }, [user?.id]);

  const fetchAllResearchData = () => {
    fetchBookPublications();
    fetchGrants();
    fetchConsultancies();
    fetchCommittees();
    fetchEditorialBoards();
    fetchJournalPublications();
    fetchConferencePublications();
    fetchBookChapters();
    fetchPatents();
    fetchCopyrights();
    fetchProjects();
  };

  useEffect(() => {
    if (isSDWApprovals && isSDWCoordinator && profileData?.departmentId) {
      fetchDepartmentAchievements();
      fetchDepartmentConferences();
    }
  }, [isSDWApprovals, isSDWCoordinator, profileData?.departmentId]);

  const fetchDepartmentAchievements = async () => {
    if (!profileData?.departmentId) return;
    try {
      const response = await getDepartmentAchievements(profileData.departmentId);
      // We only want to approve student achievements natively
      const studentAchievements = (response.achievements || []).filter(a => a.achievedByType === "Student");
      setDepartmentAchievements(studentAchievements);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isResearchApprovals && isResearchCoordinator && profileData?.departmentId) {
      fetchResearchApprovals();
    }
  }, [isResearchApprovals, isResearchCoordinator, profileData?.departmentId]);

  useEffect(() => {
    if (isProjectApprovals && isProjectCoordinator && profileData?.departmentId) {
      fetchProjectApprovals();
    }
  }, [isProjectApprovals, isProjectCoordinator, profileData?.departmentId]);

  const fetchResearchApprovals = async () => {
    if (!profileData?.departmentId) return;
    try {
      const deptId = profileData.departmentId;
      const [jRes, pRes, cRes, gRes, confRes, consRes] = await Promise.all([
        getJournalPublications({ departmentId: deptId }),
        getPatents({ departmentId: deptId }),
        getCopyrights({ departmentId: deptId }),
        getGrants({ departmentId: deptId }),
        getConferencePublications({ departmentId: deptId }),
        getConsultancies({ departmentId: deptId })
      ]);
      setResearchJournals((jRes.journalPublications || []).filter(i => i.createdByModel === "Student"));
      setResearchPatents((pRes.patents || []).filter(i => i.createdByModel === "Student"));
      setResearchCopyrights((cRes.copyrights || []).filter(i => i.createdByModel === "Student"));
      setResearchGrants((gRes.grants || []).filter(i => i.createdByModel === "Student"));
      setResearchConferences((confRes.conferencePublications || []).filter(i => i.createdByModel === "Student"));
      setResearchConsultancies((consRes.consultancies || []).filter(i => i.createdByModel === "Student"));
    } catch (err) { console.error(err); }
  };

  const fetchProjectApprovals = async () => {
    if (!profileData?.departmentId) return;
    try {
      const res = await getProjects({ departmentId: profileData.departmentId });
      setProjectProjects((res.projects || []).filter(i => i.createdByModel === "Student" || i.roleModel === "Student"));
    } catch (err) { console.error(err); }
  };

  const fetchDepartmentConferences = async () => {
    if (!profileData?.departmentId) return;
    try {
      const response = await getConferencePublications({ departmentId: profileData.departmentId });
      const studentConferences = (response.conferencePublications || []).filter(c => c.createdByModel === "Student");
      setDepartmentConferences(studentConferences);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await getTeacherProfile(user.id);
      setProfileData(response.teacher);
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

  const fetchClassrooms = async () => {
    try {
      const response = await getTeacherClassrooms(user.id);
      setClassrooms(response.classrooms || []);
    } catch (err) {
      console.error("Failed to load classrooms.", err);
    }
  };

  const fetchBookPublications = async () => {
    try {
      const response = await getBookPublications({ teacherId: user.id });
      setBookPublications(response.bookPublications || []);
    } catch (err) { console.error(err); }
  };

  const fetchGrants = async () => {
    try {
      const response = await getGrants({ teacherId: user.id });
      setGrants(response.grants || []);
    } catch (err) { console.error(err); }
  };

  const fetchConsultancies = async () => {
    try {
      const response = await getConsultancies({ teacherId: user.id });
      setConsultancies(response.consultancies || []);
    } catch (err) { console.error(err); }
  };

  const fetchCommittees = async () => {
    try {
      const response = await getCommittees({ teacherId: user.id });
      setCommittees(response.committees || []);
    } catch (err) { console.error(err); }
  };

  const fetchEditorialBoards = async () => {
    try {
      const response = await getEditorialBoards({ teacherId: user.id });
      setEditorialBoards(response.editorialBoards || []);
    } catch (err) { console.error(err); }
  };

  const fetchJournalPublications = async () => {
    try {
      const response = await getJournalPublications({ teacherId: user.id });
      setJournalPublications(response.journalPublications || []);
    } catch (err) { console.error(err); }
  };

  const fetchConferencePublications = async () => {
    try {
      const response = await getConferencePublications({ teacherId: user.id });
      setConferencePublications(response.conferencePublications || []);
    } catch (err) { console.error(err); }
  };

  const fetchBookChapters = async () => {
    try {
      const response = await getBookChapters({ teacherId: user.id });
      setBookChapters(response.bookChapters || []);
    } catch (err) { console.error(err); }
  };

  const fetchPatents = async () => {
    try {
      const response = await getPatents({ teacherId: user.id });
      setPatents(response.patents || []);
    } catch (err) { console.error(err); }
  };

  const fetchCopyrights = async () => {
    try {
      const response = await getCopyrights({ teacherId: user.id });
      setCopyrights(response.copyrights || []);
    } catch (err) { console.error(err); }
  };

  const fetchProjects = async () => {
    try {
      const response = await getProjects({ userId: user.id, role: "teacher" });
      setProjects(response.projects || []);
    } catch (err) { console.error(err); }
  };

  // Helper for adding teacher/dept info
  const withProfile = (payload) => ({
    ...payload,
    teacherId: user.id,
    teacherName: profileData ? `${profileData.firstName} ${profileData.lastName || ""}`.trim() : user.name || "Teacher",
    departmentId: profileData?.departmentId,
    departmentName: profileData?.departmentName,
  });

  const handleCreateBook = async (payload) => {
    try {
      if (editingBook) await updateBookPublication(editingBook._id, payload);
      else await createBookPublication(withProfile(payload));
      setEditingBook(null);
      fetchBookPublications();
    } catch (err) { console.error(err); }
  };

  const handleCreateGrant = async (payload) => {
    try {
      if (editingGrant) await updateGrant(editingGrant._id, payload);
      else await createGrant(withProfile(payload));
      setEditingGrant(null);
      fetchGrants();
    } catch (err) { console.error(err); }
  };

  const handleCreateConsultancy = async (payload) => {
    try {
      if (editingConsultancy) await updateConsultancy(editingConsultancy._id, payload);
      else await createConsultancy(withProfile(payload));
      setEditingConsultancy(null);
      fetchConsultancies();
    } catch (err) { console.error(err); }
  };

  const handleCreateCommittee = async (payload) => {
    try {
      if (editingCommittee) await updateCommittee(editingCommittee._id, payload);
      else await createCommittee(withProfile(payload));
      setEditingCommittee(null);
      fetchCommittees();
    } catch (err) { console.error(err); }
  };

  const handleCreateEditorial = async (payload) => {
    try {
      if (editingEditorial) await updateEditorialBoard(editingEditorial._id, payload);
      else await createEditorialBoard(withProfile(payload));
      setEditingEditorial(null);
      setIsEditorialModalOpen(false);
      fetchEditorialBoards();
    } catch (err) { console.error(err); }
  };

  const handleCreateJournal = async (payload) => {
    try {
      if (editingJournal) await updateJournalPublication(editingJournal._id, payload);
      else await createJournalPublication(withProfile(payload));
      setEditingJournal(null);
      setIsJournalModalOpen(false);
      fetchJournalPublications();
    } catch (err) { console.error(err); }
  };

  const handleCreateConference = async (payload) => {
    try {
      if (editingConference) await updateConferencePublication(editingConference._id, payload);
      else await createConferencePublication(withProfile(payload));
      setEditingConference(null);
      setIsConferenceModalOpen(false);
      fetchConferencePublications();
    } catch (err) { console.error(err); }
  };

  const handleCreateBookChapter = async (payload) => {
    try {
      if (editingChapter) await updateBookChapter(editingChapter._id, payload);
      else await createBookChapter(withProfile(payload));
      setEditingChapter(null);
      setIsBookChapterModalOpen(false);
      fetchBookChapters();
    } catch (err) { console.error(err); }
  };

  const handleCreatePatent = async (payload) => {
    try {
      if (editingPatent) await updatePatent(editingPatent._id, payload);
      else await createPatent(withProfile(payload));
      setEditingPatent(null);
      setIsPatentModalOpen(false);
      fetchPatents();
    } catch (err) { console.error(err); }
  };

  const handleCreateCopyright = async (payload) => {
    try {
      if (editingCopyright) await updateCopyright(editingCopyright._id, payload);
      else await createCopyright(withProfile(payload));
      setEditingCopyright(null);
      setIsCopyrightModalOpen(false);
      fetchCopyrights();
    } catch (err) { console.error(err); }
  };

  const handleCreateProject = async (payload) => {
    try {
      const projectPayload = {
        ...payload,
        userId: user.id,
        roleModel: "Teacher",
        departmentId: profileData?.departmentId,
        departmentName: profileData?.departmentName,
      };
      if (editingProject) await updateProject(editingProject._id, projectPayload);
      else await createProject(projectPayload);
      setEditingProject(null);
      setIsProjectModalOpen(false);
      fetchProjects();
    } catch (err) { console.error(err); }
  };

  const handleDeleteBook = async (item) => { if (window.confirm("Delete?")) { await deleteBookPublication(item._id); fetchBookPublications(); } };
  const handleDeleteGrant = async (item) => { if (window.confirm("Delete?")) { await deleteGrant(item._id); fetchGrants(); } };
  const handleDeleteConsultancy = async (item) => { if (window.confirm("Delete?")) { await deleteConsultancy(item._id); fetchConsultancies(); } };
  const handleDeleteCommittee = async (item) => { if (window.confirm("Delete?")) { await deleteCommittee(item._id); fetchCommittees(); } };
  const handleDeleteEditorial = async (item) => { if (window.confirm("Delete?")) { await deleteEditorialBoard(item._id); fetchEditorialBoards(); } };
  const handleDeleteJournal = async (item) => { if (window.confirm("Delete?")) { await deleteJournalPublication(item._id); fetchJournalPublications(); } };
  const handleDeleteConference = async (item) => { if (window.confirm("Delete?")) { await deleteConferencePublication(item._id); fetchConferencePublications(); } };
  const handleDeleteBookChapter = async (id) => {
    if (window.confirm("Delete this chapter?")) {
      await deleteBookChapter(id); fetchBookChapters();
    }
  };
  const handleDeletePatent = async (id) => {
    if (window.confirm("Delete this patent?")) {
      await deletePatent(id); fetchPatents();
    }
  };
  const handleDeleteCopyright = async (id) => {
    if (window.confirm("Delete this copyright?")) {
      await deleteCopyright(id); fetchCopyrights();
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Delete this project?")) {
      await deleteProject(id); fetchProjects();
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
          achievedByType: "Teacher",
          achievedBy: user?.id,
          achievedByName: profileData?.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : user?.name || user?.username || "Teacher",
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

  const handleCreateClassroom = async (name) => {
    try {
      if (!profileData?.departmentId) return alert("Department missing in profile");
      await createClassroom({
        name: name,
        departmentId: profileData.departmentId,
        classTeacherId: user.id
      });
      fetchClassrooms();
    } catch (err) {
      console.error(err);
      alert("Failed to create classroom");
    }
  };

  const handleAcceptStudent = async (studentId, classId) => {
    try {
      await acceptStudent({ studentId, classId });
      alert("Student enrolled!");
      fetchClassrooms();
      // Update selectedClassroom if it's the current one
      if (selectedClassroom && selectedClassroom._id === classId) {
        setSelectedClassroom(prev => ({
          ...prev,
          pendingStudents: prev.pendingStudents.filter(s => s._id !== studentId),
          enrolledStudents: [...prev.enrolledStudents, ...prev.pendingStudents.filter(s => s._id === studentId)]
        }));
      }
    } catch (err) { alert("Error enrolling student"); }
  };

  const handleRejectStudent = async (studentId, classId) => {
    try {
      await rejectStudent({ studentId, classId });
      alert("Request rejected!");
      fetchClassrooms();
      // Update selectedClassroom if it's the current one
      if (selectedClassroom && selectedClassroom._id === classId) {
        setSelectedClassroom(prev => ({
          ...prev,
          pendingStudents: prev.pendingStudents.filter(s => s._id !== studentId)
        }));
      }
    } catch (err) { alert("Error rejecting student"); }
  };

  const handleRemoveStudent = async (studentId, classId) => {
    if (window.confirm("Are you sure you want to disenroll this student?")) {
      try {
        await removeStudent({ studentId, classId });
        alert("Student disenrolled!");
        fetchClassrooms();
        // Update selectedClassroom if it's the current one
        if (selectedClassroom && selectedClassroom._id === classId) {
          setSelectedClassroom(prev => ({
            ...prev,
            enrolledStudents: prev.enrolledStudents.filter(s => s._id !== studentId)
          }));
        }
      } catch (err) { alert("Error disenrolling student"); }
    }
  };

  const handleDeleteClassroom = async (classroomId) => {
    if (window.confirm("Are you sure you want to delete this classroom? This action cannot be undone.")) {
      try {
        await deleteClassroom(classroomId);
        alert("Classroom deleted successfully!");
        fetchClassrooms();
      } catch (err) {
        alert("Error deleting classroom");
        console.error(err);
      }
    }
  };

  const submitReview = async () => {
    try {
      const reviewPayload = {
        approvalStatus: reviewStatus,
        coordinatorComment: reviewComment,
        approvedBy: user.id
      };

      if (reviewingType === 'Achievement') {
        await reviewAchievement(reviewingItem._id, reviewPayload);
        fetchDepartmentAchievements();
      } else if (reviewingType === 'Conference') {
        await reviewConferencePublication(reviewingItem._id, reviewPayload);
        fetchResearchApprovals();
      } else if (reviewingType === 'Journal') {
        await reviewJournalPublication(reviewingItem._id, reviewPayload);
        fetchResearchApprovals();
      } else if (reviewingType === 'Patent') {
        await reviewPatent(reviewingItem._id, reviewPayload);
        fetchResearchApprovals();
      } else if (reviewingType === 'Copyright') {
        await reviewCopyright(reviewingItem._id, reviewPayload);
        fetchResearchApprovals();
      } else if (reviewingType === 'Grant') {
        await reviewGrant(reviewingItem._id, reviewPayload);
        fetchResearchApprovals();
      } else if (reviewingType === 'Consultancy') {
        await reviewConsultancy(reviewingItem._id, reviewPayload);
        fetchResearchApprovals();
      } else if (reviewingType === 'Project') {
        await reviewProject(reviewingItem._id, reviewPayload);
        fetchProjectApprovals();
      }

      setReviewModalOpen(false);
      setReviewingItem(null);
      setReviewingType(null);
      setReviewComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to save review.");
    }
  }

  const openReviewModal = (item, type) => {
    setReviewingItem(item);
    setReviewingType(type);
    setReviewStatus(item.approvalStatus === "Pending" ? "Approved" : item.approvalStatus);
    setReviewComment(item.coordinatorComment || "");
    setReviewModalOpen(true);
  };

  const sdwRequests = useMemo(() => {
    return departmentAchievements.map(a => ({
      ...a,
      _type: 'Achievement',
      _studentName: a.achievedByName,
      _title: a.name,
      _date: a.date,
      _prnNumber: a.achievedBy?.prnNumber || a.prnNumber || 'N/A',
      _class: a.achievedBy?.className || a.achievedBy?.class || a.className || a.cclass || 'N/A',
      _email: a.achievedBy?.email || 'N/A',
      semester: a.semester || a.achievedBy?.semester
    })).sort((a, b) => new Date(b._date) - new Date(a._date));
  }, [departmentAchievements]);
  const researchRequests = useMemo(() => {
    const items = [
      ...researchJournals.map(i => ({ ...i, _type: 'Journal', _title: i.paperTitle, _date: i.createdAt })),
      ...researchPatents.map(i => ({ ...i, _type: 'Patent', _title: i.titleOfPatent, _date: i.createdAt })),
      ...researchCopyrights.map(i => ({ ...i, _type: 'Copyright', _title: i.workTitle, _date: i.createdAt })),
      ...researchGrants.map(i => ({ ...i, _type: 'Grant', _title: i.projectTitle, _date: i.createdAt })),
      ...researchConsultancies.map(i => ({ ...i, _type: 'Consultancy', _title: i.title, _date: i.createdAt })),
      ...researchConferences.map(i => ({ ...i, _type: 'Conference', _title: i.researchPaperTitle, _date: i.conferenceDate }))
    ];
    return items.map(i => ({
      ...i,
      _studentName: i.studentName || i.createdByName || 'N/A',
      _prnNumber: i.studentId?.prnNumber || i.prnNumber || i.identificationNumber || 'N/A',
      _class: i.studentId?.className || i.studentId?.class || i.className || i.cclass || 'N/A',
      _email: i.studentId?.email || 'N/A',
      _title: i.paperTitle || i.titleOfPatent || i.titleOfCopyright || i.workTitle || i.projectTitle || i.researchPaperTitle || i.title || i.name || 'Untitled',
      semester: i.semester || i.studentId?.semester
    })).sort((a, b) => new Date(b._date) - new Date(a._date));
  }, [researchJournals, researchPatents, researchCopyrights, researchGrants, researchConferences]);

  const projectRequests = useMemo(() => {
    return projectProjects.map(i => ({
      ...i,
      _type: 'Project',
      _title: i.title,
      _date: i.createdAt,
      _studentName: i.name || i.createdByName || 'N/A',
      _prnNumber: i.userId?.prnNumber || i.identificationNumber || i.prnNumber || 'N/A',
      _class: i.userId?.className || i.userId?.class || i.cclass || i.className || 'N/A',
      _email: i.userId?.email || 'N/A',
      _title: i.title || i.paperTitle || i.name || 'Untitled',
      semester: i.semester || i.userId?.semester
    })).sort((a, b) => new Date(b._date) - new Date(a._date));
  }, [projectProjects]);

  const pendingResearchCount = useMemo(() => {
    return researchRequests.filter(r => r.approvalStatus === "Pending").length;
  }, [researchRequests]);

  const pendingSdwCount = useMemo(() => {
    return sdwRequests.filter(r => r.approvalStatus === "Pending").length;
  }, [sdwRequests]);

  const pendingProjectCount = useMemo(() => {
    return projectRequests.filter(r => r.approvalStatus === "Pending").length;
  }, [projectRequests]);

  const approvedProjectCount = useMemo(() => {
    return projectRequests.filter(r => r.approvalStatus === "Approved").length;
  }, [projectRequests]);

  const rejectedProjectCount = useMemo(() => {
    return projectRequests.filter(r => r.approvalStatus === "Rejected").length;
  }, [projectRequests]);

  const openEditModal = (activity) => {
    setEditingActivity(activity);
    setIsActivityModalOpen(true);
  };

  const closeActivityModal = () => {
    setEditingActivity(null);
    setIsActivityModalOpen(false);
  };

  const openAchievementEditModal = (achievement) => {
    setEditingAchievement(achievement);
    setIsAchievementModalOpen(true);
  };

  const closeAchievementModal = () => {
    setEditingAchievement(null);
    setIsAchievementModalOpen(false);
  };

  const myActivities = useMemo(() => {
    if (!user?.name && !user?.username && !user?.email) return activities;
    const identifier = [user.name, user.username, user.email, profileData?.firstName, profileData?.lastName].filter(Boolean).map(s => s.toLowerCase());
    return activities.filter(a => {
      const createdBySelf = a.createdBy === user?.id || a.createdBy?._id === user?.id;
      const isCoordinator = a.coordinators?.some(c => identifier.some(id => c.toLowerCase().includes(id)));
      return createdBySelf || isCoordinator;
    });
  }, [activities, user, profileData]);

  const myAchievements = useMemo(() => {
    if (!user?.id) return achievements;
    return achievements.filter(a => a.createdBy === user?.id || a.createdBy?._id === user?.id || a.achievedBy === user?.id || a.achievedBy?._id === user?.id);
  }, [achievements, user]);

  const stats = [
    ...(isClassTeacher ? [{ title: "Class Achievements", value: "View", helper: "Track student progress", onClick: () => navigate("/teacher/classroom"), className: "cursor-pointer hover:shadow-lg hover:border-red-300 transition-all border-l-4 border-l-red-500 shadow-sm" }] : []),
    ...(isSDWCoordinator ? [{ title: "SDW Approvals", value: pendingSdwCount, helper: "Pending reviews", onClick: () => navigate("/teacher/sdw-approvals"), className: "cursor-pointer hover:shadow-lg hover:border-pink-300 transition-all border-l-4 border-pink-500 shadow-sm" }] : []),
    ...(isResearchCoordinator ? [{ title: "Research Approvals", value: pendingResearchCount, helper: "Pending reviews", onClick: () => navigate("/teacher/research-approvals"), className: "cursor-pointer hover:shadow-lg hover:border-indigo-300 transition-all border-l-4 border-indigo-500 shadow-sm" }] : []),
    ...(isProjectCoordinator ? [{ title: "Project Approvals", value: pendingProjectCount, helper: "Pending reviews", onClick: () => navigate("/teacher/project-approvals"), className: "cursor-pointer hover:shadow-lg hover:border-cyan-300 transition-all border-l-4 border-cyan-500 shadow-sm" }] : []),
    { title: "Total Activities", value: myActivities.length, helper: "Departmental Activities", onClick: () => navigate("/teacher/activities"), className: "cursor-pointer hover:shadow-lg hover:border-slate-300 transition-all border-l-4 border-l-slate-500 shadow-sm" },
    { title: "Total Achievements", value: myAchievements.length, helper: "Personal Scholarly Gains", onClick: () => navigate("/teacher/achievements"), className: "cursor-pointer hover:shadow-lg hover:border-amber-300 transition-all border-l-4 border-l-amber-500 shadow-sm" },
    { title: "Book Publications", value: bookPublications.length, helper: "Academic Books", onClick: () => navigate("/teacher/book-publications"), className: "cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all border-l-4 border-l-blue-500 shadow-sm" },
    { title: "Grants & Projects", value: grants.length, helper: "Research Funding", onClick: () => navigate("/teacher/grants"), className: "cursor-pointer hover:shadow-lg hover:border-green-300 transition-all border-l-4 border-l-green-500 shadow-sm" },
    { title: "Consultancies", value: consultancies.length, helper: "Professional Projects", onClick: () => navigate("/teacher/consultancies"), className: "cursor-pointer hover:shadow-lg hover:border-teal-300 transition-all border-l-4 border-l-teal-500 shadow-sm" },
    { title: "Committees", value: committees.length, helper: "Memberships/Roles", onClick: () => navigate("/teacher/committees"), className: "cursor-pointer hover:shadow-lg hover:border-orange-300 transition-all border-l-4 border-l-orange-500 shadow-sm" },
    { title: "Editorial Boards", value: editorialBoards.length, helper: "Journal/Board Roles", onClick: () => navigate("/teacher/editorial-boards"), className: "cursor-pointer hover:shadow-lg hover:border-purple-300 transition-all border-l-4 border-l-purple-500 shadow-sm" },
    { title: "Journal Details", value: journalPublications.length, helper: "Detailed Publications", onClick: () => navigate("/teacher/journal-publications"), className: "cursor-pointer hover:shadow-lg hover:border-emerald-300 transition-all border-l-4 border-l-emerald-500 shadow-sm" },
    { title: "Conferences", value: conferencePublications.length, helper: "Conference Papers", onClick: () => navigate("/teacher/conferences"), className: "cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all border-l-4 border-l-blue-500 shadow-sm" },
    { title: "Book Chapters", value: bookChapters.length, helper: "Chapter Publications", onClick: () => navigate("/teacher/book-chapters"), className: "cursor-pointer hover:shadow-lg hover:border-teal-300 transition-all border-l-4 border-l-teal-500 shadow-sm" },
    { title: "Patents", value: patents.length, helper: "Registered Patents", onClick: () => navigate("/teacher/patents"), className: "cursor-pointer hover:shadow-lg hover:border-yellow-300 transition-all border-l-4 border-l-yellow-500 shadow-sm" },
    { title: "Copyrights", value: copyrights.length, helper: "Registered Copyrights", onClick: () => navigate("/teacher/copyrights"), className: "cursor-pointer hover:shadow-lg hover:border-orange-300 transition-all border-l-4 border-l-orange-500 shadow-sm" },
    { title: "Projects", value: projects.length, helper: "Academic/Research Projects", onClick: () => navigate("/teacher/projects"), className: "cursor-pointer hover:shadow-lg hover:border-cyan-300 transition-all border-l-4 border-l-cyan-500 shadow-sm" },
  ];

  return (
    <DashboardLayout
      role="teacher"
      title={
        isActivities ? "Manage Activities" :
          isAchievements ? "Manage Achievements" :
            isClassroom ? "Classroom Management" :
              isSDWApprovals ? "SDW Approvals" :
                isBookPublications ? "Book Publications" :
                  isGrants ? "Research Grants" :
                    isConsultancies ? "Consultancy Projects" :
                      isCommittees ? "Committee Memberships" :
                        isEditorialBoards ? "Editorial Boards" :
                          isJournalPublications ? "Journal Details" :
                            isConferencePublications ? "Conference Publications" :
                              isBookChapters ? "Book Chapters" :
                                isPatents ? "Manage Patents" :
                                  isCopyrights ? "Manage Copyrights" :
                                    isProjects ? "Manage Projects" :
                                      "Teacher Dashboard"
      }
      subtitle={
        isActivities ? "Add, modify or delete your departmental activities." :
          isAchievements ? "Add, modify or delete your scholarly achievements." :
            isClassroom ? "Manage your class and students." :
              isSDWApprovals ? "Review student achievements from your department." :
                "Track your academic contributions and professional activities."
      }
      actions={
        isActivities ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingActivity(null); setIsActivityModalOpen(true) }}>Add Activity</button>
        ) : isAchievements ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingAchievement(null); setIsAchievementModalOpen(true) }}>Add Achievement</button>
        ) : isBookPublications ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingBook(null); setIsBookModalOpen(true) }}>Add Book</button>
        ) : isGrants ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingGrant(null); setIsGrantModalOpen(true) }}>Add Grant</button>
        ) : isConsultancies ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingConsultancy(null); setIsConsultancyModalOpen(true) }}>Add Project</button>
        ) : isCommittees ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingCommittee(null); setIsCommitteeModalOpen(true) }}>Add Membership</button>
        ) : isEditorialBoards ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingEditorial(null); setIsEditorialModalOpen(true) }}>Add Entry</button>
        ) : isJournalPublications ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingJournal(null); setIsJournalModalOpen(true) }}>Add Journal Details</button>
        ) : isConferencePublications ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingConference(null); setIsConferenceModalOpen(true) }}>Add Conference Paper</button>
        ) : isBookChapters ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingChapter(null); setIsChapterModalOpen(true) }}>Add Book Chapter</button>
        ) : isPatents ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingPatent(null); setIsPatentModalOpen(true) }}>Add Patent</button>
        ) : isCopyrights ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingCopyright(null); setIsCopyrightModalOpen(true) }}>Add Copyright</button>
        ) : isProjects ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingProject(null); setIsProjectModalOpen(true) }}>Add Project</button>
        ) : (isClassroom && isClassTeacher) ? (
          <button className="btn-primary bg-white text-black" onClick={() => setIsClassroomModalOpen(true)}>Create Classroom</button>
        ) : null
      }
      onLogout={() => {
        logout();
        navigate("/login");
      }}
    >
      <CreateClassroomModal
        isOpen={isClassroomModalOpen}
        onClose={() => setIsClassroomModalOpen(false)}
        onSubmit={handleCreateClassroom}
      />
      <StudentDetailsModal
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
        student={selectedStudent}
      />

      {/* Student List Modal */}
      {selectedClassroom && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="card w-full max-w-4xl shadow-2xl bg-white border border-slate-200 p-6 rounded-xl max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Students in {selectedClassroom.name} ({selectedClassroom.enrolledStudents.length})
              </h2>
              <button
                onClick={() => setSelectedClassroom(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              {selectedClassroom.enrolledStudents.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No students enrolled in this classroom.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold">PRN Number</th>
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Email</th>
                        <th className="px-4 py-3 font-semibold">Phone</th>
                        <th className="px-4 py-3 font-semibold">Semester</th>
                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedClassroom.enrolledStudents.map(student => (
                        <tr key={student._id} className="hover:bg-slate-50/50 transition">
                          <td className="px-4 py-3 font-medium text-slate-800">{student.prnNumber}</td>
                          <td className="px-4 py-3 font-bold text-slate-900">{student.firstName} {student.lastName}</td>
                          <td className="px-4 py-3">{student.email}</td>
                          <td className="px-4 py-3">{student.contactNumber || 'N/A'}</td>
                          <td className="px-4 py-3">{student.semester || 'N/A'}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                className="btn-secondary text-xs px-3 py-1"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setSelectedClassroom(null);
                                }}
                              >
                                View Details
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded transition-colors text-xs font-bold uppercase"
                                onClick={() => handleRemoveStudent(student._id, selectedClassroom._id)}
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="btn-secondary"
                onClick={() => setSelectedClassroom(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Requests Modal */}
      {selectedClassroomForPending && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="card w-full max-w-4xl shadow-2xl bg-white border border-slate-200 p-6 rounded-xl max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Pending Requests for {selectedClassroomForPending.name} ({selectedClassroomForPending.pendingStudents.length})
              </h2>
              <button
                onClick={() => setSelectedClassroomForPending(null)}
                className="text-slate-400 hover:text-slate-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              {selectedClassroomForPending.pendingStudents.length === 0 ? (
                <p className="text-slate-500 text-center py-8">No pending requests for this classroom.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 font-semibold">PRN Number</th>
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Email</th>
                        <th className="px-4 py-3 font-semibold">Phone</th>
                        <th className="px-4 py-3 font-semibold">Semester</th>
                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedClassroomForPending.pendingStudents.map(student => (
                        <tr key={student._id} className="hover:bg-slate-50/50 transition">
                          <td className="px-4 py-3 font-medium text-slate-800">{student.prnNumber}</td>
                          <td className="px-4 py-3 font-bold text-slate-900">{student.firstName} {student.lastName}</td>
                          <td className="px-4 py-3">{student.email}</td>
                          <td className="px-4 py-3">{student.contactNumber || 'N/A'}</td>
                          <td className="px-4 py-3">{student.semester || 'N/A'}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                className="btn-primary bg-emerald-600 hover:bg-emerald-700 text-xs px-3 py-1"
                                onClick={() => handleAcceptStudent(student._id, selectedClassroomForPending._id)}
                              >
                                Accept
                              </button>
                              <button
                                className="btn-primary bg-red-600 hover:bg-red-700 text-xs px-3 py-1"
                                onClick={() => handleRejectStudent(student._id, selectedClassroomForPending._id)}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="btn-secondary"
                onClick={() => setSelectedClassroomForPending(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ActivityFormModal
        isOpen={isActivityModalOpen}
        onClose={closeActivityModal}
        onSubmit={handleCreateActivity}
        initialData={editingActivity}
      />

      <AchievementFormModal
        isOpen={isAchievementModalOpen}
        onClose={closeAchievementModal}
        onSubmit={handleCreateAchievement}
        initialData={editingAchievement}
      />

      <BookPublicationFormModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onSubmit={handleCreateBook}
        initialData={editingBook}
      />

      <GrantFormModal
        isOpen={isGrantModalOpen}
        onClose={() => setIsGrantModalOpen(false)}
        onSubmit={handleCreateGrant}
        initialData={editingGrant}
      />

      <ConsultancyFormModal
        isOpen={isConsultancyModalOpen}
        onClose={() => setIsConsultancyModalOpen(false)}
        onSubmit={handleCreateConsultancy}
        initialData={editingConsultancy}
      />

      <CommitteeFormModal
        isOpen={isCommitteeModalOpen}
        onClose={() => setIsCommitteeModalOpen(false)}
        onSubmit={handleCreateCommittee}
        initialData={editingCommittee}
      />

      <EditorialBoardFormModal
        isOpen={isEditorialModalOpen}
        onClose={() => setIsEditorialModalOpen(false)}
        onSubmit={handleCreateEditorial}
        initialData={editingEditorial}
      />

      <JournalPublicationFormModal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        onSubmit={handleCreateJournal}
        initialData={editingJournal}
      />

      <ConferencePublicationFormModal
        isOpen={isConferenceModalOpen}
        onClose={() => setIsConferenceModalOpen(false)}
        onSubmit={handleCreateConference}
        initialData={editingConference}
      />

      <BookChapterFormModal isOpen={isChapterModalOpen} onClose={() => setIsChapterModalOpen(false)} onSubmit={(data) => { handleCreateBookChapter(data); setIsChapterModalOpen(false); }} initialData={editingChapter} />

      <PatentFormModal isOpen={isPatentModalOpen} onClose={() => setIsPatentModalOpen(false)} onSubmit={(data) => { handleCreatePatent(data); setIsPatentModalOpen(false); }} initialData={editingPatent} />
      <CopyrightFormModal isOpen={isCopyrightModalOpen} onClose={() => setIsCopyrightModalOpen(false)} onSubmit={(data) => { handleCreateCopyright(data); setIsCopyrightModalOpen(false); }} initialData={editingCopyright} />
      <ProjectFormModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} onSubmit={handleCreateProject} project={editingProject} role="teacher" userProfile={profileData} />

      {!section && (
        <>
          <div className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Welcome back, Professor!
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Update the details to keep your profile current.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4 sm:grid-cols-2">
            {stats.map((stat) => (
              <Card
                key={stat.title}
                title={stat.title}
                value={stat.value}
                helper={stat.helper}
                onClick={stat.onClick}
                className={stat.className}
              />
            ))}
          </div>
        </>
      )}

      {isActivities && (
        <ActivitiesTable
          activities={myActivities}
          onEdit={openEditModal}
          onDelete={handleDeleteActivity}
        />
      )}

      {isAchievements && (
        <AchievementsTable
          achievements={myAchievements}
          onEdit={openAchievementEditModal}
          onDelete={handleDeleteAchievement}
        />
      )}


      {isBookPublications && (
        <BookPublicationsTable books={bookPublications} onEdit={(b) => { setEditingBook(b); setIsBookModalOpen(true); }} onDelete={handleDeleteBook} />
      )}

      {isGrants && (
        <GrantsTable grants={grants} onEdit={(g) => { setEditingGrant(g); setIsGrantModalOpen(true); }} onDelete={handleDeleteGrant} />
      )}

      {isConsultancies && (
        <ConsultanciesTable items={consultancies} onEdit={(c) => { setEditingConsultancy(c); setIsConsultancyModalOpen(true); }} onDelete={handleDeleteConsultancy} />
      )}

      {isCommittees && (
        <CommitteesTable items={committees} onEdit={(c) => { setEditingCommittee(c); setIsCommitteeModalOpen(true); }} onDelete={handleDeleteCommittee} />
      )}

      {isEditorialBoards && (
        <EditorialBoardsTable items={editorialBoards} onEdit={(e) => { setEditingEditorial(e); setIsEditorialModalOpen(true); }} onDelete={handleDeleteEditorial} />
      )}

      {isJournalPublications && (
        <JournalPublicationsTable publications={journalPublications} onEdit={(j) => { setEditingJournal(j); setIsJournalModalOpen(true); }} onDelete={handleDeleteJournal} />
      )}

      {isConferencePublications && (
        <ConferencePublicationsTable conferences={conferencePublications} onEdit={(c) => { setEditingConference(c); setIsConferenceModalOpen(true); }} onDelete={handleDeleteConference} />
      )}

      {isBookChapters && (
        <div className="card p-6 border-t-4 border-teal-500">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Your Book Chapters</h3>
          <BookChaptersTable chapters={bookChapters} onEdit={(chapter) => { setEditingChapter(chapter); setIsChapterModalOpen(true); }} onDelete={handleDeleteBookChapter} />
        </div>
      )}

      {isPatents && (
        <div className="card p-6 border-t-4 border-yellow-500">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Your Patents</h3>
          <PatentsTable patents={patents} onEdit={(pt) => { setEditingPatent(pt); setIsPatentModalOpen(true); }} onDelete={handleDeletePatent} />
        </div>
      )}

      {isCopyrights && (
        <div className="card p-6 border-t-4 border-orange-500">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Your Copyrights</h3>
          <CopyrightsTable copyrights={copyrights} onEdit={(cr) => { setEditingCopyright(cr); setIsCopyrightModalOpen(true); }} onDelete={handleDeleteCopyright} />
        </div>
      )}

      {isProjects && (
        <div className="card p-6 border-t-4 border-cyan-500">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Your Projects</h3>
          <ProjectsTable projects={projects} onEdit={(p) => { setEditingProject(p); setIsProjectModalOpen(true); }} onDelete={handleDeleteProject} />
        </div>
      )}

      {isSDWApprovals && (
        <div className="space-y-6">
          {!isSDWCoordinator ? (
            <div className="card p-8 text-center border-l-4 border-red-500 bg-red-50 text-red-700">
              <h3 className="font-bold text-lg">No Access</h3>
              <p className="text-sm mt-2">You are not assigned the 'SDW Coordinator' designation to review department achievements.</p>
            </div>
          ) : (
            <ApprovalsTable
              requests={sdwRequests}
              onReview={openReviewModal}
              title="SDW Approvals"
              subtitle="Review student achievements and awards"
              filter={sdwFilter}
              setFilter={setSdwFilter}
            />
          )}
        </div>
      )}

      {isResearchApprovals && (
        <div className="space-y-6">
          {!isResearchCoordinator ? (
            <div className="card p-8 text-center border-l-4 border-red-500 bg-red-50 text-red-700">
              <h3 className="font-bold text-lg">No Access</h3>
              <p className="text-sm mt-2">You are not assigned the 'Research Coordinator' designation to review department research works.</p>
            </div>
          ) : (
            <ApprovalsTable
              requests={researchRequests}
              onReview={openReviewModal}
              title="Research Approvals"
              subtitle="Review Journals, Conferences, Patents, Copyrights, and Grants"
              filter={researchFilter}
              setFilter={setResearchFilter}
            />
          )}
        </div>
      )}

      {isProjectApprovals && (
        <div className="space-y-6">
          {!isProjectCoordinator ? (
            <div className="card p-8 text-center border-l-4 border-red-500 bg-red-50 text-red-700">
              <h3 className="font-bold text-lg">No Access</h3>
              <p className="text-sm mt-2">You are not assigned the 'Project Coordinator' designation to review department projects.</p>
            </div>
          ) : (
            <ApprovalsTable
              requests={projectRequests}
              onReview={openReviewModal}
              title="Project Approvals"
              subtitle="Review students Projects"
              filter={projectFilter}
              setFilter={setProjectFilter}
            />
          )}
        </div>
      )}

      {(reviewModalOpen && reviewingItem) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { setReviewModalOpen(false); setReviewingItem(null); setReviewingType(null); }} />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white rounded-t-3xl flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Review {reviewingType}</h2>
                <p className="text-xs text-slate-500 mt-0.5"></p>
              </div>
              <button onClick={() => { setReviewModalOpen(false); setReviewingItem(null); setReviewingType(null); }} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 scrollbar-thin space-y-8">
              {/* Student Identification Section */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg uppercase shadow-lg shadow-indigo-100">
                    {reviewingItem._studentName?.substring(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{reviewingItem._studentName}</p>
                    <p className="text-[11px] font-medium text-indigo-600 uppercase tracking-wider">{reviewingItem._prnNumber} • {reviewingItem._class} {reviewingItem.semester ? `• Sem ${reviewingItem.semester}` : ""}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{reviewingItem._email}</p>
                  </div>
                </div>
              </div>

              {/* Title Section */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Submission Title</p>
                <p className="text-xl font-black text-slate-900 leading-tight">{reviewingItem._title}</p>
              </div>

              {/* Submission Data Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 pt-2 border-t border-slate-100">
                {Object.entries(reviewingItem)
                  .filter(([key]) => !['_id', '_studentName', '_prnNumber', '_class', '_email', '_title', '_date', '_type', 'studentId', 'userId', 'achievedBy', 'departmentId', 'createdBy', 'approvedBy', 'approvalStatus', 'coordinatorComment', 'isActive', 'createdAt', 'updatedAt', '__v', 'createdById', 'createdByName', 'createdByModel', 'semester', 'currentClassroom'].includes(key))
                  .map(([key, value]) => (
                    <div key={key}>
                      <p className="text-[10px] text-slate-800 font-bold uppercase tracking-tight mb-1">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </p>
                      <p className="text-xs font-bold text-indigo-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100/50">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') :
                          (key.toLowerCase().includes('date') && value) ? new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) :
                            (Array.isArray(value) ? value.join(', ') : (value?.toString() || 'N/A'))}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Documents Section */}
              {(reviewingItem.proofDocument || reviewingItem.supportingDocuments || reviewingItem.paymentProof) && (
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-3">Supporting Documentation</p>
                  <a
                    href={reviewingItem.proofDocument || reviewingItem.supportingDocuments || reviewingItem.paymentProof}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between w-full p-4 bg-emerald-50 border border-emerald-100 rounded-2xl group hover:bg-emerald-100 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-600 text-white rounded-lg group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">View Attached Supporting File</span>
                    </div>
                    <svg className="w-5 h-5 text-emerald-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              )}

              {/* Feedback Section */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Decision & Feedback</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Approval Status</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-bold text-xs" value={reviewStatus} onChange={(e) => setReviewStatus(e.target.value)}>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Coordinator Comment (Visible to student)</label>
                    <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl h-28 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium text-sm" placeholder="Explain the reason for rejection or provide praise for approval..." value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-4 shrink-0">
              <button className="px-6 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all" onClick={() => { setReviewModalOpen(false); setReviewingItem(null); setReviewingType(null); }}>
                Cancel
              </button>
              <button className="px-8 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all" onClick={submitReview}>
                Save Decision
              </button>
            </div>
          </div>
        </div>
      )}

      {isClassroom && (
        <div className="space-y-6">
          {!isClassTeacher && classrooms.length === 0 ? (
            <div className="card p-8 text-center border-l-4 border-red-500 bg-red-50 text-red-700">
              <h3 className="font-bold text-lg">No Access</h3>
              <p className="text-sm mt-2">You are not assigned the 'Class Teacher' designation. Please contact your administrator if this is a mistake.</p>
            </div>
          ) : (
            <>
              <div className="flex gap-4 mb-6">
                <button
                  className={`btn-primary ${classroomView === 'pending' ? 'bg-blue-600' : 'bg-gray-500'}`}
                  onClick={() => setClassroomView('pending')}
                >
                  View Pending Requests
                </button>
                <button
                  className={`btn-primary ${classroomView === 'students' ? 'bg-blue-600' : 'bg-gray-500'}`}
                  onClick={() => setClassroomView('students')}
                >
                  View Student List
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedClassrooms.map(cls => (
                  <div key={cls._id} className="card p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-800">{cls.name} <span className="text-sm font-normal text-slate-500">[{cls.enrolledStudents.length} Enrolled]</span></h3>
                      <button
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded transition-colors text-sm font-bold uppercase"
                        onClick={() => handleDeleteClassroom(cls._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mb-4 inline-block bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5 shadow-sm text-sm">
                      <span className="font-semibold text-slate-600">Class Code:</span> <span className="font-bold text-indigo-700 tracking-wider ml-1">{cls.classroomCode || "N/A"}</span>
                    </div>

                    {classroomView === 'pending' && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-orange-600">Pending Requests ({cls.pendingStudents.length})</h4>
                          <button
                            className="btn-primary text-xs px-3 py-1"
                            onClick={() => setSelectedClassroomForPending(cls)}
                          >
                            View List
                          </button>
                        </div>
                        {cls.pendingStudents.length === 0 ? <p className="text-slate-500 text-sm italic">No pending requests.</p> : (
                          <div className="max-h-40 overflow-y-auto">
                            <ul className="divide-y divide-slate-100">
                              {cls.pendingStudents.slice(0, 3).map(student => (
                                <li key={student._id} className="py-2">
                                  <span className="font-medium text-slate-700 text-sm">{student.prnNumber} - {student.firstName} {student.lastName}</span>
                                </li>
                              ))}
                              {cls.pendingStudents.length > 3 && (
                                <li className="py-2 text-center">
                                  <span className="text-slate-500 text-sm">... and {cls.pendingStudents.length - 3} more</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {classroomView === 'students' && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-semibold text-green-700">Enrolled Students ({cls.enrolledStudents.length})</h4>
                          <button
                            className="btn-primary text-xs px-3 py-1"
                            onClick={() => setSelectedClassroom(cls)}
                          >
                            View List
                          </button>
                        </div>
                        {cls.enrolledStudents.length === 0 ? <p className="text-slate-500 text-sm italic">No students enrolled yet.</p> : (
                          <div className="max-h-40 overflow-y-auto">
                            <ul className="divide-y divide-slate-100">
                              {cls.enrolledStudents.slice(0, 3).map(student => (
                                <li key={student._id} className="py-2">
                                  <span className="font-medium text-slate-700 text-sm">{student.prnNumber} - {student.firstName} {student.lastName}</span>
                                </li>
                              ))}
                              {cls.enrolledStudents.length > 3 && (
                                <li className="py-2 text-center">
                                  <span className="text-slate-500 text-sm">... and {cls.enrolledStudents.length - 3} more</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}


    </DashboardLayout>
  );
}







