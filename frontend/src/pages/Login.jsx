import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [role, setRole] = useState("admin");
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ role, email: form.email, password: form.password });
      if (role === "admin") {
        nav("/admin");
      } else if (role === "teacher") {
        nav("/teacher");
      } else if (role === "student") {
        nav("/student");
      } else {
        setError("Invalid role selected.");
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Unable to login. Check credentials or backend API.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md card">
        <h2 className="text-2xl font-semibold text-slate-900">
          Connect to the DER System{" "}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Admins can sign up and log in. Teachers,Students can only log in with
          existing credentials.
        </p>

        <div className="mt-6 grid grid-cols-3 rounded-xl bg-slate-100 p-1">
          {[
            { label: "Admin Login", value: "admin" },
            { label: "Teacher Login", value: "teacher" },
            { label: "Student Login", value: "student" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setRole(item.value)}
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                role === item.value
                  ? "bg-white text-slate-900 shadow"
                  : "text-slate-500"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">
              Email or Username
            </span>
            <input
              className="input"
              type="text"
              placeholder="you@pccoepune.org/username"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            />
          </label>
          <label className="text-sm text-slate-600">
            <span className="mb-2 block font-medium text-slate-700">
              Password
            </span>
            <input
              className="input"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
              required
            />
          </label>

          {error ? <p className="text-sm text-red-500">{error}</p> : null}

          <button
            className="btn-primary w-full"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : `Login as ${role === "admin" ? "Admin" : role === "teacher" ? "Teacher" : "Student"}`}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {role === "admin" ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => nav("/signup")}
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Register here
              </button>
            </p>
          ) : role === "student" ? (
            <p>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => nav("/student-signup")}
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Register here
              </button>
            </p>
          ) : (
            <p className="text-slate-600">
              Login with the credentials provided by your administrator.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
