import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, PenSquare, Calendar, Plug, BarChart3, LogOut, Sparkles, Bell, Search, User
} from "lucide-react";
import { clearToken } from "../lib/api";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/composer", label: "Composer", icon: PenSquare },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/connectors", label: "Connectors", icon: Plug },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/ai-analysis", label: "AI Analyze", icon: Sparkles },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const currentNav = nav.find(n => n.to === location.pathname);
    return currentNav ? currentNav.label : 'Social Suite';
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-50 font-sans">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-neutral-200 bg-white p-4 shrink-0 shadow-sm z-10">
        <div className="mb-8 px-2 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold shadow-md shadow-indigo-200">
            S
          </div>
          <span className="text-xl font-bold text-neutral-900 tracking-tight">Social Suite</span>
        </div>
        
        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-1">
          {/* <div className="px-3 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 mt-4">Menu</div> */}
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon 
                    size={20} 
                    className={`transition-colors ${isActive ? "text-indigo-600" : "text-neutral-400 group-hover:text-neutral-600"}`} 
                  /> 
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="mt-4 pt-4 border-t border-neutral-100">
          <button
            onClick={() => {
              clearToken();
              navigate("/");
            }}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut size={20} className="text-neutral-400 group-hover:text-red-500 transition-colors" /> 
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 bg-white/80 backdrop-blur-md px-8 sticky top-0 z-20">
          <h1 className="text-xl font-bold text-neutral-800">{getPageTitle()}</h1>
{/*           
          <div className="flex items-center gap-5">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="h-10 w-64 rounded-full border border-neutral-200 bg-neutral-50 pl-10 pr-4 text-sm focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
            </div>
            
            <button className="relative rounded-full p-2.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            
            <div className="h-8 w-px bg-neutral-200 mx-1"></div>
            
            <button className="flex items-center gap-3 rounded-full p-1 pr-4 hover:bg-neutral-100 transition-all border border-transparent hover:border-neutral-200">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-sm">
                <User size={18} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-neutral-700 leading-none">Admin User</span>
                <span className="text-[10px] font-medium text-neutral-400 mt-1 uppercase tracking-wide">Workspace</span>
              </div>
            </button>
          </div> */}
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-neutral-50/50 p-8 custom-scrollbar relative z-0">
          <div className="mx-auto max-w-7xl h-full">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="flex h-14 shrink-0 items-center justify-between border-t border-neutral-200 bg-white px-8 text-sm text-neutral-500 z-10">
          <p className="font-medium">&copy; {new Date().getFullYear()} Social Suite. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="/cookie-policy" className="hover:text-indigo-600 transition-colors">Cookie Policy</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
