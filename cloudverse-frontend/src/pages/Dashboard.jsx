import StatusBadge from "../components/StatusBadge";
import ProgressBar from "../components/ProgressBar";
import { useEffect, useState } from "react";
import {
  createDeployment,
  getDeployments,
} from "../services/api";

export default function Dashboard() {
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    fetchDeployments();

    const interval = setInterval(() => {
      fetchDeployments();
    }, 2000); //Polling - har 2 sec baad backend se pooch rha hh... status!!

    return () => clearInterval(interval);
  }, []);
  //async
  async function fetchDeployments() {
    const data = await getDeployments();
    setDeployments(data);
  }

  async function handleDeploy() {
    await createDeployment();
    fetchDeployments();
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">
        Deployments
      </h2>

      <button
        onClick={handleDeploy}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg mb-6"
      >
        Deploy Application 🚀
      </button>

      <div className="space-y-4">
        {deployments.map((deployment) => (
          <div
            key={deployment.id}
            className="bg-gray-900 p-6 rounded-xl border border-gray-800"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">
                Deployment #{deployment.id}
              </h3>
              <StatusBadge status={deployment.status}
               />
              
            </div>

            <div className="mt-4 text-sm text-gray-400">
              {deployment.logs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}