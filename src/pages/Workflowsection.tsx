import { useEffect } from "react";
import {
  PieChart,
  MessageSquare,
  TrendingUp,
  Trophy,
  Users,
  ArrowUpRight,
  Heart,
  Repeat2,
  Send,
} from "lucide-react";

/**
 * WorkflowSection
 * Place directly below the 3-card "Universal Connectors / AI-Powered Creation /
 * Deep Analytics" grid in Landing.tsx.
 *
 * Mirrors the reference: a centered title + subhead, then alternating
 * left-text/right-visual rows (flipped on odd rows), each visual built from
 * small mock UI cards rather than photography, so it inherits the site's
 * indigo/purple/emerald palette and rounded-3xl/shadow-xl language.
 */

function Mockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl shadow-indigo-900/5 p-6 sm:p-8 h-full flex items-center justify-center">
      {children}
    </div>
  );
}

const ROWS = [
  {
    eyebrow: "Engagement",
    title: "Boost engagement, reach, and follower count with less effort",
    body: "See the content that belongs in the algorithm's good graces, and reuse and resurface what's already working for your audience. Plus, get personalized suggestions for how to win on each platform, so you're never starting from a blank page.",
    visual: (
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
        <div className="col-span-2 rounded-2xl bg-gray-50 p-4">
          <p className="text-[10px] font-bold text-gray-400 mb-2">FOLLOWER ENGAGEMENT</p>
          <div className="flex items-center gap-3">
            <PieChart className="h-10 w-10 text-indigo-600" strokeWidth={1.5} />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-full rounded-full bg-indigo-200" />
              <div className="h-2 w-2/3 rounded-full bg-purple-200" />
              <div className="h-2 w-1/3 rounded-full bg-pink-200" />
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-4 flex flex-col justify-between aspect-square">
          <ArrowUpRight className="h-5 w-5 text-white" />
          <p className="text-white text-xl font-extrabold">+24%</p>
        </div>
        <div className="rounded-2xl bg-gray-900 p-4 flex flex-col justify-between aspect-square">
          <Heart className="h-5 w-5 text-pink-400 fill-pink-400" />
          <p className="text-white text-xl font-extrabold">8.2k</p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Inbox",
    title: "Respond to social media messages and comments in one place",
    body: "Bring every conversation into one inbox built for private messaging at scale. Reply to DMs and comments fast with saved and suggested replies, and tackle engagement as a team without losing track of who replied to what.",
    visual: (
      <div className="w-full max-w-xs space-y-3">
        <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-gray-300" />
            <div className="h-2 w-1/2 rounded-full bg-gray-200" />
          </div>
          <MessageSquare className="h-4 w-4 text-indigo-500 shrink-0" />
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-400 to-blue-400 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-2/3 rounded-full bg-gray-300" />
            <div className="h-2 w-1/3 rounded-full bg-gray-200" />
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-gray-900 p-3">
          <div className="flex-1 h-2 rounded-full bg-gray-700" />
          <Send className="h-4 w-4 text-white" />
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Trends",
    title: "Stay ahead of the latest trends and boost your chances of going viral",
    body: "Figure out exactly which sounds, hashtags, and formats your audience cares about with trend tracking and discovery. You can also search by topic, hashtag, or industry to discover what's getting the most action in your niche.",
    visual: (
      <div className="relative w-full max-w-xs aspect-square flex items-center justify-center">
        <div className="absolute h-40 w-40 rounded-full border-2 border-dashed border-indigo-200" />
        <div className="absolute h-24 w-24 rounded-full border-2 border-dashed border-purple-200" />
        <div className="grid grid-cols-3 gap-2 relative z-10">
          {["bg-indigo-600", "bg-purple-500", "bg-pink-500", "bg-emerald-500", "bg-amber-400", "bg-blue-500"].map(
            (c, i) => (
              <div
                key={i}
                className={`${c} rounded-full shadow-md`}
                style={{
                  width: 18 + ((i * 7) % 22),
                  height: 18 + ((i * 7) % 22),
                }}
              />
            )
          )}
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Competitors",
    title: "Beat your competitors to the next big thing",
    body: "Track the performance, posting frequency, and strategies of your competitors across all media types. Keep an eye on the public's perception of your competitors with sentiment analysis, then share what people think out loud about your brand and competitors.",
    visual: (
      <div className="w-full max-w-xs space-y-3">
        <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-bold text-gray-700">You</span>
          </div>
          <span className="text-sm font-extrabold text-emerald-600">+15%</span>
        </div>
        <div className="rounded-2xl bg-gray-900 p-4">
          <div className="flex items-end gap-1.5 h-16">
            {[30, 55, 40, 70, 50, 85, 60].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-500 to-purple-400"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Advocacy",
    title: "Turn passionate employee advocates into engagement and reach",
    body: "Don't miss out on your greatest untapped brand asset: employee social networks. Make it simple for your team to share approved content, post with personality, and access social networks your brand could never reach alone.",
    visual: (
      <div className="w-full max-w-xs flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shrink-0">
          <Users className="h-8 w-8 text-white" />
        </div>
        <div className="rounded-2xl bg-gray-900 px-5 py-4 flex-1">
          <p className="text-white text-sm font-extrabold leading-tight">Join our team!</p>
          <p className="text-gray-400 text-[11px] mt-1">14 employees sharing this week</p>
          <div className="mt-2 flex -space-x-2">
            {["from-pink-400 to-rose-400", "from-indigo-400 to-blue-400", "from-emerald-400 to-teal-400"].map(
              (g, i) => (
                <div key={i} className={`h-6 w-6 rounded-full bg-gradient-to-br ${g} border-2 border-gray-900`} />
              )
            )}
          </div>
        </div>
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
            <Mockup>{row.visual}</Mockup>
          </div>
        ))}
      </div>
    </section>
  );
}