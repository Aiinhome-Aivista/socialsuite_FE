import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Mail, Lock, Building, ArrowRight, AlertCircle, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { api, setToken } from "../lib/api";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// --- Validation helpers ---
function validateEmail(email: string): string {
  if (!email) return "Email is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address.";
  return "";
}

function validatePassword(password: string, isRegister: boolean): string {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (isRegister) {
    if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
    if (!/[0-9]/.test(password)) return "Password must include a number.";
    if (!/[^A-Za-z0-9]/.test(password)) return "Password must include a special character.";
  }
  return "";
}

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Field-level errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // Track whether user has interacted with a field (blur = touched)
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  function handleEmailChange(value: string) {
    setEmail(value);
    if (emailTouched) setEmailError(validateEmail(value));
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    if (passwordTouched) setPasswordError(validatePassword(value, mode === "register"));
  }

  async function submit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    // Run validations
    const eErr = validateEmail(email);
    const pErr = validatePassword(password, mode === "register");
    setEmailError(eErr);
    setPasswordError(pErr);
    setEmailTouched(true);
    setPasswordTouched(true);

    if (eErr || pErr) return;

    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await api.login({ email, password });
        setToken(res.access_token);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        await api.register({ email, password, organization_name: "My Workspace" });
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

  async function handleGoogleSuccess(credentialResponse: any) {
    if (!credentialResponse.credential) return;
    try {
      setLoading(true);
      const res = await api.googleLogin({ credential: credentialResponse.credential });
      setToken(res.access_token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  // Shared input classes — adds red border when there's a validation error
  const inputBase =
    "w-full rounded-xl bg-white/50 pl-10 pr-4 py-3 text-sm font-medium text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400";
  const inputNormal = `${inputBase} border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10`;
  const inputError = `${inputBase} border-2 border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10`;

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || ""}>
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

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${emailError ? "text-red-400" : "text-gray-400"}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    onBlur={() => { setEmailTouched(true); setEmailError(validateEmail(email)); }}
                    placeholder="you@example.com"
                    className={emailError ? inputError : inputNormal}
                  />
                </div>
                {emailError && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Password</label>
                <div className="relative">
                  <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${passwordError ? "text-red-400" : "text-gray-400"}`} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    onBlur={() => { setPasswordTouched(true); setPasswordError(validatePassword(password, mode === "register")); }}
                    placeholder="••••••••"
                    className={passwordError ? inputError : inputNormal}
                  />
                </div>
                {passwordError && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    {passwordError}
                  </p>
                )}
                {mode === "register" && !passwordError && (
                  <p className="mt-1.5 text-xs text-gray-400">
                    Min 8 characters with uppercase, lowercase, number &amp; special character.
                  </p>
                )}
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
                    <span className="relative z-10">{mode === "login" ? "Sign In" : "Sign Up"}</span>
                    <ArrowRight className="relative z-10 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-300 after:mt-0.5 after:flex-1 after:border-t after:border-gray-300">
              <p className="mx-4 mb-0 text-center font-semibold text-gray-500">OR</p>
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google sign-in was unsuccessful.")}
                useOneTap
                theme="outline"
                size="large"
                shape="pill"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-gray-500">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setMode(mode === "login" ? "register" : "login");
                  setError("");
                  setEmailError("");
                  setPasswordError("");
                  setEmailTouched(false);
                  setPasswordTouched(false);
                }}
                className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                {mode === "login" ? "Register here" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

