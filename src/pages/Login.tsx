import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Mail, Lock, Building, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { api, setToken } from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("My Workspace");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!email || !password || (mode === "register" && !orgName)) {
      setError("Please fill in all fields.");
      return;
    }
    
    setError("");
    setLoading(true);
    
    try {
      if (mode === "login") {
        const res = await api.login({ email, password });
        setToken(res.access_token);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        await api.register({ email, password, organization_name: orgName });
        toast.success("Workspace created successfully! Please sign in.");
        setMode("login");
        setPassword("");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 overflow-hidden relative font-sans flex items-center justify-center p-4">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px] translate-y-1/3 pointer-events-none"></div>

      {/* Back to Home */}
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors z-20 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:shadow-md">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg shadow-indigo-500/30 mb-4 inline-flex">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">SocialSuite</h1>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            {mode === "login" ? "Welcome back! Please enter your details." : "Create your workspace and get started."}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white p-8 shadow-xl shadow-indigo-900/5 transition-all">
          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Workspace Name</label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full rounded-xl border border-gray-200 bg-white/50 pl-10 pr-4 py-3 text-sm font-medium text-gray-900 shadow-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-white/50 pl-10 pr-4 py-3 text-sm font-medium text-gray-900 shadow-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-200 bg-white/50 pl-10 pr-4 py-3 text-sm font-medium text-gray-900 shadow-sm outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-gray-400"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-100">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-900/20 disabled:opacity-70 disabled:hover:translate-y-0 mt-6"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full transition-transform group-hover:translate-y-0"></div>
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <span className="relative z-10">{mode === "login" ? "Sign In" : "Create Workspace"}</span>
                  <ArrowRight className="relative z-10 h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-gray-500">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
              }}
              className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              {mode === "login" ? "Register here" : "Sign in here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
