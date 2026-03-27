import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Github, Upload, Globe, Rocket, ArrowRight, Terminal, Shield, Cpu, Moon, Sun } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const isLight = localStorage.getItem("theme") === "light";
    if (isLight) document.body.classList.add("light-mode");
    return !isLight;
  });

  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.add("light-mode");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white overflow-hidden relative theme-container">
      {/* Dynamic Native Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-black/60 z-10 mix-blend-multiply"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-50"
          src="https://cdn.coverr.co/videos/coverr-server-room-1-2950/1080p.mp4"
        ></video>
      </div>

      {/* Mesh gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-mesh pointer-events-none opacity-60"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob z-[1] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-accent/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000 z-[1] pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-8 lg:px-16 py-6">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/50 blur-xl rounded-full"></div>
            <Zap className="text-white fill-white relative z-10" size={28} />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">
            Cloud<span className="text-gradient">Verse</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-white transition-colors border border-white/10 rounded-full hover:bg-white/10 backdrop-blur-md hidden sm:block"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="https://github.com/parigaur21/CloudVerse" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            Docs
          </a>
          <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            Features
          </a>
          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/20 backdrop-blur-md transition-all"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-20 flex flex-col items-center justify-center text-center px-8 pt-20 pb-32">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md text-xs font-semibold text-primary mb-8">
            <Rocket size={14} />
            Now in Public Beta — Deploy for Free
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
            <span className="text-white">Deploy.</span>{" "}
            <span className="text-gradient">Scale.</span>{" "}
            <span className="text-white">Dominate.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            The next-generation cloud platform for deploying full-stack applications in seconds.
            Import from <span className="text-white font-semibold">GitHub</span> or upload your project manually.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => navigate("/auth")}
              className="px-8 py-3.5 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-[0_0_30px_rgba(0,112,243,0.4)] hover:shadow-[0_0_50px_rgba(0,112,243,0.6)] transition-all text-base flex items-center gap-2 group"
            >
              Get Started Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-3.5 bg-white/5 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-md hover:bg-white/10 transition-all text-base flex items-center gap-2"
            >
              <Terminal size={18} />
              View Dashboard
            </button>
          </div>
        </div>

        {/* Floating Terminal Mockup */}
        <div className="relative max-w-3xl w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-blue-500 rounded-2xl blur-lg opacity-30 animate-pulse-slow"></div>
          <div className="relative bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-3 text-xs text-gray-500 font-mono">cloudverse deploy</span>
            </div>
            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm space-y-2">
              <div className="flex gap-2">
                <span className="text-green-400">$</span>
                <span className="text-gray-300">cloudverse deploy --repo github.com/user/my-app</span>
              </div>
              <div className="text-gray-500">⏳  Cloning repository...</div>
              <div className="text-gray-500">📦  Installing dependencies...</div>
              <div className="text-gray-500">🔨  Building project...</div>
              <div className="text-gray-500">🧪  Running tests...</div>
              <div className="text-blue-400">🚀  Pushing to edge nodes...</div>
              <div className="text-green-400 font-semibold mt-2">
                ✅  Deployed! → https://my-app.cloudverse.io
              </div>
              <div className="flex gap-2 mt-3">
                <span className="text-green-400">$</span>
                <span className="text-gray-600 animate-pulse">▌</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-20 px-8 lg:px-16 py-24">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white">
            Everything you need to <span className="text-gradient">ship fast</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">Deploy any framework, any language. Zero configuration required.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: Github,
              title: "GitHub Import",
              desc: "Connect your repository and deploy with every push. Automatic CI/CD pipeline built-in.",
              gradient: "from-blue-500 to-cyan-400",
            },
            {
              icon: Upload,
              title: "Manual Upload",
              desc: "Drag and drop your project folder. We auto-detect frameworks and configure builds.",
              gradient: "from-primary to-accent",
            },
            {
              icon: Globe,
              title: "Global Edge CDN",
              desc: "Deploy to 30+ edge locations worldwide. Sub-millisecond latency for your users.",
              gradient: "from-purple-500 to-pink-400",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,112,243,0.15)] cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Additional Feature Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
          {[
            {
              icon: Shield,
              title: "Enterprise Security",
              desc: "SSL certificates, DDoS protection, and SOC 2 compliance out of the box.",
              gradient: "from-green-500 to-emerald-400",
            },
            {
              icon: Cpu,
              title: "AI DevOps Assistant",
              desc: "Built-in AI that analyzes your deployment logs and suggests optimizations.",
              gradient: "from-orange-500 to-amber-400",
            },
            {
              icon: Terminal,
              title: "Live Terminal",
              desc: "Real-time build logs and deployment monitoring with zero latency.",
              gradient: "from-red-500 to-rose-400",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,112,243,0.15)] cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 px-8 lg:px-16 py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white">
            Ready to go <span className="text-gradient">live</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-10">Start deploying for free. No credit card required.</p>
          <button
            onClick={() => navigate("/auth")}
            className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white text-lg font-bold rounded-xl shadow-[0_0_40px_rgba(0,112,243,0.5)] hover:shadow-[0_0_60px_rgba(0,112,243,0.7)] transition-all flex items-center gap-3 mx-auto group"
          >
            Start Deploying Now
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 px-8 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            <span className="text-sm text-gray-500">© 2026 CloudVerse. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
