import { Sparkles as SparklesIcon, Plug, ArrowRight } from "lucide-react";

/**
 * WhySection
 * Place directly below <WorkflowSection /> in Landing.tsx.
 *
 * Centered title + subhead, then 3 columns each with an icon, heading,
 * body copy, and an outlined pill button — matching the reference layout
 * but in the site's gray-900/indigo-purple language.
 */

function OwlIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 6c-8 0-14 6-14 15 0 6 2.5 10.5 6 13.5L14 39l4.5-2.5c1.7.6 3.6.9 5.5.9s3.8-.3 5.5-.9L34 39l-2-4.5c3.5-3 6-7.5 6-13.5C38 12 32 6 24 6Z"
        fill="currentColor"
      />
      <circle cx="18" cy="20" r="5" fill="white" />
      <circle cx="30" cy="20" r="5" fill="white" />
      <circle cx="18" cy="20" r="2" fill="currentColor" />
      <circle cx="30" cy="20" r="2" fill="currentColor" />
      <path d="M24 23l-2 4h4l-2-4Z" fill="white" />
    </svg>
  );
}

const COLUMNS = [
  {
    icon: <OwlIcon className="h-12 w-12 text-gray-900" />,
    title: "8 years and 50,000 teams",
    body: "SocialSuite started as a side project and is now trusted by teams worldwide. Thousands of brands use it daily to post, track, and out-perform their competitors on social media.",
    cta: "More about us",
  },
  {
    icon: <SparklesIcon className="h-12 w-12 text-gray-900" strokeWidth={1.5} />,
    title: "The ultimate AI for social media",
    body: "SocialSuite helps you speed up every part of social media management — writing, posting, messaging, and analytics. Our AI was designed by social pros for social pros.",
    cta: "Learn more",
  },
  {
    icon: <Plug className="h-12 w-12 text-gray-900 -rotate-12" strokeWidth={1.5} />,
    title: "A growing library of integrations",
    body: "Connect dozens of integrations to bring all your favorite tools into the SocialSuite dashboard, so your whole stack works together in one place.",
    cta: "Explore integrations",
  },
];

export default function WhySection() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-5">
          Why SocialSuite?
        </h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 font-medium leading-relaxed">
          The right tools are only part of the equation. SocialSuite combines powerful social
          media management and intelligence, award-winning customer support, enterprise-grade
          security, and industry-leading service to help you move faster with confidence.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 md:gap-10">
        {COLUMNS.map((col) => (
          <div key={col.title} className="text-center md:text-left">
            <div className="mb-5 flex justify-center md:justify-start">{col.icon}</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3 leading-snug">{col.title}</h3>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">{col.body}</p>
            <button className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-2.5 text-sm font-bold text-gray-900 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white group">
              {col.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}