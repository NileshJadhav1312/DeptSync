import { useState, useEffect } from "react";

export default function StudentProfileView({ profile, contributions, onUpdate, loading }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    contactNumber: "",
    alternateContactNumber: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        gender: profile.gender || "",
        username: profile.username || "",
        semester: profile.semester || "",
        prnNumber: profile.prnNumber || "",
        email: profile.email || "",
        dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split("T")[0] : "",
        contactNumber: profile.contactNumber || "",
        alternateContactNumber: profile.alternateContactNumber || "",
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
      await onUpdate(formData);
      setSuccess("Profile updated successfully!");
      setIsEditMode(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update profile.");
    }
  };

  if (!profile) {
    return <div className="text-center py-12 text-slate-500">Loading profile...</div>;
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
            Edit Student Profile
          </h3>
          <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="input mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="input mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="input mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">PRN Number</label>
              <input type="text" name="prnNumber" value={formData.prnNumber} onChange={handleInputChange} className="input mt-1" />
            </div>
           
            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input mt-1" />
            </div>
             <div>
              <label className="text-sm font-medium text-slate-700">Semester</label>
              <input type="number" name="semester" value={formData.semester} onChange={handleInputChange} className="input mt-1" />
            </div>
            <div className="">
              <label className="text-sm font-medium text-slate-700">Contact Number</label>
              <input type="number" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} className="input mt-1" />
            </div> 
             <div className="">
              <label className="text-sm font-medium text-slate-700">Alternate Contact Number</label>
              <input type="number" name="alternateContactNumber" value={formData.alternateContactNumber} onChange={handleInputChange} className="input mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="input mt-1">
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="input mt-1" />
            </div>
           
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <button onClick={() => setIsEditMode(false)} className="btn-secondary border border-slate-500 rounded-lg">Cancel</button>
            <button onClick={handleSave} className="btn-primary" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
          </div>
        </div>
      ) : (
        <div className="border border-slate-500 rounded-lg card p-6">
          <div className="flex items-center justify-between mb- border-b border-slate-500 pb-4">
            <h3 className="text-lg font-bold text-slate-900">Student Profile Information</h3>
            <button onClick={() => setIsEditMode(true)} className="btn-primary text-sm">Edit Profile</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div>
              <p className="text-sm text-slate-500">Full Name</p>
              <p className="text-lg font-medium text-slate-900">{profile.firstName} {profile.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">PRN Number</p>
              <p className="text-lg font-medium text-slate-900">{profile.prnNumber || "N/A"}</p>
            </div>
              <div>
              <p className="text-sm text-slate-500">Username</p>
              <p className="text-lg font-medium text-slate-900">{profile.username}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="text-lg font-medium text-slate-900">{profile.email}</p>
            </div>
              <div>
              <p className="text-sm text-slate-500">Gender</p>
              <p className="text-lg font-medium text-slate-900">{profile.gender}</p>
            </div>
             <div>
              <p className="text-sm text-slate-500">Date of Birth</p>
              <p className="text-lg font-medium text-slate-900">{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
            </div>
          
            <div>
              <p className="text-sm text-slate-500">Class</p>
              <p className="text-lg font-medium text-slate-900">{profile.className || "Not enrolled"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Department</p>
              <p className="text-lg font-medium text-slate-900">{profile.departmentName || "N/A"}</p>
            </div>
         
            <div>
              <p className="text-sm text-slate-500">Contact Number</p>
              <p className="text-lg font-medium text-slate-900">{profile.contactNumber || "N/A"}</p>
            </div>
              <div>
              <p className="text-sm text-slate-500">Contact Number</p>
              <p className="text-lg font-medium text-slate-900">{profile.alternateContactNumber || "N/A"}</p>
            </div>
             <div>
              <p className="text-sm text-slate-500">College</p>
              <p className="text-lg font-medium text-slate-900">{profile.collegeName || "N/A"}</p>
            </div>
          </div>
        </div>
      )}
      {/* Contributions Overview Section */}
      <div className="border border-slate-500 rounded-lg card p-6 bg-white">
        <div className="border-b border-slate-500 pb-4 mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Contributions Overview
          </h3>
          <p className="text-sm text-slate-500 mt-1">Summary of your academic research and achievements</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: "Activities", value: contributions?.activities, color: "bg-blue-50 text-blue-700 border-blue-200" },
            { label: "Research Papers", value: contributions?.researchPapers, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { label: "Achievements", value: contributions?.achievements, color: "bg-purple-50 text-purple-700 border-purple-200" },
            { label: "Patents", value: contributions?.patents, color: "bg-amber-50 text-amber-700 border-amber-200" },
            { label: "Copyrights", value: contributions?.copyrights, color: "bg-orange-50 text-orange-700 border-orange-200" },
            { label: "Projects", value: contributions?.projects, color: "bg-violet-50 text-violet-700 border-violet-200" }
          ].map((item, i) => (
            <div key={i} className={`p-2 rounded-lg border ${item.color} flex flex-col items-center justify-center text-center transition-all hover:shadow-md hover:scale-[1.02] cursor-default`}>
              <span className="text-xl font-black">{item.value || 0}</span>
              <span className="text-[9px] font-bold uppercase tracking-tight opacity-90 leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
