import { LayoutDashboard, Rocket, Zap, Settings, Globe, ChevronRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Sidebar() {
  const navigate = useNavigate();

  const baseStyle =
    "flex items-center justify-between px-3 py-2 rounded-vercel text-sm font-medium transition-all duration-200 group";

  return (
    <aside className="w-64 border-r border-border h-screen flex flex-col bg-transparent relative z-20">
      <div className="p-6">
        <div onClick={() => navigate('/')} className="flex items-center gap-2 mb-8 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full group-hover:bg-primary/60 transition-colors"></div>
            <Zap className="text-white fill-white relative z-10 animate-float" size={24} />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-white group-hover:text-glow transition-all">
            Cloud<span className="text-gradient">Verse</span>
          </h1>
        </div>

        <nav className="space-y-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${baseStyle} ${isActive
                ? "bg-primary/20 text-white border border-primary/30 shadow-neon"
                : "text-gray-400 hover:bg-white/10 hover:text-white border border-transparent"
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
                ? "bg-primary/20 text-white border border-primary/30 shadow-neon"
                : "text-gray-400 hover:bg-white/10 hover:text-white border border-transparent"
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
            <NavLink
              to="/edge-network"
              className={({ isActive }) =>
                `${baseStyle} ${isActive
                  ? "bg-primary/20 text-white border border-primary/30 shadow-neon"
                  : "text-gray-400 hover:bg-white/10 hover:text-white border border-transparent"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Globe size={18} />
                <span>Edge Network</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${baseStyle} ${isActive
                  ? "bg-primary/20 text-white border border-primary/30 shadow-neon"
                  : "text-gray-400 hover:bg-white/10 hover:text-white border border-transparent"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Settings size={18} />
                <span>Settings</span>
              </div>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-border/50 bg-black/40 backdrop-blur-md">
        <div className="vercel-card px-4 py-5 bg-white/5 border-dashed border-primary/30 relative overflow-hidden group/upgrade cursor-pointer shadow-glass hover:shadow-neon transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 opacity-0 group-hover/upgrade:opacity-100 transition-opacity duration-300"></div>
          <div className="text-[11px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent mb-2 uppercase tracking-wide relative z-10">CloudVerse Pro</div>
          <div className="text-xs text-gray-300 mb-4 font-medium relative z-10">Scale your infrastructure globally with 0ms latency.</div>
          <button onClick={() => toast("Upgrade portal is processing. Watch for our Launch Day email!", { icon: '🚀' })} className="w-full py-2 bg-gradient-to-r from-primary to-accent text-white shadow-lg text-xs font-bold rounded-vercel relative z-10 transition-transform group-hover/upgrade:scale-[1.03] active:scale-[0.98]">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}