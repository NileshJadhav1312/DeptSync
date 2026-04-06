import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getTeacherClassrooms } from "../../services/classroom";
import { getTeacherProfile } from "../../services/profile";

export default function Sidebar({ role, open, onClose, onLogout }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (role === "teacher" && user?.id) {
      getTeacherProfile(user.id)
        .then(res => setProfile(res.teacher))
        .catch(err => console.error("Sidebar profile fetch error:", err));
    }
  }, [role, user?.id]);

  const designations = profile?.designations || user?.designations || [];
  const isSWDCoordinator = designations.includes("SWD Coordinator");
  const isClassTeacher = designations.includes("Class Teacher");

  console.log("Current user in Sidebar:", user);
  console.log("Designations found:", designations);


  const adminLinks = [
    { label: "Dashboard", to: "/admin" },
    { label: "Departments", to: "/admin/departments" },
    { label: "Teachers", to: "/admin/teachers" },
    { label: "Reports", to: "/admin/reports" },
     
  ];

  const teacherLinks = [
    { label: "Dashboard", to: "/teacher" },
    { label: "Activities", to: "/teacher/activities" },
    { label: "Achievements", to: "/teacher/achievements" },
    ...(isClassTeacher ? [{ label: "Classroom", to: "/teacher/classroom" }] : []),
    ...(isSWDCoordinator ? [{ label: "SWD Approvals", to: "/teacher/swd-approvals" }] : []),
    { label: "Research Papers", to: "/teacher/research-papers" },
    { label: "Book Publications", to: "/teacher/book-publications" },
    { label: "Grants", to: "/teacher/grants" },
    { label: "Consultancies", to: "/teacher/consultancies" },
    { label: "Committees", to: "/teacher/committees" },
    { label: "Editorial Boards", to: "/teacher/editorial-boards" },
  ];

  const studentLinks = [
    { label: "Dashboard", to: "/student" },
    { label: "My Class", to: "/student/class" },
    { label: "Academics", to: "/student/academics" },
    { label: "Achievements", to: "/student/achievements" },
  ];

  const links = role === "admin" ? adminLinks : role === "teacher" ? teacherLinks : studentLinks;

  const handleLogout = () => {
    onClose();
    if (onLogout) {
      setTimeout(onLogout, 100);
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white transition duration-300 md:static md:z-auto md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold">
              D
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">DER</h1>
          </div>
          <button
            onClick={onClose}
            className="md:hidden h-9 w-9 rounded-lg border border-white/20 text-white/80 hover:text-white transition hover:bg-white/10"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 mt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold mb-4">Navigation</p>
          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`
                }
                onClick={() => {
                  onClose();
                }}
              >
                <span className="h-1 w-1 rounded-full bg-current"></span>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>


      </div>
    </aside>
  );
}
