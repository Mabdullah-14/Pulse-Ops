import { useEffect } from "react";
import { NavLink, useParams, Link } from "react-router-dom";
import {
  History,
  Home,
  KanbanSquare,
  ListChecks,
  FolderKanban,
  Settings,
  Shield,
  Users,
  X,
  Zap,
  ChevronRight,
} from "lucide-react";
import { usePermission } from "../hooks/usePermission";
import { PERMISSIONS } from "../constants/Permisson";

export default function Sidebar({ open, onClose }) {
  const { orgSlug } = useParams();
  const basePath = orgSlug ? `/orgs/${orgSlug}` : "";

  // Simple permission check
  const { hasPermission } = usePermission() || {};
  const canManageRoles = hasPermission ? hasPermission(PERMISSIONS.ROLE_CREATE) : true;
  const canViewLogs = hasPermission ? hasPermission(PERMISSIONS.AUDIT_LOG_VIEW) : true;

  const mainLinks = [
    { to: "/home", label: "Home", icon: Home, show: true },
    { to: `${basePath}/projects`, label: "Projects", icon: FolderKanban, show: !!orgSlug },
    { to: `${basePath}/board`, label: "Board", icon: KanbanSquare, show: !!orgSlug },
    { to: `${basePath}/issues`, label: "All Issues", icon: ListChecks, show: !!orgSlug },
  ];

  const managementLinks = [
    { to: `${basePath}/members`, label: "Members", icon: Users, show: !!orgSlug },
    { to: `${basePath}/roles`, label: "Roles", icon: Shield, show: !!orgSlug && canManageRoles },
    { to: `${basePath}/audit-logs`, label: "Audit Logs", icon: History, show: !!orgSlug && canViewLogs },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const renderNavItem = ({ to, label, icon: Icon }) => (
    <NavLink
      key={to}
      to={to}
      onClick={onClose}
      className={({ isActive }) =>
        `group relative flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${isActive
          ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
          : "text-gray-600 hover:bg-blue-50/70 hover:text-blue-600"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3">
            <Icon
              size={17}
              className={`transition-transform duration-150 ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600 group-hover:scale-105"
                }`}
            />
            <span>{label}</span>
          </div>
          {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white/90" />}
        </>
      )}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/25 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200/80 bg-white/95 backdrop-blur-xl transition-transform duration-300 ease-in-out lg:sticky lg:top-15 lg:z-0 lg:h-[calc(100vh-3.75rem)] lg:w-60 lg:translate-x-0 ${open ? "translate-x-0 shadow-2xl lg:shadow-none" : "-translate-x-full"
          }`}
      >
        {/* Mobile Header */}
        <div className="flex h-15 items-center justify-between border-b border-gray-100 px-4 lg:hidden">
          <Link to="/home" onClick={onClose} className="flex items-center gap-2 font-bold text-gray-900">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-600 text-white">
              <Zap size={14} className="fill-white" />
            </span>
            <span className="text-sm tracking-tight">PulseOps</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Workspace Badge */}
        {orgSlug && (
          <div className="px-3 pt-4 pb-1">
            <div className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-500">
                  Workspace
                </p>
                <p className="text-xs font-bold text-gray-900 truncate capitalize">
                  {orgSlug.replace(/-/g, " ")}
                </p>
              </div>
              <ChevronRight size={14} className="text-blue-400 shrink-0" />
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-4">
          <div>
            <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Menu
            </p>
            <nav className="flex flex-col gap-1">
              {mainLinks.filter((item) => item.show).map(renderNavItem)}
            </nav>
          </div>

          {orgSlug && (
            <div>
              <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                Organization
              </p>
              <nav className="flex flex-col gap-1">
                {managementLinks.filter((item) => item.show).map(renderNavItem)}
              </nav>
            </div>
          )}
        </div>

        {/* Bottom Settings Link */}
        {orgSlug && (
          <div className="border-t border-gray-200/80 p-3 mt-auto bg-gray-50/40">
            {renderNavItem({ to: `${basePath}/settings`, label: "Settings", icon: Settings })}
          </div>
        )}
      </aside>
    </>
  );
}
