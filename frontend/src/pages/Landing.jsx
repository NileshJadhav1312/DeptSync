import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-indigo-100 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 rounded-full border border-indigo-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Department Data Management
          </span>
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
            DER Management System
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            A modern hub for departments to manage teachers, publications, projects,
            and reports with clarity and control.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => nav("/login")} className="btn-primary">
              Login
            </button>
            <button
              onClick={() => nav("/signup")}
              className="btn-secondary px-6 py-3 text-sm"
            >
              Admin Sign Up
            </button>
          </div>

          <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
            {[
              "Real-time teacher insights",
              "Structured publication workflows",
              "Secure admin controls",
            ].map((item) => (
              <div key={item} className="card text-left">
                <p className="text-sm font-semibold text-slate-900">{item}</p>
                <p className="mt-2 text-sm text-slate-500">
                  Build clarity across departments with premium dashboards and
                  organized records.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
