import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen text-gray-100 selection:bg-primary/30">
      <Sidebar />
      <main className="flex-1 p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}