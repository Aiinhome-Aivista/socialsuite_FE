import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Activity, Globe, Zap, Sun, Moon } from "lucide-react";
import { getToken } from "../lib/api";
import HeroShowcase from "./HeroShowcase"; // adjust path to wherever you place the file
import WorkflowSection from "./Workflowsection"; // adjust path to wherever you place the file
import WhySection from "./WhySection"; // adjust path to wherever you place the file
import Footer from "./Footer"; // adjust path to wherever you place the file

export default function Landing() {
  const isLoggedIn = !!getToken();
  const [isDark, setIsDark] = useState(false);



  const [showFeatures, setShowFeatures] = useState(false);
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const el = document.getElementById("hero-title");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!headerVisible) {
      setText1("");
      setText2("");
      setShowCursor(true);
      return;
    }

    const line1 = "Manage all your socials";
    const line2 = "in one beautiful space.";
    
    let i = 0;
    let j = 0;
    let timer: any;
    let cursorTimer: any;
    
    const typeLine1 = () => {
      if (i < line1.length) {
        setText1(line1.substring(0, i + 1));
        i++;
        timer = setTimeout(typeLine1, 45); // 45ms per character
      } else {
        timer = setTimeout(typeLine2, 120); // short break
      }
    };
    
    const typeLine2 = () => {
      if (j < line2.length) {
        setText2(line2.substring(0, j + 1));
        j++;
        timer = setTimeout(typeLine2, 50); // 50ms per character
      } else {
        cursorTimer = setTimeout(() => setShowCursor(false), 2000);
      }
    };
    
    timer = setTimeout(typeLine1, 150); // initial delay
    
    return () => {
      clearTimeout(timer);
      clearTimeout(cursorTimer);
    };
  }, [headerVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFeatures(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );

    const el = document.getElementById("features");
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".gsap-fade-header",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Opacity curve: 20% -> 100% -> 10%
    tl.set(".gsap-fade-header", { opacity: 0.2 })
      .to(".gsap-fade-header", { opacity: 1.0, ease: "none" })
      .to(".gsap-fade-header", { opacity: 0.1, ease: "none" });
  }, []);

  return (
    <div className={`min-h-screen relative font-sans transition-all duration-[800ms] ease-in-out hero-section-transition overflow-hidden ${isDark ? "bg-slate-950 text-white dark-mode-active" : "bg-neutral-50 text-gray-900"}`}>
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
            {/* Theme Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full border transition-all duration-300 shadow-sm ${isDark
                ? "bg-neutral-800 border-neutral-700 text-gray-200 hover:bg-neutral-700 hover:shadow-md"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-md"
                }`}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-600" />
              )}
            </button>

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

      {/* Section 1: Animated Mockup Showcase */}
      <HeroShowcase isDark={isDark} />

      {/* Section 2: Hero Content & Feature Highlights */}
      <div className="w-full bg-gradient-to-br from-slate-50 via-slate-100/80 to-indigo-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950/20 border-y border-gray-200/70 dark:border-neutral-800/60 py-20 transition-colors duration-[800ms]">
        {/* Hero Text Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-slate-900/60 border border-indigo-100/60 dark:border-slate-800/60 backdrop-blur-md mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600">The next generation of social management</span>
          </div>

          <h1 id="hero-title" className="gsap-fade-header text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8 min-h-[110px] md:min-h-[175px] text-left md:text-center">
            {text1}
            {text1 && <br className="hidden md:block" />}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-gradient-animated">
              {text2}
            </span>
            {showCursor && (
              <span className="inline-block w-[4px] h-[0.8em] bg-indigo-600 dark:bg-indigo-400 ml-1.5 animate-pulse align-baseline"></span>
            )}
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

        {/* Features Cards Grid */}
        <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 mt-28">
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-indigo-900/5 border border-white/50 dark:border-slate-800/40 transition-all duration-[900ms] ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 group ${
                showFeatures ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Universal Connectors</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Link your Facebook, Instagram, X, LinkedIn, Pinterest and YouTube seamlessly.</p>
            </div>

            <div 
              className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-indigo-900/5 border border-white/50 dark:border-slate-800/40 transition-all duration-[900ms] ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 group ${
                showFeatures ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Creation</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Generate captivating captions, tags, and media instantly tailored for each platform.</p>
            </div>

            <div 
              className={`bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-indigo-900/5 border border-white/50 dark:border-slate-800/40 transition-all duration-[900ms] ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-900/10 group ${
                showFeatures ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Activity className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Deep Analytics</h3>
              <p className="text-gray-600 font-medium leading-relaxed">Track your growth with beautiful, easy-to-understand metrics and consolidated dashboards.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Workflow alternations block */}
      <div className="w-full py-28 bg-gradient-to-tr from-indigo-50 via-purple-50/30 to-pink-50/20 dark:from-indigo-950/30 dark:via-purple-950/10 dark:to-slate-950 border-b border-indigo-100/60 dark:border-neutral-800/40 transition-colors duration-[800ms]">
        <WorkflowSection />
      </div>

      {/* Section 4: Why SocialSuite block */}
      <div className="w-full py-28 bg-white dark:bg-neutral-900 transition-colors duration-[800ms]">
        <WhySection />
      </div>
      <Footer />

      {/* Dynamic Landing Page Theme Transitions */}
      <style>{`
        .hero-section-transition {
          transition: background-color 0.8s ease-in-out, color 0.8s ease-in-out, border-color 0.8s ease-in-out;
        }
        nav {
          transition: background-color 0.8s ease-in-out, border-color 0.8s ease-in-out;
        }
        .dark-mode-active nav {
          background-color: rgba(3, 7, 18, 0.85) !important;
          border-color: rgba(75, 85, 99, 0.2) !important;
        }
        .dark-mode-active nav span.text-gray-900,
        .dark-mode-active nav a.text-gray-700 {
          color: #f3f4f6 !important;
        }
        .dark-mode-active nav a.text-gray-700:hover {
          color: #ffffff !important;
        }
        h1, h2, h3, h4, h5, h6, p, span, a {
          transition: color 0.8s ease-in-out;
        }
        .dark-mode-active .text-gray-900,
        .dark-mode-active .text-slate-900,
        .dark-mode-active .text-zinc-900,
        .dark-mode-active .text-neutral-900,
        .dark-mode-active .text-black {
          color: #ffffff !important;
        }
        .dark-mode-active .text-gray-800,
        .dark-mode-active .text-slate-800,
        .dark-mode-active .text-zinc-800,
        .dark-mode-active .text-neutral-800 {
          color: #f1f5f9 !important;
        }
        .dark-mode-active .text-gray-700,
        .dark-mode-active .text-slate-700,
        .dark-mode-active .text-zinc-700,
        .dark-mode-active .text-neutral-700,
        .dark-mode-active .text-gray-600,
        .dark-mode-active .text-slate-600,
        .dark-mode-active .text-zinc-600,
        .dark-mode-active .text-neutral-600 {
          color: #e2e8f0 !important;
        }
        .dark-mode-active .text-gray-500,
        .dark-mode-active .text-slate-500,
        .dark-mode-active .text-zinc-500,
        .dark-mode-active .text-neutral-500,
        .dark-mode-active .text-gray-400,
        .dark-mode-active .text-slate-400,
        .dark-mode-active .text-zinc-400,
        .dark-mode-active .text-neutral-400 {
          color: #cbd5e1 !important;
        }
        .dark-mode-active .border-gray-200 {
          border-color: rgba(75, 85, 99, 0.2) !important;
        }
        /* Mock cards inside showcase should retain white bg in dark mode */
        .dark-mode-active .hero-float .bg-white,
        .dark-mode-active .lg\\:hidden .bg-white {
          background-color: #ffffff !important;
          border-color: #e2e8f0 !important;
          color: #0f172a !important;
        }
        /* Premium Features Cards in Dark Mode */
        .dark-mode-active #features div.grid > div {
          background-color: #111827 !important;
          border-color: rgba(75, 85, 99, 0.25) !important;
          color: #ffffff !important;
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease, background-color 0.4s ease;
        }
        .dark-mode-active #features div.grid > div h3 {
          color: #ffffff !important;
        }
        .dark-mode-active #features div.grid > div p {
          color: #9ca3af !important;
        }
        .dark-mode-active #features div.grid > div:nth-child(1) .bg-blue-50 {
          background-color: rgba(59, 130, 246, 0.15) !important;
          color: #60a5fa !important;
        }
        .dark-mode-active #features div.grid > div:nth-child(2) .bg-purple-50 {
          background-color: rgba(168, 85, 247, 0.15) !important;
          color: #c084fc !important;
        }
        .dark-mode-active #features div.grid > div:nth-child(3) .bg-emerald-50 {
          background-color: rgba(16, 185, 129, 0.15) !important;
          color: #34d399 !important;
        }
        .dark-mode-active #features div.grid > div:nth-child(1):hover {
          border-color: rgba(59, 130, 246, 0.5) !important;
          box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.25), 0 0 15px 0 rgba(59, 130, 246, 0.15) !important;
        }
        .dark-mode-active #features div.grid > div:nth-child(2):hover {
          border-color: rgba(168, 85, 247, 0.5) !important;
          box-shadow: 0 20px 25px -5px rgba(168, 85, 247, 0.25), 0 0 15px 0 rgba(168, 85, 247, 0.15) !important;
        }
        .dark-mode-active #features div.grid > div:nth-child(3):hover {
          border-color: rgba(16, 185, 129, 0.5) !important;
          box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.25), 0 0 15px 0 rgba(16, 185, 129, 0.15) !important;
        }
        .dark-mode-active .border-indigo-100\/60 {
          border-color: rgba(99, 102, 241, 0.3) !important;
        }
        .dark-mode-active .bg-white\/60 {
          background-color: rgba(99, 102, 241, 0.1) !important;
        }
        .dark-mode-active .bg-pink-500 {
          background-color: #ec4899 !important;
        }
        
        .dark-mode-active section, 
        .dark-mode-active footer {
          color: #f3f4f6 !important;
        }
        
        /* High-visibility deep dark text color inside the bright cards in dark mode */
        .dark-mode-active .hero-float > div .text-gray-900,
        .dark-mode-active .hero-float > div .text-slate-900,
        .dark-mode-active .hero-float > div .text-zinc-900,
        .dark-mode-active .hero-float > div .text-neutral-900,
        .dark-mode-active .hero-float > div .text-gray-800,
        .dark-mode-active .hero-float > div .text-slate-800,
        .dark-mode-active .hero-float > div .text-zinc-800,
        .dark-mode-active .hero-float > div .text-neutral-800,
        
        .dark-mode-active .lg\\:hidden > div > div .text-gray-900,
        .dark-mode-active .lg\\:hidden > div > div .text-slate-900,
        .dark-mode-active .lg\\:hidden > div > div .text-zinc-900,
        .dark-mode-active .lg\\:hidden > div > div .text-neutral-900,
        .dark-mode-active .lg\\:hidden > div > div .text-gray-800,
        .dark-mode-active .lg\\:hidden > div > div .text-slate-800 {
          color: #0f172a !important; /* Deep slate-900 text */
        }

        .dark-mode-active .hero-float > div .text-gray-600,
        .dark-mode-active .hero-float > div .text-slate-600,
        .dark-mode-active .hero-float > div .text-gray-500,
        .dark-mode-active .hero-float > div .text-slate-500,
        
        .dark-mode-active .lg\\:hidden > div > div .text-gray-600,
        .dark-mode-active .lg\\:hidden > div > div .text-slate-600,
        .dark-mode-active .lg\\:hidden > div > div .text-gray-500,
        .dark-mode-active .lg\\:hidden > div > div .text-slate-500 {
          color: #475569 !important; /* Deep slate-600 subtext */
        }
        
        /* Phone screen text overrides (keeps phone screen content dark & readable) */
        .dark-mode-active .absolute.z-30 .text-gray-900,
        .dark-mode-active .absolute.z-30 .text-gray-800,
        .dark-mode-active .absolute.z-30 .text-gray-700,
        .dark-mode-active .absolute.z-30 .text-gray-500,
        .dark-mode-active .absolute.z-30 span,
        .dark-mode-active .absolute.z-30 p,
        .dark-mode-active .absolute.z-30 h4 {
          color: #0f172a !important;
        }
        
        @keyframes text-gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .text-gradient-animated {
          background-size: 200% auto !important;
          animation: text-gradient-shift 4.5s ease infinite !important;
        }
      `}</style>
    </div>
  );
}