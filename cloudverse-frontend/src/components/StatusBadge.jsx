import { Activity } from "lucide-react";

export default function StatusBadge({ status }) {
  const configs = {
    Building: { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", pulse: true },
    Testing: { color: "bg-orange-500/10 text-orange-500 border-orange-500/20", pulse: true },
    Deploying: { color: "bg-blue-500/10 text-blue-500 border-blue-500/20", pulse: true },
    Completed: { color: "bg-green-500/10 text-green-500 border-green-500/20", pulse: false },
    Failed: { color: "bg-red-500/10 text-red-500 border-red-500/20", pulse: false },
    Idle: { color: "bg-gray-500/10 text-gray-500 border-gray-500/20", pulse: false },
  };

  const config = configs[status] || configs.Idle;

  return (
    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${config.color}`}>
      {config.pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {!config.pulse && <Activity size={12} />}
      <span className="uppercase tracking-widest">{status}</span>
    </span>
  );
}