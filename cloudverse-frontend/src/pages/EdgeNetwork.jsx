import { Globe, Zap, Shield, BarChart3, MapPin } from "lucide-react";

export default function EdgeNetwork() {
  const regions = [
    { name: "North America (Washington)", code: "iad1", status: "Optimal", ping: "4ms" },
    { name: "Europe (Frankfurt)", code: "fra1", status: "Optimal", ping: "28ms" },
    { name: "Asia Pacific (Tokyo)", code: "hnd1", status: "Congested", ping: "142ms" },
    { name: "South America (São Paulo)", code: "gru1", status: "Optimal", ping: "56ms" },
  ];

  return (
    <div className="space-y-12">
      <header className="pb-8 border-b border-border">
        <h2 className="text-3xl font-bold tracking-tighter mb-1 text-white">Edge Network</h2>
        <p className="text-gray-400 text-sm">Global distribution and traffic optimization across our edge nodes.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Globe, label: "Points of Presence", value: "142" },
          { icon: Zap, label: "Edge Requests", value: "42.8M" },
          { icon: Shield, label: "DDoS Mitigations", value: "12,042" },
          { icon: BarChart3, label: "Cache Hit Ratio", value: "98.2%" },
        ].map((stat, i) => (
          <div key={i} className="vercel-card p-6 border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-2 text-gray-500 mb-4 uppercase text-[10px] font-bold tracking-widest">
              <stat.icon size={14} />
              <span>{stat.label}</span>
            </div>
            <div className="text-3xl font-bold text-white tabular-nums">{stat.value}</div>
          </div>
        ))}
      </section>

      <div className="vercel-card p-8 border-white/5 bg-white/[0.02]">
        <h3 className="text-xl font-semibold text-white mb-6">Regional Performance</h3>
        <div className="space-y-4">
          {regions.map((region) => (
            <div key={region.code} className="flex items-center justify-between p-4 bg-black border border-border rounded-vercel group hover:border-white/20 transition-colors">
              <div className="flex items-center gap-4">
                <MapPin size={18} className="text-gray-500" />
                <div>
                  <div className="font-medium text-white">{region.name}</div>
                  <div className="text-[10px] text-gray-500 font-mono">{region.code.toUpperCase()}</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-xs text-gray-400 uppercase tracking-widest">Latency</div>
                  <div className="text-sm font-medium text-primary tabular-nums">{region.ping}</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-success border border-success/20">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  {region.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
