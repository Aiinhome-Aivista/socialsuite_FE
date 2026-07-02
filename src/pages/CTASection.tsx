import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getToken } from "../lib/api";

/**
 * CTASection
 * Place directly below <WhySection /> and above <Footer /> in Landing.tsx.
 *
 * Full-width rounded gradient bar: bold two-line heading on the left,
 * supporting copy beside it, white pill CTA button on the right.
 */

export default function CTASection() {
  const isLoggedIn = !!getToken();
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 px-8 py-8 sm:px-12 sm:py-10 shadow-xl shadow-indigo-900/10 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
            Ready to grow your
            <br className="hidden sm:block" /> social presence?
          </h2>
          <p className="text-indigo-100 font-medium text-base sm:text-lg max-w-sm">
            Join thousands of creators and businesses who are already growing with SocialSuite.
          </p>
        </div>

        <Link
          to={isLoggedIn ? "/dashboard" : "/login"}
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-gray-900 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          Start Your Free Trial <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}