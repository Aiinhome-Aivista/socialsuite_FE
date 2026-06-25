import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, PenSquare, Calendar, Plug, BarChart3, LogOut,
} from "lucide-react";
import { clearToken } from "../lib/api";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/composer", label: "Composer", icon: PenSquare },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/connectors", label: "Connectors", icon: Plug },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
];

export default function Layout() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 flex-col border-r border-neutral-200 bg-white p-4">
        <div className="mb-8 px-2 text-lg font-bold">Social Suite</div>
        <nav className="space-y-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`
              }
            >
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => {
            clearToken();
            navigate("/login");
          }}
          className="mt-auto flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-100"
        >
          <LogOut size={18} /> Sign out
        </button>
      </aside>
      <main className="flex-1 bg-neutral-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}
