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
  "other",
];

export default function EditTeacherModal({ isOpen, onClose, onSubmit, teacher, loading }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    contactNumber: "",
    designations: [],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isOpen && teacher) {
      setFormData({
        firstName: teacher.firstName || "",
        lastName: teacher.lastName || "",
        email: teacher.email || "",
        username: teacher.username || "",
        contactNumber: teacher.contactNumber || "",
        designations: Array.isArray(teacher.designations) ? teacher.designations : [],
      });
      setError("");
      setSuccess("");
    }
  }, [isOpen, teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDesignationToggle = (desig) => {
    const isSelected = formData.designations.includes(desig);
    if (isSelected) {
      setFormData((prev) => ({ ...prev, designations: prev.designations.filter((d) => d !== desig) }));
    } else {
      setFormData((prev) => ({ ...prev, designations: [...prev.designations, desig] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.firstName || !formData.email || !formData.username) {
      setError("First Name, Email, and Username are required.");
      return;
    }

    try {
      await onSubmit(teacher._id, formData);
      setSuccess("Teacher updated successfully!");
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update teacher.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="border-b border-slate-200 p-6 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Edit Teacher Details</h2>
            <p className="text-sm text-slate-500 mt-1">Update profile information and designations.</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} id="editTeacherForm" className="p-6 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700 block mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-1">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 block mb-2 font-bold text-indigo-700">Designations</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DESIGNATION_OPTIONS.map((desig) => {
                const isSelected = formData.designations.includes(desig);
                return (
                  <button
                    key={desig}
                    type="button"
                    onClick={() => handleDesignationToggle(desig)}
                    className={`text-xs px-3 py-2 rounded-lg border transition-all text-left flex items-center gap-2 ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100"
                        : "bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full border ${isSelected ? 'bg-white border-white' : 'border-slate-300'}`} />
                    {desig}
                  </button>
                );
              })}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 flex gap-3 justify-end shrink-0">
          <button type="button" onClick={onClose} className="btn-secondary px-6" disabled={loading}>
            Cancel
          </button>
          <button type="submit" form="editTeacherForm" className="btn-primary px-8" disabled={loading}>
            {loading ? "Updating..." : "Update Teacher"}
          </button>
        </div>
      </div>
    </div>
  );
}
