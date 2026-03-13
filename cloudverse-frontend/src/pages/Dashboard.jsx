import { useEffect, useState } from "react";
import { createDeployment, getDeployments } from "../services/api";
import { Rocket, Plus, Activity, Server, Clock, Search } from "lucide-react";
import DeploymentCard from "../components/DeploymentCard";
import DeploymentModal from "../components/DeploymentModal";

export default function Dashboard() {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
    fetchDeployments();
    const interval = setInterval(fetchDeployments, 2000);
    return () => clearInterval(interval);
  }, []);

  async function handleDeploy(name) {
    if (!name) return;
    await createDeployment(name);
    fetchDeployments();
  }

  const filteredDeployments = deployments.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.id.toString().includes(searchQuery)
  );

  return (
    <div className="space-y-12">
      <DeploymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDeploy={handleDeploy}
      />
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter mb-1 text-white">
            Workspace Overview
          </h2>
          <p className="text-gray-400 text-sm">Manage and monitor your cloud infrastructure in real-time.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="vercel-button flex items-center gap-2"
        >
          <Plus size={18} />
          Deploy New App
        </button>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="vercel-card p-6 border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4 text-gray-400">
            <Activity size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Active Deployments</span>
          </div>
          <div className="text-4xl font-bold text-white tabular-nums">{deployments.length}</div>
        </div>
        <div className="vercel-card p-6 border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4 text-gray-400">
            <Server size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">System Uptime</span>
          </div>
          <div className="text-4xl font-bold text-white tabular-nums">99.99%</div>
        </div>
        <div className="vercel-card p-6 border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4 text-gray-400">
            <Clock size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Avg. Latency</span>
          </div>
          <div className="text-4xl font-bold text-white tabular-nums">12ms</div>
        </div>
      </section>

      {/* Deployments List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
            Recent Activity
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input
              type="text"
              placeholder="Search deployments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black border border-border rounded-vercel py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-white/20 transition-colors w-64 placeholder:text-gray-600"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredDeployments.length === 0 && !loading ? (
            <div className="vercel-card p-20 text-center border-dashed border-gray-800 bg-transparent">
              <div className="bg-gray-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-gray-600" size={24} />
              </div>
              <p className="text-gray-500 text-sm">No deployments found. Start by creating a new one!</p>
            </div>
          ) : (
            filteredDeployments.map((deployment) => (
              <DeploymentCard key={deployment.id} deployment={deployment} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}