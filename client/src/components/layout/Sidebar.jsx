import { NavLink } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import {
  LayoutDashboard,
  CheckSquare,
  UserCheck,
  Users,
  Settings,
  LogOut,
  X,
  Sparkles,
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const { user, logout } = useAuth();

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/issues", label: "All Issues", icon: CheckSquare },
    { to: "/my-issues", label: "My Assigned", icon: UserCheck },
    { to: "/team", label: "Team", icon: Users },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-xs transition-opacity duration-300 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-72 flex-col justify-between border-r border-slate-100 bg-white p-5 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-7 pt-2 px-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/15">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900 leading-tight">
                  Trackr
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Workspace
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="mt-2 space-y-1">
            <div className="px-3 pb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Overview
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-indigo-50/70 text-indigo-600 font-semibold"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`h-5 w-5 stroke-[1.75] transition-colors ${
                            isActive
                              ? "text-indigo-600 stroke-[2.2]"
                              : "text-slate-400 group-hover:text-slate-700"
                          }`}
                        />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer User Profile Card */}
        <div className="pt-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3 shadow-xs">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 font-bold text-sm text-indigo-600">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-900 leading-tight">
                  {user?.name || "sukesh"}
                </p>
                <span className="mt-0.5 inline-block rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {user?.role || "USER"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              title="Sign out"
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
            >
              <LogOut className="h-4 w-4 stroke-[1.8]" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
