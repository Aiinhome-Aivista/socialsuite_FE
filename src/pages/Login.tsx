import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("My Workspace");
  const [error, setError] = useState("");

  async function submit() {
    setError("");
    try {
      const res =
        mode === "login"
          ? await api.login({ email, password })
          : await api.register({ email, password, organization_name: orgName });
      setToken(res.access_token);
      navigate("/dashboard");
    } catch (e: any) {
      setError(e.message);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="mb-1 text-2xl font-bold">Social Suite</h1>
        <p className="mb-6 text-sm text-neutral-500">
          {mode === "login" ? "Sign in to your workspace" : "Create a workspace"}
        </p>

        {mode === "register" && (
          <input
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Workspace name"
            className="mb-3 w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-3 w-full rounded-lg border border-neutral-300 px-3 py-2"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full rounded-lg border border-neutral-300 px-3 py-2"
        />

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        <button
          onClick={submit}
          className="w-full rounded-lg bg-indigo-600 py-2 font-medium text-white"
        >
          {mode === "login" ? "Sign in" : "Create workspace"}
        </button>

        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="mt-4 w-full text-sm text-indigo-600"
        >
          {mode === "login" ? "Need an account? Register" : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
