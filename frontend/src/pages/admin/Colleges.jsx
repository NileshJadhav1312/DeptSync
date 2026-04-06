import { useState, useEffect } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";

export default function Colleges() {
  const { user, logout } = useAuth();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    collegeName: "",
    collegeId: "",
    address: "",
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await API.get("/admin/colleges");
      setColleges(response.data.colleges || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateCollege = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await API.post("/admin/colleges", {
        ...form,
        createdBy: user?.id,
      });
      setSuccess("College created successfully!");
      setForm({ collegeName: "", collegeId: "", address: "" });
      fetchColleges();
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create college.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      role={user?.role}
      title="Colleges Management"
      subtitle="Manage and create academic institutions."
      onLogout={() => {
        logout();
        window.location.href = "/login";
      }}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Create New College</h3>
          <form onSubmit={handleCreateCollege} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">College Name</label>
              <input
                className="input"
                value={form.collegeName}
                onChange={(e) => setForm({ ...form, collegeName: e.target.value })}
                placeholder="e.g. PCCOE"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">College ID</label>
              <input
                className="input"
                value={form.collegeId}
                onChange={(e) => setForm({ ...form, collegeId: e.target.value })}
                placeholder="e.g. PCCOE-PUNE"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Address (Optional)</label>
              <textarea
                className="input min-h-[80px]"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="e.g. Nigdi, Pune"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-emerald-600">{success}</p>}
            <button className="btn-primary w-full" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create College"}
            </button>
          </form>
        </div>

        <div className="card p-6 overflow-hidden">
          <h3 className="text-lg font-bold text-slate-900 mb-4">All Colleges</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">College Name</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">ID</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Address</th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {colleges.map((c) => (
                  <tr key={c._id}>
                    <td className="px-4 py-4 text-sm font-medium text-slate-900">{c.collegeName}</td>
                    <td className="px-4 py-4 text-sm text-slate-600 uppercase font-bold">{c.collegeId}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">{c.address || "N/A"}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {colleges.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-slate-400">
                      No colleges created yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
