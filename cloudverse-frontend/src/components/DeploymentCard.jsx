import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";
import { useEffect, useRef, useState } from "react";
import { Server, Trash2, Loader2, Copy, Check } from "lucide-react";
import { deleteDeployment } from "../services/api";

export default function DeploymentCard({ deployment, onDeleteSuccess }) {
  const logRef = useRef(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const logsCount = deployment?.logs?.length || 0;

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logsCount]);

  const handleCopy = () => {
    navigator.clipboard.writeText(deployment.id.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${deployment.name}?`)) return;
    
    setIsDeleting(true);
    try {
      await deleteDeployment(deployment.id);
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!deployment) return null;

  return (
    <div className={`vercel-card overflow-hidden group ${isDeleting ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-border rounded-vercel flex items-center justify-center bg-white/5">
              <Server className="text-gray-400 group-hover:text-white transition-colors" size={18} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-white">
                  {deployment.name}
                </h3>
                <StatusBadge status={deployment.status} />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <span>US-EAST-1</span>
                <span>•</span>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1 hover:text-white transition-colors group/id"
                >
                  <span className="truncate max-w-[100px]">ID: {deployment.id}</span>
                  {copied ? <Check size={10} className="text-success" /> : <Copy size={10} className="opacity-0 group-hover/id:opacity-100" />}
                </button>
                <span>•</span>
                <span>{deployment.created_at ? new Date(deployment.created_at).toLocaleDateString() : "Pending"}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="vercel-button-outline px-3 py-1.5 text-xs">
              View Details
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 text-gray-500 hover:text-error hover:bg-error/10 rounded-vercel transition-all"
              title="Delete Deployment"
            >
              {isDeleting ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <ProgressBar status={deployment.status} />

          <div
            ref={logRef}
            className="bg-black rounded-vercel p-3 font-mono text-[11px] border border-border h-32 overflow-y-auto scrollbar-hide"
          >
            <div className="flex items-center justify-between mb-3 text-[10px] font-bold text-gray-600 uppercase tracking-widest sticky top-0 bg-black pb-2 border-b border-white/5">
              <span>Terminal Output</span>
              <span className="text-primary truncate ml-4">INSTANCE_ID: {deployment.id}</span>
            </div>
            {(deployment.logs || []).map((log, index) => (
              <div key={index} className="flex gap-3 mb-1 group/log">
                <span className="text-gray-700 select-none w-4">{index + 1}</span>
                <span className="text-gray-400 group-hover/log:text-gray-300 transition-colors">{log}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

