import { useEffect } from "react";
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
    <div className="relative rounded-3xl overflow-hidden border border-white/50 shadow-xl shadow-indigo-900/5 h-full aspect-[4/3]">
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

    // 2. Staggered slide up reveal for each row
    const textBlocks = document.querySelectorAll(".gsap-workflow-text-block");
    textBlocks.forEach((block) => {
      const eyebrow = block.querySelector(".gsap-workflow-eyebrow");
      const title = block.querySelector(".gsap-workflow-title");
      const body = block.querySelector(".gsap-workflow-body");

      // Initialize state smoothly to start hidden
      gsap.set([eyebrow, title, body], { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: block,
        start: "top 90%",
        end: "bottom 10%",
        onEnter: () => {
          gsap.killTweensOf([eyebrow, title, body]);
          gsap.set([eyebrow, title, body], { y: 20, opacity: 0 });
          gsap.to([eyebrow, title, body], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out"
          });
        },
        onLeave: () => {
          gsap.killTweensOf([eyebrow, title, body]);
          gsap.to([eyebrow, title, body], {
            opacity: 0,
            y: -20,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          gsap.killTweensOf([eyebrow, title, body]);
          gsap.set([eyebrow, title, body], { y: -20, opacity: 0 });
          gsap.to([eyebrow, title, body], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.killTweensOf([eyebrow, title, body]);
          gsap.to([eyebrow, title, body], {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.in"
          });
        }
      });
    });
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
          <div
            key={row.eyebrow}
            className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="gsap-workflow-text-block">
              <span className="gsap-workflow-eyebrow inline-block text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3 opacity-0">
                {row.eyebrow}
              </span>
              <h3 className="gsap-workflow-title text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-4 opacity-0">
                {row.title}
              </h3>
              <p className="gsap-workflow-body text-gray-600 font-medium leading-relaxed opacity-0">{row.body}</p>
            </div>
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
        ))}
      </div>
    </section>
  );
}