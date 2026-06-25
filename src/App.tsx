import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "./lib/api";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Composer from "./pages/Composer";
import Calendar from "./pages/Calendar";
import Connectors from "./pages/Connectors";
import Analytics from "./pages/Analytics";

function RequireAuth({ children }: { children: React.ReactNode }) {
  return getToken() ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/composer" element={<Composer />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/connectors" element={<Connectors />} />
        <Route path="/analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}
