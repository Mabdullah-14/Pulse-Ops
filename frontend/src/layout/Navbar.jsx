import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  LogOut,
  Menu,
  Search,
  Zap,
  Settings,
  ChevronDown,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2) ||
    user?.email?.slice(0, 2) ||
    "U";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    navigate("/login", { replace: true });
    await logout();
  };

  return (
    <header className="sticky top-0 z-30 flex h-15 items-center justify-between gap-4 border-b border-gray-200/80 bg-white/85 px-4 backdrop-blur-xl sm:px-6">
      {/* Left: Mobile Menu & Brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 lg:hidden cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <Link
          to="/home"
          className="flex items-center gap-2.5 font-bold text-gray-900 group"
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-sm ring-1 ring-blue-600/20 transition-transform duration-200 group-hover:scale-105">
            <Zap size={16} className="fill-white" />
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-base tracking-tight">PulseOps</span>
            <span className="hidden sm:inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600 border border-blue-100">
              Beta
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Command Search Bar */}
      {/* <div className="relative hidden max-w-md flex-1 sm:block">
        <Search
          size={15}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search projects, issues, or commands..."
          className="w-full rounded-lg border border-gray-200/80 bg-gray-50/80 py-1.5 pl-9 pr-14 text-sm text-gray-800 outline-none placeholder:text-gray-400 transition-all hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-0.5 rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400 shadow-2xs">
          ⌘K
        </kbd>
      </div> */}

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 ring-2 ring-white"></span>
          </span>
        </button>

        <div className="h-5 w-[1px] bg-gray-200/80 mx-0.5 hidden sm:block" />

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={dropdownOpen}
            className="flex items-center gap-2 rounded-lg border border-transparent py-1 pl-1 pr-2 transition-colors hover:border-gray-200/80 hover:bg-gray-50 focus:outline-none cursor-pointer"
          >
            <div className="grid h-7 w-7 place-items-center rounded-md bg-blue-600 text-xs font-semibold uppercase text-white shadow-2xs">
              {initials}
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[110px] truncate">
              {user?.name?.split(" ")[0] || "Account"}
            </span>
            <ChevronDown
              size={14}
              className={`hidden md:block text-gray-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-60 origin-top-right rounded-xl border border-gray-200/90 bg-white py-1.5 shadow-xl shadow-gray-900/5 ring-1 ring-black/5 z-50">
              <div className="border-b border-gray-100 px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-600 text-xs font-bold uppercase text-white">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || "user@pulseops.com"}
                    </p>
                  </div>
                </div>
              </div>

              {/* <div className="p-1.5 space-y-0.5">
                <Link
                  to="/home"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-blue-50/70 hover:text-blue-600 transition-colors"
                >
                  <User size={15} className="text-gray-400" />
                  My Workspaces
                </Link>
                
              </div> */}

              <div className="border-t border-gray-100 p-1.5">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <LogOut size={15} className="text-red-500" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
