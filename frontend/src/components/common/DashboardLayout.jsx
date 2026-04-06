import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  role,
  title,
  subtitle,
  actions,
  children,
  onLogout,
}) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar role={role} open={open} onClose={closeSidebar} onLogout={onLogout} />

      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden transition-opacity"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col">
        <Header
          title={title}
          subtitle={subtitle}
          actions={actions}
          onMenu={() => setOpen(true)}
          role={role}
          user={user}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
