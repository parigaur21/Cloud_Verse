import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";
import { useEffect, useRef } from "react";
import { Server, Activity, Plus } from "lucide-react";

export default function DeploymentCard({ deployment }) {
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [deployment.logs]);

  return (
    <div className="glass-card p-6 rounded-3xl hover:translate-x-1 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Server className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-none mb-1">
              Instance #{deployment.id.toString().padStart(4, '0')}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-widest">
              <Activity size={12} />
              Region: US-EAST-1
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge status={deployment.status} />
          <button className="text-gray-500 hover:text-white transition-colors">
            <Plus className="rotate-45" size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <ProgressBar status={deployment.status} />

        <div
          ref={logRef}
          className="bg-black/20 rounded-2xl p-4 font-mono text-xs text-gray-400 border border-white/5 h-32 overflow-y-auto scrollbar-hide"
        >
          <div className="flex items-center gap-2 mb-2 text-gray-500 border-b border-white/5 pb-2 uppercase text-[10px] tracking-widest font-bold sticky top-0 bg-transparent backdrop-blur-sm">
            Terminal Logs
          </div>
          {deployment.logs.map((log, index) => (
            <div key={index} className="flex gap-3 mb-1">
              <span className="text-primary opacity-50">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-gray-300">{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}