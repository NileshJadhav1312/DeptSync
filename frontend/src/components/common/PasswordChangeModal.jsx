import { useState } from "react";

export default function PasswordChangeModal({ isOpen, onClose, onSubmit, loading }) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError("All password fields are required.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New password and confirm password must match.");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    try {
      await onSubmit(passwordData);
      setSuccess("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to change password.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-gray-100 rounded-lg max-w-md w-full border border-slate-500 rounded-lg shadow-lg">
        {/* Header */}
        <div className="border-b border-slate-500 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-black">Change Password</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-black">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="input mt-1"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-black">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="input mt-1"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-black">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="input mt-1"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-500 p-6 flex gap-3 justify-end">
          <button onClick={onClose} className="btn-secondary border border-slate-500" disabled={loading}>
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
