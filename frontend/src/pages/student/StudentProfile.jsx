import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import StudentProfileView from "../../components/student/StudentProfileView";
import PasswordChangeModal from "../../components/common/PasswordChangeModal";
import { useAuth } from "../../context/AuthContext";
import {
  getStudentProfile,
  updateStudentProfile,
  changeStudentPassword,
} from "../../services/profile";
import {
  getJournalPublications,
  getConferencePublications,
  getPatents,
  getCopyrights,
  getProjects,
} from "../../services/research";
import { getAchievements } from "../../services/achievement";
import { getActivities } from "../../services/activity";

export default function StudentProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [contributions, setContributions] = useState({});

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const [
        profileRes,
        journals,
        conferences,
        patents,
        copyrights,
        projects,
        achievements,
        activities
      ] = await Promise.all([
        getStudentProfile(user.id),
        getJournalPublications({ studentId: user.id }),
        getConferencePublications({ studentId: user.id }),
        getPatents({ studentId: user.id }),
        getCopyrights({ studentId: user.id }),
        getProjects({ studentId: user.id }),
        getAchievements(),
        getActivities({ studentId: user.id })
      ]);

      setProfileData(profileRes.student);

      // Filter achievements manually if service doesn't support studentId
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
        achievements: myAchievements.length,
        activities: activities.activities?.length || 0
      });
    } catch (err) {
      console.error("Failed to load profile or contributions.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (payload) => {
    setLoading(true);
    try {
      const response = await updateStudentProfile(user.id, payload);
      setProfileData(response.student);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (payload) => {
    setLoading(true);
    try {
      await changeStudentPassword(user.id, payload);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      role="student"
      title="My Profile"
      subtitle="View and manage your profile information"
      onLogout={() => {
        logout();
        navigate("/login");
      }}
    >
      <div className="max-w-4xl">
        <StudentProfileView
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
