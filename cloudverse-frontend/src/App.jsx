import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Deployments from "./pages/Deployments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deployments" element={<Deployments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;