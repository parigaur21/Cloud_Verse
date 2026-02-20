import StatusBadge from "./StatusBadge";
import ProgressBar from "./ProgressBar";
import { useEffect, useRef } from "react";

export default function DeploymentCard({ deployment }) {
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [deployment.logs]);

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold">
            Deployment #{deployment.id}
          </h3>
          <span className="text-xs bg-purple-700 px-2 py-1 rounded">
            Production
          </span>
        </div>

        <StatusBadge status={deployment.status} />
      </div>

      <ProgressBar status={deployment.status} />

      <div
        ref={logRef}
        className="mt-4 bg-black rounded-lg p-4 h-40 overflow-y-auto font-mono text-xs text-green-400 border border-gray-800"
      >
        {deployment.logs.map((log, index) => (
          <div key={index}>$ {log}</div>
        ))}
      </div>
    </div>
  );
}