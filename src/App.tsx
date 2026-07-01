import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { getToken } from "./lib/api";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Composer from "./pages/Composer";
import Calendar from "./pages/Calendar";
import Connectors from "./pages/Connectors";
import Analytics from "./pages/Analytics";
import AIAnalysis from "./pages/AIAnalysis";
import Pricing from "./pages/Pricing"; 
import PrivacyPolicy from "./pages/Privacypolicy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/Cookiepolicy";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  return getToken() ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/composer" element={<Composer />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/connectors" element={<Connectors />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ai-analysis" element={<AIAnalysis />} />
        </Route>
      </Routes>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: '!rounded-xl !shadow-lg !font-medium !text-sm',
          duration: 4000,
        }}
      />
    </>
  );
}
