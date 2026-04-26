import { useEffect, useState } from "react";
import DashboardLayout from "../../components/common/DashboardLayout";
import AdminProfileView from "../../components/admin/AdminProfileView";
import PasswordChangeModal from "../../components/common/PasswordChangeModal";
import { useAuth } from "../../context/AuthContext";
import {
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} from "../../services/profile";

export default function AdminProfilePage() {
  const { user } = useAuth();
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
      const response = await getAdminProfile(user.id);
      setProfileData(response.admin);
    } catch (err) {
      console.error("Failed to load profile.", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (payload) => {
    setLoading(true);
    try {
      const response = await updateAdminProfile(user.id, payload);
      setProfileData(response.admin);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (payload) => {
    setLoading(true);
    try {
      await changeAdminPassword(user.id, payload);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      role="admin"
      title="My Profile"
      subtitle="View and manage your profile information"
    >
      <div className="max-w-4xl">
        <AdminProfileView
          profile={profileData}
          onUpdate={handleProfileUpdate}
          loading={loading}
        />

        <div className="mt-6 p-4 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-500">
          <div>
            <p className="text-sm font-medium text-slate-700">Manage Account Security</p>
            <p className="text-xs text-slate-500 mt-1">Change your password to keep your account secure</p>
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
