import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

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
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/login" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/accounts/login/" },
  { icon: Twitter, label: "X", href: "https://x.com/login" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/login" },
  { icon: Youtube, label: "YouTube", href: "https://accounts.google.com/ServiceLogin?service=youtube" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#1a1342]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <div>
          <p className="text-white font-extrabold text-base mb-4">
            Copyright ©{new Date().getFullYear()} SocialSuite
          </p>
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
        </div>

        <div className="flex items-center gap-3">
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white transition-all hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-500 hover:-translate-y-0.5"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}