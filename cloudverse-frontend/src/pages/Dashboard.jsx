import DeploymentCard from "../components/DeploymentCard";
import { useEffect, useState } from "react";
import { createDeployment, getDeployments } from "../services/api";
import { Rocket, Plus, Activity, Server, Clock, Search } from "lucide-react";

export default function Dashboard() {
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
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">
            Workspace <span className="text-primary">Overview</span>
          </h2>
          <p className="text-gray-400">Manage and monitor your cloud infrastructure in real-time.</p>
        </div>
        <button
          onClick={handleDeploy}
          className="glass-button bg-primary hover:bg-primary-hover px-8 py-3 rounded-2xl flex items-center gap-2 font-semibold shadow-xl shadow-primary/20 group translate-y-0 hover:-translate-y-1 transition-all duration-300"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Deploy New App
        </button>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl group hover:border-primary/30 transition-all duration-300">
          <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4">
            <Activity className="text-blue-500" size={24} />
          </div>
          <div className="text-3xl font-bold mb-1">{deployments.length}</div>
          <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Active Deployments</div>
        </div>
        <div className="glass-card p-6 rounded-3xl group hover:border-green-500/30 transition-all duration-300">
          <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-4">
            <Server className="text-green-500" size={24} />
          </div>
          <div className="text-3xl font-bold mb-1">99.9%</div>
          <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">System Uptime</div>
        </div>
        <div className="glass-card p-6 rounded-3xl group hover:border-accent/30 transition-all duration-300">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
            <Clock className="text-accent" size={24} />
          </div>
          <div className="text-3xl font-bold mb-1">12ms</div>
          <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Avg. Latency</div>
        </div>
      </section>

      {/* Deployments List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Rocket className="text-primary" size={20} />
            Recent Activity
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Filter instances..."
              className="bg-white/5 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/30 transition-colors w-64"
            />
          </div>
        </div>

        <div className="grid gap-6">
          {deployments.length === 0 && !loading ? (
            <div className="glass-card p-12 rounded-3xl text-center border-dashed border-white/10">
              <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="text-gray-500" size={32} />
              </div>
              <p className="text-gray-400">No deployments found. Start by creating a new one!</p>
            </div>
          ) : (
            deployments.map((deployment) => (
              <DeploymentCard key={deployment.id} deployment={deployment} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}