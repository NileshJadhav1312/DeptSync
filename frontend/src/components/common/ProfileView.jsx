import { useState, useEffect } from "react";

export default function ProfileView({ profile, role, onUpdate, loading }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    alternateContactNumber: "",
    designation: "",
    qualification: "",
    experience: "",
    specialization: "",
    post: "",
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
        designation: profile.designation || "",
        qualification: profile.qualification || "",
        experience: profile.experience || "",
        specialization: profile.specialization || "",
        post: profile.post || "",
      });
      setError("");
      setSuccess("");
    }
  }, [profile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!formData.firstName || !formData.lastName) {
      setError("First name and last name are required.");
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
      };

      if (role === "teacher") {
        payload.designation = formData.designation;
        payload.qualification = formData.qualification;
        payload.experience = formData.experience;
        payload.specialization = formData.specialization;
      } else if (role === "admin") {
        payload.post = formData.post;
      }

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
            Edit Profile
          </h3>
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                First Name
              </label>
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
              <label className="text-sm font-medium text-slate-700">
                Last Name
              </label>
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
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="input mt-1 bg-slate-100"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                type="text"
                value={profile.username}
                disabled
                className="input mt-1 bg-slate-100"
                placeholder="Username"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Gender
              </label>
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
              <label className="text-sm font-medium text-slate-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="input mt-1"
                placeholder="Contact number"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Alternate Contact
              </label>
              <input
                type="tel"
                name="alternateContactNumber"
                value={formData.alternateContactNumber}
                onChange={handleInputChange}
                className="input mt-1"
                placeholder="Alternate contact"
              />
            </div>

            {role === "teacher" && (
              <>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Designation(s) - Read Only
                  </label>
                  <p className="input mt-1 bg-slate-100 flex items-center">{profile.designations?.length > 0 ? profile.designations.join(", ") : "No designations assigned"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Qualification
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="input mt-1"
                    placeholder="Qualification"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="input mt-1"
                    placeholder="Years of experience"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="input mt-1"
                    placeholder="Specialization"
                  />
                </div>
              </>
            )}

            {role === "admin" && (
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Post
                </label>
                <input
                  type="text"
                  name="post"
                  value={formData.post}
                  onChange={handleInputChange}
                  className="input mt-1"
                  placeholder="Post"
                />
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <button
              onClick={() => setIsEditMode(false)}
              className="btn-secondary border border-slate-500 rounded-lg "
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
        <div className="border border-slate-500 rounded-lg card p-6 ">
          <div className="flex items-center justify-between mb- border-b border-slate-500 pb-4">
            <h3 className="text-lg font-bold text-slate-900 ">
              Profile Information
            </h3>
            <button
              onClick={() => setIsEditMode(true)}
              className="btn-primary text-sm"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div>
              <p className="text-sm text-slate-500">First Name</p>
              <p className="text-lg font-medium text-slate-900">
                {profile.firstName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Last Name</p>
              <p className="text-lg font-medium text-slate-900">
                {profile.lastName || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="text-lg font-medium text-slate-900">
                {profile.email || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Username</p>
              <p className="text-lg font-medium text-slate-900">
                {profile.username || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Gender</p>
              <p className="text-lg font-medium text-slate-900 capitalize">
                {profile.gender || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Date of Birth</p>
              <p className="text-lg font-medium text-slate-900">
                {profile.dateOfBirth
                  ? new Date(profile.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Contact Number</p>
              <p className="text-lg font-medium text-slate-900">
                {profile.contactNumber || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Alternate Contact</p>
              <p className="text-lg font-medium text-slate-900">
                {profile.alternateContactNumber || "N/A"}
              </p>
            </div>

            {role === "teacher" && (
              <>
                <div>
                  <p className="text-sm text-slate-500">Designation(s)</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.designations?.length > 0 ? (
                      profile.designations.map(d => (
                        <span key={d} className="px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded">{d}</span>
                      ))
                    ) : (
                      <span className="text-sm font-medium text-slate-500">None assigned</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Qualification</p>
                  <p className="text-lg font-medium text-slate-900">
                    {profile.qualification || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Experience</p>
                  <p className="text-lg font-medium text-slate-900">
                    {profile.experience ? `${profile.experience} years` : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Specialization</p>
                  <p className="text-lg font-medium text-slate-900">
                    {profile.specialization || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Department</p>
                  <p className="text-lg font-medium text-slate-900">
                    {profile.departmentName || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">College</p>
                  <p className="text-lg font-medium text-slate-900">
                    {profile.collegeName || "N/A"}
                  </p>
                </div>
                
              </>
            )}

            {role === "admin" && (
              <>
                <div>
                  <p className="text-sm text-slate-500">Post</p>
                  <p className="text-lg font-medium text-slate-900">
                    {profile.post || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">College</p>
                  <p className="text-lg font-medium text-slate-900">
                    {profile.collegeName || "N/A"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
