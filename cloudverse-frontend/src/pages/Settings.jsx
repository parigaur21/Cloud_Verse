import { Settings as SettingsIcon, Shield, Bell, User, Cloud, Database } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-12">
      <header className="pb-8 border-b border-border">
        <h2 className="text-3xl font-bold tracking-tighter mb-1 text-white">Project Settings</h2>
        <p className="text-gray-400 text-sm">Configure your workspace environment and security.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <aside className="space-y-6">
          <nav className="space-y-1">
            {["General", "Security", "Notifications", "Billing", "Team"].map((item) => (
              <button
                key={item}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-vercel transition-colors ${item === "General" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                {item === "General" && <SettingsIcon size={16} />}
                {item === "Security" && <Shield size={16} />}
                {item === "Notifications" && <Bell size={16} />}
                {item === "Team" && <User size={16} />}
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <section className="lg:col-span-2 space-y-8">
          <div className="vercel-card p-6 border-white/5 bg-white/[0.02]">
            <h3 className="text-lg font-semibold text-white mb-6">Environment Variables</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-black border border-border rounded-vercel">
                <code className="text-sm text-primary">DATABASE_URL</code>
                <span className="text-gray-600 text-xs">••••••••••••••••</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-black border border-border rounded-vercel">
                <code className="text-sm text-primary">API_SECRET_KEY</code>
                <span className="text-gray-600 text-xs">••••••••••••••••</span>
              </div>
              <button className="vercel-button-outline text-xs mt-2">Add Variable</button>
            </div>
          </div>

          <div className="vercel-card p-6 border-white/5 bg-white/[0.02]">
            <h3 className="text-lg font-semibold text-white mb-4 italic">Danger Zone</h3>
            <p className="text-gray-400 text-sm mb-6">Permanently delete this project and all of its deployments. This action is not reversible.</p>
            <button className="px-4 py-2 border border-error/20 bg-error/10 text-error text-xs font-bold rounded-vercel hover:bg-error/20 transition-all">
              Delete Project
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
