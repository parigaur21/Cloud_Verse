import { LayoutDashboard, Rocket, Zap, Settings, Globe, ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const baseStyle =
    "flex items-center justify-between px-3 py-2 rounded-vercel text-sm font-medium transition-all duration-200 group";

  return (
    <aside className="w-64 border-r border-border h-screen flex flex-col bg-background">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="text-white fill-white" size={20} />
          <h1 className="text-lg font-bold tracking-tight text-white">
            CloudVerse
          </h1>
        </div>

        <nav className="space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseStyle} ${isActive
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>

          <NavLink
            to="/deployments"
            className={({ isActive }) =>
              `${baseStyle} ${isActive
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <div className="flex items-center gap-3">
              <Rocket size={18} />
              <span>Deployments</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        </nav>

        <div className="mt-8">
          <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
            Infrastructure
          </div>
          <nav className="space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 cursor-not-allowed">
              <Globe size={18} />
              <span>Edge Network</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 cursor-not-allowed">
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </nav>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-border">
        <div className="vercel-card p-4 bg-white/5 border-dashed">
          <div className="text-[10px] font-bold text-primary mb-1 uppercase">CloudVerse Pro</div>
          <div className="text-xs text-gray-400 mb-3">Scale your infrastructure globally with 0ms latency.</div>
          <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-vercel hover:bg-white/90 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}