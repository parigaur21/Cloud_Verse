import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Github, Terminal, ArrowRight, Mail, Lock, User } from "lucide-react";
import toast from "react-hot-toast";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for premium feel
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", isLogin ? "Developer" : name);
      toast.success(isLogin ? "Welcome back to CloudVerse!" : "Account created successfully!", {
        icon: '🚀'
      });
      navigate("/dashboard");
    }, 1500);
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", "GitHub User");
      toast.success("Authenticated with GitHub!", { icon: '🐙' });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-mesh pointer-events-none opacity-40"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob z-[1] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-accent/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000 z-[1] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Logo Header */}
        <div onClick={() => navigate("/")} className="flex items-center justify-center gap-2 mb-10 cursor-pointer group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/50 blur-xl rounded-full group-hover:bg-primary/80 transition-colors"></div>
            <Zap className="text-white fill-white relative z-10" size={32} />
          </div>
          <span className="text-3xl font-extrabold tracking-tight">
            Cloud<span className="text-gradient">Verse</span>
          </span>
        </div>

        {/* Auth Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,112,243,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Initialize Account"}
            </h2>
            <p className="text-gray-400 text-sm">
              {isLogin ? "Access your deployments and analytics." : "Join the next generation of cloud orchestration."}
            </p>
          </div>

          <button 
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-medium transition-all mb-6 disabled:opacity-50"
          >
            {isLoading ? (
              <Terminal size={18} className="animate-pulse" />
            ) : (
              <Github size={18} />
            )}
            {isLoading ? "Authenticating..." : "Continue with GitHub"}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">Or execute</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Developer Name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="email" 
                placeholder="developer@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="password" 
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-gray-600"
              />
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_30px_rgba(0,112,243,0.5)] transition-all flex items-center justify-center gap-2 group mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Executing..." : (isLogin ? "Initialize Session" : "Deploy Account")}
              {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? " : "Already initialized? "}
              <span className="text-primary font-semibold">{isLogin ? "Sign Up" : "Log In"}</span>
            </button>
          </div>
        </div>
        
        <div className="text-center mt-6 text-xs text-gray-600 font-mono">
          <Terminal size={12} className="inline mr-1" />
          System secured via End-to-End JWT Encryption
        </div>
      </div>
    </div>
  );
}
