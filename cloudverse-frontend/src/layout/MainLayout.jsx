import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-background text-gray-100 selection:bg-primary/30 relative overflow-hidden">
      {/* Dynamic Background Video - Cyberpunk Car Loop via YouTube */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 mix-blend-screen filter saturate-150">
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 border-none"
          src="https://www.youtube-nocookie.com/embed/W0LHTWG-UmQ?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&playlist=W0LHTWG-UmQ"
          allow="autoplay; encrypted-media"
          title="Cyberpunk Loop"
        ></iframe>
      </div>

      {/* Animated Background Mesh and Glowing Blobs */}
      <div className="absolute inset-0 z-0 bg-mesh pointer-events-none opacity-40 mix-blend-overlay"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob z-0 pointer-events-none"></div>
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[40%] bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000 z-0 pointer-events-none"></div>

      <div className="z-10 bg-black/60 backdrop-blur-3xl border-r border-border shadow-2xl">
        <Sidebar />
      </div>
      
      <main className="flex-1 overflow-y-auto z-10 relative">
        <div className="max-w-[1400px] mx-auto p-8 lg:p-12 animate-fade-in-up">
          <Outlet />
        </div>
      </main>
    </div>
  );
}