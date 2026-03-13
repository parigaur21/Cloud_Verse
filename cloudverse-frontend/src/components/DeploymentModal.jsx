import { X } from "lucide-react";
import { useState } from "react";

export default function DeploymentModal({ isOpen, onClose, onDeploy }) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onDeploy(name);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="vercel-card w-full max-w-md bg-card border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-xl font-semibold text-white">Create New Deployment</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              Project Name
            </label>
            <input
              autoFocus
              type="text"
              placeholder="e.g. my-awesome-app"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-border rounded-vercel py-3 px-4 text-sm text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-700"
            />
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 vercel-button-outline py-3 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 vercel-button py-3 text-sm"
            >
              Deploy Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
