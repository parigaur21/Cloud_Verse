import { useEffect, useState } from "react";
import { createDeployment, getDeployments } from "../services/api";
import DeploymentCard from "../components/DeploymentCard";

export default function Deployments() {
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    fetchDeployments();
    const interval = setInterval(fetchDeployments, 2000);
    return () => clearInterval(interval);
  }, []);

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
          <DeploymentCard
            key={deployment.id}
            deployment={deployment}
          />
        ))}
      </div>
    </div>
  );
}