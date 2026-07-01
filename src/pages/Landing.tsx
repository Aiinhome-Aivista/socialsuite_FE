
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Activity, Globe, Zap } from "lucide-react";
import { getToken } from "../lib/api";
import HeroShowcase from "./HeroShowcase"; // adjust path to wherever you place the file
import WorkflowSection from "./Workflowsection"; // adjust path to wherever you place the file
import WhySection from "./WhySection"; // adjust path to wherever you place the file
import Footer from "./Footer"; // adjust path to wherever you place the file

export default function Landing() {
  const isLoggedIn = !!getToken();

  return (
    <div className="min-h-screen bg-neutral-50 overflow-hidden relative font-sans">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px] translate-y-1/3"></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-md border-b border-gray-200/60 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">SocialSuite</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/pricing" className="text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            {isLoggedIn ? (
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm border border-gray-200 transition-all hover:bg-gray-50 hover:shadow-md hover:scale-105">
                Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link to="/login" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* spacer so fixed nav doesn't overlap content below it */}
      <div className="h-[56px]" />

      {/* NEW: animated showcase section, just below navbar */}
      <HeroShowcase />

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-32 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-indigo-100 backdrop-blur-md mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
          <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">The next generation of social management</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
          Manage all your socials <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            in one beautiful space.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-medium">
          Create, schedule, and analyze your content across all major platforms with our AI-powered suite. Stop juggling tabs and start growing your audience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={isLoggedIn ? "/dashboard" : "/login"} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-base font-bold text-white shadow-xl shadow-gray-900/20 transition-all hover:bg-gray-800 hover:shadow-2xl hover:shadow-gray-900/30 hover:-translate-y-1">
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
          <a href="#features" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-gray-700 shadow-sm border border-gray-200 transition-all hover:bg-gray-50 hover:shadow-md">
            Explore Features
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 pb-32 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-150">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-indigo-900/5 border border-white/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Universal Connectors</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Link your Facebook, Instagram, X, LinkedIn, Pinterest and YouTube seamlessly.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-indigo-900/5 border border-white/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 group">
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Creation</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Generate captivating captions, tags, and media instantly tailored for each platform.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-indigo-900/5 border border-white/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Deep Analytics</h3>
            <p className="text-gray-600 font-medium leading-relaxed">Track your growth with beautiful, easy-to-understand metrics and consolidated dashboards.</p>
          </div>
        </div>
      </div>

      {/* NEW: alternating "One suite. Every social workflow." rows */}
      <WorkflowSection />

      {/* NEW: "Why SocialSuite?" 3-column section */}
      <WhySection />
      <Footer />
    </div>
  );
}