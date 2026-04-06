import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/common/DashboardLayout";
import ProfileView from "../../components/common/ProfileView";
import PasswordChangeModal from "../../components/common/PasswordChangeModal";
import { useAuth } from "../../context/AuthContext";
import {
  getTeacherProfile,
  updateTeacherProfile,
  changeTeacherPassword,
} from "../../services/profile";

export default function TeacherProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id]);

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

  const handleProfileUpdate = async (payload) => {
    setLoading(true);
    try {
      const response = await updateTeacherProfile(user.id, payload);
      setProfileData(response.teacher);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (payload) => {
    setLoading(true);
    try {
      await changeTeacherPassword(user.id, payload);
    } catch (err) {
      throw err;
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
        <ProfileView
          profile={profileData}
          role="teacher"
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
