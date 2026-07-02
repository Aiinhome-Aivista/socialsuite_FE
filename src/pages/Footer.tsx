import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

/**
 * lucide-react dropped its Pinterest icon, so it's inlined here to match
 * the stroke-based style (24x24 viewBox, currentColor, same props shape
 * as the other icon components) used by the rest of the SOCIALS row.
 */
function Pinterest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 20l4-9" />
      <path d="M10.5 15.5c-.5 1-1 2-1 3.5a3 3 0 1 0 4.5-2.6" />
      <path d="M12 2a10 10 0 0 0-3.5 19.4" />
      <path d="M12 2a10 10 0 0 1 3 19.5" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

/**
 * Footer
 * Place directly below <WhySection /> in Landing.tsx (last element in the page).
 *
 * Dark navy bar matching the reference: copyright on the left with a legal
 * link row beneath it, social icon circles on the right. Recolored to the
 * site's indigo-900 to tie into the existing palette instead of plain navy.
 */

const LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Cookie Policy", to: "/cookie-policy" },
];

const SOCIALS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
  { icon: Pinterest, label: "Pinterest" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#1a1342]">
      <div className="mx-auto px-8 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-bold">
            {LINKS.map((link, i) => (
              <span key={link.label} className="flex items-center gap-3">
                <Link to={link.to} className="text-indigo-200 hover:text-white transition-colors">
                  {link.label}
                </Link>
                {i < LINKS.length - 1 && <span className="text-indigo-400/50">|</span>}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:ml-auto sm:justify-end">
            <p className="text-indigo-200 text-sm font-bold">Social suite supports these platforms</p>
            {SOCIALS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                aria-label={label}
                className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <p className="text-white text-sm text-center py-6">
          Copyright ©{new Date().getFullYear()} SocialSuite
        </p>
      </div>
    </footer>
  );
}