import { useState } from "react";

const DESIGNATION_OPTIONS = [
  "Associate Professor",
  "HOD",
  "SDW Coordinator",
  "Assistant Professor",
  "Clerk",
  "Junior Professor",
  "NAAC Coordinator",
  "Research Coordinator",
  "Project Coordinator",
  "Class Teacher",
  "Other",
];

const createInitialFormData = () => ({
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  joinDate: "",
  profilePicture: "",
  contactNumber: "",
  alternateContactNumber: "",
  email: "",
  username: "",
  employeeId: "",
  panNumber: "",
  aadharNumber: "",
  designations: [],
  highestQualification: "",
  qualification: "",
  specialization: "",
  experienceYears: 0,
  experienceMonths: 0,
  industryExperienceYears: 0,
  industryExperienceMonths: 0,
  totalExperienceYears: 0,
  totalExperienceMonths: 0,
  departmentId: "",
  departmentName: "",
  departmentUid: "",
  collegeName: "",
  createdByName: "",
  role: "Teacher",
  isActive: true,
});

const buildFormData = (profile) => ({
  firstName: profile?.firstName || "",
  lastName: profile?.lastName || "",
  gender: profile?.gender || "",
  dateOfBirth: formatDateForInput(profile?.dateOfBirth),
  joinDate: formatDateForInput(profile?.joinDate),
  profilePicture: profile?.profilePicture || "",
  contactNumber: profile?.contactNumber || "",
  alternateContactNumber: profile?.alternateContactNumber || "",
  email: profile?.email || "",
  username: profile?.username || "",
  employeeId: profile?.employeeId || "",
  panNumber: profile?.panNumber || "",
  aadharNumber: profile?.aadharNumber || "",
  designations: Array.isArray(profile?.designations) ? profile.designations : [],
  highestQualification: profile?.highestQualification || "",
  qualification: profile?.qualification || "",
  specialization: profile?.specialization || "",
  experienceYears: profile?.experienceYears || 0,
  experienceMonths: profile?.experienceMonths || 0,
  industryExperienceYears: profile?.industryExperienceYears || 0,
  industryExperienceMonths: profile?.industryExperienceMonths || 0,
  totalExperienceYears: profile?.totalExperienceYears || 0,
  totalExperienceMonths: profile?.totalExperienceMonths || 0,
  departmentId: profile?.departmentId?._id || profile?.departmentId || "",
  departmentName: profile?.departmentName || "",
  departmentUid: profile?.departmentUid || "",
  collegeName: profile?.collegeName || "",
  createdByName: profile?.createdByName || "",
  role: profile?.role || "Teacher",
  isActive: profile?.isActive ?? true,
});

const formatDateForInput = (value) =>
  value ? new Date(value).toISOString().split("T")[0] : "";

const formatDateForDisplay = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatExperience = (years, months) => {
  const safeYears = Number(years) || 0;
  const safeMonths = Number(months) || 0;
  if (safeYears === 0 && safeMonths === 0) return "N/A";
  return `${safeYears} year${safeYears === 1 ? "" : "s"} ${safeMonths} month${safeMonths === 1 ? "" : "s"}`;
};

function Field({ label, value }) {
  return (
    <div className="border border-slate-200 bg-slate-50 rounded-lg p-4">
      <p className="text-sm text-slate-500 ">{label}</p>
      <p className="text-base font-medium text-slate-900 break-words">
        {value || "N/A"}
      </p>
    </div>
  );
}

export default function TeacherProfileView({ profile, contributions, onUpdate, loading }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState(
    profile ? buildFormData(profile) : createInitialFormData(),
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!formData.firstName || !formData.email || !formData.employeeId) {
      setError("First name, email, and employee ID are required.");
      return;
    }

    try {
      const payload = {
        ...formData,
        experienceYears: Number(formData.experienceYears) || 0,
        experienceMonths: Number(formData.experienceMonths) || 0,
        industryExperienceYears: Number(formData.industryExperienceYears) || 0,
        industryExperienceMonths:
          Number(formData.industryExperienceMonths) || 0,
        totalExperienceYears: Number(formData.totalExperienceYears) || 0,
        totalExperienceMonths: Number(formData.totalExperienceMonths) || 0,
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

  const handleEditStart = () => {
    setFormData(buildFormData(profile));
    setError("");
    setSuccess("");
    setIsEditMode(true);
  };

  const handleEditCancel = () => {
    setFormData(buildFormData(profile));
    setError("");
    setIsEditMode(false);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-3300 border border-red-200 rounded-lg text-black text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-300 border border-green-200 rounded-lg text-black text-sm">
          {success}
        </div>
      )}

      {isEditMode ? (
        <div className="border border-slate-500 rounded-lg card p-6">
          <div className="flex items-center justify-between mb-6 border-b border-slate-500 pb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Edit Teacher Profile
            </h3>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                formData.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {formData.isActive ? "Editing Profile" : "Inactive Profile"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Last Name
              </label>
              <input className=" input mt-1"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
            
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-slate-200 input mt-1"
                disabled
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="bg-slate-200 input mt-1"
                disabled
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="bg-slate-200 input mt-1"
                disabled
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
                <option value="">Select</option>
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
                Join Date
              </label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
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
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Alternate Contact Number
              </label>
              <input
                type="tel"
                name="alternateContactNumber"
                value={formData.alternateContactNumber}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                PAN Number
              </label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleInputChange}
                className="input mt-1 uppercase"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Aadhar Number
              </label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Highest Qualification
              </label>
              <input
                type="text"
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Qualifications(all your degrees)
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <div  >
              <label className="text-sm font-medium text-slate-700">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <br />
            <div>
              <label className="text-sm font-medium text-slate-700">
                Teaching Experience Years
              </label>
              <input
                type="number"
                min="0"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Teaching Experience Months
              </label>
              <input
                type="number"
                min="0"
                name="experienceMonths"
                value={formData.experienceMonths}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Industry Experience Years
              </label>
              <input
                type="number"
                min="0"
                name="industryExperienceYears"
                value={formData.industryExperienceYears}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Industry Experience Months
              </label>
              <input
                type="number"
                min="0"
                name="industryExperienceMonths"
                value={formData.industryExperienceMonths}
                onChange={handleInputChange}
                className="input mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Department Name
              </label>
              <input
                type="text"
                name="departmentName"
                value={formData.departmentName}
                className="input mt-1 bg-slate-200"
                disabled
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Department Code
              </label>
              <input
                type="text"
                name="departmentUid"
                value={formData.departmentUid}
                className="input mt-1 bg-slate-200"
                disabled
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                College Name
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                className="input mt-1 bg-slate-200"
                disabled
              />
            </div>
             
             
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <button
              onClick={handleEditCancel}
              className="btn-primary bg-red-500 text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary bg-green-500 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-slate-500 rounded-lg card p-6">
          <div className="flex items-center justify-between mb-6 border-b border-slate-500 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Teacher Profile Information
              </h3>
              <p className="text-sm text-slate-500 mt-1">
               View your records and update your profile information as needed. 
              </p>
            </div>
              <h1 className={`text-xs font-semibold px-3 py-1 rounded-full ${profile.isActive ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-700"}`}>
              {profile.isActive ? "Your Profile is active" : "Your Profile is inactive kindly contact to the admin of your department"}
            </h1>
           
            <button
              onClick={handleEditStart}
              className="btn-primary text-sm"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
            <Field
              label="Full Name"
              value={[profile.firstName, profile.lastName].filter(Boolean).join(" ")}
            />
            <Field label="Email" value={profile.email} />
            <Field label="Username" value={profile.username} />
             <Field
              label="Date of Birth"
              value={formatDateForDisplay(profile.dateOfBirth)}
            />
               <Field label="Gender" value={profile.gender.toUpperCase()} />
            <Field label="Employee ID" value={profile.employeeId} />
          
            
            <Field label="Contact Number" value={`+91-${profile.contactNumber}`} />
            <Field
              label="Alternate Contact Number"
              value={`+91-${profile.alternateContactNumber}`}
            />
            
            
            <Field label="PAN Number" value={profile.panNumber} />
            <Field label="Aadhar Number" value={profile.aadharNumber} />

            <Field
              label="Highest Qualification"
              value={profile.highestQualification}
            />
            <Field label="Qualification" value={profile.qualification} />
            <Field label="Specialization" value={profile.specialization} />
            <Field label="Your Role" value={profile.role} />

            <Field
              label="Join Date"
              value={formatDateForDisplay(profile.joinDate)}
            />
            <Field
              label="Teaching Experience"
              value={`${profile.experienceYears || 0} Years (${profile.experienceMonths || 0} Months )`}
            />
            <Field
              label="Industry Experience"
              value={`${profile.industryExperienceYears || 0} Years (${profile.industryExperienceMonths || 0} Months )`}
            />
            {/* Total Experience calculated */}
            <Field
              label="Total Experience"
              value={`${profile.experienceYears+profile.industryExperienceYears || 0} Years (${profile.experienceMonths+profile.industryExperienceMonths || 0} Months )`}
            />
            <Field label="Department Name" value={profile.departmentName} />
            <Field label="Department UID" value={profile.departmentUid} />
            <Field label="College Name" value={profile.collegeName} />
    
            
            <Field
              label="Last Updated"
              value={formatDateForDisplay(profile.updatedAt)}
            />
            <Field label="Designations" value={profile.designations?.join(" , ") || "N/A"} />
          </div>
        </div>
      )}
      {/* Contributions Overview Section */}
      <div className="border border-slate-500 rounded-lg card p-6 bg-white">
        <div className="border-b border-slate-500 pb-4 mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Contributions Overview
            </h3>
            <p className="text-sm text-slate-500 mt-1">Snapshot of your academic and research records</p>
          </div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: "Activities", value: contributions?.activities, color: "bg-blue-50 text-blue-700 border-blue-200" },
            { label: "Research Papers", value: contributions?.researchPapers, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            { label: "Grants", value: contributions?.grants, color: "bg-cyan-50 text-cyan-700 border-cyan-200" },
            { label: "Achievements", value: contributions?.achievements, color: "bg-purple-50 text-purple-700 border-purple-200" },
            { label: "Consultancies", value: contributions?.consultancies, color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
            { label: "Committees", value: contributions?.committees, color: "bg-slate-50 text-slate-700 border-slate-200" },
            { label: "Editorial", value: contributions?.editorial, color: "bg-zinc-50 text-zinc-700 border-zinc-200" },
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
