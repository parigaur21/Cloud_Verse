import { useEffect, useState } from "react";
import { createDeployment, getDeployments } from "../services/api";
import DeploymentCard from "../components/DeploymentCard";
import DeploymentModal from "../components/DeploymentModal";
import { Rocket, Plus, Filter, LayoutGrid } from "lucide-react";

export default function Deployments() {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDeployments = async () => {
    try {
      const data = await getDeployments();
      setDeployments(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch deployments:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchDeployments();
    };
    init();
    const interval = setInterval(fetchDeployments, 2000);
    return () => clearInterval(interval);
  }, []);


  async function handleDeploy(name) {
    if (!name) return;
    await createDeployment(name);
    fetchDeployments();
  }

  return (
    <div className="space-y-12">
      <DeploymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDeploy={handleDeploy}
      />
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter mb-1 text-white">
            Project Deployments
          </h2>
          <p className="text-gray-400 text-sm">View and manage all your active cloud instances.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 border border-border rounded-vercel text-gray-400 hover:text-white transition-colors bg-white/5">
            <Filter size={16} />
          </button>
          <button className="p-2 border border-border rounded-vercel text-gray-400 hover:text-white transition-colors bg-white/5">
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="vercel-button flex items-center gap-2"
          >
            <Plus size={18} />
            New Service
          </button>
        </div>
      </header>

      <div className="grid gap-4">
        {deployments.length === 0 && !loading ? (
          <div className="vercel-card p-20 text-center border-dashed border-gray-800 bg-transparent">
            <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 rotate-12 group-hover:rotate-0 transition-transform">
              <Rocket className="text-gray-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">No deployments yet</h3>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto text-sm">Your cloud workspace is empty. Launch your first application to see it here.</p>
            <button
              onClick={handleDeploy}
              className="vercel-button-outline text-xs px-6"
            >
              Create First Deployment
            </button>
          </div>
        ) : (
          deployments.map((deployment) => (
            <DeploymentCard
              key={deployment.id}
              deployment={deployment}
              onDeleteSuccess={fetchDeployments}
            />
          ))

        )}
      </div>
    </div>
  );
}