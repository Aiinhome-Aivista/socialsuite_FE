import { useEffect } from "react";
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
  },
  {
    icon: <SparklesIcon className="h-12 w-12 text-gray-900" strokeWidth={1.5} />,
    title: "The ultimate AI for social media",
    body: "SocialSuite helps you speed up every part of social media management — writing, posting, messaging, and analytics. Our AI was designed by social pros for social pros.",
  },
  {
    icon: <Plug className="h-12 w-12 text-gray-900 -rotate-12" strokeWidth={1.5} />,
    title: "A growing library of integrations",
    body: "Connect dozens of integrations to bring all your favorite tools into the SocialSuite dashboard, so your whole stack works together in one place.",
  },
];

export default function WhySection() {
  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const block = document.querySelector(".gsap-why-text-block");
    if (block) {
      const title = block.querySelector(".gsap-why-title");
      const body = block.querySelector(".gsap-why-body");

      // Initialize state smoothly to start hidden
      gsap.set([title, body], { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: block,
        start: "top 90%",
        end: "bottom 10%",
        onEnter: () => {
          gsap.killTweensOf([title, body]);
          gsap.set([title, body], { y: 20, opacity: 0 });
          gsap.to([title, body], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out"
          });
        },
        onLeave: () => {
          gsap.killTweensOf([title, body]);
          gsap.to([title, body], {
            opacity: 0,
            y: -20,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          gsap.killTweensOf([title, body]);
          gsap.set([title, body], { y: -20, opacity: 0 });
          gsap.to([title, body], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.killTweensOf([title, body]);
          gsap.to([title, body], {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.in"
          });
        }
      });
    }

    const cards = document.querySelectorAll(".gsap-why-col-card");
    cards.forEach((card, index) => {
      // Initialize state smoothly to start hidden
      gsap.set(card, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: card,
        start: "top 92%",
        end: "bottom 8%",
        onEnter: () => {
          gsap.killTweensOf(card);
          gsap.set(card, { x: -40, opacity: 0 });
          gsap.to(card, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: "power2.out"
          });
        },
        onLeave: () => {
          gsap.killTweensOf(card);
          gsap.to(card, {
            opacity: 0,
            x: 40,
            duration: 0.5,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          gsap.killTweensOf(card);
          gsap.set(card, { x: 40, opacity: 0 });
          gsap.to(card, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: (2 - index) * 0.15,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.killTweensOf(card);
          gsap.to(card, {
            opacity: 0,
            x: -40,
            duration: 0.5,
            ease: "power2.in"
          });
        }
      });
    });
  }, []);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-2 pb-10">
      <div className="gsap-why-text-block text-center mb-16">
        <h2 className="gsap-why-title text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-5 opacity-0">
          Why SocialSuite?
        </h2>
        <p className="gsap-why-body max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 font-medium leading-relaxed opacity-0">
          The right tools are only part of the equation. SocialSuite combines powerful social
          media management and intelligence, award-winning customer support, enterprise-grade
          security, and industry-leading service to help you move faster with confidence.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 md:gap-10">
        {COLUMNS.map((col) => (
          <div key={col.title} className="gsap-why-col-card text-center md:text-left opacity-0">
            <div className="mb-5 flex justify-center md:justify-start">{col.icon}</div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-snug">{col.title}</h3>
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-6">{col.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}