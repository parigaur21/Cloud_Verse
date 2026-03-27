import { X, Github, Upload, FolderUp, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

export default function DeploymentModal({ isOpen, onClose, onDeploy }) {
  const [name, setName] = useState("");
  const [mode, setMode] = useState(null); // null | 'github' | 'upload'
  const [githubUrl, setGithubUrl] = useState("");
  const [files, setFiles] = useState(null);
  const [deploying, setDeploying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deployName = name.trim() || (githubUrl ? githubUrl.split("/").pop() : "my-project");
    if (!deployName) return;

    setDeploying(true);
    try {
      await onDeploy(deployName, { mode, githubUrl, files });
    } finally {
      setDeploying(false);
      setName("");
      setGithubUrl("");
      setFiles(null);
      setMode(null);
      onClose();
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    if (!name && e.target.files?.length) {
      // Try to infer name from folder
      const firstFile = e.target.files[0];
      const parts = firstFile.webkitRelativePath?.split("/") || [];
      if (parts.length > 1) setName(parts[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in-up">
      <div className="vercel-card w-full max-w-lg bg-card border border-border/50 shadow-[0_0_60px_rgba(0,112,243,0.15)] relative overflow-hidden">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            New <span className="text-gradient">Deployment</span>
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Mode Selection (if no mode chosen) */}
        {!mode && (
          <div className="p-6 space-y-4">
            <p className="text-gray-400 text-sm mb-4">Choose how you want to deploy your project:</p>

            <button
              onClick={() => setMode("github")}
              className="w-full group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Github size={24} className="text-white" />
              </div>
              <div className="text-left flex-1">
                <h4 className="text-white font-bold text-base">Import from GitHub</h4>
                <p className="text-gray-500 text-xs">Clone a repository and deploy automatically</p>
              </div>
              <ArrowRight size={18} className="text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </button>

            <button
              onClick={() => setMode("upload")}
              className="w-full group flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Upload size={24} className="text-white" />
              </div>
              <div className="text-left flex-1">
                <h4 className="text-white font-bold text-base">Upload Project Folder</h4>
                <p className="text-gray-500 text-xs">Drag & drop or browse your local files</p>
              </div>
              <ArrowRight size={18} className="text-gray-600 group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        )}

        {/* GitHub Import Form */}
        {mode === "github" && (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <button
              type="button"
              onClick={() => setMode(null)}
              className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 mb-2"
            >
              ← Back to options
            </button>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                GitHub Repository URL
              </label>
              <div className="relative">
                <Github size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                  autoFocus
                  type="url"
                  placeholder="https://github.com/user/repo"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full bg-black/50 border border-border/50 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,112,243,0.3)] transition-all placeholder:text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                Project Name (optional)
              </label>
              <input
                type="text"
                placeholder="Auto-detected from repo name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/50 border border-border/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,112,243,0.3)] transition-all placeholder:text-gray-700"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button type="button" onClick={onClose} className="flex-1 vercel-button-outline py-3 text-sm">
                Cancel
              </button>
              <button
                type="submit"
                disabled={deploying || !githubUrl.trim()}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl text-sm disabled:opacity-50 flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(0,112,243,0.4)]"
              >
                {deploying ? <Loader2 size={16} className="animate-spin" /> : <Github size={16} />}
                {deploying ? "Deploying..." : "Import & Deploy"}
              </button>
            </div>
          </form>
        )}

        {/* Upload Form */}
        {mode === "upload" && (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <button
              type="button"
              onClick={() => setMode(null)}
              className="text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1 mb-2"
            >
              ← Back to options
            </button>

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
                className="w-full bg-black/50 border border-border/50 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(0,112,243,0.3)] transition-all placeholder:text-gray-700"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                Upload Project Folder
              </label>
              <label className="group flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 hover:border-accent/40 rounded-xl bg-white/[0.02] hover:bg-accent/5 transition-all cursor-pointer">
                <FolderUp size={32} className="text-gray-600 group-hover:text-accent transition-colors mb-2" />
                <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                  {files ? `${files.length} files selected` : "Click to select folder"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  webkitdirectory="true"
                  directory="true"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button type="button" onClick={onClose} className="flex-1 vercel-button-outline py-3 text-sm">
                Cancel
              </button>
              <button
                type="submit"
                disabled={deploying || !name.trim()}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl text-sm disabled:opacity-50 flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(121,40,202,0.4)]"
              >
                {deploying ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {deploying ? "Deploying..." : "Upload & Deploy"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
