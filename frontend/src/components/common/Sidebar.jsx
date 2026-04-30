import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { getTeacherClassrooms } from "../../services/classroom";
import { getTeacherProfile } from "../../services/profile";

export default function Sidebar({ role, open, onClose, onLogout }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [hasClassrooms, setHasClassrooms] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (role === "teacher" && user?.id) {
      getTeacherProfile(user.id)
        .then(res => setProfile(res.teacher))
        .catch(err => console.error("Sidebar profile fetch error:", err));

      getTeacherClassrooms(user.id)
        .then(res => {
          if (res.classrooms && res.classrooms.length > 0) {
            setHasClassrooms(true);
          }
        })
        .catch(err => console.error("Sidebar classrooms fetch error:", err));
    }
  }, [role, user?.id]);

  const designations = profile?.designations || user?.designations || [];
  const isSDWCoordinator = designations.includes("SDW Coordinator");
  const isClassTeacher = designations.includes("Class Teacher") || hasClassrooms;

  console.log("Current user in Sidebar:", user);
  console.log("Designations found:", designations);


  const adminLinks = [
    { label: "Dashboard", to: "/admin" },
    { label: "Departments", to: "/admin/departments" },
    { label: "Teachers", to: "/admin/teachers" },
    { label: "Activities", to: "/admin/activities" },
    { label: "Students", to: "/admin/students" },
    { label: "Reports", to: "/admin/reports" },
     
  ];

  const baseTeacherLinks = [
    { label: "Dashboard", to: "/teacher" },
    ...(isClassTeacher ? [{ label: "Classroom", to: "/teacher/classroom" }] : []),
    ...(isSDWCoordinator ? [{ label: "SDW Approvals", to: "/teacher/sdw-approvals" }] : []),
  ];

  const moreTeacherLinks = [
    { label: "Activities", to: "/teacher/activities" },
    { label: "Achievements", to: "/teacher/achievements" },
    { label: "Research Papers", to: "/teacher/research-papers" },
    { label: "Journal Publications", to: "/teacher/journal-publications" },
    { label: "Book Publications", to: "/teacher/book-publications" },
    { label: "Grants", to: "/teacher/grants" },
    { label: "Consultancies", to: "/teacher/consultancies" },
    { label: "Committees", to: "/teacher/committees" },
    { label: "Editorial Boards", to: "/teacher/editorial-boards" },
    { label: "Conferences", to: "/teacher/conferences" },
    { label: "Book Chapters", to: "/teacher/book-chapters" },
    { label: "Patents", to: "/teacher/patents" },
    { label: "Copyrights", to: "/teacher/copyrights" },
  ];

  const teacherLinks = baseTeacherLinks; // Handled separately in render

  const studentLinks = [
    { label: "Dashboard", to: "/student" },
    { label: "Academics", to: "/student/academics" },
    { label: "Achievements", to: "/student/achievements" },
    { label: "Conferences", to: "/student/conferences" },
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
                onClick={() => onClose()}
              >
                <span className="h-1 w-1 rounded-full bg-current"></span>
                {link.label}
              </NavLink>
            ))}
            
            {role === "teacher" && (
              <>
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200 mt-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-1 w-1 rounded-full bg-current"></span>
                    More Options
                  </div>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${showMore ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showMore && (
                  <div className="pl-6 space-y-1 mt-1 animate-in slide-in-from-top-2">
                    {moreTeacherLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                            ? "bg-indigo-600/50 text-white"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                          }`
                        }
                        onClick={() => onClose()}
                      >
                        <span className="h-1 w-1 rounded-full bg-current opacity-50"></span>
                        {link.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </nav>
        </div>


      </div>
    </aside>
  );
}
