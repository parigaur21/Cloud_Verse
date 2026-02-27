import { LayoutDashboard, Rocket, Zap, Settings, Globe } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const baseStyle =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300";

  return (
    <aside className="w-72 glass-card border-none m-4 rounded-3xl p-6 flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
          <Zap className="text-primary animate-pulse" size={24} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          CloudVerse
        </h1>
      </div>

      <nav className="space-y-3 flex-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseStyle} ${isActive
              ? "bg-primary text-white shadow-lg shadow-primary/30"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/deployments"
          className={({ isActive }) =>
            `${baseStyle} ${isActive
              ? "bg-primary text-white shadow-lg shadow-primary/30"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Rocket size={20} />
          <span className="font-medium">Deployments</span>
        </NavLink>

        <div className="pt-4 pb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          Infrastructure
        </div>

        <NavLink
          to="/network"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300 pointer-events-none opacity-50"
        >
          <Globe size={20} />
          <span className="font-medium">Edge Network</span>
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300 pointer-events-none opacity-50"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </NavLink>
      </nav>

      <div className="mt-auto glass-card p-4 rounded-2xl border-white/5 bg-white/[0.02]">
        <div className="text-xs text-gray-500 mb-2">PRO PLAN</div>
        <div className="text-sm font-semibold mb-3">Upgrade for more nodes</div>
        <button className="w-full py-2 bg-primary/20 text-primary border border-primary/30 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-colors">
          UPGRADE NOW
        </button>
      </div>
    </aside>
  );
}