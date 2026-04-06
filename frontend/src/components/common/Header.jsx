import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function getInitials(name, email) {
  const source = (name || email || "User").trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return source.slice(0, 2).toUpperCase();
}

export default function Header({
  title,
  subtitle,
  actions,
  onMenu,
  role,
  user,
  onLogout,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickAway = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, []);

  const profilePath =
    role === "admin"
      ? "/admin/profile"
      : role === "teacher"
        ? "/teacher/profile"
        : "/student/profile";
  const displayName = user?.name || user?.username || "User";
  const displayEmail = user?.email || `${role || "account"}@example.edu`;
  const initials = getInitials(displayName, displayEmail);

  return (
    <header className="sticky top-0 z-20 bg-indigo-500 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        {/* Mobile menu button three lines */}
        <button
          onClick={onMenu}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition"
          aria-label="Open sidebar"
        >
          <div className="flex flex-col justify-center items-center gap-1">
            <span className="h-0.5 w-5 bg-slate-700 block" />
            <span className="h-0.5 w-5 bg-slate-700 block" />
            <span className="h-0.5 w-5 bg-slate-700 block" />
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-3">
          <h1>DER System</h1>
        </div>

        <div className="flex items-center gap-3">
          {actions}
          <div
            className="relative pl-3 border-l border-slate-200"
            ref={dropdownRef}
          >
            <button
              type="button"
              className="flex items-center gap-3 rounded-full px-2 py-1.5 transition bg-slate-100"
              onClick={() => setOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={open}
            >
               
              <div className="h-10 w-10 rounded-full  text-indigo-700 flex items-center justify-center font-semibold">
                {initials}
              </div>
            </button>

            {open ? (
              <div className="absolute right-0 top-full bg-white mt-3 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/70">
                <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-3">
                  <div className="h-12 w-12 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center font-semibold">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {displayEmail}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-indigo-600">
                      {role || user?.role || "user"}
                    </p>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <Link
                    to={profilePath}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex justify-center">My Profile</span>
                
                  </Link>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    onClick={() => {
                      setOpen(false);
                      onLogout?.();
                    }}
                  >
                    <span>Logout</span>
                 
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
