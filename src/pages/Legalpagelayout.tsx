import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { getToken } from "../lib/api";
import Footer from "./Footer";

/**
 * LegalPageLayout
 * Shared shell for Privacy Policy / Terms & Conditions / Cookie Policy pages
 * so they all stay visually consistent with each other and with Landing.tsx
 * (same fixed navbar, gradient orbs, and footer).
 */

export default function LegalPageLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  const isLoggedIn = !!getToken();

  return (
    <div className="min-h-screen bg-neutral-50 overflow-hidden relative font-sans">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px] translate-y-1/3" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-md border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">SocialSuite</span>
          </Link>
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
      <div className="h-[72px]" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-12 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">{title}</h1>
        <p className="text-sm text-gray-500 font-medium">Last updated: {updated}</p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-28">
        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-indigo-900/5 p-8 sm:p-12">
          <div className="space-y-10">{children}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-extrabold text-gray-900 mb-3">{title}</h2>
      <div className="space-y-3 text-gray-600 font-medium leading-relaxed text-[15px]">{children}</div>
    </section>
  );
}