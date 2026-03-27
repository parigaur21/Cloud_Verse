import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Deployments from "./pages/Deployments";
import Settings from "./pages/Settings";
import EdgeNetwork from "./pages/EdgeNetwork";
import Auth from "./pages/Auth";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  return (
    <>
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }} 
      />
      <BrowserRouter>
        <Routes>
          {/* Landing page — no sidebar/layout */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Route */}
          <Route path="/auth" element={<Auth />} />

          {/* Dashboard area — with sidebar layout */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/edge-network" element={<EdgeNetwork />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;