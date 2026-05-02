import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import TeacherProfileView from "../../components/teacher/TeacherProfileView";
import PasswordChangeModal from "../../components/common/PasswordChangeModal";
import { useAuth } from "../../context/AuthContext";
import {
  getTeacherProfile,
  updateTeacherProfile,
  changeTeacherPassword,
} from "../../services/profile";
import {
  getBookPublications,
  getCommittees,
  getGrants,
  getEditorialBoards,
  getConsultancies,
  getJournalPublications,
  getConferencePublications,
  getBookChapters,
  getPatents,
  getCopyrights,
  getProjects,
} from "../../services/research";
import { getAchievements } from "../../services/achievement";
import { getActivities } from "../../services/activity";

export default function TeacherProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [contributions, setContributions] = useState({});

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await getTeacherProfile(user.id);
      setProfileData(response.teacher);
    } catch (err) {
      console.error("Failed to load profile.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.id) return;

    (async () => {
      setLoading(true);
      try {
        const [
          profileRes,
          journals,
          conferences,
          patents,
          copyrights,
          projects,
          grants,
          consultancies,
          books,
          chapters,
          committees,
          editorial,
          achievements,
          activities
        ] = await Promise.all([
          getTeacherProfile(user.id),
          getJournalPublications({ teacherId: user.id }),
          getConferencePublications({ teacherId: user.id }),
          getPatents({ teacherId: user.id }),
          getCopyrights({ teacherId: user.id }),
          getProjects({ teacherId: user.id }),
          getGrants({ teacherId: user.id }),
          getConsultancies({ teacherId: user.id }),
          getBookPublications({ teacherId: user.id }),
          getBookChapters({ teacherId: user.id }),
          getCommittees({ teacherId: user.id }),
          getEditorialBoards({ teacherId: user.id }),
          getAchievements(),
          getActivities({ teacherId: user.id })
        ]);

        setProfileData(profileRes.teacher);
        
        // Filter achievements manually if service doesn't support teacherId
        const myAchievements = achievements.achievements?.filter(a => 
          a.achievedBy?._id === user.id || a.achievedBy === user.id
        ) || [];

        setContributions({
          journals: journals.journalPublications?.length || 0,
          conferences: conferences.conferencePublications?.length || 0,
          researchPapers: (journals.journalPublications?.length || 0) + (conferences.conferencePublications?.length || 0),
          patents: patents.patents?.length || 0,
          copyrights: copyrights.copyrights?.length || 0,
          projects: projects.projects?.length || 0,
          grants: grants.grants?.length || 0,
          consultancies: consultancies.consultancies?.length || 0,
          books: (books.bookPublications?.length || 0) + (chapters.bookChapters?.length || 0),
          chapters: chapters.bookChapters?.length || 0,
          committees: committees.committees?.length || 0,
          editorial: editorial.editorialBoards?.length || 0,
          achievements: myAchievements.length,
          activities: activities.activities?.length || 0
        });
      } catch (err) {
        console.error("Failed to load profile or contributions.", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

  const handleProfileUpdate = async (payload) => {
    setLoading(true);
    try {
      await updateTeacherProfile(user.id, payload);
      await fetchProfile();
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (payload) => {
    setLoading(true);
    try {
      await changeTeacherPassword(user.id, payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      role="teacher"
      title="My Profile"
      subtitle="View and manage your profile information"
      onLogout={() => {
        logout();
        navigate("/login");
      }}
    >
      <div className="max-w-4xl">
        <TeacherProfileView
          profile={profileData}
          contributions={contributions}
          onUpdate={handleProfileUpdate}
          loading={loading}
        />

        <div className="mt-6 p-4 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-500">
          <div>
            <p className="text-sm font-medium text-slate-700">Manage Account Security</p>
            <p className="text-xs text-slate-500 mt-1">Update your password to keep your account secure</p>
          </div>
          <button
            onClick={() => setIsPasswordModalOpen(true)}
            className="btn-warning"
          >
            Change Password
          </button>
        </div>

        <PasswordChangeModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSubmit={handlePasswordChange}
          loading={loading}
        />
      </div>
    </DashboardLayout>
  );
}

