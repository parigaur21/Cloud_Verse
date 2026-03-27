import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-background text-gray-100 selection:bg-primary/30 relative overflow-hidden">
      {/* Dynamic Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30 mix-blend-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover background-video"
          src="https://assets.codepen.io/3364143/7btrrd.mp4"
        ></video>
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