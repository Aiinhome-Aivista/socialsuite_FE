import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" width="24" height="24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" width="24" height="24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.16-.1-.95-.2-2.4.04-3.43.22-.93 1.4-5.93 1.4-5.93s-.36-.72-.36-1.77c0-1.66.96-2.9 2.17-2.9 1.02 0 1.51.77 1.51 1.69 0 1.03-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.47 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.14.9 2.74.1.12.11.23.08.35-.09.38-.3 1.23-.34 1.4-.06.23-.19.28-.43.17-1.6-.74-2.6-3.08-2.6-4.96 0-4.04 2.94-7.75 8.47-7.75 4.45 0 7.9 3.17 7.9 7.4 0 4.42-2.79 7.98-6.66 7.98-1.3 0-2.52-.67-2.94-1.47l-.8 3.06c-.29 1.12-1.08 2.52-1.6 3.37C8.91 23.77 10.42 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
    </svg>
  );
}

/**
 * Footer
 * Place directly below <WhySection /> in Landing.tsx (last element in the page).
 *
 * Indigo-to-purple gradient bar matching the site's accent gradient:
 * copyright on the left with a legal link row beneath it, "supports
 * these platforms" label stacked above the social icon circles, right-aligned.
 */

const LINKS = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Cookie Policy", to: "/cookie-policy" },
];

const SOCIALS = [
  { 
    icon: Facebook, 
    label: "Facebook",
    colorClass: "bg-[#1877f2] hover:bg-[#1877f2]/90 hover:shadow-blue-600/30", 
    iconClass: "fill-white text-[#1877f2] h-5 w-5" 
  },
  { 
    icon: Instagram, 
    label: "Instagram",
    colorClass: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] hover:shadow-pink-600/30",
    iconClass: "text-white stroke-[2.5px] h-5 w-5"
  },
  { 
    icon: Twitter, 
    label: "X",
    colorClass: "bg-black hover:bg-black/90 hover:shadow-black/30",
    iconClass: "fill-white text-black h-5 w-5"
  },
  { 
    icon: Linkedin, 
    label: "LinkedIn",
    colorClass: "bg-[#0077b5] hover:bg-[#0077b5]/90 hover:shadow-blue-600/30",
    iconClass: "fill-white text-[#0077b5] h-5 w-5"
  },
  { 
    icon: YoutubeIcon, 
    label: "YouTube",
    colorClass: "bg-[#ff0000] hover:bg-[#ff0000]/90 hover:shadow-red-600/30",
    iconClass: "text-white h-5 w-5"
  },
  { 
    icon: PinterestIcon, 
    label: "Pinterest",
    colorClass: "bg-[#e60023] hover:bg-[#e60023]/90 hover:shadow-red-600/30",
    iconClass: "text-white h-5 w-5"
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gradient-to-r from-indigo-700 to-purple-600">
      <div className="mx-auto px-8 py-6">
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

          <div className="flex flex-col gap-3 sm:ml-auto">
            <p className="text-indigo-200 text-sm font-bold text-center">Social suite supports these platforms</p>
            <div className="flex flex-wrap items-center gap-3 justify-end">
              {SOCIALS.map(({ icon: Icon, label, colorClass, iconClass }) => (
                <span
                  key={label}
                  aria-label={label}
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5 hover:scale-105 shadow-md ${colorClass}`}
                >
                  <Icon className={`shrink-0 ${iconClass}`} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-white text-sm text-center mt-6">
          All rights reserved. Copyright ©{new Date().getFullYear()} SocialSuite
        </p>
      </div>
    </footer>
  );
}