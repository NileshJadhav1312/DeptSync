import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupAdmin } from "../services/auth";

const initialForm = {
  firstName: "",
  lastName: "",
  gender: "",
  designation: "",
  email: "",
  contactNumber: "",
  alternateContactNumber: "",
  collegeName: "",
  username: "",
  employeeId: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState(initialForm);

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Password and confirm password must be equal.");
      return;
    }

    setLoading(true);

    try {
      const response = await signupAdmin(form);
      setSuccess(response?.message || "Admin account created successfully.");
      setForm(initialForm);
      setTimeout(() => nav("/login"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create admin account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-10">
      <div className="w-[600px] max-w-4xl card">
        <div className="grid  md:items-start">
          <div>
            <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
              Admin Signup
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
              Create the department administrator account
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Only admins can create accounts here. Teachers and Students will use the login page
              with their existing credentials.
            </p>
          </div>

           
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">First Name</span>
            <input
              className="input"
              placeholder="Aarav"
              value={form.firstName}
              onChange={handleChange("firstName")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Last Name</span>
            <input
              className="input"
              placeholder="Sharma"
              value={form.lastName}
              onChange={handleChange("lastName")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Gender</span>
            <select
              className="input"
              value={form.gender}
              onChange={handleChange("gender")}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Designation</span>
            <select
              className="input"
              placeholder="Head of Department"
              value={form.designation}
              onChange={handleChange("designation")}
              required
            >
              <option value="">Select designation</option>
              <option value="head-of-department">Head of Department</option>
              <option value="assistant-professor">Assistant Professor</option>
              <option value="associate-professor">Associate Professor</option>
              <option value="full-professor">SDW Coordinator</option>
            </select>
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Email</span>
            <input
              type="email"
              className="input"
              placeholder="admin@college.edu"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Username</span>
            <input
              className="input"
              placeholder="admin.user"
              value={form.username}
              onChange={handleChange("username")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Contact Number</span>
            <input
              className="input"
              placeholder="+91 98765 43210"
              value={form.contactNumber}
              onChange={handleChange("contactNumber")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">
              Alternate Number
            </span>
            <input
              className="input"
              placeholder="+91 91234 56789"
              value={form.alternateContactNumber}
              onChange={handleChange("alternateContactNumber")}
            />
          </label>

          <label className="text-sm text-slate-600 md:col-span-2">
            <span className="mb-2 block font-medium text-slate-700">College Name</span>
            <input
              className="input"
              placeholder="PCCOE"
              value={form.collegeName}
              onChange={handleChange("collegeName")}
              required
            />
          </label>

          <label className="text-sm text-slate-600 md:col-span-2">
            <span className="mb-2 block font-medium text-slate-700">
              Employee ID (Optional)
            </span>
            <input
              className="input"
              placeholder="EMP-1024"
              value={form.employeeId}
              onChange={handleChange("employeeId")}
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Password</span>
            <input
              type="password"
              className="input"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange("password")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">
              Confirm Password
            </span>
            <input
              type="password"
              className="input"
              placeholder="Repeat the password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              required
            />
          </label>

          {error ? (
            <p className="md:col-span-2 text-sm text-red-500">{error}</p>
          ) : null}

          {success ? (
            <p className="md:col-span-2 text-sm text-emerald-600">{success}</p>
          ) : null}

          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button className="btn-primary w-full sm:w-auto" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Admin Account"}
            </button>
            <button
              type="button"
              className="btn-primary w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              onClick={() => nav("/login")}
            >
              Back to login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
