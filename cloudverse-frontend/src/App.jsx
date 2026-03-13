import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Deployments from "./pages/Deployments";
import Settings from "./pages/Settings";
import EdgeNetwork from "./pages/EdgeNetwork";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/edge-network" element={<EdgeNetwork />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;