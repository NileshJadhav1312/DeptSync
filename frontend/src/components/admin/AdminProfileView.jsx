import { useState, useEffect } from "react";

const DESIGNATION_OPTIONS = [
  "Associate Professor",
  "HOD",
  "SWD Coordinator",
  "Assistant Professor",
  "Clerk",
  "Junior Professor",
  "NAAC Coordinator",
  "Research Coordinator",
  "Class Teacher",
  "Other",
];

export default function AdminProfileView({ profile, onUpdate, loading }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    alternateContactNumber: "",
    employeeId: "",
    designations: [],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        gender: profile.gender || "",
        dateOfBirth: profile.dateOfBirth
          ? profile.dateOfBirth.split("T")[0]
          : "",
        contactNumber: profile.contactNumber || "",
        alternateContactNumber: profile.alternateContactNumber || "",
        employeeId: profile.employeeId || "",
        designations: profile.designations || [],
      });
      setError("");
      setSuccess("");
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDesignationToggle = (option) => {
    setFormData((prev) => {
      const current = prev.designations || [];
      if (current.includes(option)) {
        return { ...prev, designations: current.filter((i) => i !== option) };
      } else {
        return { ...prev, designations: [...current, option] };
      }
    });
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!formData.firstName || !formData.lastName || !formData.employeeId) {
      setError("First name, last name, and employee ID are required.");
      return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        contactNumber: formData.contactNumber,
        alternateContactNumber: formData.alternateContactNumber,
        employeeId: formData.employeeId,
        designations: formData.designations,
      };

      await onUpdate(payload);
      setSuccess("Profile updated successfully!");
      setIsEditMode(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update profile.");
    }
  };

  if (!profile) {
    return (
      <div className="text-center py-12 text-slate-500">Loading profile...</div>
    );
  }

  return (
    <div className="space-y-6">
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

      {isEditMode ? (
        <div className="border border-slate-500 rounded-lg card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-500 pb-4">
            Edit Admin Profile
          </h3>
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="input mt-1"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="input mt-1"
                placeholder="Last name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="input mt-1"
                placeholder="Employee ID"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Email (Read Only)</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="input mt-1 bg-slate-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Username (Read Only)</label>
              <input
                type="text"
                value={profile.username}
                disabled
                className="input mt-1 bg-slate-100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="input mt-1"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="input mt-1"
                placeholder="Contact number"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-slate-700 block mb-2">Designations</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {DESIGNATION_OPTIONS.map((option) => (
                <label key={option} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={formData.designations?.includes(option)}
                    onChange={() => handleDesignationToggle(option)}
                  />
                  <span className="text-xs">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <button
              onClick={() => setIsEditMode(false)}
              className="btn-secondary border border-slate-500 rounded-lg"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-slate-500 rounded-lg card p-6">
          <div className="flex items-center justify-between mb- border-b border-slate-500 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Admin Profile Information</h3>
            <button
              onClick={() => setIsEditMode(true)}
              className="btn-primary text-sm"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div>
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="text-lg font-medium text-slate-900">
                {profile.firstName} {profile.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Employee ID</p>
              <p className="text-lg font-medium text-slate-900">{profile.employeeId || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email / Username</p>
              <p className="text-lg font-medium text-slate-900">{profile.email} / {profile.username}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Gender</p>
              <p className="text-lg font-medium text-slate-900 capitalize">{profile.gender || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Date of Birth</p>
              <p className="text-lg font-medium text-slate-900">
                {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Contact Number</p>
              <p className="text-lg font-medium text-slate-900">{profile.contactNumber || "N/A"}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-slate-500 mb-2">Designations</p>
              <div className="flex flex-wrap gap-2">
                {profile.designations?.length > 0 ? (
                  profile.designations.map((d) => (
                    <span key={d} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded">
                      {d}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-sm italic">No designations set</span>
                )}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-slate-500">College</p>
              <p className="text-lg font-medium text-slate-900">{profile.collegeName || "N/A"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
