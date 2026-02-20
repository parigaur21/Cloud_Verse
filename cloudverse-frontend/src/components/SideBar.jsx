import { LayoutDashboard, Rocket, FileText, BarChart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const baseStyle =
    "flex items-center gap-3 p-3 rounded-lg transition";

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6">
      <h1 className="text-2xl font-bold mb-8 text-blue-500">
        CloudForge
      </h1>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/deployments"
          className={({ isActive }) =>
            `${baseStyle} ${
              isActive
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-800 text-gray-300"
            }`
          }
        >
          <Rocket size={18} />
          Deployments
        </NavLink>
      </nav>
    </aside>
  );
}