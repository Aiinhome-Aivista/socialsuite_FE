import { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight,
  Heart,
  Send,
  Trophy,
  Users,
} from "lucide-react";

/**
 * WorkflowSection
 * Place directly below the 3-card "Universal Connectors / AI-Powered Creation /
 * Deep Analytics" grid in Landing.tsx.
 *
 * Mirrors the reference: a centered title + subhead, then alternating
 * left-text/right-visual rows (flipped on odd rows). Each visual is now a
 * real photograph instead of a mocked-up UI card, with a small floating
 * stat badge layered on top to keep the "product in the wild" feel.
 */

function Mockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/50 shadow-xl shadow-indigo-900/5 w-full h-[180px] sm:h-[220px] md:h-[250px]">
      {children}
    </div>
  );
}

/**
 * NOTE: swap the `src` values below for your own brand photography /
 * product screenshots whenever you have them. These are real stock
 * photographs (not mockup illustrations) used as placeholders.
 */
const ROWS = [
  {
    eyebrow: "Engagement",
    title: "Boost engagement, reach, and follower count with less effort",
    body: "See the content that belongs in the algorithm's good graces, and reuse and resurface what's already working for your audience. Plus, get personalized suggestions for how to win on each platform, so you're never starting from a blank page.",
    image: "https://picsum.photos/seed/engagement-analytics/1000/750",
    visual: (
      <>
        <div className="absolute top-5 left-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 px-4 py-3 shadow-lg flex items-center gap-2">
          <ArrowUpRight className="h-4 w-4 text-white" />
          <span className="text-white text-sm font-extrabold">+24% reach</span>
        </div>
        <div className="absolute bottom-5 right-5 rounded-2xl bg-gray-900/90 backdrop-blur px-4 py-3 shadow-lg flex items-center gap-2">
          <Heart className="h-4 w-4 text-pink-400 fill-pink-400" />
          <span className="text-white text-sm font-extrabold">8.2k likes</span>
        </div>
      </>
    ),
  },
  {
    eyebrow: "Inbox",
    title: "Respond to social media messages and comments in one place",
    body: "Bring every conversation into one inbox built for private messaging at scale. Reply to DMs and comments fast with saved and suggested replies, and tackle engagement as a team without losing track of who replied to what.",
    image: "https://picsum.photos/seed/team-inbox-messaging/1000/750",
    visual: (
      <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-gray-900/90 backdrop-blur px-4 py-3 shadow-lg flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
        <span className="text-white text-sm font-semibold flex-1">3 new replies waiting</span>
        <Send className="h-4 w-4 text-white shrink-0" />
      </div>
    ),
  },
  {
    eyebrow: "Trends",
    title: "Stay ahead of the latest trends and boost your chances of going viral",
    body: "Figure out exactly which sounds, hashtags, and formats your audience cares about with trend tracking and discovery. You can also search by topic, hashtag, or industry to discover what's getting the most action in your niche.",
    image: "https://picsum.photos/seed/social-trends-discovery/1000/750",
    visual: (
      <div className="absolute top-5 left-5 rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow-lg">
        <p className="text-[10px] font-bold text-gray-400 tracking-wide">TRENDING NOW</p>
        <p className="text-gray-900 text-sm font-extrabold">#SummerLaunch</p>
      </div>
    ),
  },
  {
    eyebrow: "Competitors",
    title: "Beat your competitors to the next big thing",
    body: "Track the performance, posting frequency, and strategies of your competitors across all media types. Keep an eye on the public's perception of your competitors with sentiment analysis, then share what people think out loud about your brand and competitors.",
    image: "https://picsum.photos/seed/competitor-benchmarking/1000/750",
    visual: (
      <div className="absolute top-5 right-5 rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow-lg flex items-center gap-2">
        <Trophy className="h-4 w-4 text-amber-500" />
        <span className="text-gray-900 text-sm font-extrabold">You're #1 this week</span>
      </div>
    ),
  },
  {
    eyebrow: "Advocacy",
    title: "Turn passionate employee advocates into engagement and reach",
    body: "Don't miss out on your greatest untapped brand asset: employee social networks. Make it simple for your team to share approved content, post with personality, and access social networks your brand could never reach alone.",
    image: "https://picsum.photos/seed/employee-advocacy-team/1000/750",
    visual: (
      <div className="absolute bottom-5 left-5 rounded-2xl bg-gray-900/90 backdrop-blur px-4 py-3 shadow-lg flex items-center gap-2">
        <Users className="h-4 w-4 text-white" />
        <span className="text-white text-sm font-semibold">14 employees sharing this week</span>
      </div>
    ),
  },
];

export default function WorkflowSection() {
  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Heading fade animation (20 -> 100 -> 10)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".gsap-fade-header-workflow",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    tl.set(".gsap-fade-header-workflow", { opacity: 0.2 })
      .to(".gsap-fade-header-workflow", { opacity: 1.0, ease: "none" })
      .to(".gsap-fade-header-workflow", { opacity: 0.1, ease: "none" });
  }, []);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
      <div className="text-center mb-20">
        <h2 className="gsap-fade-header-workflow text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          One suite.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Every social workflow.
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 font-medium">
          Understand what's happening, know what to do next, and take action — all from one connected suite.
        </p>
      </div>

      <div className="space-y-20 sm:space-y-28">
        {ROWS.map((row, i) => (
          <WorkflowRow key={row.eyebrow} row={row} i={i} />
        ))}
      </div>
    </section>
  );
}

function WorkflowRow({ row, i }: { row: typeof ROWS[0]; i: number }) {
  const [visible, setVisible] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");
  const rowRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    const el = rowRef.current;
    if (el) observer.observe(el);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDir("down");
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDir("up");
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isOdd = i % 2 === 1;

  // Text: Down-scroll slides UP, Up-scroll slides DOWN
  const textTranslateClass = visible
    ? "opacity-100 translate-y-0"
    : scrollDir === "down"
      ? "opacity-0 translate-y-12"
      : "opacity-0 -translate-y-12";

  // Image: Even rows (Right) slides from right, Odd rows (Left) slides from left
  const imageTranslateClass = visible
    ? "opacity-100 translate-x-0"
    : isOdd
      ? "opacity-0 -translate-x-16"
      : "opacity-0 translate-x-16";

  return (
    <div
      ref={rowRef}
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center overflow-hidden py-2 ${
        isOdd ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Animated text block */}
      <div className={`transition-all duration-[1000ms] ease-out ${textTranslateClass}`}>
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
          {row.eyebrow}
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-4">
          {row.title}
        </h3>
        <p className="text-gray-600 font-medium leading-relaxed">{row.body}</p>
      </div>

      {/* Animated image mockup container */}
      <div className={`transition-all duration-[1000ms] ease-out ${imageTranslateClass}`}>
        <Mockup>
          <img
            src={row.image}
            alt={row.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          {row.visual}
        </Mockup>
      </div>
    </div>
  );
}