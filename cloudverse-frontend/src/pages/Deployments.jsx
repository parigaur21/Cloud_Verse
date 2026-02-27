import { useEffect, useState } from "react";
import { createDeployment, getDeployments } from "../services/api";
import DeploymentCard from "../components/DeploymentCard";
import { Rocket, Plus, Filter, LayoutGrid, List } from "lucide-react";

export default function Deployments() {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeployments();
    const interval = setInterval(fetchDeployments, 2000);
    return () => clearInterval(interval);
  }, []);

  async function fetchDeployments() {
    try {
      const data = await getDeployments();
      setDeployments(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch deployments:", error);
    }
  }

  async function handleDeploy() {
    await createDeployment();
    fetchDeployments();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">
            Service <span className="text-primary">Deployments</span>
          </h2>
          <p className="text-gray-400">View and manage all your active cloud instances.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-colors border border-white/5">
            <Filter size={20} />
          </button>
          <button className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-colors border border-white/5">
            <LayoutGrid size={20} />
          </button>
          <button
            onClick={handleDeploy}
            className="glass-button bg-primary hover:bg-primary-hover px-6 py-3 rounded-2xl flex items-center gap-2 font-semibold shadow-xl shadow-primary/20"
          >
            <Plus size={20} />
            New Service
          </button>
        </div>
      </header>

      <div className="grid gap-6">
        {deployments.length === 0 && !loading ? (
          <div className="glass-card p-20 rounded-[40px] text-center border-dashed border-white/10">
            <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 group-hover:rotate-0 transition-transform">
              <Rocket className="text-primary" size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-2">No deployments yet</h3>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">Your cloud workspace is empty. Launch your first application to see it here.</p>
            <button
              onClick={handleDeploy}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-bold border border-white/10 transition-all"
            >
              Create First Deployment
            </button>
          </div>
        ) : (
          deployments.map((deployment) => (
            <DeploymentCard
              key={deployment.id}
              deployment={deployment}
            />
          ))
        )}
      </div>
    </div>
  );
}