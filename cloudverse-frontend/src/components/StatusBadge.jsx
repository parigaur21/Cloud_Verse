import { Activity } from "lucide-react";

export default function StatusBadge({ status }) {
  const configs = {
    Building: { color: "text-warning", dot: "bg-warning" },
    Testing: { color: "text-warning", dot: "bg-warning" },
    Deploying: { color: "text-primary", dot: "bg-primary" },
    Completed: { color: "text-success", dot: "bg-success" },
    Failed: { color: "text-error", dot: "bg-error" },
    Idle: { color: "text-gray-500", dot: "bg-gray-500" },
  };

  const config = configs[status] || configs.Idle;

  const isSpinning = ["Building", "Testing", "Deploying"].includes(status);

  return (
    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${config.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot} ${isSpinning ? 'animate-pulse' : ''}`} />
      <span>{status}</span>
    </div>
  );
}