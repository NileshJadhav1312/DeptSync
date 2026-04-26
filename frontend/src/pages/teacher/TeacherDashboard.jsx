import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import Card from "../../components/common/Card";
import Table from "../../components/common/Table";
import SectionCard from "../../components/common/SectionCard";
import TextInput from "../../components/common/TextInput";
import { useAuth } from "../../context/AuthContext";
import { getTeacherProfile } from "../../services/profile";
import { getActivities, createActivity, updateActivity, deleteActivity } from "../../services/activity";
import { getAchievements, createAchievement, updateAchievement, deleteAchievement, getDepartmentAchievements, reviewAchievement } from "../../services/achievement";
import { getTeacherClassrooms, createClassroom, acceptStudent, rejectStudent, removeStudent } from "../../services/classroom";
import CreateClassroomModal from "../../components/teacher/CreateClassroomModal";
import StudentDetailsModal from "../../components/teacher/StudentDetailsModal";
import ActivityFormModal from "../../components/teacher/ActivityFormModal";
import ActivitiesTable from "../../components/teacher/ActivitiesTable";
import AchievementFormModal from "../../components/teacher/TeacherAchievementFormModal";
import AchievementsTable from "../../components/teacher/TeacherAchievementsTable";

// New Research Components
import {
  getResearchPapers, createResearchPaper, updateResearchPaper, deleteResearchPaper,
  getBookPublications, createBookPublication, updateBookPublication, deleteBookPublication,
  getGrants, createGrant, updateGrant, deleteGrant,
  getConsultancies, createConsultancy, updateConsultancy, deleteConsultancy,
  getCommittees, createCommittee, updateCommittee, deleteCommittee,
  getEditorialBoards, createEditorialBoard, updateEditorialBoard, deleteEditorialBoard,
  getJournalPublications, createJournalPublication, updateJournalPublication, deleteJournalPublication,
  getConferencePublications, createConferencePublication, updateConferencePublication, deleteConferencePublication,
  getBookChapters, createBookChapter, updateBookChapter, deleteBookChapter,
  getPatents, createPatent, updatePatent, deletePatent,
  getCopyrights, createCopyright, updateCopyright, deleteCopyright, reviewConferencePublication
} from "../../services/research";

import ResearchPapersTable from "../../components/teacher/ResearchPapersTable";
import ResearchPaperFormModal from "../../components/teacher/ResearchPaperFormModal";
import BookPublicationsTable from "../../components/teacher/BookPublicationsTable";
import BookPublicationFormModal from "../../components/teacher/BookPublicationFormModal";
import { GrantsTable, GrantFormModal } from "../../components/teacher/GrantsItems";
import { ConsultanciesTable, ConsultancyFormModal } from "../../components/teacher/ConsultancyItems";
import { CommitteesTable, CommitteeFormModal } from "../../components/teacher/CommitteeItems";
import { EditorialBoardsTable, EditorialBoardFormModal } from "../../components/teacher/EditorialBoardItems";
import JournalPublicationsTable from "../../components/teacher/JournalPublicationsTable";
import JournalPublicationFormModal from "../../components/teacher/JournalPublicationFormModal";
import ConferencePublicationsTable from "../../components/teacher/ConferencePublicationsTable";
import ConferencePublicationFormModal from "../../components/teacher/ConferencePublicationFormModal";
import BookChaptersTable from "../../components/teacher/BookChaptersTable";
import BookChapterFormModal from "../../components/teacher/BookChapterFormModal";
import PatentsTable from "../../components/teacher/PatentsTable";
import PatentFormModal from "../../components/teacher/PatentFormModal";
import CopyrightsTable from "../../components/teacher/CopyrightsTable";
import CopyrightFormModal from "../../components/teacher/CopyrightFormModal";

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

  const [departmentAchievements, setDepartmentAchievements] = useState([]);
  const [departmentConferences, setDepartmentConferences] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewingAchievement, setReviewingAchievement] = useState(null);
  const [reviewingConference, setReviewingConference] = useState(null);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewStatus, setReviewStatus] = useState("Approved");

  // Research Modules States
  const [researchPapers, setResearchPapers] = useState([]);
  const [isPaperModalOpen, setIsPaperModalOpen] = useState(false);
  const [editingPaper, setEditingPaper] = useState(null);

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

  const [patents, setPatents] = useState([]);
  const [isPatentModalOpen, setIsPatentModalOpen] = useState(false);
  const [editingPatent, setEditingPatent] = useState(null);

  const [copyrights, setCopyrights] = useState([]);
  const [isCopyrightModalOpen, setIsCopyrightModalOpen] = useState(false);
  const [editingCopyright, setEditingCopyright] = useState(null);

  const isActivities = section === "activities";
  const isAchievements = section === "achievements";
  const isClassroom = section === "classroom";
  const isSWDApprovals = section === "swd-approvals";

  const isResearchPapers = section === "research-papers";
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

  const isClassTeacher = profileData?.designations?.includes("Class Teacher") || classrooms.length > 0;
  const isSWDCoordinator = profileData?.designations?.includes("SWD Coordinator");

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
    fetchResearchPapers();
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
  };

  useEffect(() => {
    if (isSWDApprovals && isSWDCoordinator && profileData?.departmentId) {
      fetchDepartmentAchievements();
      fetchDepartmentConferences();
    }
  }, [isSWDApprovals, isSWDCoordinator, profileData?.departmentId]);

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

  const fetchResearchPapers = async () => {
    try {
      const response = await getResearchPapers({ teacherId: user.id });
      setResearchPapers(response.researchPapers || []);
    } catch (err) { console.error(err); }
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

  // Helper for adding teacher/dept info
  const withProfile = (payload) => ({
    ...payload,
    teacherId: user.id,
    teacherName: profileData ? `${profileData.firstName} ${profileData.lastName || ""}`.trim() : user.name || "Teacher",
    departmentId: profileData?.departmentId,
    departmentName: profileData?.departmentName,
  });

  const handleCreatePaper = async (payload) => {
    try {
      if (editingPaper) await updateResearchPaper(editingPaper._id, payload);
      else await createResearchPaper(withProfile(payload));
      setEditingPaper(null);
      fetchResearchPapers();
    } catch (err) { console.error(err); }
  };

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
      fetchEditorialBoards();
    } catch (err) { console.error(err); }
  };

  const handleCreateJournal = async (payload) => {
    try {
      if (editingJournal) await updateJournalPublication(editingJournal._id, payload);
      else await createJournalPublication(withProfile(payload));
      setEditingJournal(null);
      fetchJournalPublications();
    } catch (err) { console.error(err); }
  };

  const handleCreateConference = async (payload) => {
    try {
      if (editingConference) await updateConferencePublication(editingConference._id, payload);
      else await createConferencePublication(withProfile(payload));
      setEditingConference(null);
      fetchConferencePublications();
    } catch (err) { console.error(err); }
  };

  const handleCreateBookChapter = async (payload) => {
    try {
      if (editingChapter) await updateBookChapter(editingChapter._id, payload);
      else await createBookChapter(withProfile(payload));
      setEditingChapter(null);
      fetchBookChapters();
    } catch (err) { console.error(err); }
  };

  const handleCreatePatent = async (payload) => {
    try {
      if (editingPatent) await updatePatent(editingPatent._id, payload);
      else await createPatent(withProfile(payload));
      setEditingPatent(null);
      fetchPatents();
    } catch (err) { console.error(err); }
  };

  const handleCreateCopyright = async (payload) => {
    try {
      if (editingCopyright) await updateCopyright(editingCopyright._id, payload);
      else await createCopyright(withProfile(payload));
      setEditingCopyright(null);
      fetchCopyrights();
    } catch (err) { console.error(err); }
  };

  const handleDeletePaper = async (item) => { if (window.confirm("Delete?")) { await deleteResearchPaper(item._id); fetchResearchPapers(); } };
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
    } catch (err) { alert("Error enrolling student"); }
  };

  const handleRejectStudent = async (studentId, classId) => {
    try {
      await rejectStudent({ studentId, classId });
      alert("Request rejected!");
      fetchClassrooms();
    } catch (err) { alert("Error rejecting student"); }
  };

  const handleRemoveStudent = async (studentId, classId) => {
    if (window.confirm("Are you sure you want to disenroll this student?")) {
      try {
        await removeStudent({ studentId, classId });
        alert("Student disenrolled!");
        fetchClassrooms();
      } catch (err) { alert("Error disenrolling student"); }
    }
  };

  const submitReview = async () => {
    try {
      if (reviewingAchievement) {
        await reviewAchievement(reviewingAchievement._id, {
          approvalStatus: reviewStatus,
          coordinatorComment: reviewComment,
          approvedBy: user.id
        });
        fetchDepartmentAchievements();
      } else if (reviewingConference) {
        await reviewConferencePublication(reviewingConference._id, {
          approvalStatus: reviewStatus,
          coordinatorComment: reviewComment,
          approvedBy: user.id
        });
        fetchDepartmentConferences();
      }
      setReviewModalOpen(false);
      setReviewingAchievement(null);
      setReviewingConference(null);
      setReviewComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to save review.");
    }
  }

  const openReviewModal = (item, type) => {
    if (type === "achievement") {
      setReviewingAchievement(item);
      setReviewingConference(null);
    } else {
      setReviewingConference(item);
      setReviewingAchievement(null);
    }
    setReviewStatus(item.approvalStatus === "Pending" ? "Approved" : item.approvalStatus);
    setReviewComment(item.coordinatorComment || "");
    setReviewModalOpen(true);
  }

  const unifiedRequests = useMemo(() => {
    const achs = departmentAchievements.map(a => ({
      ...a,
      _type: "Achievement",
      _studentName: a.achievedByName,
      _title: a.name,
      _date: a.date,
      _level: a.level,
      _prn: a.achievedBy?.prnNumber || a.prnNumber || "N/A",
      _class: a.achievedBy?.className || a.className || "N/A",
    }));

    const confs = departmentConferences.map(c => ({
      ...c,
      _type: "Conference",
      _studentName: c.studentName,
      _title: c.researchPaperTitle,
      _date: c.conferenceDate,
      _level: c.conferenceLevel,
      _prn: c.studentId?.prnNumber || "N/A",
      _class: c.studentId?.className || "N/A"
    }));

    return [...achs, ...confs].sort((a, b) => new Date(b._date) - new Date(a._date));
  }, [departmentAchievements, departmentConferences]);

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
    ...(isSWDCoordinator ? [{ title: "SWD Approvals", value: departmentAchievements.length, helper: "Pending reviews", onClick: () => navigate("/teacher/swd-approvals"), className: "cursor-pointer hover:shadow-lg hover:border-pink-300 transition-all border-l-4 border-pink-500 shadow-sm" }] : []),
    { title: "Total Activities", value: myActivities.length, helper: "Departmental Activities", onClick: () => navigate("/teacher/activities"), className: "cursor-pointer hover:shadow-lg hover:border-slate-300 transition-all border-l-4 border-l-slate-500 shadow-sm" },
    { title: "Total Achievements", value: myAchievements.length, helper: "Personal Scholarly Gains", onClick: () => navigate("/teacher/achievements"), className: "cursor-pointer hover:shadow-lg hover:border-amber-300 transition-all border-l-4 border-l-amber-500 shadow-sm" },
    { title: "Research Papers", value: researchPapers.length, helper: "Published/Accepted", onClick: () => navigate("/teacher/research-papers"), className: "cursor-pointer hover:shadow-lg hover:border-indigo-300 transition-all border-l-4 border-l-indigo-500 shadow-sm" },
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
  ];

  return (
    <DashboardLayout
      role="teacher"
      title={
        isActivities ? "Manage Activities" :
          isAchievements ? "Manage Achievements" :
            isClassroom ? "Classroom Management" :
              isSWDApprovals ? "SWD Approvals" :
                isResearchPapers ? "Research Papers" :
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
                                      "Teacher Dashboard"
      }
      subtitle={
        isActivities ? "Add, modify or delete your departmental activities." :
          isAchievements ? "Add, modify or delete your scholarly achievements." :
            isClassroom ? "Manage your class and students." :
              isSWDApprovals ? "Review student achievements from your department." :
                "Track your academic contributions and professional activities."
      }
      actions={
        isActivities ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingActivity(null); setIsActivityModalOpen(true) }}>Add Activity</button>
        ) : isAchievements ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingAchievement(null); setIsAchievementModalOpen(true) }}>Add Achievement</button>
        ) : isResearchPapers ? (
          <button className="btn-primary bg-white text-black" onClick={() => { setEditingPaper(null); setIsPaperModalOpen(true) }}>Add Paper</button>
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

      <ResearchPaperFormModal
        isOpen={isPaperModalOpen}
        onClose={() => setIsPaperModalOpen(false)}
        onSubmit={handleCreatePaper}
        initialData={editingPaper}
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

      {isResearchPapers && (
        <ResearchPapersTable papers={researchPapers} onEdit={(p) => { setEditingPaper(p); setIsPaperModalOpen(true); }} onDelete={handleDeletePaper} />
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

      {isSWDApprovals && (
        <div className="space-y-6">
          {!isSWDCoordinator ? (
            <div className="card p-8 text-center border-l-4 border-red-500 bg-red-50 text-red-700">
              <h3 className="font-bold text-lg">No Access</h3>
              <p className="text-sm mt-2">You are not assigned the 'SWD Coordinator' designation to review department achievements.</p>
            </div>
          ) : (
            <>
              {(reviewModalOpen && (reviewingAchievement || reviewingConference)) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                  <div className="card w-full max-w-lg shadow-2xl bg-white border border-slate-200 p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-slate-900">Review Student {reviewingAchievement ? "Achievement" : "Conference"}</h2>
                      <button onClick={() => { setReviewModalOpen(false); setReviewingAchievement(null); setReviewingConference(null); }} className="text-slate-400 hover:text-slate-600">✕</button>
                    </div>

                    <div className="mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Student Name</p>
                          <p className="text-sm font-bold text-slate-800">{reviewingAchievement ? reviewingAchievement.achievedByName : reviewingConference.studentName}</p>
                        </div>
                        {reviewingAchievement && reviewingAchievement.achievedBy && (
                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">PRN / Class</p>
                            <p className="text-xs font-bold text-indigo-600">{reviewingAchievement.achievedBy.prnNumber || "N/A"} | {reviewingAchievement.achievedBy.className || "N/A"}</p>
                          </div>
                        )}
                        {reviewingConference && reviewingConference.studentId && (
                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">PRN / Class</p>
                            <p className="text-xs font-bold text-indigo-600">{reviewingConference.studentId.prnNumber || "N/A"} | {reviewingConference.studentId.className || "N/A"}</p>
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-3">Title</p>
                      <p className="text-lg font-bold text-slate-900 mt-0.5">{reviewingAchievement ? reviewingAchievement.name : reviewingConference.researchPaperTitle}</p>
                      <div className="flex gap-2 mt-2">
                        {reviewingAchievement && (
                          <>
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase">{reviewingAchievement.level}</span>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{reviewingAchievement.category}</span>
                          </>
                        )}
                        {reviewingConference && (
                          <>
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold uppercase">{reviewingConference.conferenceLevel}</span>
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{reviewingConference.conferenceName}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-medium text-slate-700">
                        Approval Status
                        <select className="input mt-1 w-full" value={reviewStatus} onChange={(e) => setReviewStatus(e.target.value)}>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </label>
                      <label className="block text-sm font-medium text-slate-700">
                        Coordinator Comment (Visible to student)
                        <textarea className="input mt-1 w-full h-24" placeholder="Enter feedback or praise..." value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} />
                      </label>
                    </div>

                    <div className="mt-6 flex gap-3 justify-end">
                      <button className="btn-secondary" onClick={() => setReviewModalOpen(false)}>Cancel</button>
                      <button className="btn-primary" onClick={submitReview}>Save Review</button>
                    </div>
                  </div>
                </div>
              )}

              <h3 className="font-bold text-lg text-slate-800 mt-8 mb-4"></h3>
              <div className="overflow-x-auto card">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold">PRN</th>
                      <th className="px-6 py-4 font-semibold">Student Name</th>
                      <th className="px-6 py-4 font-semibold">Type</th>
                      <th className="px-6 py-4 font-semibold">Title</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {unifiedRequests.length === 0 ? (
                      <tr><td colSpan="7" className="px-6 py-8 text-center">No pending requests found for your department.</td></tr>
                    ) : unifiedRequests.map((req, idx) => (
                      <tr key={`${req._type}-${req._id || idx}`} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 font-medium text-slate-500">{req._prn}</td>
                        <td className="px-6 py-4 font-bold text-slate-900">{req._studentName}</td>
                        <td className="px-6 py-4 font-medium text-indigo-500 uppercase">{req._type}</td>
                        <td className="px-6 py-4 text-slate-700 font-medium">{req._title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{new Date(req._date).toLocaleDateString()}</td>
                        <td className="px-6 py-4"  >
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${req.approvalStatus === 'Approved' ? 'bg-green-100 text-green-700' :
                              req.approvalStatus === 'Rejected' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                            }`}>
                            {req.approvalStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => openReviewModal(req, req._type === "Achievement" ? "achievement" : "conference")} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Review</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
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


              {classrooms.map(cls => (
                <div key={cls._id} className="card p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{cls.name} <span className="text-sm font-normal text-slate-500">[{cls.enrolledStudents.length} Enrolled]</span></h3>
                  <div className="mb-4 inline-block bg-indigo-50 border border-indigo-100 rounded-lg px-3 py-1.5 shadow-sm text-sm">
                    <span className="font-semibold text-slate-600">Class Code:</span> <span className="font-bold text-indigo-700 tracking-wider ml-1">{cls.classroomCode || "N/A"}</span>
                  </div>

                  {cls.pendingStudents.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-orange-600 mb-2">Pending Requests ({cls.pendingStudents.length})</h4>
                      <ul className="divide-y divide-slate-100 border border-slate-100 rounded bg-slate-50">
                        {cls.pendingStudents.map(student => (
                          <li key={student._id} className="p-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                            <span className="font-medium text-slate-700">{student.prnNumber} - {student.firstName} {student.lastName}</span>
                            <div className="flex gap-2">
                              <button className="btn-primary bg-emerald-600 hover:bg-emerald-700 text-[10px] w-auto px-3 py-1" onClick={() => handleAcceptStudent(student._id, cls._id)}>Accept</button>
                              <button className="btn-primary bg-red-600 hover:bg-red-700 text-[10px] w-auto px-3 py-1" onClick={() => handleRejectStudent(student._id, cls._id)}>Reject</button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-green-700 mb-4 mt-6">Enrolled Students</h4>
                    {cls.enrolledStudents.length === 0 ? <p className="text-slate-500 text-sm italic">No students enrolled yet.</p> : (
                      <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="w-full text-left text-sm text-slate-600">
                          <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-3 font-semibold">PRN Number</th>
                              <th className="px-4 py-3 font-semibold">Student Name</th>
                              <th className="px-4 py-3 font-semibold">Email</th>
                              <th className="px-4 py-3 font-semibold text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {cls.enrolledStudents.map(student => (
                              <tr key={student._id} className="hover:bg-slate-50/50 transition">
                                <td className="px-4 py-3 font-medium text-slate-800">{student.prnNumber}</td>
                                <td className="px-4 py-3 font-bold text-slate-900">{student.firstName} {student.lastName}</td>
                                <td className="px-4 py-3">{student.email}</td>
                                <td className="px-4 py-3 text-right">
                                  <div className="flex justify-end gap-2">
                                    <button className="btn-secondary text-[10px] uppercase font-bold px-2 py-1" onClick={() => setSelectedStudent(student)}>View Details</button>
                                    <button className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors text-[10px] font-bold uppercase" onClick={() => handleRemoveStudent(student._id, cls._id)}>Disenroll</button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}


    </DashboardLayout>
  );
}
