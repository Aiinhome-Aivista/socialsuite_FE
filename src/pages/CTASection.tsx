import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getToken } from "../lib/api";

/**
 * CTASection
 * Place directly below <WhySection /> and above <Footer /> in Landing.tsx.
 *
 * Animates text parts coming from four different directions when scrolled into view.
 */

export default function CTASection() {
  const isLoggedIn = !!getToken();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 pb-20 overflow-hidden">
      <style>{`
        @keyframes slideFromLeft {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideFromRight {
          0% { transform: translateX(100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideFromTop {
          0% { transform: translateY(-50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideFromBottom {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .animate-from-left {
          animation: slideFromLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-from-right {
          animation: slideFromRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-from-top {
          animation: slideFromTop 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-from-bottom {
          animation: slideFromBottom 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 px-8 py-8 sm:px-12 sm:py-10 shadow-xl shadow-indigo-900/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 text-center md:text-left">
          {/* Heading: Left & Right slide-in word by word */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
            <span className="block overflow-hidden pb-1">
              {"Ready to grow your".split(" ").map((word, i) => (
                <span
                  key={i}
                  className={`inline-block mr-1.5 ${isVisible ? "animate-from-left" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-1">
              {"social presence?".split(" ").map((word, i) => (
                <span
                  key={i}
                  className={`inline-block mr-1.5 ${isVisible ? "animate-from-right" : "opacity-0"}`}
                  style={{ animationDelay: `${(i + 4) * 0.08}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h2>
          
          {/* Paragraph: Top & Bottom slide-in word by word */}
          <p className="text-indigo-100 font-medium text-base sm:text-lg max-w-sm">
            <span className="block overflow-hidden pb-1">
              {"Join thousands of creators and businesses".split(" ").map((word, i) => (
                <span
                  key={i}
                  className={`inline-block mr-1.5 ${isVisible ? "animate-from-top" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-1">
              {"who are already growing with SocialSuite.".split(" ").map((word, i) => (
                <span
                  key={i}
                  className={`inline-block mr-1.5 ${isVisible ? "animate-from-bottom" : "opacity-0"}`}
                  style={{ animationDelay: `${(i + 6) * 0.05}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </p>
        </div>

        <Link
          to={isLoggedIn ? "/dashboard" : "/login"}
          className={`shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-gray-900 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 duration-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          Start Your Free Trial <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}