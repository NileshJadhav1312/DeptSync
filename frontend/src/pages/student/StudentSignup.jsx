import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupStudent } from "../../services/auth";

const initialForm = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  prnNumber: "",
  email: "",
  username: "",
  contactNumber: "",
  alternateContactNumber: "",
  password: "",
  confirmPassword: "",
};

export default function StudentSignup() {
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
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await signupStudent(form);
      setSuccess(response?.message || "Student account created successfully.");
      setForm(initialForm);
      setTimeout(() => nav("/login"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to create student account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-[600px] max-w-4xl card p-6 md:p-10 shadow-2xl rounded-2xl border border-slate-100 bg-white">
        <div className="mb-8 text-center sm:text-left">
          <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
            Student Portal
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">
            Create your account
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-xl">
            Register below to build your academic profile, join your institutional department, and participate in classroom assignments and departmental events.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          {/* Identity */}
          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">First Name <span className="text-red-500">*</span></span>
            <input
              className="input w-full p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="e.g. Rahul"
              value={form.firstName}
              onChange={handleChange("firstName")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Last Name</span>
            <input
              className="input w-full p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="e.g. Joshi"
              value={form.lastName}
              onChange={handleChange("lastName")}
            />
          </label>

          {/* Academic & Personal */}
          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">PRN Number <span className="text-red-500">*</span></span>
            <input
              className="input w-full p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="e.g. 19XJ1A0100"
              value={form.prnNumber}
              onChange={handleChange("prnNumber")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Date of Birth</span>
            <input
              type="date"
              className="input w-full p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
              value={form.dateOfBirth}
              onChange={handleChange("dateOfBirth")}
            />
          </label>

          {/* Contact Details */}
          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></span>
            <input
              className="input w-full p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="+91 98765 43210"
              value={form.contactNumber}
              onChange={handleChange("contactNumber")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Gender</span>
            <select
              className="input w-full p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
              value={form.gender}
              onChange={handleChange("gender")}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          {/* Login Details */}
          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Email Address <span className="text-red-500">*</span></span>
            <input
              type="email"
              className="input w-full p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="student@university.edu"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Username <span className="text-red-500">*</span></span>
            <input
              className="input w-full p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="Choose a unique username"
              value={form.username}
              onChange={handleChange("username")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">Password <span className="text-red-500">*</span></span>
            <input
              type="password"
              className="input w-full p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange("password")}
              required
            />
          </label>

          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">
              Confirm Password <span className="text-red-500">*</span>
            </span>
            <input
              type="password"
              className="input w-full p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="Repeat the password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              required
            />
          </label>

          {error ? (
            <div className="md:col-span-2 p-3 rounded-lg bg-red-50 text-sm text-red-600 font-medium border border-red-100">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="md:col-span-2 p-3 rounded-lg bg-green-50 text-sm text-green-700 font-medium border border-green-100">
              {success}
            </div>
          ) : null}

          <div className="md:col-span-2 mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-6">
            <button className="btn-primary w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Register Student Account"}
            </button>
            <button
              type="button"
              className="btn-primary w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg"
              onClick={() => nav("/login")}
            >
             Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
